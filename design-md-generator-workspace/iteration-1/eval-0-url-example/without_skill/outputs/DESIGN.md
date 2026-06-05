# Design System Specification: Example Domain

This document describes the visual identity and structural layout of the standard **Example Domain** landing page (https://example.com).

## 1. Brand Identity & Overview
* **Purpose**: A minimal, lightweight placeholder page used as a generic template in documentation and software examples.
* **Aesthetic**: Minimalist, clean, utility-focused, browser-native styling.

---

## 2. Typography
The typography relies on browser-native sans-serif fonts to ensure instantaneous loading and consistent rendering across systems.

| Element | Font Family | Size | Line Height / Weight / Styles |
| :--- | :--- | :--- | :--- |
| **Body / Global** | `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` | Default browser size (typically `16px`) | Normal, modern sans-serif |
| **Heading 1 (`<h1>`)** | `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` | `1.5em` (approx. `24px`) | Bold, default heading weight |
| **Links (`<a>`)** | `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` | Inherits parent size | Underlined by default (browser behavior) |

---

## 3. Color Palette
The color scheme is high-contrast and uses standard web-safe color tokens.

| Name / Usage | Color Token | Hex Code | Visual Sample |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | Warm Light Gray | `#EEEEEE` | `rgb(238, 238, 238)` |
| **Primary Text / Heading** | Default Browser Text Color (Black) with `0.8` Opacity | `#000000` @ 80% opacity | `rgba(0, 0, 0, 0.8)` |
| **Links (Normal & Visited)**| Deep Blue | `#334488` | `rgb(51, 68, 136)` |

*Note: The container `div` wrapper has `opacity: 0.8` applied, softening the text and links from pure black/blue to a slightly muted tone.*

---

## 4. Layout & Geometry
The page features a centered, single-column card-like layout that scales dynamically with the viewport size.

* **Main Container**:
  * **Width**: `60vw` (occupies 60% of the viewport width).
  * **Margins**: `15vh auto` (vertical margin of 15% viewport height, horizontally centered).
  * **Alignment**: Text and elements align left within the container.
  * **Opacity**: `0.8` (applied globally to the content wrapper).

---

## 5. Responsive Design & Viewport
* **Meta Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1">`
* **Scale-to-Width**: The layout is fluid because it uses viewport-relative units (`vw` and `vh`).
* **Mobile Adaptability**: On mobile screens, the `60vw` width ensures readable text columns without horizontal overflow, wrapping naturally.

---

## 6. Accessibility & Semantic Structure
* **HTML Lang**: Set to `"en"` for screen readers.
* **Document Hierarchy**: Uses semantic HTML elements:
  * `<h1>` for the primary title.
  * `<p>` for paragraphs.
  * `<a>` for hyperlink navigation.
* **Color Contrast**: 
  * Background (`#eee`) to Text (`#000` with 80% opacity, resulting in `#333` appearance) meets Web Content Accessibility Guidelines (WCAG) AAA contrast requirements for text.
  * Background (`#eee`) to Link (`#348` with 80% opacity, resulting in `#5c649c` appearance) meets standard accessibility contrast ratios.
