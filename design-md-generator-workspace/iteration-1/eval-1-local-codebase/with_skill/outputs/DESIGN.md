---
version: alpha
name: design-md-hub
description: |
  A balanced, editorial catalog system using the Anthropic brand identity. It features warm, premium paper-like light backgrounds contrasting with deep charcoal dark modes, combined with organic, highly readable serif body type and geometric sans-serif headings. Rounded pill accents and smooth transition micro-animations create a responsive and tactile digital experience.
colors:
  primary: "#d97757"
  primary-hover: "#c86343"
  accent-blue: "#6a9bcc"
  accent-green: "#788c5d"
  canvas: "#faf9f5"
  canvas-card: "#ffffff"
  ink: "#141413"
  ink-secondary: "#575754"
  muted: "#8c8a82"
  hairline: "#e8e6dc"
  border-strong: "#b0aea5"
  code-bg: "#f5f4ef"
  header-bg: "rgba(250, 249, 245, 0.85)"
  shadow-color: "rgba(20, 20, 19, 0.05)"
typography:
  display-xl:
    fontFamily: ["Poppins", "-apple-system", "BlinkMacSystemFont", "Arial", "sans-serif"]
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-1.5px"
  display-lg:
    fontFamily: ["Poppins", "-apple-system", "BlinkMacSystemFont", "Arial", "sans-serif"]
    fontSize: "2.2rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.5px"
  display-md:
    fontFamily: ["Poppins", "-apple-system", "BlinkMacSystemFont", "Arial", "sans-serif"]
    fontSize: "1.6rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.5px"
  heading-sm:
    fontFamily: ["Poppins", "-apple-system", "BlinkMacSystemFont", "Arial", "sans-serif"]
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.5px"
  body-lg:
    fontFamily: ["Lora", "Georgia", "serif"]
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0px"
  body-md:
    fontFamily: ["Lora", "Georgia", "serif"]
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0px"
  body-sm:
    fontFamily: ["Lora", "Georgia", "serif"]
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0px"
  button-md:
    fontFamily: ["Poppins", "-apple-system", "BlinkMacSystemFont", "Arial", "sans-serif"]
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0px"
  button-sm:
    fontFamily: ["Poppins", "-apple-system", "BlinkMacSystemFont", "Arial", "sans-serif"]
    fontSize: "0.85rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0px"
  nav-link:
    fontFamily: ["Poppins", "-apple-system", "BlinkMacSystemFont", "Arial", "sans-serif"]
    fontSize: "0.85rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0px"
  caption:
    fontFamily: ["Poppins", "-apple-system", "BlinkMacSystemFont", "Arial", "sans-serif"]
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.5px"
  mono-sm:
    fontFamily: ["JetBrains Mono", "monospace"]
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0px"
  mono-xs:
    fontFamily: ["JetBrains Mono", "monospace"]
    fontSize: "0.65rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0px"
rounded:
  none: "0px"
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "20px"
  pill: "30px"
  circle: "50%"
spacing:
  xxs: "4px"
  xs: "6px"
  sm: "8px"
  sm-md: "10px"
  md: "12px"
  base: "14px"
  lg: "16px"
  xl: "20px"
  xxl: "24px"
  section-sm: "30px"
  section: "40px"
  section-lg: "60px"
  header-offset: "80px"
components:
  site-header:
    backgroundColor: "{colors.header-bg}"
    borderBottom: "1px solid {colors.hairline}"
    padding: "{spacing.base} {spacing.xxl}"
    height: "auto"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.button-md}"
    borderRadius: "{rounded.md}"
    padding: "{spacing.sm-md} {spacing.xl}"
  button-outline:
    backgroundColor: "transparent"
    border: "1px solid {colors.hairline}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    borderRadius: "{rounded.md}"
    padding: "{spacing.sm-md} {spacing.xl}"
  brand-card:
    backgroundColor: "{colors.canvas-card}"
    border: "1px solid {colors.hairline}"
    borderRadius: "{rounded.lg}"
    padding: "{spacing.xxl}"
  search-input:
    backgroundColor: "{colors.canvas-card}"
    border: "1px solid {colors.hairline}"
    borderRadius: "{rounded.pill}"
    padding: "{spacing.lg} {spacing.xl} {spacing.lg} 52px"
    typography: "{typography.button-md}"
  curator-tag:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.ink-secondary}"
    border: "1px solid {colors.hairline}"
    borderRadius: "{rounded.xl}"
    padding: "{spacing.xs} {spacing.md}"
    typography: "{typography.caption}"
  hero-badge:
    backgroundColor: "rgba(217, 119, 87, 0.1)"
    textColor: "{colors.primary}"
    borderRadius: "{rounded.pill}"
    padding: "{spacing.xs} {spacing.base}"
    typography: "{typography.caption}"
  reader-drawer-container:
    backgroundColor: "{colors.canvas-card}"
    borderRadius: "{rounded.none}"
    width: "85%"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "#ffffff"
    borderRadius: "{rounded.pill}"
    padding: "{spacing.md} {spacing.xxl}"
    typography: "{typography.button-md}"
---

## Overview

The **Design MD Hub** visual design system is a warm, editorial layout tailored for developers and AI agents searching for visual brand assets. The design utilizes a humanist-meets-geometric style guideline, which balances high-readability serif typeface elements for primary body text with clean, modern sans-serif typography for headings. The shape grammar pairs structured border geometries with soft circular and pill accents. The layout density is moderate, prioritizing generous margins and clear typographic hierarchies to display catalog cards and detailed markdown documentation drawers without visual clutter.

### Key Characteristics
- **Dual-Theme Synchronization:** Seamlessly supports Light Mode (warm paper-tone default) and Dark Mode (soothing ink-tone) through CSS variable swapping.
- **Anthropic Brand Colors:** Grounded in earthy, premium tones with terracotta orange (`#d97757`) as the primary brand color and soft parchment/canvas bases.
- **Editorial Typography Pairing:** Combines Georgia-styled humanist serif body copy (`Lora`) with clean geometric headlines (`Poppins`) for an editorial and technical vibe.
- **Pill-shaped Accent Accents:** Utilizes highly rounded pill-shapes (`border-radius: 30px`) for functional interaction components like search boxes, hero badges, and toast notifications.
- **Tactile Grid Layout:** Organizes brand items into a structured grid using clean cards styled with light hairline borders and responsive width configurations.
- **Overlay Drawer Panel:** Employs an interactive, slide-out document reader that handles markdown rendering, dynamic sidebars, and visual color swatches.
- **Fluid Transition Systems:** Features micro-animations and smooth cubic-bezier transitions (`0.2s` and `0.3s`) for interactive buttons, theme toggles, and card elevations.
- **Accessible Touch Geometry:** Standardizes interactable elements to conform to touch target recommendations with a minimum size of 48px.

---

## Colors

The Design MD Hub color system utilizes custom CSS properties to adapt seamlessly between light and dark modes.

| Group | Color Name | CSS Variable | Light Hex/RGBA | Dark Hex/RGBA | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Brand & Accent** | Terracotta Orange | `--accent-orange` | `#d97757` | `#d97757` | Primary brand accent for buttons, badges, highlights, and hovers. |
| **Brand & Accent** | Accent Orange Hover | `--accent-orange-hover` | `#c86343` | `#c86343` | Hover color state for primary buttons and high-contrast highlights. |
| **Brand & Accent** | Slate Blue | `--accent-blue` | `#6a9bcc` | `#6a9bcc` | Secondary accent used for text link structures. |
| **Brand & Accent** | Sage Green | `--accent-green` | `#788c5d` | `#788c5d` | Tertiary accent utilized for success and metadata indicators. |
| **Surface** | Primary Canvas | `--bg-primary` | `#faf9f5` | `#141413` | The global background canvas representing the base paper or dark tone. |
| **Surface** | Secondary Canvas | `--bg-secondary` | `#ffffff` | `#1d1d1c` | Background for container elements like cards, footer sections, and panels. |
| **Surface** | Tertiary Canvas | `--bg-tertiary` | `#e8e6dc` | `#2e2e2c` | Subtle surface backgrounds for tags, tabs, and outline button hovers. |
| **Surface** | Code Block BG | `--code-bg` | `#f5f4ef` | `#282827` | Deep contrast container background for markdown pre/code blocks. |
| **Surface** | Sticky Header BG | `--header-bg` | `rgba(250,249,245,0.85)` | `rgba(20,20,19,0.85)` | Semi-transparent header base configured with backdrop blurs. |
| **Text** | High Contrast Ink | `--text-primary` | `#141413` | `#faf9f5` | Standard color for main headings, body copy, and high-priority text. |
| **Text** | Medium Contrast Ink | `--text-secondary` | `#575754` | `#dcdbd5` | Color for descriptions, secondary links, and sub-headings. |
| **Text** | Low Contrast Muted | `--text-muted` | `#8c8a82` | `#a1a097` | Applied to captions, counts, timestamps, and placeholder elements. |
| **Hairlines & Borders** | Standard Border | `--border-color` | `#e8e6dc` | `#2e2e2c` | Subtle layout divider color for cards, table cell lines, and borders. |
| **Hairlines & Borders** | Strong Border | `--border-hover` | `#b0aea5` | `#4a4a47` | Active border highlighting on card hover or input focus states. |

---

## Typography

### Font Family
- **Primary Headings:** `'Poppins', -apple-system, BlinkMacSystemFont, Arial, sans-serif`
- **Body Content:** `'Lora', Georgia, serif`
- **Monospace Code:** `'JetBrains Mono', monospace`

### Hierarchy Table

| Token | Size | Weight | Line Height | Letter Spacing | Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display-xl` | `3rem` (48px) | `800` | `1.2` | `-1.5px` | Main hero headings |
| `display-lg` | `2.2rem` (35px) | `700` | `1.2` | `-0.5px` | Document Markdown H1 headings |
| `display-md` | `1.6rem` (25.6px) | `700` | `1.2` | `-0.5px` | Markdown H2 headings, overlay header |
| `heading-sm` | `1.25rem` (20px) | `700` | `1.2` | `-0.5px` | Brand card titles, footer sections |
| `body-lg` | `1.15rem` (18.4px) | `400` | `1.6` | `0px` | Hero intro description |
| `body-md` | `1.05rem` (16.8px) | `400` | `1.6` | `0px` | Main markdown reading body |
| `body-sm` | `0.9rem` (14.4px) | `400` | `1.6` | `0px` | Card content, metadata descriptions |
| `button-md` | `0.95rem` (15.2px) | `600` | `1.2` | `0px` | Default buttons, search box input |
| `button-sm` | `0.85rem` (13.6px) | `600` | `1.2` | `0px` | Compact buttons, pill buttons |
| `nav-link` | `0.85rem` (13.6px) | `500` | `1.2` | `0px` | Sidebar navigation, drawer index |
| `caption` | `0.75rem` (12px) | `500` | `1.2` | `0.5px` | Category labels, badge texts |
| `mono-sm` | `0.9rem` (14.4px) | `400` | `1.4` | `0px` | Embedded syntax and inline code tags |
| `mono-xs` | `0.65rem` (10.4px) | `400` | `1.2` | `0px` | Swatch code labels, color values |

### Principles
1. **Compact Headings:** Headings must maintain a lower line height (`1.2`) to avoid gaps when lines wrap. High-display text elements (`display-xl` and `display-lg`) utilize negative letter-spacing for a tight, editorial look.
2. **Readability-First Body:** All paragraph text utilizes `Lora` (serif) with a tall line-height (`1.6`) and small spacing gaps to optimize reading of documentation specifications.
3. **Structured Captions:** Tiny category and badge labels utilize uppercase letters and subtle letter-spacing to distinguish metadata tags from paragraph text.

### Note on Font Substitutes
If Poppins or Lora are not locally available or fails to load from Google Fonts, the browser falls back gracefully to system defaults:
- **Headings fallback:** `-apple-system, BlinkMacSystemFont, Arial, sans-serif`
- **Body fallback:** `Georgia, serif`
- **Mono fallback:** `monospace`

---

## Layout

### Spacing System

| Token | Value | Applied Design Elements |
| :--- | :--- | :--- |
| `xxs` | `4px` | Swatch label padding, tiny indicator dots, inline chip corner rad |
| `xs` | `6px` | Badge and small button padding, sidebar navigation spacing |
| `sm` | `8px` | Layout margins, item gaps, button inline icons spacing |
| `sm-md`| `10px` | Table padding, dialog action button spacing |
| `md` | `12px` | Curator tag margins, small container padding |
| `base` | `14px` | Header container vertical padding, simple list gaps |
| `lg` | `16px` | Grid gap systems, card action separator borders |
| `xl` | `20px` | Search input inner padding, drawer header layouts |
| `xxl` | `24px` | Brand card inner padding, header container horizontal padding |
| `section-sm`| `30px`| Hero stat row offsets, drawer margin columns |
| `section`| `40px` | Main content container top margins, footer padding heights |
| `section-lg`| `60px` | Spacing separating major layout categories, footers |
| `header-offset`| `80px`| Header reservation spacing for absolute-fixed positions |

### Grid & Container
- **Main Content Container:** Max-width is locked at `1300px` with a horizontal padding of `24px` on desktop viewports.
- **Card Grid Layout:** Uses a CSS Grid auto-fill model: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` combined with a `24px` gap.
- **Drawer Panels:** Slide out from the right viewport boundary, claiming `85%` width on desktop systems (max-width `1200px`) and automatically snapping to `100%` width on tablet and mobile viewports.

### Whitespace Philosophy
The design system features a balanced breathing space (moderate density) layout. This ensures that technical markdown files inside the reader drawer are isolated, using comfortable paragraph margins (`margin-bottom: 16px`) and spacing blocks.

---

## Elevation & Depth

| Level | Treatment | Use |
| :--- | :--- | :--- |
| `flat` | No shadow, hairline border (`1px solid var(--border-color)`) | Sidebar panel divider, site footer base, code blocks |
| `raised-sm` | `0 1px 2px rgba(20, 20, 19, 0.05)` | Brand card base states, search inputs |
| `raised-md` | `0 4px 12px rgba(20, 20, 19, 0.06)` | Brand card hover states, navigation menu buttons |
| `overlay-lg`| `0 16px 32px rgba(20, 20, 19, 0.12)` | Slide-out overlay drawer containers, toast alerts |

### Decorative Depth Rules
- **Backdrop Blurs:** The fixed site header uses a `backdrop-filter: blur(12px)` overlay configuration to keep background content readable during scroll events.
- **Scrim Layer:** Interactive drawers use a dimming scrim (`rgba(20, 20, 19, 0.4)`) with `backdrop-filter: blur(4px)` to pull focus to the active document panel.

---

## Shapes

### Border Radius Scale

| Token | Value | Applied Elements |
| :--- | :--- | :--- |
| `none` | `0px` | Root viewport screens, drawer borders |
| `xs` | `4px` | Inline code chips, tiny badges, swatch dots |
| `sm` | `6px` | Compact buttons, sidebar links, small cards |
| `md` | `8px` | Default buttons, syntax blocks, outline badges |
| `lg` | `12px` | Catalog brand cards |
| `xl` | `20px` | Curator tag borders, statistical pills |
| `pill` | `30px` | Hero section badge, search wrapper borders, toast system |
| `circle` | `50%` | Theme toggles, color swatch dots |

### Photography Geometry
- Visual assets are restricted to circular dots for color representation.
- Layouts do not utilize photography assets; all branding elements are drawn programmatically using SVGs or icons clipped to `50%` circles.

---

## Components

### Site Header
- **Layout:** Fixed header absolute layout with `100%` width. Contains logo assembly on left and nav-links on right.
- **Styling:**
  ```css
  background-color: var(--header-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  ```
- **Height:** Computed base height of approximately `68px` (determined by `14px` vertical padding + text line heights).

### Buttons
- **Primary Button (`.btn-primary`):**
  - **Styles:** Background `#d97757` (terracotta), Text `#ffffff`, border-radius `8px`.
  - **Micro-interactions:** On hover, background shifts to `#c86343` with a small hover animation: `transform: translateY(-1px)` and box shadow `0 4px 12px rgba(217, 119, 87, 0.3)`. Active state triggers `translateY(0)`.
- **Outline Button (`.btn-outline`):**
  - **Styles:** Background `transparent`, border `1px solid var(--border-color)`, Text `var(--text-primary)`.
  - **Micro-interactions:** Hover triggers transition to `var(--bg-tertiary)` background and border matches `var(--text-primary)`.

### Search Input
- **Layout:** Centered wrapper holding search icon at left (`left: 20px`), text field, and clean button on the right.
- **Styling:**
  ```css
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 30px;
  padding: 16px 20px 16px 52px;
  box-shadow: var(--shadow-sm);
  ```
- **Focus:** Border transitions to `var(--accent-orange)` with outer shadow glow `0 0 0 4px rgba(217, 119, 87, 0.15)`.

### Brand Card
- **Layout:** Vertical flex container. Features color swatch dot row, category tag, title, size indicator, description block, and card button footer.
- **Styling:**
  ```css
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--card-shadow);
  ```
- **Hover:** Shifts up: `transform: translateY(-4px)` with shadow elevation matching `var(--card-shadow-hover)` and border highlighting `var(--border-hover)`.

### Reader Drawer
- **Layout:** Full screen wrapper containing scrim overlay and the sidebar/content drawer container. Splits body into a `260px` left navigation sidebar and a scrollable markdown panel on the right.
- **Transition:** Scrim opacity fades (`opacity: 1`), and the right-hand panel slides in from `right: -100%` to `right: 0` using a `0.4s` cubic-bezier transition.

### Toast Notification
- **Layout:** Fixed centered box at `bottom: 30px`, `left: 50%`.
- **Styling:** Background `#141413` (light mode) or `#faf9f5` (dark mode), border-radius `30px`, shadow matching `var(--shadow-lg)`.
- **Transition:** Slides up from off-screen using `translateY(100px)` to `translateY(0)` with `opacity: 1` on class addition (`.show`).

---

## Responsive Behavior

### Breakpoints Table

| Name | Breakpoint | Key Layout & Typographic Changes |
| :--- | :--- | :--- |
| **Desktop** | `> 900px` | Full grid view, side-by-side drawer panels, hover interactions active. |
| **Tablet** | `<= 900px` | Card grid reflows to fewer columns. Reader drawer expands to `100%` width. Sidebar navigation wraps to a stacked layout (max-height `200px`). Swatch sidebar panels are hidden. Hero title scales down to `2.2rem`. |
| **Mobile** | `<= 600px` | Curator badges hidden from header. Footers shift to a stacked central alignment. Grid displays one brand per row. |

### Touch Targets
- All interactive controls (pills, menu buttons, theme toggles, close buttons) conform to a minimum tap height and width of `38px` up to `48px`.
- Spacing gaps between tap targets match or exceed `8px` (`sm`) to prevent mis-clicks.

### Collapsing Strategy
- **Navigation:** The header curator tags collapse on smaller viewports.
- **Grid Layouts:** 3-4 column grid arrays collapse smoothly into 2 columns on tablet width, and finally collapse to a single card column on mobile widths.
- **Typography:** Display sizes adapt dynamically (`3rem` to `2.2rem` on tablet/mobile screens) to fit standard mobile viewports without overflowing borders.

---

## Do's and Don'ts

### Do
- **Do** map all colors to their respective CSS properties to ensure the theme toggles function correctly.
- **Do** preserve the strict typeface pairing (`Poppins` for headings, `Lora` for reading copy).
- **Do** use uppercase and letter-spacing for category and caption metadata tags.
- **Do** ensure interactive elements have a minimum target size of `38px` to `48px` to guarantee tap-friendliness.
- **Do** use CSS transitions for hover transitions, utilizing the standardized cubic-bezier timing properties.

### Don't
- **Don't** use static hardcoded hex colors (e.g. `#141413`) in page layout styles; always reference CSS variables.
- **Don't** wrap headers in body font families or apply serif typefaces to inputs or buttons.
- **Don't** remove the scrim backdrop layer from drawers, as it separates active documents from background elements.
- **Don't** crowd catalog cards without spacing gaps; always respect the grid margin systems.
- **Don't** add complex outline borders around primary buttons, which conflicts with their solid visual design.

---

## Iteration Guide & Known Gaps

### Known Gaps
- **Transition States:** Scroll indicator transitions during slide drawer opens need closer integration.
- **Markdown Table Responsiveness:** Highly wide tables inside markdown specs may cause overflow horizontally within the reader panel; overflow scroll wrappers are needed.
- **Search Query Highlighting:** Search text does not currently bold matching characters in brand cards.

### Rules for Iteration
1. **Adding Styling Variables:** Any new variables must be declared in `:root` and mirrored inside `body.dark-mode`.
2. **Component Upgrades:** When styling new dashboard cards, map values directly to the spacing tokens (`spacing.xxl` for padding, etc.) rather than introducing pixel values.
3. **Third-Party Imports:** Ensure any imported modules (e.g. Markdown parsers) inherit styles from the `index.css` guidelines rather than injecting system font templates.
