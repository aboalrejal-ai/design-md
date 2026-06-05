---
version: "alpha"
name: "example-domain-design-spec"
description: >
  A minimalist, content-first design spec inspired by the Example Domain.
  It relies on system fonts, high-contrast layouts, structural simplicity,
  and a neutral gray canvas with a single blue accent color.
colors:
  primary: "#334488"
  canvas: "#eeeeee"
  ink: "#000000"
  muted: "#666666"
  hairline: "#dddddd"
  border-strong: "#334488"
typography:
  display-xl:
    fontFamily: ["system-ui", "sans-serif"]
    fontSize: "1.5em"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  body-md:
    fontFamily: ["system-ui", "sans-serif"]
    fontSize: "1.0em"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  button-md:
    fontFamily: ["system-ui", "sans-serif"]
    fontSize: "1.0em"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "normal"
  nav-link:
    fontFamily: ["system-ui", "sans-serif"]
    fontSize: "1.0em"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  caption:
    fontFamily: ["system-ui", "sans-serif"]
    fontSize: "0.875em"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  none: "0px"
  xs: "0px"
  sm: "0px"
  md: "0px"
  lg: "0px"
  pill: "9999px"
spacing:
  xxs: "0px"
  xs: "0px"
  sm: "0px"
  md: "0px"
  base: "0px"
  lg: "0px"
  xl: "15vh"
  section: "15vh"
components:
  layout-container:
    backgroundColor: "transparent"
    width: "60vw"
    margin: "{spacing.xl} auto"
    opacity: 0.8
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    typography: "{typography.button-md}"
    borderRadius: "{rounded.none}"
    padding: "{spacing.base}"
    height: "auto"
  property-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderRadius: "{rounded.none}"
    padding: "{spacing.base}"
    height: "auto"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderRadius: "{rounded.none}"
    padding: "{spacing.base}"
    height: "auto"
  footer-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
    typography: "{typography.caption}"
    borderRadius: "{rounded.none}"
    padding: "{spacing.base}"
    height: "auto"
---

## Overview

The Example Domain design specification represents a minimalist, document-focused visual style. It values raw content readability, structure, and system defaults over complex layouts and custom typefaces. The spacing density is low-to-moderate, allowing content to center naturally within the viewport. The system employs a flat design paradigm with zero-rounding shape grammar, sharp edges, and clean, spacious borders.

### Key Characteristics
- **Content-First Simplicity:** Eliminates all non-essential visual elements to prioritize immediate text readability.
- **System Typography:** Leverages native system typefaces for rapid rendering and familiarity across all platforms.
- **Gray Canvas Foundation:** Uses a soft gray canvas background (`#eeeeee`) to establish a calm, structured reading layout.
- **Accent-Restricted Interaction:** Employs a single blue accent color (`#334488`) reserved exclusively for hyperlinks and interactive states.
- **Text Opacity Control:** Uses an opacity styling of `0.8` on the primary content container to soften text contrast against the gray background.
- **Fluid Viewport Containers:** Centers the main content area using dynamic viewport-relative widths (`60vw`) and vertical margins (`15vh`).
- **Sharp Shape Grammar:** Enforces zero border-rounding (`border-radius: 0px`) to maintain clean, boxy, and architectural element structures.
- **Elevation Elimination:** Avoids shadows, gradients, and overlapping layers, presenting all elements on a single flat surface.

---

## Colors

The color palette is restricted to a small set of functional tokens. There are no decorative gradients or dynamic color transitions.

### Brand & Accent
- `primary` (`#334488`): The main visual signifier for interactive elements. Applied to links in normal, visited, and active states.

### Surface
- `canvas` (`#eeeeee`): The page background color of the HTML body. It provides a warm, soft gray frame for the content.
- `transparent`: The main container card background, allowing the canvas to show through seamlessly.

### Hairlines & Borders
- `hairline` (`#dddddd`): Subtle divider borders (if needed for separation).
- `border-strong` (`#334488`): High-contrast borders for active form elements or inputs.

### Text
- `ink` (`#000000`): The base color for all text. Since it is housed inside an opacity-reduced container (`0.8`), it displays as a soft charcoal gray (`#333333` effective contrast).
- `muted` (`#666666`): Used for less prominent text elements, captions, and secondary metadata.

### Semantic
- `link` (`#334488`): Used for anchor links and buttons, signifying clickability.

---

## Typography

### Font Family
- **Primary:** `system-ui`
- **Fallback:** `sans-serif`

### Hierarchy Table

| Token | Size | Weight | Line Height | Letter Spacing | Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display-xl` | `1.5em` (24px) | 700 (Bold) | 1.2 | normal | Page titles and primary section headings (`h1`) |
| `body-md` | `1.0em` (16px) | 400 (Regular) | 1.5 | normal | Paragraph text and core content reading blocks |
| `button-md` | `1.0em` (16px) | 700 (Bold) | 1.5 | normal | Call to Action button text |
| `nav-link` | `1.0em` (16px) | 400 (Regular) | 1.5 | normal | Inline navigation links and anchor text |
| `caption` | `0.875em` (14px) | 400 (Regular) | 1.4 | normal | Subtext, footnotes, and meta descriptors |

### Principles
- **Native Render:** Never import external fonts. Rely entirely on local system typefaces (`system-ui`) to guarantee immediate rendering and performance.
- **Semantic Hierarchy:** Use standard bold (`700`) for headers and regular (`400`) weight for body text. Avoid intermediate weights.
- **Contrast Softening:** Apply `opacity: 0.8` to content wrappers to make absolute black (`#000000`) text appear softer and more pleasant to read on the gray canvas.

### Note on Font Substitutes
- If a browser does not fully support `system-ui`, the styling automatically cascades to the default sans-serif font family defined by the browser (such as Inter, Arial, or Segoe UI).

---

## Layout

### Spacing System
- `xl` / `section` (`15vh`): Controls the large vertical padding or margins above and below the main content area, keeping it vertically centered on the screen.
- Other spacing values default to standard browser margins on paragraph and heading tags (`1em` or `16px`).

### Grid & Container
- **Main Container:** The central content wrapper uses a fluid width of `60vw` (60% of viewport width).
- **Gutters:** Automatically calculated as `20vw` on both left and right sides due to the `margin: 15vh auto` styling.
- **Desktop Grid:** Single-column layout designed for linear reading.

### Whitespace Philosophy
- The design maximizes breathing room. The `15vh` top margin ensures that the page title is pushed down to the primary optical viewing zone.
- Vertical space is prioritized to separate text blocks clearly, using native HTML elements' margins without complex column grids.

---

## Elevation & Depth

All layout elements are flat and positioned directly on the canvas without visual elevation.

### Level Table

| Level | Treatment | Use |
| :--- | :--- | :--- |
| Flat | `background-color: transparent; box-shadow: none` | Main content container and cards |
| Base | `background-color: #eeeeee; box-shadow: none` | Page body canvas |

### Decorative Depth Rules
- Shadows (`box-shadow`), backdrop filters, and overlay gradients are strictly prohibited. The interface is flat and 2D.

---

## Shapes

The shape grammar is characterized by sharp edges and zero curvature.

### Border-Radius Table

| Level | Value | Use |
| :--- | :--- | :--- |
| `none` | `0px` | All container blocks, buttons, cards, and input fields |
| `pill` | `9999px` | Reserved for fully rounded utility elements |

### Photography Geometry
- Any imagery or placeholder content must use strictly rectangular borders with `0px` border-radius.

---

## Components

### Layout Container (Main Box)
- **Background:** `transparent`
- **Width:** `60vw`
- **Margin:** `15vh auto`
- **Opacity:** `0.8`
- **Typography:** Inherits `{typography.body-md}`

### H1 Title Heading
- **Typography:** `{typography.display-xl}`
- **Text Color:** `{colors.ink}` (with wrapper opacity)
- **Margin Bottom:** `1em` (native layout margin)

### Anchor Link
- **Typography:** `{typography.nav-link}`
- **Text Color:** `{colors.primary}`
- **Text Decoration:** Underline (active on hover and visited)

### Button Primary (Derived)
- **Background Color:** `{colors.primary}`
- **Text Color:** `{colors.canvas}`
- **Typography:** `{typography.button-md}`
- **Border Radius:** `{rounded.none}`
- **Padding:** `12px 24px`
- **Height:** `auto`

### Property Card (Derived)
- **Background Color:** `{colors.canvas}`
- **Text Color:** `{colors.ink}`
- **Border Radius:** `{rounded.none}`
- **Padding:** `24px`
- **Height:** `auto`

---

## Responsive Behavior

### Breakpoints Table

| Name | Width | Key Changes |
| :--- | :--- | :--- |
| Desktop | `> 768px` | Central container occupies `60vw` with `15vh` vertical spacing. |
| Mobile | `<= 768px` | Central container width expands to `85vw` or `90vw` for better reading, and vertical margins reduce to `5vh`. |

### Touch Targets
- Interactive elements (such as links and buttons) must occupy a minimum visual or hit-target dimension of `48px` to ensure mobile accessibility.

### Collapsing Strategy
- Content blocks stack vertically in a single column.
- Text sizes do not scale dynamically; they rely on fixed `em`/`rem` values.

---

## Do's and Don'ts

### Do
- Use `#eeeeee` for the global page background.
- Apply `opacity: 0.8` to primary content containers to maintain a soft contrast ratio.
- Keep links styled as `#334488`.
- Ensure all borders and corners are perfectly sharp (`0px` radius).

### Don't
- Do not introduce box-shadows, gradients, or depth decorations.
- Do not import external custom fonts.
- Do not use more than one column for layout containers.
- Do not add complex navigation header bars or sidebars.

---

## Iteration Guide & Known Gaps

### Known Gaps
- Interactive state styling (such as hover and focus states for inputs and buttons) is currently undefined.
- Dark mode styling tokens are missing.
- Form fields and validation messages are not detailed in the original source.

### Iteration Rules
- When implementing new features (e.g., forms, lists, or headers), keep them flat, gray-toned, and sharp-cornered.
- Ensure all component references in code strictly follow the mapped curly-brace tokens specified in this document.
