#!/usr/bin/env python3
import os
import sys
import re
import json
from collections import Counter

# Directories to exclude from traversal
EXCLUDE_DIRS = {
    'node_modules', '.git', '.next', 'dist', 'build', 'out',
    'coverage', 'tmp', 'temp', 'Trush', '.cache', 'public', '.gemini'
}

# File extensions to scan
SCAN_EXTENSIONS = {
    '.css', '.scss', '.sass', '.less',
    '.js', '.jsx', '.ts', '.tsx',
    '.html', '.vue', '.svelte'
}

def scan_directory(dir_path):
    """Walk through the codebase and extract design system tokens."""
    tokens = {
        'colors': [],
        'css_variables': {},
        'font_families': [],
        'font_sizes': [],
        'font_weights': [],
        'line_heights': [],
        'letter_spacings': [],
        'border_radii': [],
        'spacing': [],
        'tailwind_classes': [],
        'components': []
    }

    for root, dirs, files in os.walk(dir_path):
        # Modify dirs in-place to skip excluded directories
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith('.')]

        for file in files:
            file_path = os.path.join(root, file)
            _, ext = os.path.splitext(file)
            if ext in SCAN_EXTENSIONS:
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    
                    # 1. Parse stylesheet files (CSS, SCSS, etc.)
                    if ext in ('.css', '.scss', '.sass', '.less'):
                        parse_css(content, tokens)
                    
                    # 2. Parse Tailwind config files
                    if 'tailwind.config' in file:
                        parse_tailwind_config(content, tokens)

                    # 3. Parse markup and code files (JSX, TSX, HTML, Vue, Svelte)
                    if ext in ('.jsx', '.tsx', '.html', '.vue', '.svelte', '.js', '.ts'):
                        parse_components_and_classes(content, tokens)

                except Exception as e:
                    print(f"Warning: Failed to read {file_path}: {e}", file=sys.stderr)

    return tokens

def parse_css(css_content, tokens):
    """Parse raw CSS for design tokens."""
    # Remove comments
    css_content = re.sub(r'/\*.*?\*/', '', css_content, flags=re.DOTALL)

    # Extract CSS variables
    var_matches = re.findall(r'--([\w-]+)\s*:\s*([^;}\n]+)', css_content)
    for key, val in var_matches:
        tokens['css_variables'][f"--{key}"] = val.strip()

    # Hex colors (8, 6, 4, or 3 digits)
    hex_colors = re.findall(r'#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{3})\b', css_content)
    tokens['colors'].extend([f"#{c.lower()}" for c in hex_colors])

    # RGB/RGBA/HSL
    rgb_matches = re.finditer(r'(?:rgba?|hsla?)\(\s*[\d.]+\s*(?:%|deg)?\s*,\s*[\d.]+\s*%?\s*,\s*[\d.]+\s*%?\s*(?:,\s*[\d.]+\s*%?)?\)', css_content, re.IGNORECASE)
    tokens['colors'].extend([m.group(0).strip().lower() for m in rgb_matches])

    # Font Families
    font_matches = re.findall(r'font-family\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE)
    for font in font_matches:
        for part in font.split(','):
            clean_font = part.strip().strip('"\'')
            if clean_font:
                tokens['font_families'].append(clean_font)

    # Font Sizes
    size_matches = re.findall(r'font-size\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE)
    for size in size_matches:
        clean = size.strip()
        if re.search(r'\d+(?:px|rem|em|%)', clean):
            tokens['font_sizes'].append(clean)

    # Font Weights
    weight_matches = re.findall(r'font-weight\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE)
    tokens['font_weights'].extend([w.strip() for w in weight_matches if w.strip().isdigit() or w.strip() in ('bold', 'normal')])

    # Border Radii
    radius_matches = re.findall(r'border-radius\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE)
    for rad in radius_matches:
        for part in rad.strip().split():
            if re.search(r'\d+(?:px|rem|em|%)', part):
                tokens['border_radii'].append(part)

    # Spacing
    spacing_matches = []
    spacing_matches.extend(re.findall(r'(?:margin|padding)(?:-top|-right|-bottom|-left)?\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE))
    spacing_matches.extend(re.findall(r'gap\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE))
    for space in spacing_matches:
        for part in space.strip().split():
            if re.search(r'^\d+(?:px|rem|em|%)', part):
                tokens['spacing'].append(part)

def parse_tailwind_config(config_content, tokens):
    """Regex-parse a Tailwind config file for extended theme options."""
    # Try to extract hex colors from Tailwind config
    color_matches = re.findall(r'["\']?([\w-]+)["\']?\s*:\s*["\'](#[A-Fa-f0-9]{3,8})["\']', config_content)
    for name, hex_val in color_matches:
        tokens['colors'].append(hex_val.lower())
        tokens['css_variables'][f"Tailwind: {name}"] = hex_val

    # Try to extract custom font families
    font_matches = re.findall(r'fontFamily\s*:\s*\{\s*[^}]*\}', config_content, re.DOTALL)
    for font_block in font_matches:
        font_names = re.findall(r'["\']?([\w-]+)["\']?\s*:\s*\[?([^\]}\n]+)\]?', font_block)
        for name, fonts in font_names:
            clean_fonts = [f.strip().strip('"\'') for f in fonts.split(',')]
            tokens['font_families'].extend(clean_fonts)

    # Spacing extensions
    spacing_matches = re.findall(r'spacing\s*:\s*\{\s*[^}]*\}', config_content, re.DOTALL)
    for space_block in spacing_matches:
        space_vals = re.findall(r'["\']?([\w.-]+)["\']?\s*:\s*["\']([^"\']+)["\']', space_block)
        for name, val in space_vals:
            tokens['spacing'].append(val)

def parse_components_and_classes(content, tokens):
    """Parse JS/HTML files for Tailwind classes and custom components."""
    # Find common JSX/HTML component patterns (Capitalized tag names)
    components = re.findall(r'<([A-Z][a-zA-Z0-9]+)\b', content)
    tokens['components'].extend(components)

    # Scan for common Tailwind class patterns in text
    # e.g., class="bg-blue-500 text-white p-4 rounded-lg md:grid-cols-3"
    class_matches = re.findall(r'class(?:Name)?\s*=\s*["\']([^"\']+)["\']', content)
    for class_str in class_matches:
        classes = class_str.split()
        for c in classes:
            # Clean responsive modifiers (e.g. md:bg-blue-500 -> bg-blue-500)
            if ':' in c:
                c = c.split(':')[-1]
            
            # Check for Tailwind utility prefixes
            if c.startswith(('bg-', 'text-', 'rounded-', 'p-', 'm-', 'gap-', 'h-', 'w-', 'shadow-')):
                tokens['tailwind_classes'].append(c)
                
                # Check for custom hex arbitrary values in Tailwind class (e.g. bg-[#ff385c])
                arbitrary_hex = re.search(r'-\[#(A-Fa-f0-9]{3,8})\]', c)
                if arbitrary_hex:
                    tokens['colors'].append(f"#{arbitrary_hex.group(1).lower()}")

def main():
    # Target directory defaults to current directory
    dir_path = sys.argv[1] if len(sys.argv) > 1 else '.'
    dir_path = os.path.abspath(dir_path)

    if not os.path.exists(dir_path):
        print(json.dumps({"error": f"Path not found: {dir_path}"}))
        sys.exit(1)

    extracted = scan_directory(dir_path)

    # Process and summarize tokens (take top common elements)
    color_summary = [c for c, _ in Counter(extracted['colors']).most_common(12)]
    font_family_summary = [f for f, _ in Counter(extracted['font_families']).most_common(5)]
    font_size_summary = [s for s, _ in Counter(extracted['font_sizes']).most_common(8)]
    font_weight_summary = [w for w, _ in Counter(extracted['font_weights']).most_common(4)]
    lh_summary = [lh for lh, _ in Counter(extracted['line_heights']).most_common(6)]
    ls_summary = [ls for ls, _ in Counter(extracted['letter_spacings']).most_common(4)]
    radius_summary = [r for r, _ in Counter(extracted['border_radii']).most_common(5)]
    spacing_summary = [s for s, _ in Counter(extracted['spacing']).most_common(8)]
    
    # Process Tailwind classes
    tailwind_colors = [c for c in extracted['tailwind_classes'] if c.startswith(('bg-', 'text-'))]
    tailwind_rounded = [c for c in extracted['tailwind_classes'] if c.startswith('rounded-')]
    tailwind_spacing = [c for c in extracted['tailwind_classes'] if c.startswith(('p-', 'm-', 'gap-'))]
    
    tw_color_summary = [tc for tc, _ in Counter(tailwind_colors).most_common(8)]
    tw_rounded_summary = [tr for tr, _ in Counter(tailwind_rounded).most_common(4)]
    tw_spacing_summary = [ts for ts, _ in Counter(tailwind_spacing).most_common(8)]

    # Components list
    component_summary = [comp for comp, _ in Counter(extracted['components']).most_common(10)]

    # Filter CSS variables
    cleaned_vars = {}
    for k, v in extracted['css_variables'].items():
        if re.search(r'color|font|radius|size|padding|margin|gap|spacing|theme', k, re.IGNORECASE) or v.startswith('#') or v.startswith('rgb') or k.startswith('Tailwind:'):
            cleaned_vars[k] = v

    result = {
        "project_path": dir_path,
        "colors": {
            "common_hex_rgb": color_summary,
            "tailwind_color_classes": tw_color_summary,
            "variables": cleaned_vars
        },
        "typography": {
            "families": font_family_summary,
            "sizes": font_size_summary,
            "weights": font_weight_summary,
            "line_heights": lh_summary,
            "letter_spacings": ls_summary
        },
        "rounded": {
            "css_values": radius_summary,
            "tailwind_classes": tw_rounded_summary
        },
        "spacing": {
            "css_values": spacing_summary,
            "tailwind_classes": tw_spacing_summary
        },
        "components_detected": component_summary
    }

    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
