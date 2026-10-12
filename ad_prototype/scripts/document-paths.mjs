// Compatibility paths for historical checkpoint manifests and current documentation.
export const legacyDocumentPaths = {
  "DESIGN_MASTER.md": "docs/archive/DESIGN_MASTER.md",
  "HASE4B_MASTER.md": "docs/archive/PHASE4B_MASTER.md",
  "UI_DESIGN_REVIEW.md": "docs/archive/UI_DESIGN_REVIEW.md",
  "UI_NEXT_STEPS.md": "docs/archive/UI_NEXT_STEPS.md",
  "PHASE1_PRODUCT_AUDIT.md": "docs/archive/PHASE1_PRODUCT_AUDIT.md",
  "PHASE2_ASSET_PLAN.md": "docs/archive/PHASE2_ASSET_PLAN.md",
  "PHASE2_DESIGN_SYSTEM.md": "docs/archive/PHASE2_DESIGN_SYSTEM.md",
  "PHASE2_IMPLEMENTATION.md": "docs/archive/PHASE2_IMPLEMENTATION.md",
  "PHASE2_PLATFORM_STRATEGY.md": "docs/archive/PHASE2_PLATFORM_STRATEGY.md",
  "PHASE3_IMPLEMENTATION.md": "docs/archive/PHASE3_IMPLEMENTATION.md",
  "PHASE4A_BRAND_REVIEW.md": "docs/archive/PHASE4A_BRAND_REVIEW.md",
  "PHASE4B_ASSET_INVENTORY.md": "docs/archive/PHASE4B_ASSET_INVENTORY.md",
  "PHASE4B_ASSET_PLAN.md": "docs/archive/PHASE4B_ASSET_PLAN.md",
  "PHASE4B_BRAND_APPLICATION.md": "docs/archive/PHASE4B_BRAND_APPLICATION.md",
  "PHASE4B_FINAL_REPORT.md": "docs/archive/PHASE4B_FINAL_REPORT.md",
  "PHASE4B_INDEPENDENT_AUDIT.md": "docs/archive/PHASE4B_INDEPENDENT_AUDIT.md",
  "docs/PHASE4_REFINEMENT.md": "docs/archive/PHASE4_REFINEMENT.md",
  "LOCAL_PREVIEW.md": "docs/LOCAL_PREVIEW.md",
  "PHASE4_REFINEMENT.md": "docs/archive/PHASE4_REFINEMENT.md",
  "PHASE4B_MASTER.md": "docs/archive/PHASE4B_MASTER.md"
}

export const resolveDocumentPath = (file) => legacyDocumentPaths[file] || file
export const isInstructionDocument = (file) => [
  "AGENTS.md", "DESIGN_MAINTENANCE.md", "DESIGN_MASTER.md", "HASE4B_MASTER.md", "PHASE4B_MASTER.md",
].includes(file)
