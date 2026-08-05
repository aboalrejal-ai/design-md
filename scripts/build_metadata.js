// build_metadata.js
//
// Reads all design-systems/<brand>/manifest.json files and generates
// the brands_metadata.js database file for the Design MD Hub website.
//
// Usage: node scripts/build_metadata.js

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DESIGN_SYSTEMS_DIR = path.join(ROOT, 'design-systems');
const OUTPUT_FILE = path.join(ROOT, 'brands_metadata.js');

// Directories to skip (not real design systems)
const SKIP_DIRS = new Set(['_schema', 'apple-test', 'example-test']);

/**
 * Extract top 4-6 identity colors from design-tokens.json
 */
function extractColors(systemDir) {
    const tokensPath = path.join(systemDir, 'design-tokens.json');
    if (!fs.existsSync(tokensPath)) return [];

    try {
        const data = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
        if (!data.tokens || !Array.isArray(data.tokens)) return [];

        // Get identity layer colors first, then any color type tokens
        const identityColors = data.tokens
            .filter(t => t.type === 'color' && t.layer === 'A1-identity')
            .map(t => t.value)
            .filter(v => v && v.startsWith('#'));

        if (identityColors.length >= 4) {
            return identityColors.slice(0, 6);
        }

        // Fallback: get any color tokens
        const allColors = data.tokens
            .filter(t => t.type === 'color' && t.value && t.value.startsWith('#'))
            .map(t => t.value);

        // Deduplicate and return first 4-6
        return [...new Set([...identityColors, ...allColors])].slice(0, 6);
    } catch (e) {
        console.warn(`  âš  Could not parse design-tokens.json for ${path.basename(systemDir)}: ${e.message}`);
        return [];
    }
}

/**
 * Extract a short description from the first meaningful lines of DESIGN.md
 */
function extractDescription(systemDir) {
    const designPath = path.join(systemDir, 'DESIGN.md');
    if (!fs.existsSync(designPath)) return '';

    try {
        const content = fs.readFileSync(designPath, 'utf8');
        const lines = content.split('\n');

        // Skip frontmatter if present
        let startIdx = 0;
        if (lines[0] && lines[0].trim() === '---') {
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim() === '---') {
                    startIdx = i + 1;
                    break;
                }
            }
        }

        // Find first non-empty, non-heading line
        for (let i = startIdx; i < Math.min(lines.length, startIdx + 20); i++) {
            const line = lines[i].trim();
            if (line && !line.startsWith('#') && !line.startsWith('---') && line.length > 10) {
                // Clean up markdown formatting
                let desc = line
                    .replace(/\*\*/g, '')
                    .replace(/\*/g, '')
                    .replace(/`/g, '')
                    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
                
                // Truncate if too long
                if (desc.length > 120) {
                    desc = desc.substring(0, 117) + '...';
                }
                return desc;
            }
        }
        return '';
    } catch (e) {
        return '';
    }
}

/**
 * Format file size in human-readable format
 */
function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
}

/**
 * Build metadata for a single design system directory
 */
function buildEntryFromManifest(systemDir) {
    const manifestPath = path.join(systemDir, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
        console.warn(`  âš  No manifest.json in ${path.basename(systemDir)}, skipping.`);
        return null;
    }

    let manifest;
    try {
        manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (e) {
        console.warn(`  âš  Invalid manifest.json in ${path.basename(systemDir)}: ${e.message}`);
        return null;
    }

    const dirName = path.basename(systemDir);
    const designMdPath = path.join(systemDir, 'DESIGN.md');

    // Calculate DESIGN.md size
    let sizeBytes = 0;
    if (fs.existsSync(designMdPath)) {
        sizeBytes = fs.statSync(designMdPath).size;
    }

    // Determine which files exist
    const files = {};
    const fileChecks = {
        design: 'DESIGN.md',
        tokens: 'tokens.css',
        tailwind: 'tailwind-v4.css',
        designTokens: 'design-tokens.json',
        components: 'components.html',
        componentsManifest: 'components.manifest.json',
        usage: 'USAGE.md'
    };

    for (const [key, filename] of Object.entries(fileChecks)) {
        if (fs.existsSync(path.join(systemDir, filename))) {
            files[key] = filename;
        }
    }

    // Check for preview directory
    const previewDir = path.join(systemDir, 'preview');
    const hasPreview = fs.existsSync(previewDir) && fs.statSync(previewDir).isDirectory();

    const colors = extractColors(systemDir);
    const description = extractDescription(systemDir);

    return {
        brand: manifest.id || dirName,
        name: manifest.name || dirName.charAt(0).toUpperCase() + dirName.slice(1),
        file: `design-systems/${dirName}/DESIGN.md`,
        category: manifest.category || 'Uncategorized',
        size: formatSize(sizeBytes),
        size_bytes: sizeBytes,
        description: description,
        colors: colors,
        hasFullPackage: true,
        packageDir: `design-systems/${dirName}`,
        files: files,
        hasPreview: hasPreview
    };
}

/**
 * Main build function
 */
function build() {
    console.log('ðŸ”¨ Building brands_metadata.js from design-systems/...\n');

    const entries = [];
    const dirs = fs.readdirSync(DESIGN_SYSTEMS_DIR)
        .filter(d => {
            const fullPath = path.join(DESIGN_SYSTEMS_DIR, d);
            return fs.statSync(fullPath).isDirectory() && !SKIP_DIRS.has(d);
        })
        .sort();

    console.log(`ðŸ“‚ Found ${dirs.length} design system directories.\n`);

    for (const dir of dirs) {
        const systemDir = path.join(DESIGN_SYSTEMS_DIR, dir);
        const entry = buildEntryFromManifest(systemDir);
        if (entry) {
            entries.push(entry);
            console.log(`  âœ… ${entry.name} (${entry.category}) â€” ${entry.size}, ${entry.colors.length} colors`);
        }
    }

    // Sort alphabetically by name
    entries.sort((a, b) => a.name.localeCompare(b.name));

    // Write output
    const output = `const BRANDS_METADATA = ${JSON.stringify(entries, null, 2)};\n`;
    fs.writeFileSync(OUTPUT_FILE, output, 'utf8');

    // Count unique categories
    const categories = new Set(entries.map(e => e.category));

    console.log(`\nâœ¨ Done! Generated ${entries.length} entries across ${categories.size} categories.`);
    console.log(`ðŸ“„ Output: ${OUTPUT_FILE}`);
}

build();
