import { access, readdir, readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"
import assert from "node:assert/strict"
import { legacyDocumentPaths, resolveDocumentPath } from "./document-paths.mjs"

const root = fileURLToPath(new URL("../", import.meta.url))
const files = []
const ignored = new Set(["node_modules", "dist", ".git", ".preview", "work", "ui-review"])
const exists = async (file) => { try { await access(file); return true } catch { return false } }
async function visit(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (item.isDirectory() && !ignored.has(item.name)) await visit(path.join(dir, item.name))
    else if (item.isFile() && item.name.endsWith(".md")) files.push(path.join(dir, item.name))
  }
}
await visit(root)
const broken = []
const localEvidence = []
let checkedLinks = 0
for (const file of files) {
  const markdown = (await readFile(file, "utf8")).replace(/```[\s\S]*?```/g, "")
  for (const match of markdown.matchAll(/!?\[[^\]]*\]\((<[^>]+>|[^)\n]+)\)/g)) {
    const raw = match[1].replace(/^<|>$/g, "").replace(/\s+"[^"]*"$/, "")
    if (/^(#|\/|[a-z][a-z0-9+.-]*:)/i.test(raw)) continue
    const target = path.resolve(path.dirname(file), decodeURIComponent(raw.split("#")[0]))
    if (await exists(target)) { checkedLinks += 1; continue }
    const source = path.relative(root, file).split(path.sep).join("/")
    // Historical screenshot evidence is local-only and is not required in a fresh clone.
    if (source.startsWith("docs/archive/") && (target.includes(path.sep + "ui-review" + path.sep) || target.includes("ad_restore_archive"))) {
      localEvidence.push({ source, link: raw })
    } else broken.push({ source, link: raw })
  }
}
for (const [legacy, current] of Object.entries(legacyDocumentPaths)) {
  assert.ok(await exists(path.join(root, current)), `Missing compatibility target: ${legacy} → ${current}`)
  assert.equal(resolveDocumentPath(legacy), current)
}
assert.deepEqual(broken, [], "Broken documentation links")
const agents = await readFile(path.join(root, "AGENTS.md"), "utf8")
const maintenance = await readFile(path.join(root, "DESIGN_MAINTENANCE.md"), "utf8")
const policy = "현재 검증된 구조를 유지하되, 추가 교수님 피드백과 사용자 요청에 따라 변경한다."
assert.ok(agents.includes(policy) && maintenance.includes(policy))
assert.ok(agents.includes("DESIGN_MAINTENANCE.md"))
for (const name of ["DESIGN_MASTER.md", "HASE4B_MASTER.md", "UI_NEXT_STEPS.md"]) assert.equal(await exists(path.join(root, name)), false, `Old task should be archived: ${name}`)
console.log(JSON.stringify({ markdownFiles: files.length, checkedLinks, compatibilityPaths: Object.keys(legacyDocumentPaths).length, unavailableHistoricalLocalEvidence: localEvidence, activePolicy: "structure-preserving maintenance", brokenLinks: broken }, null, 2))
