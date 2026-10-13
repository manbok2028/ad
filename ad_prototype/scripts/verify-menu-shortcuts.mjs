import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import assert from 'node:assert/strict'

const output = process.env.FEEDBACK_REVIEW_OUTPUT
if (!output) throw Error('FEEDBACK_REVIEW_OUTPUT is required')
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const findings = []
try {
  for (const width of [320, 375, 390, 430, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 844 } })
    await page.goto('http://127.0.0.1:5173/')
    await page.getByRole('button', { name: '메뉴 열기', exact: true }).click()
    for (const mode of ['easy', 'regular']) {
      if (mode === 'regular') await page.getByRole('dialog').getByRole('switch', { name: '간편모드', exact: true }).click()
      await page.evaluate(() => document.fonts.ready)
      const buttons = await page.locator('.menu-creation-shortcuts button').evaluateAll(elements => elements.map(button => {
        const label = button.querySelector('span'), node = label.firstChild
        const wordStart = node.textContent.indexOf('만들기')
        const letterTops = [0, 1, 2].map(offset => {
          const range = document.createRange()
          range.setStart(node, wordStart + offset)
          range.setEnd(node, wordStart + offset + 1)
          return range.getBoundingClientRect().top
        })
        const icon = button.querySelector('svg').getBoundingClientRect()
        return { label: label.textContent, letterTops, wordIntact: Math.max(...letterTops) - Math.min(...letterTops) < 1, iconWidth: icon.width, iconHeight: icon.height, overflow: button.scrollWidth > button.clientWidth }
      }))
      findings.push({ width, mode, buttons, pageOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth) })
      await page.screenshot({ path: join(output, `menu-${mode}-${width}.png`) })
    }
    await page.close()
  }
  await writeFile(join(output, 'shortcuts.json'), JSON.stringify(findings, null, 2))
  if (!process.env.CAPTURE_BASELINE) assert.ok(findings.every(row => !row.pageOverflow && row.buttons.every(button => button.wordIntact && !button.overflow && button.iconWidth >= 20 && button.iconHeight >= 20)), 'Shortcut labels or icons are clipped: see shortcuts.json')
  console.log(JSON.stringify(findings.map(row => ({ width: row.width, mode: row.mode, issues: row.buttons.filter(button => !button.wordIntact || button.overflow || button.iconWidth < 20).map(button => button.label) }))))
} finally { await browser.close() }
