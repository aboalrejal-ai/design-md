---
name: design-md-creator
description: Generate structured, implementation-ready DESIGN.md files from a live website URL or local codebase files. Trigger this skill whenever the user wants to analyze a website's layout, style, colors, fonts, or margins, convert a URL to a design specification, or scan a codebase to generate visual guidelines and UI rules.
---

# Design.md Creator Skill

This skill enables you to automatically generate a structured, production-grade `DESIGN.md` specification file for a website or a local codebase. The resulting design document serves as a layout and styling blueprint for other AI coding assistants.

---

## Capabilities & Modes

The skill supports two modes of execution:

1. **URL Scraper Mode**: Fetches and scans a live web page, parses external and inline stylesheets to extract visual design tokens (colors, font families, font sizes, margins, padding, spacing, border-radius), and formats it into a design spec.
2. **Codebase Analyzer Mode**: Walks through a local codebase directory to extract CSS variables, Tailwind configuration theme extensions, and Tailwind utility class usage from HTML/JSX/TSX component files.

---

## Workflow Steps

### Step 1: Detect Mode and Arguments
Determine whether the user wants to analyze a website URL or scan a local directory. If a URL is provided, use **URL Scraper Mode**. If a directory path is provided (or implied), use **Codebase Analyzer Mode**.

### Step 2: Run the Extraction Script
Execute the appropriate Python helper script to extract design tokens:

- **For URL Scraper Mode**:
  Run the URL scraper script using the command:
  ```bash
  python [path/to/skill]/scripts/analyze_url.py <URL>
  ```
  *Note: If additional research is needed, you may fetch page contents or search for official branding guidelines using web search.*

- **For Codebase Analyzer Mode**:
  Run the codebase analyzer script on the target path:
  ```bash
  python [path/to/skill]/scripts/analyze_codebase.py <PATH>
  ```

### Step 3: Parse and Clean JSON Draft
Read the JSON output of the script. This output includes:
- Extracted brand and layout colors (ordered by frequency, along with variable names).
- Typography families, sizes, weights, and letter-spacings.
- Spacing values and border-radius scales.
- Detected component names (for local projects).

### Step 4: Write the Structured `DESIGN.md`
Synthesize the extracted JSON tokens into a full-scale `DESIGN.md` spec. The generated document MUST strictly follow the structural blueprint below.

---

## Output Document Structure

Your generated `DESIGN.md` file must consist of:
1. **YAML Frontmatter** (delimited by `---`)
2. **Detailed Markdown Sections**

### 1. YAML Frontmatter Specification

The YAML block must contain:
- `version`: `alpha` (or current iteration)
- `name`: Kebab-case identifier of the design spec (e.g. `apple-design-analysis`)
- `description`: A descriptive 2-3 sentence overview summarizing the brand's aesthetic, shape grammar, and atmospheric density.
- `colors`: Key-value pairs mapping semantic colors (e.g. `primary`, `canvas`, `ink`, `muted`, `hairline`, `border-strong`) to hex codes.
- `typography`: Typography token map containing sub-keys for font scale roles (e.g., `display-xl`, `body-md`, `button-md`, `nav-link`, `caption`) with fields:
  - `fontFamily` (string list of fonts)
  - `fontSize` (px, rem, or em values)
  - `fontWeight` (numeric weight)
  - `lineHeight` (unitless or px values)
  - `letterSpacing` (px/em tracking values)
- `rounded`: Border-radius scale map (e.g., `none`, `xs`, `sm`, `md`, `lg`, `pill`).
- `spacing`: Layout spacing scale map (e.g., `xxs`, `xs`, `sm`, `md`, `base`, `lg`, `xl`, `section`).
- `components`: Components styling map specifying UI building blocks (e.g., `button-primary`, `property-card`, `text-input`, `footer-light`) detailing their background color, text color, typography token references, border-radius, padding, and height. Use curly braces to refer to tokens, for example: `backgroundColor: "{colors.primary}"` or `typography: "{typography.button-md}"`.

### 2. Markdown Sections

- **`## Overview`**: A detailed summary of the visual theme, spacing density (high/low/moderate), and shape grammar. Include a bulleted list of 6-8 **Key Characteristics** that define the brand.
- **`## Colors`**: Organized list of color roles, grouped into Brand & Accent, Surface, Hairlines & Borders, Text, and Semantic. State the source hex code and explain exactly when and where each color is applied.
- **`## Typography`**: 
  - **Font Family**: List the primary and fallback fonts.
  - **Hierarchy Table**: A markdown table with columns: `Token | Size | Weight | Line Height | Letter Spacing | Use`.
  - **Principles**: Bulleted styling principles (e.g., negative tracking at display sizes, specific weight guidelines).
  - **Note on Font Substitutes**: Open-source Google Fonts alternatives (e.g., substituting Inter if a custom typeface is missing).
- **`## Layout`**:
  - **Spacing System**: List spacing tokens and explain their layout use.
  - **Grid & Container**: Max-widths, column patterns, and gutters at desktop/mobile.
  - **Whitespace Philosophy**: Explain the margins and air between elements.
- **`## Elevation & Depth`**: A table of `Level | Treatment | Use` along with decorative depth rules (e.g., gradients, backdrop blurs).
- **`## Shapes`**: A border-radius scale table and photography geometry description.
- **`## Components`**: Elaborate, individual specs for each UI element (Buttons, Input Fields, Cards, Top Navigation, Footers), mapping their styles directly to tokens.
- **`## Responsive Behavior`**:
  - **Breakpoints**: A table with columns `Name | Width | Key Changes`.
  - **Touch Targets**: Min height/width targets (e.g. 48px).
  - **Collapsing Strategy**: Detail how menus, grids, and typography collapse on smaller viewports.
- **`## Do's and Don'ts`**: A detailed markdown section listing `### Do` and `### Don't` design patterns to maintain brand fidelity.
- **`## Iteration Guide` / `## Known Gaps`**: Uncaptured elements (e.g., loading states or maps) and rules for iterating on the design.

---

## Constraints & Naming Rules

- **No Arabic translations** or Arabic character comments inside codebase files; all code and design specifications must be strictly in English.
- All tokens inside the YAML component section must refer to other tokens using curly braces (e.g., `backgroundColor: "{colors.primary}"`).
- Do not use placeholders; every color, font, and spacing value must be actual values extracted or verified.
