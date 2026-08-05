---
goal: Upgrade design-md-creator to design-creator (Full System Package)
version: 1.0
date_created: 2026-06-21
status: 'Planned'
tags: [feature, upgrade, architecture]
---

# Implementation Plan: Design Creator Skill Upgrade

## Overview
**Current State:** The `design-md-creator` skill analyzes a URL or local codebase and outputs a single `DESIGN.md` file.
**Target State:** The upgraded `design-creator` skill will analyze a URL or local codebase and generate a complete, structured design system directory, identical in structure to the `design-systems/apple` package. This includes generating `tokens.css`, `components.html`, `USAGE.md`, `design-tokens.json`, `components.manifest.json`, and an English-only `DESIGN.md` file. Multi-language auto-translation is completely removed to adhere to user requirements.

## 1. Requirements & Constraints
- **REQ-001**: Rename the skill directory from `design-md-creator` to `design-creator`.
- **REQ-002**: Generate a full design system package mimicking the `apple` folder structure.
- **REQ-003**: The Python scripts (`analyze_url.py`, `analyze_codebase.py`, or new helpers) must handle the exact scaffolding of files such as `tokens.css`, `components.html`, `USAGE.md`, and JSON manifests.
- **REQ-004**: Produce only ONE language specification file: `DESIGN.md` (English). No auto-translation to other languages.
- **REQ-005**: Adhere to `skill-creator` instructions for testing and validating the upgraded skill.

## 2. Architecture & Alternatives
- **Decision:** Introduce a new helper script (`scaffold_package.py`) or upgrade existing scripts to directly dump the deterministic CSS/HTML/JSON package files, allowing the LLM to focus purely on creating the final analytical `DESIGN.md` file.
- **ALT-001**: Have the LLM write all 6-7 files individually during execution. *Rejected* due to severe token bloat and unreliability. Python generation for CSS/HTML manifests is deterministic and better.

## 2.1 No-Touch Zones
Files that MUST NOT be modified during this implementation:
- `design-systems/apple/*` — This is the reference architecture; it must remain untouched.

## 3. Dependencies & Files

| File Path | Change Type | Description / Dependencies |
|-----------|-------------|----------------------------|
| `design-md-creator/` | rename | Rename root folder to `design-creator` |
| `design-creator/SKILL.md` | modify | Update name, description, and output structure instructions. |
| `design-creator/scripts/analyze_url.py` | modify | Extract precise CSS/HTML tokens. |
| `design-creator/scripts/analyze_codebase.py` | modify | Extract local codebase CSS/HTML tokens. |
| `design-creator/scripts/scaffold_package.py` | create | Generate the exact CSS, HTML, and JSON file structure. |

## 6. Risks and Assumptions
| ID | Risk / Assumption | Impact | Mitigation / Note |
|----|-------------------|--------|-------------------|
| RISK-001 | Complex HTML scaffolding | Med | Extract core tailwind/css blocks securely from scripts. |
| ASM-001 | LLM context length | - | Offloading CSS/JSON writing to python saves LLM context. |

## 8. Rollback Plan
- Restore the original `design-md-creator` folder from a backup or Git commit if the new package generator fails.
