# Design System: Design MD Hub (Anthropic Brand Theme)

This document specifies the exact design system, visual style, colors, typography, layout guidelines, and component patterns of the **Design MD Hub** web application. 

---

## 1. Visual Theme & Atmosphere

**Overall mood:** Balanced, professional, and literary. It provides a scholarly, curated feel in light mode (reminiscent of Anthropic's editorial style) and a high-end technical appearance in dark mode.

**Density:** Moderate to high. Content elements (specifically the card grid) are compactly arranged to facilitate easy exploration and search, balanced by generous margins and padding in the header and hero sections to avoid clutter.

**Shape language:** Soft and approachable. Corner treatments range from comfortable rounded shapes (e.g., card-radius at `12px`, button-radius at `8px` or `6px`) to circular elements (theme toggler, curator pill, and search bar rounded at `30px` or `50%`).

**Transitions & Animations:** Dynamic and interactive. Smooth, fluid transition values are used to handle theme toggles and hover states (`cubic-bezier(0.16, 1, 0.3, 1)`). Hover states elevate buttons and cards, rotate and scale the logo icon, and display tooltip information. Pulsing dots and fade-in states are used on page entry to provide active visual feedback.

---

## 2. Color Palette & Roles

The system is built on a primary warm neutral foundation with rich, contrasting accents. Colors dynamically switch between modes using CSS custom properties.

### 2.1 Core Palette Tokens
- **Anthropic Dark / Charcoal** (`#141413`): The base for all primary text, dark surfaces, and toasts.
- **Anthropic Light / Warm Cream** (`#faf9f5`): The base background color for light mode.
- **Anthropic Light Gray / Off-White** (`#e8e6dc`): Used for boundaries, borders, and inactive pills.
- **Anthropic Mid Gray / Sage Neutral** (`#b0aea5`): Used for divider lines and hover borders.
- **Accent Orange / Terracotta** (`#d97757`): Primary CTA color, focus states, and key highlights.
- **Accent Orange Hover** (`#c86343`): Interactive state color for CTAs.
- **Accent Blue / Steel Blue** (`#6a9bcc`): Default link colors and complementary details.
- **Accent Green / Olive** (`#788c5d`): Used for tertiary accent items.

### 2.2 Semantic Roles (Light Mode)
- **Primary Background** (`--bg-primary`): `#faf9f5` (Warm Cream)
- **Secondary Background** (`--bg-secondary`): `#ffffff` (Pure White, used for cards)
- **Tertiary Background** (`--bg-tertiary`): `#e8e6dc` (Off-white surfaces and pills)
- **Primary Text** (`--text-primary`): `#141413` (Charcoal)
- **Secondary Text** (`--text-secondary`): `#575754` (Soft gray-brown)
- **Muted Text** (`--text-muted`): `#8c8a82` (Warm muted gray)
- **Border Color** (`--border-color`): `#e8e6dc` (Delicate divider)
- **Border Hover Color** (`--border-hover`): `#b0aea5` (Mid-gray divider)
- **Header Background** (`--header-bg`): `rgba(250, 249, 245, 0.85)` (Semi-transparent cream blur)
- **Code Background** (`--code-bg`): `#f5f4ef` (Very soft warm gray)

### 2.3 Semantic Roles (Dark Mode)
- **Primary Background** (`--bg-primary`): `#141413` (Charcoal)
- **Secondary Background** (`--bg-secondary`): `#1d1d1c` (Dark-charcoal, used for cards)
- **Tertiary Background** (`--bg-tertiary`): `#2e2e2c` (Slate dark gray)
- **Primary Text** (`--text-primary`): `#faf9f5` (Warm Cream)
- **Secondary Text** (`--text-secondary`): `#dcdbd5` (Soft warm white)
- **Muted Text** (`--text-muted`): `#a1a097` (Sage gray)
- **Border Color** (`--border-color`): `#2e2e2c` (Dark divider)
- **Border Hover Color** (`--border-hover`): `#4a4a47` (Mid-dark divider)
- **Header Background** (`--header-bg`): `rgba(20, 20, 19, 0.85)` (Semi-transparent charcoal blur)
- **Code Background** (`--code-bg`): `#282827` (Very dark charcoal tint)

---

## 3. Typography Rules

The typography is carefully curated to balance editorial hierarchy with modern tech utility.

### 3.1 Typefaces
- **Primary Font (Body/Descriptions)**: `Lora`, Georgia, serif. Standard body text features a rich, literary feel.
- **Secondary Font (UI Elements/Headings)**: `Poppins`, sans-serif. Used for headers, menus, button text, search inputs, and pills.
- **Monospace Font (Technical Data)**: `JetBrains Mono`, monospace. Employed for code blocks, inline code snippets, hex colors, and file sizes.

### 3.2 Typography Scale & Weights

| Role | Font Family | Size | Weight | Letter Spacing | Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | Poppins | `3rem` (`48px`) | `800` | `-1.5px` | `1.2` |
| **Markdown H1** | Poppins | `2.2rem` (`35px`) | `700` | `-0.5px` | `1.2` |
| **Markdown H2** | Poppins | `1.6rem` (`25px`) | `700` | `normal` | `1.2` |
| **Card / Title H3** | Poppins | `1.35rem` (`21px`) | `700` | `-0.5px` | `1.2` |
| **Markdown H3** | Poppins | `1.25rem` (`20px`) | `700` | `normal` | `1.2` |
| **Hero Description** | Lora | `1.15rem` (`18px`) | `400` | `normal` | `1.6` |
| **Markdown Body** | Lora | `1.05rem` (`17px`) | `400` | `normal` | `1.6` |
| **Body / Description**| Lora | `0.9rem` (`14px`) | `400` | `normal` | `1.6` |
| **Buttons / Navigation**| Poppins | `0.95rem` (`15px`) | `600` | `normal` | `1.2` |
| **Small / Badges** | Poppins | `0.75rem` (`12px`) | `500` / `600` | `0.5px` | `1.2` |
| **Technical Stats** | JetBrains Mono| `0.65rem` (`10px`) | `400` | `normal` | `1.2` |

---

## 4. Component Stylings

### 4.1 Navigation Header (`.site-header`)
- **Structure**: Fixed top bar with a flexible row layout.
- **Visuals**: Border bottom (`1px solid var(--border-color)`), blurred background (`backdrop-filter: blur(12px)`).
- **Interactive Elements**:
  - Logo scales and rotates slightly on hover.
  - Curator info tag (`.curator-tag`): Curved pill shape, background `var(--bg-tertiary)`.
  - Star on GitHub button: Outline styling, rounded borders.
  - Theme toggler (`.theme-btn`): `50%` round circle border, changes icon (Sun/Moon) dynamically.

### 4.2 Buttons (`.btn`)
- **Primary CTA**:
  - Background: `var(--accent-orange)` (`#d97757`).
  - Text: `#ffffff` (White).
  - Hover: Background changes to `#c86343`, translates up `1px`, and adds orange glow shadow (`0 4px 12px rgba(217, 119, 87, 0.3)`).
- **Secondary / Outline**:
  - Background: `transparent`.
  - Border: `1px solid var(--border-color)`.
  - Hover: Border matches text, background becomes `var(--bg-tertiary)`.
- **Card-Specific Action Buttons**:
  - Main action button (`.btn-card-action`): Starts as `var(--bg-tertiary)` but turns orange on card hover, highlighting the call to view the brand details.
  - Secondary buttons (`.btn-card-secondary`): Small outline style, layout fits two side-by-side in the card footer.

### 4.3 Brand Cards (`.brand-card`)
- **Structure**: Rounded box layout (`border-radius: 12px`), bordered default state (`1px solid var(--border-color)`), padded content (`24px`).
- **Interactive Elevation**: Hovering lifts the card slightly (`transform: translateY(-4px)`), deepens shadow from `var(--shadow-sm)` to `var(--shadow-md)`, and darkens borders.
- **Top Swatches Grid**: A row of color dot buttons displaying the brand's primary colors. Hovering a dot scales it and shows a tooltip containing the hex color string. Clicking the dot copies it.

### 4.4 Search Input & Search Box
- **Search Wrapper**: Integrates search icon, text input, and clear button overlay.
- **Input Field**: Rounded pill layout (`border-radius: 30px`), shadow-sm, Poppins typography.
- **Focus**: Border turns terracotta-orange (`#d97757`) with a 4px soft ring glow (`rgba(217, 119, 87, 0.15)`).

### 4.5 Reader Drawer Overlay (`.reader-drawer`)
- **Backdrop Overlay**: Semi-transparent dark overlay (`rgba(20, 20, 19, 0.4)`) with backdrop blur (`4px`).
- **Drawer Pane**: Width `85%` (max-width `1200px`), slides in from right (`right: 0`), using smooth ease-out animation.
- **Drawer Sidebar**: Left-aligned, width `260px`, containing:
  - Document index index/headings (`.sidebar-nav`) highlighting section anchors.
  - Swatch collection (`.palette-swatch-list`) displaying color chips that copy on click.
- **Drawer Content Panel**: Renders parsed Markdown with standard typography rules, orange-bordered blockquotes (`blockquote`), code boxes (`pre`), and inline hex-color chips.

---

## 5. Layout & Spacing Principles

- **Fluid Grid Containment**: Standard content sections are bound to a maximum width of `1300px` with horizontal padding of `24px`.
- **Grid Layouts**: Brand catalog features a flexible grid (`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`).
- **Spacing Scale**:
  - Section paddings and margins: `40px` to `80px`.
  - Internal card spacing: `16px` to `24px`.
  - Micro-spacing (items/text blocks): `6px` to `14px`.
- **Border Radii Scale**:
  - Small Elements (code chips, inline swatches, small badges): `4px`
  - Small Buttons/Pills: `6px`
  - Standard Buttons: `8px`
  - Cards / Drawer Containers: `12px`
  - Rounded Badges / Search Inputs / Toast / curator tag: `20px` to `30px`
  - Theme Toggle Button / Swatches Dots: `50%` (Circular)

---

## 6. Depth & Elevation

| Level | Styling Treatment | Use Case |
| :--- | :--- | :--- |
| **Level 0 (Flat)** | Background primary, border-color | Page body, default inline structures |
| **Level 1 (Surface)** | Background secondary, `--shadow-sm` | Default brand cards, inactive buttons |
| **Level 2 (Active/Lifted)** | Background secondary, `--shadow-md`, transform | Hovered brand cards, active search fields |
| **Level 3 (Drawer / Modal)**| Background secondary, `--shadow-lg`, backdrop-filter blur | Slide-out viewer overlay panel |
| **Level 4 (Overlay)** | Background dark (or cream in dark mode), `--shadow-lg` | Clipboard/Theme Toast notifications |

---

## 7. Do's and Don'ts

### Do:
- Match `Lora` for body/descriptions and `Poppins` for headings/structural labels.
- Use CSS variables (`var(--bg-primary)`, etc.) to respect theme switching.
- Utilize transition classes (`--transition-fast`, `--transition-normal`) for all interactive animations.
- Display `JetBrains Mono` for all sizes, color hex codes, and technical values.
- Retain subtle border definitions (`#e8e6dc`) to separate sections instead of using excessive dark shadows.

### Don't:
- Don't use pure black (`#000000`) for text; use charcoal (`#141413`) in light mode and off-white (`#faf9f5`) in dark mode.
- Don't apply sharp corner radii on buttons and cards; preserve the soft organic shapes of the visual system.
- Don't add arbitrary spacing or sizes outside of the defined typography grid and spacing system.
- Don't bypass the theme toggling properties when introducing custom components.

---

## 8. Responsive Behavior

- **Mobile (<600px)**:
  - Header curator tag collapses.
  - Page footer elements shift to centered vertical column stack.
  - Main header adjusts alignment.
- **Tablet / Mid-Screen (<900px)**:
  - Hero heading scales down to `2.2rem` (`35px`) to prevent overflow.
  - Drawer pane occupies `100%` viewport width.
  - Drawer content layouts stack: the `260px` sidebar becomes a top-aligned, scrollable index navigation menu (max-height `200px`), and the extracted color swatch list is hidden.

---

## 9. Agent Prompt Guide

### 9.1 Quick Color Reference
- Primary Accent: Terracotta (`#d97757`)
- Primary Text: Charcoal (`#141413`) in light mode, Warm Cream (`#faf9f5`) in dark mode
- Page background: Cream (`#faf9f5`) in light mode, Charcoal (`#141413`) in dark mode
- Card Background: White (`#ffffff`) in light mode, Dark Gray (`#1d1d1c`) in dark mode
- Border color: Off-white (`#e8e6dc`) in light mode, Charcoal-gray (`#2e2e2c`) in dark mode

### 9.2 Component Prompts

- **Search Bar**:
  "Build a pill-shaped search input with `border-radius: 30px` and padding `16px 20px 16px 52px`. Include a magnifying glass icon on the left. On focus, transition border color to terracotta `#d97757` and add a soft shadow ring `0 0 0 4px rgba(217, 119, 87, 0.15)`."

- **Brand Catalog Card**:
  "Build a card on white background with `border-radius: 12px` and border `1px solid #e8e6dc`. On hover, translate the card up by 4px, darken border to `#b0aea5`, and change shadow to a soft medium glow. Inside the card, display an uppercase categories label in Poppins font, a bold title, and a small, gray size-badge. The card footer should contain a full-width CTA button that turns terracotta `#d97757` on card hover."

- **Toast Popup**:
  "Create a fixed toast alert centered at the bottom. Use a charcoal background (`#141413`), white text, and `border-radius: 30px`. The toast should animate on display by sliding up (`translateY(0)` from `translateY(100px)`) and fading in."
