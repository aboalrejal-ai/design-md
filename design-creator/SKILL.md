---
name: design-creator
description: Generate a complete, implementation-ready design system package from a live website URL or local codebase files. Trigger this skill whenever the user wants to analyze a website or codebase to generate a full design system (tokens.css, components.html, USAGE.md, DESIGN.md, and JSON manifests) identical to the Apple design system package structure.
---

# Design Creator Skill

This skill enables you to automatically generate a complete, production-grade design system package for a website or a local codebase. The resulting package includes CSS variables, HTML components, JSON manifests, and a `DESIGN.md` specification file (in English only) that serves as a blueprint for other AI coding assistants.

---

## Capabilities & Modes

The skill supports two modes of execution:

1. **URL Scraper Mode**: Fetches and scans a live web page, parses external and inline stylesheets to extract visual design tokens (colors, font families, font sizes, margins, padding, spacing, border-radius), and formats it into a design spec.
2. **Codebase Analyzer Mode**: Walks through a local codebase directory to extract CSS variables, Tailwind configuration theme extensions, and Tailwind utility class usage from HTML/JSX/TSX component files.

---

## Workflow Steps

### Step 1: Detect Mode and Arguments
Determine whether the user wants to analyze a website URL or scan a local directory. If a URL is provided, use **URL Scraper Mode**. If a directory path is provided (or implied), use **Codebase Analyzer Mode**.

### Step 2: Run the Extraction & Scaffolding Script
Execute the appropriate Python helper script to extract design tokens and automatically scaffold the design system package. You MUST provide a target `output_dir` (e.g., `./design-systems/my-brand`).

- **For URL Scraper Mode**:
  Run the URL scraper script using the command:
  ```bash
  python [path/to/skill]/scripts/analyze_url.py <URL> <output_dir>
  ```

- **For Codebase Analyzer Mode**:
  Run the codebase analyzer script on the target path:
  ```bash
  python [path/to/skill]/scripts/analyze_codebase.py <PATH> <output_dir>
  ```

### Step 3: Verify the Scaffolded Package
The Python script will automatically create the following files in the `output_dir`:
- `tokens.css`
- `components.html`
- `design-tokens.json`
- `components.manifest.json`
- `USAGE.md`

You do NOT need to write these files yourself.

### Step 4: Write the Structured `DESIGN.md`
Read the JSON output from the script (which contains the extracted design tokens). Synthesize this data into a full-scale `DESIGN.md` specification file, saving it into the `output_dir`.

The generated `DESIGN.md` document MUST strictly follow the structural blueprint below.

---

## Output Document Structure (`DESIGN.md`)

Your generated `DESIGN.md` file must consist of:
1. **YAML Frontmatter** (delimited by `---`)
2. **Detailed Markdown Sections**

### 1. YAML Frontmatter Specification

The YAML block must contain:
- `version`: `alpha` (or current iteration)
- `name`: Kebab-case identifier of the design spec
- `description`: A descriptive 2-3 sentence overview summarizing the brand's aesthetic.
- `colors`: Key-value pairs mapping semantic colors (e.g. `primary`, `canvas`) to hex codes.
- `typography`: Typography token map containing sub-keys for font scale roles.
- `rounded`: Border-radius scale map.
- `spacing`: Layout spacing scale map.
- `components`: Components styling map specifying UI building blocks. Use curly braces to refer to tokens (e.g., `backgroundColor: "{colors.primary}"`).

### 2. Markdown Sections

- **`## Overview`**: A detailed summary of the visual theme, spacing density, and shape grammar. Include 6-8 **Key Characteristics**.
- **`## Colors`**: Organized list of color roles.
- **`## Typography`**: Font families, hierarchy table, and styling principles.
- **`## Layout`**: Spacing system, grid container rules, and whitespace philosophy.
- **`## Elevation & Depth`**: Table of elevation treatments (e.g., shadows, blurs).
- **`## Shapes`**: Border-radius scale table.
- **`## Components`**: Elaborate specs for individual UI elements.
- **`## Responsive Behavior`**: Breakpoints, touch targets, and collapsing strategy.
- **`## Do's and Don'ts`**: `### Do` and `### Don't` design patterns.
- **`## Iteration Guide` / `## Known Gaps`**: Rules for iterating on the design.

---

## Constraints & Naming Rules

- **English Only**: The `DESIGN.md` file MUST be written entirely in English. Do NOT automatically translate the file into other languages.
- All tokens inside the YAML component section must refer to other tokens using curly braces.
- Do not use placeholders; every color, font, and spacing value must be actual values extracted or verified.
