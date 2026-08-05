#!/usr/bin/env python3
import json
import os
import sys

def create_tokens_css(data, output_dir):
    css_content = "/* Design System Tokens */\n:root {\n"
    
    # Process Colors
    colors = data.get("colors", {})
    if "common_hex_rgb" in colors:
        for i, color in enumerate(colors["common_hex_rgb"]):
            css_content += f"  --color-primary-{i}: {color};\n"
    if "variables" in colors:
        for k, v in colors["variables"].items():
            if not k.startswith('--'):
                k = f"--{k}"
            css_content += f"  {k}: {v};\n"

    # Process Typography
    typography = data.get("typography", {})
    if "families" in typography:
        for i, font in enumerate(typography["families"]):
            css_content += f"  --font-family-{i}: {font};\n"
    if "sizes" in typography:
        for i, size in enumerate(typography["sizes"]):
            css_content += f"  --font-size-{i}: {size};\n"
            
    # Process Spacing
    spacing = data.get("spacing", [])
    for i, space in enumerate(spacing):
        css_content += f"  --spacing-{i}: {space};\n"

    # Process Rounded
    rounded = data.get("rounded", [])
    for i, rad in enumerate(rounded):
        css_content += f"  --border-radius-{i}: {rad};\n"

    css_content += "}\n"

    with open(os.path.join(output_dir, "tokens.css"), "w", encoding="utf-8") as f:
        f.write(css_content)

def create_components_html(data, output_dir):
    html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n"
    html += "  <meta charset=\"UTF-8\">\n"
    html += "  <link rel=\"stylesheet\" href=\"tokens.css\">\n"
    html += "  <style>\n"
    html += "    body { font-family: var(--font-family-0, sans-serif); }\n"
    html += "    .btn { background-color: var(--color-primary-0, #000); color: #fff; padding: var(--spacing-0, 8px) var(--spacing-1, 16px); border-radius: var(--border-radius-0, 4px); }\n"
    html += "    .card { background-color: #fff; border: 1px solid #ddd; padding: var(--spacing-1, 16px); border-radius: var(--border-radius-1, 8px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }\n"
    html += "  </style>\n</head>\n<body>\n"
    html += "  <h1>Design System Components</h1>\n"
    html += "  <section>\n"
    html += "    <h2>Buttons</h2>\n"
    html += "    <button class=\"btn\">Primary Button</button>\n"
    html += "  </section>\n"
    html += "  <section>\n"
    html += "    <h2>Cards</h2>\n"
    html += "    <div class=\"card\">\n"
    html += "      <h3>Card Title</h3>\n"
    html += "      <p>Card content using standard spacing and radii.</p>\n"
    html += "    </div>\n"
    html += "  </section>\n"
    html += "</body>\n</html>\n"

    with open(os.path.join(output_dir, "components.html"), "w", encoding="utf-8") as f:
        f.write(html)

def create_usage_md(output_dir):
    md = "# Design System Usage\n\n"
    md += "This package contains the extracted design tokens and components.\n\n"
    md += "## Files Included\n"
    md += "- `tokens.css`: The source of truth for design variables.\n"
    md += "- `components.html`: A visual test-bed for components.\n"
    md += "- `design-tokens.json`: The raw extracted tokens schema.\n"
    md += "- `components.manifest.json`: Component metadata and dependencies.\n"
    md += "- `DESIGN.md`: The complete markdown specification.\n"

    with open(os.path.join(output_dir, "USAGE.md"), "w", encoding="utf-8") as f:
        f.write(md)

def create_manifests(data, output_dir):
    with open(os.path.join(output_dir, "design-tokens.json"), "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    manifest = {
        "version": "1.0",
        "components": [
            {
                "name": "Button",
                "dependencies": ["color-primary-0", "spacing-0", "border-radius-0"]
            },
            {
                "name": "Card",
                "dependencies": ["spacing-1", "border-radius-1"]
            }
        ]
    }
    with open(os.path.join(output_dir, "components.manifest.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)

def scaffold(data, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    create_tokens_css(data, output_dir)
    create_components_html(data, output_dir)
    create_usage_md(output_dir)
    create_manifests(data, output_dir)
    print(f"Successfully scaffolded design package in '{output_dir}'")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python scaffold_package.py <input.json> <output_dir>")
        sys.exit(1)
        
    input_file = sys.argv[1]
    output_dir = sys.argv[2]
    
    with open(input_file, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    scaffold(data, output_dir)
