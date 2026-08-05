# Task Tracking & Phases: Design Creator Skill Upgrade

### Phase 1: Setup & Infrastructure
- **GOAL**: Rename the skill directory and setup the initial target scripts for codebase modification.
- `[x]` **TASK-001**: Rename `design-md-creator` to `design-creator` using file system commands.
- `[x]` **TASK-002 [P]**: Update `SKILL.md` inside `design-creator` to reflect the new name, description, and output goals (English only, no auto-translations).

### Phase 2: Foundational (Blocking Prerequisites)
- **GOAL**: Enhance Python scripts to output the complete set of required design files.
- `[x]` **TASK-003**: Create `scaffold_package.py`. This script takes extracted JSON tokens and scaffolds `tokens.css`, `components.html`, `USAGE.md`, `design-tokens.json`, and `components.manifest.json` exactly matching Apple's structure.
- `[x]` **TASK-004**: Refactor `analyze_url.py` to correctly extract comprehensive CSS/HTML rules and pass them to the scaffold script.
- `[x]` **TASK-005**: Refactor `analyze_codebase.py` to extract local CSS/HTML component rules and pass them to the scaffold script.
- Checkpoint: Scripts run without error and generate the proper folder structure with deterministic files.

### Phase 3: Workflow Updates
- **GOAL**: Update the skill instructions to properly orchestrate the AI.
- `[x]` **TASK-006**: Completely rewrite the instruction steps in `SKILL.md` to run the scripts, read the generated output, and formulate ONLY the final `DESIGN.md` in English. 

### Phase 4: Testing & Evals
- **GOAL**: Run tests to ensure the skill operates successfully following `skill-creator` principles.
- `[x]` **TASK-007**: Define comprehensive test cases inside `design-creator/evals/evals.json`.
- `[x]` **TASK-008**: Run subagents using the new skill against URLs and Local Codebases to verify generation of the entire design package.
- `[x]` **TASK-009**: Generate HTML reviews via `generate_review.py` and optimize skill triggers.
- Checkpoint: Skill accurately builds design packages and is verified against baselines.

---

## Detailed Task Definitions

### TASK-001: Rename directory to design-creator
**Description:** Use shell commands to rename the folder.
**Acceptance criteria:**
- [ ] Folder is named `design-creator`.
**Files likely touched:** `design-md-creator/` -> `design-creator/`
**Estimated scope:** Small

### TASK-002: Update SKILL.md Identity
**Description:** Change references inside `SKILL.md` to `design-creator`.
**Acceptance criteria:**
- [ ] YAML frontmatter `name:` is `design-creator`.
**Files likely touched:** `design-creator/SKILL.md`
**Estimated scope:** Small

### TASK-003: Create scaffold_package.py
**Description:** Build the Python logic that generates the standardized CSS, JSON, and HTML components.
**Acceptance criteria:**
- [ ] Script successfully writes `tokens.css`, `design-tokens.json`, `components.html`, `components.manifest.json`, and `USAGE.md` into the target directory based on input data.
**Files likely touched:** `design-creator/scripts/scaffold_package.py`
**Estimated scope:** Large

### TASK-004: Refactor analyze_url.py
**Description:** Improve web scraping to extract detailed CSS custom properties and tailwind structures to feed `scaffold_package.py`.
**Acceptance criteria:**
- [ ] Scraper extracts necessary metadata.
**Files likely touched:** `design-creator/scripts/analyze_url.py`
**Estimated scope:** Medium

### TASK-005: Refactor analyze_codebase.py
**Description:** Improve directory AST/Regex parsing to pull exact components and design tokens.
**Acceptance criteria:**
- [ ] Analyzer successfully feeds `scaffold_package.py`.
**Files likely touched:** `design-creator/scripts/analyze_codebase.py`
**Estimated scope:** Medium

### TASK-006: Rewrite SKILL.md Workflow
**Description:** The AI must only write `DESIGN.md` in English after the scripts run.
**Acceptance criteria:**
- [ ] Explicit rules forbid translating to other languages.
- [ ] Instruction explicitly lists all 6 required files.
**Files likely touched:** `design-creator/SKILL.md`
**Estimated scope:** Large

### TASK-007 to TASK-009: Testing and Evals
**Description:** End-to-end `skill-creator` validation flow.
**Acceptance criteria:**
- [ ] Baseline and with-skill tests complete successfully.
**Estimated scope:** Large
