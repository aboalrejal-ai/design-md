---
version: alpha
name: github-design-analysis
description: GitHub's design system, Primer, defines a clean, high-density, utility-driven interface. It prioritizes readability, developer efficiency, and semantic layout patterns with minimal visual decoration.
colors:
  primary: "#0969da"
  primary-hover: "#1c8139"
  canvas: "#ffffff"
  canvas-muted: "#f6f8fa"
  ink: "#1f2328"
  muted: "#59636e"
  hairline: "#d1d9e0"
  border-strong: "#818b98"
  success: "#1f883d"
  danger: "#cf222e"
  attention: "#9a6700"
  done: "#8250df"
typography:
  display-xl:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "48px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  display-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0em"
  title-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0em"
  body-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  body-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  button-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.42
    letterSpacing: "0em"
  nav-link:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: "0em"
  code:
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
rounded:
  none: "0px"
  xs: "2px"
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  pill: "9999px"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  base: "20px"
  lg: "24px"
  xl: "32px"
  xxl: "40px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.success}"
    textColor: "{colors.canvas}"
    typography: "{typography.button-md}"
    borderRadius: "{rounded.md}"
    padding: "{spacing.xs} {spacing.md}"
    height: "32px"
  button-secondary:
    backgroundColor: "{colors.canvas-muted}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    borderRadius: "{rounded.md}"
    padding: "{spacing.xs} {spacing.md}"
    height: "32px"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    borderRadius: "{rounded.md}"
    padding: "{spacing.xxs} {spacing.xs}"
    height: "32px"
  property-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderRadius: "{rounded.lg}"
    padding: "{spacing.md}"
    border: "1px solid {colors.hairline}"
  top-navigation:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas-muted}"
    padding: "{spacing.md} {spacing.lg}"
    height: "64px"
---

## Overview

GitHub's Primer design system features a clean, highly structured, and information-dense aesthetic tailored specifically for developer workflows. The interface is optimized to convey deep content and metadata with minimal visual noise.

### Key Characteristics
- **Semantic, Theme-First Color System**: Color variables adapt seamlessly to dark/light environments while supporting accessibility requirements.
- **High-Density Typography**: Clean system fonts utilizing responsive scales and unitless line heights aligned to a 4px vertical grid.
- **Structured Spacing (Base-8)**: Systematic layout, gap, and margin sizes utilizing multiples of 8px (with 4px for fine adjustments).
- **Minimal Visual Ornamentation**: Avoids heavy drop shadows and complex gradients, opting for flat surfaces separated by subtle 1px border lines.
- **State-Driven Styling**: Immediate, clear interactive feedback (hover, focus, active, disabled) across all interactive components.
- **Responsive Adaptability**: Layout structures shift gracefully from multi-column grids to single column interfaces.
- **Accessibility-Focused Semantics**: Text contrasts, focus outlines, and input touch targets are designed for ease of use by all developers.
- **Code-Centric Elements**: Monospaced font blocks integrated smoothly alongside system text for code representation.

---

## Colors

### Brand & Accent
- **Primary (Accent)**: `#0969da` - Used for links, primary interactions, active tabs, and highlighted borders.

### Surface
- **Canvas**: `#ffffff` - Standard page background for major layout content.
- **Canvas Muted**: `#f6f8fa` - Secondary background for table headers, sidebars, and inactive controls.
- **Overlay**: `#ffffff` - Used for dropdown menus, modals, and hover previews.

### Hairlines & Borders
- **Hairline**: `#d1d9e0` - Standard boundary line for dividing layout sections, tables, cards, and input fields.
- **Border Strong**: `#818b98` - Emphasized boundaries or outline on focus/hover.

### Text
- **Ink (Default)**: `#1f2328` - Primary body and heading text for maximum contrast.
- **Muted**: `#59636e` - Gray secondary text for descriptions, helper text, and secondary labels.

### Semantic
- **Success**: `#1f883d` - Success messages, green badges, open pull request status, and primary action buttons.
- **Danger**: `#cf222e` - Error states, destructive buttons, and closed issue/PR indicators.
- **Attention**: `#9a6700` - Warnings, pending/draft status indicators, and alerts.
- **Done**: `#8250df` - Completed actions, merged pull requests, and done status indicators.

---

## Typography

### Font Family
- **Primary**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif`
- **Monospace**: `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace`

### Hierarchy Table
| Token | Size | Weight | Line Height | Letter Spacing | Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display-xl` | 48px | 600 | 1.25 | -0.02em | Hero headers, major marketing pages. |
| `display-lg` | 40px | 600 | 1.25 | -0.02em | Section titles on landing pages. |
| `title-lg` | 32px | 600 | 1.25 | -0.01em | Repository headers, main page titles. |
| `title-md` | 24px | 600 | 1.25 | 0em | Subsection titles, card headers. |
| `title-sm` | 20px | 600 | 1.25 | 0em | In-page widget titles, sidebar categories. |
| `body-lg` | 16px | 400 | 1.5 | 0em | Blog posts, marketing copy body text. |
| `body-md` | 14px | 400 | 1.5 | 0em | Standard system font for files, tables, comments. |
| `button-md` | 14px | 600 | 1.42 | 0em | Interactive labels on primary/secondary buttons. |
| `nav-link` | 14px | 400 | 1.5 | 0em | Top navigation elements, tab links. |
| `caption` | 12px | 400 | 1.33 | 0em | Subtitles, metadata, timestamps. |
| `code` | 12px | 400 | 1.6 | 0em | Inline code snippets, code block viewports. |

### Principles
- Always pair specific line-heights with their corresponding font-size tokens to prevent vertical alignment breakages.
- Negative letter-spacing is applied exclusively to large display sizes (`display-xl` and `display-lg`) to preserve compactness.
- Normal text should remain readable and zoomable, avoiding scaling below `12px` wherever possible.

### Note on Font Substitutes
- If system font stacks are not available, the Google Font **Inter** should be used as the primary fallback, and **JetBrains Mono** or **Roboto Mono** as the monospace fallback.

---

## Layout

### Spacing System
- `xxs` (4px) - Mini gaps, inline element offsets, tiny padding adjustments.
- `xs` (8px) - Gap between buttons, compact padding, standard margins for small badges.
- `sm` (12px) - Padding within dropdown items, label offsets.
- `md` (16px) - Default component padding, layout gutter spacer.
- `base` (20px) - Medium gap spacing, container paddings.
- `lg` (24px) - Main layout spacing, margins between major UI modules.
- `xl` (32px) - Generous vertical spacing between main layout rows.
- `xxl` (40px) - Structural margins between columns and large section containers.
- `section` (64px) - Large spacing for marketing headers and landing page hero sections.

### Grid & Container
- **Desktop Max-Width**: `1280px` centered with `24px` gutters.
- **Mobile Container**: Full-width with `16px` padding on margins.
- **Column Patterns**: 12-column layout for dashboard structures; typical repository layouts feature a two-column sidebar template (75% content area, 25% sidebar).

### Whitespace Philosophy
- High information density; whitespace is controlled tightly using the 8px grid to present raw data and metadata clearly without wasting screen space.

---

## Elevation & Depth

| Level | Treatment | Use |
| :--- | :--- | :--- |
| `Level 0` | Flat, no shadow, border `1px solid #d1d9e0` | Default state for cards, tables, and page layout. |
| `Level 1` | `box-shadow: 0 1px 0 rgba(31, 35, 40, 0.04)` | Standard button resting state, small floating items. |
| `Level 2` | `box-shadow: 0 3px 6px rgba(140, 149, 159, 0.15)` | Dropdowns, popovers, small tooltips. |
| `Level 3` | `box-shadow: 0 8px 24px rgba(140, 149, 159, 0.2)` | Modals, dialog boxes, and floating command menus. |

- **Decorative Rules**: High contrast borders are preferred over soft shadows. Backdrop blur (`backdrop-filter: blur(8px)`) with semi-transparent overlay `#c8d1da66` is used for modals.

---

## Shapes

### Border-Radius Scale
| Token | Radius Value | Component Types |
| :--- | :--- | :--- |
| `none` | 0px | Straight edges, full-width header items. |
| `xs` | 2px | Tiny tags, inline code snippets. |
| `sm` | 4px | Small interactive buttons, input borders. |
| `md` | 6px | Standard button, dropdown menu wrappers, search inputs. |
| `lg` | 8px | Repository cards, container wrappers. |
| `xl` | 12px | Modals, floating banners. |
| `pill` | 9999px | Circle avatars, notification badges, pull request status pills. |

### Photography Geometry
- Images and avatars must be masked as perfect circles (`border-radius: 50%`) for user avatars, and slightly rounded squares (`6px`) for organizations, repositories, and media previews.

---

## Components

### Buttons
- **Primary Button**: Background color `{colors.success}`, text color `{colors.canvas}`, height `32px`. Hover state changes background to `{colors.primary-hover}`.
- **Secondary Button**: Background color `{colors.canvas-muted}`, border `1px solid {colors.hairline}`, text color `{colors.ink}`, height `32px`.
- **Danger Button**: Background color `{colors.canvas-muted}`, border `1px solid {colors.hairline}`, text color `{colors.danger}`. Hover state has background `{colors.danger}` and text color `{colors.canvas}`.

### Input Fields
- Background color `{colors.canvas}`, border `1px solid {colors.hairline}`, border-radius `{rounded.md}`, text color `{colors.ink}`, padding `{spacing.xxs} {spacing.xs}`, height `32px`. Focus state applies border color `{colors.primary}` and standard blue shadow ring.

### Cards
- Background color `{colors.canvas}`, border `1px solid {colors.hairline}`, border-radius `{rounded.lg}`, padding `{spacing.md}`.

### Top Navigation
- Background color `#24292f` or `{colors.ink}`, text color `{colors.canvas-muted}`, padding `{spacing.md} {spacing.lg}`, height `64px`. Includes logo link and navigation item links using `{typography.nav-link}`.

### Footers
- Background color `{colors.canvas}`, border-top `1px solid {colors.hairline}`, text color `{colors.muted}`, typography `{typography.caption}`, padding `{spacing.xl} {spacing.md}`.

---

## Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
| :--- | :--- | :--- |
| `sm` | 544px | Fluid single-column view, navigation collapses to dropdown/hamburger menu. |
| `md` | 768px | Standard tablet layout, cards adapt to 2-column grid. |
| `lg` | 1012px | Repository view shifts to 2-column sidebar template. |
| `xl` | 1280px | Max container width constraint applies, full sidebar rendering. |

### Touch Targets
- Interactive components on viewports smaller than `544px` scale to a minimum touch target height of `44px`.

### Collapsing Strategy
- Header links are collapsed into a toggleable panel. Grids and repository detail tables collapse into simple stacked lists. Font sizes scale down using responsive type scales (e.g., `f1` to `f2`).

---

## Do's and Don'ts

### Do
- **Do** use semantic token references like `{colors.primary}` instead of raw hex codes.
- **Do** align layout spacing to multiples of 8px to ensure mathematical harmony.
- **Do** use system font stacks to ensure native performance and instant page load speeds.
- **Do** preserve the 4px vertical type rhythm by using unitless line-heights.
- **Do** use `Level 0` flat borders for core content wrappers and tables rather than decorative card drop-shadows.

### Don't
- **Don't** mix multiple custom font families that degrade page loading performance.
- **Don't** use arbitrary padding or margins (like `15px` or `7px`) that violate the base-8 spacer system.
- **Don't** use drop-shadows on flat page content unless it is an overlay, dialog, or floating menu.
- **Don't** use colorful borders unless they denote a semantic status (success, warning, error, info).
- **Don't** allow critical interactive text touch targets to drop below 44px on mobile viewports.

---

## Iteration Guide / Known Gaps

- **Dark Mode Support**: This specification details the light mode tokens. A separate dark mode token mapping should override surface and ink variables during iteration.
- **Interactive Component States**: Detailed transition speed guidelines (typically `transition: background-color 0.2s ease`) are not fully mapped.
- **High-Contrast Themes**: Focus outlines for keyboards are not fully defined in this draft and should be added in iteration-2.
