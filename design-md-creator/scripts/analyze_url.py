#!/usr/bin/env python3
import sys
import re
import json
import urllib.request
import urllib.parse
from collections import Counter

# Set standard User-Agent header to avoid blocking
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
}

def fetch_content(url):
    """Fetch content of a URL with custom user-agent."""
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as response:
            charset = response.headers.get_content_charset() or 'utf-8'
            return response.read().decode(charset, errors='ignore'), response.geturl()
    except Exception as e:
        print(f"Warning: Failed to fetch {url}: {e}", file=sys.stderr)
        return "", url

def parse_html(html, base_url):
    """Extract page info and style URLs from HTML."""
    # Find page title
    title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    title = title_match.group(1).strip() if title_match else ""

    # Find meta description
    desc_match = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'](.*?)["\']', html, re.IGNORECASE)
    if not desc_match:
        desc_match = re.search(r'<meta[^>]*content=["\'](.*?)["\'][^>]*name=["\']description["\']', html, re.IGNORECASE)
    description = desc_match.group(1).strip() if desc_match else ""

    # Find stylesheet links
    link_tags = re.findall(r'<link[^>]*rel=["\']stylesheet["\'][^>]*href=["\'](.*?)["\']', html, re.IGNORECASE)
    stylesheet_urls = []
    for href in link_tags:
        # Resolve relative URLs
        full_url = urllib.parse.urljoin(base_url, href)
        stylesheet_urls.append(full_url)

    # Find inline styles
    style_tags = re.findall(r'<style[^>]*>(.*?)</style>', html, re.IGNORECASE | re.DOTALL)
    inline_css = "\n".join(style_tags)

    return title, description, stylesheet_urls, inline_css

def extract_tokens(css_content):
    """Extract design system tokens from CSS using regex."""
    tokens = {
        'colors': [],
        'css_variables': {},
        'font_families': [],
        'font_sizes': [],
        'line_heights': [],
        'letter_spacings': [],
        'font_weights': [],
        'border_radii': [],
        'spacing': []
    }

    if not css_content:
        return tokens

    # Normalize css content (remove comments)
    css_content = re.sub(r'/\*.*?\*/', '', css_content, flags=re.DOTALL)

    # 1. CSS Variables
    var_matches = re.findall(r'--([\w-]+)\s*:\s*([^;}\n]+)', css_content)
    for key, val in var_matches:
        val_clean = val.strip()
        tokens['css_variables'][f"--{key}"] = val_clean

    # 2. Colors (Hex, RGB, RGBA, HSL)
    # Hex colors (8, 6, 4, or 3 digits) - match longer first to avoid premature matches
    hex_colors = re.findall(r'#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{3})\b', css_content)
    tokens['colors'].extend([f"#{c.lower()}" for c in hex_colors])

    # RGB/RGBA/HSL colors
    rgb_colors = re.findall(r'(rgba?|hsla?)\([^)]+\)', css_content, re.IGNORECASE)
    # Re-extract complete color strings
    raw_rgb_matches = re.finditer(r'(?:rgba?|hsla?)\(\s*[\d.]+\s*(?:%|deg)?\s*,\s*[\d.]+\s*%?\s*,\s*[\d.]+\s*%?\s*(?:,\s*[\d.]+\s*%?)?\)', css_content, re.IGNORECASE)
    tokens['colors'].extend([m.group(0).strip().lower() for m in raw_rgb_matches])

    # 3. Font Families
    font_matches = re.findall(r'font-family\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE)
    for font in font_matches:
        # split by comma, strip quotes
        for part in font.split(','):
            clean_font = part.strip().strip('"\'')
            if clean_font:
                tokens['font_families'].append(clean_font)

    # 4. Font Sizes
    size_matches = re.findall(r'font-size\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE)
    for size in size_matches:
        clean = size.strip()
        if re.search(r'\d+(?:px|rem|em|%)', clean):
            tokens['font_sizes'].append(clean)

    # 5. Font Weights
    weight_matches = re.findall(r'font-weight\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE)
    tokens['font_weights'].extend([w.strip() for w in weight_matches if w.strip().isdigit() or w.strip() in ('bold', 'normal', 'lighter', 'bolder')])

    # 6. Line Heights
    lh_matches = re.findall(r'line-height\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE)
    tokens['line_heights'].extend([lh.strip() for lh in lh_matches if re.search(r'^\d+(\.\d+)?(px|em|%)?$', lh.strip())])

    # 7. Letter Spacings
    ls_matches = re.findall(r'letter-spacing\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE)
    tokens['letter_spacings'].extend([ls.strip() for ls in ls_matches if re.search(r'-?[\d.]+(px|em|rem)', ls.strip())])

    # 8. Border Radii
    radius_matches = re.findall(r'border-radius\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE)
    for rad in radius_matches:
        clean = rad.strip()
        for part in clean.split():
            if re.search(r'\d+(?:px|rem|em|%)', part):
                tokens['border_radii'].append(part)

    # 9. Spacing (padding, margin, gap)
    spacing_matches = []
    spacing_matches.extend(re.findall(r'(?:margin|padding)(?:-top|-right|-bottom|-left)?\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE))
    spacing_matches.extend(re.findall(r'gap\s*:\s*([^;}\n!]+)', css_content, re.IGNORECASE))
    for space in spacing_matches:
        clean = space.strip()
        for part in clean.split():
            if re.search(r'^\d+(?:px|rem|em|%)', part):
                tokens['spacing'].append(part)

    return tokens

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Usage: python analyze_url.py <url>"}))
        sys.exit(1)

    url = sys.argv[1]
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url

    html, resolved_url = fetch_content(url)
    if not html:
        print(json.dumps({"error": f"Failed to retrieve content from {url}"}))
        sys.exit(1)

    title, description, stylesheet_urls, inline_css = parse_html(html, resolved_url)

    # Accumulate all CSS contents
    css_content = inline_css
    # Limit to reading max 5 external stylesheets to optimize performance and prevent timeouts
    for style_url in stylesheet_urls[:5]:
        style_css, _ = fetch_content(style_url)
        css_content += "\n" + style_css

    # Extract tokens
    extracted = extract_tokens(css_content)

    # Process and summarize tokens (take top common elements)
    color_summary = [c for c, _ in Counter(extracted['colors']).most_common(12)]
    font_family_summary = [f for f, _ in Counter(extracted['font_families']).most_common(5)]
    font_size_summary = [s for s, _ in Counter(extracted['font_sizes']).most_common(8)]
    font_weight_summary = [w for w, _ in Counter(extracted['font_weights']).most_common(4)]
    lh_summary = [lh for lh, _ in Counter(extracted['line_heights']).most_common(6)]
    ls_summary = [ls for ls, _ in Counter(extracted['letter_spacings']).most_common(4)]
    radius_summary = [r for r, _ in Counter(extracted['border_radii']).most_common(5)]
    spacing_summary = [s for s, _ in Counter(extracted['spacing']).most_common(8)]

    # Clean CSS variables (prefer colors, fonts, spacing)
    cleaned_vars = {}
    for k, v in extracted['css_variables'].items():
        if re.search(r'color|font|radius|size|padding|margin|gap|spacing|theme', k, re.IGNORECASE) or v.startswith('#') or v.startswith('rgb'):
            cleaned_vars[k] = v

    result = {
        "name": title if title else url,
        "description": description,
        "colors": {
            "common_hex_rgb": color_summary,
            "variables": cleaned_vars
        },
        "typography": {
            "families": font_family_summary,
            "sizes": font_size_summary,
            "weights": font_weight_summary,
            "line_heights": lh_summary,
            "letter_spacings": ls_summary
        },
        "rounded": radius_summary,
        "spacing": spacing_summary
    }

    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
