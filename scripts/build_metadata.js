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

// Curated live websites & design portals for all 150 design systems
const BRAND_WEBSITES = {
    "agentic": "https://agentic.ai",
    "airbnb": "https://airbnb.design",
    "airtable": "https://airtable.com",
    "ant": "https://ant.design",
    "apple": "https://developer.apple.com/design/",
    "application": "https://principles.design",
    "arc": "https://arc.net",
    "artistic": "https://www.behance.net",
    "atelier-zero": "https://atelierzero.co",
    "bento": "https://bentogrids.com",
    "binance": "https://www.binance.us",
    "bmw": "https://www.bmw.com",
    "bmw-m": "https://www.bmw-m.com",
    "bold": "https://www.awwwards.com",
    "brutalism": "https://brutalistwebsites.com",
    "bugatti": "https://www.bugatti.com",
    "cafe": "https://bluebottlecoffee.com",
    "cal": "https://cal.com",
    "canva": "https://www.canva.com",
    "cisco": "https://momentum.design",
    "claude": "https://claude.ai",
    "clay": "https://claymorphism.com",
    "claymorphism": "https://claymorphism.com",
    "clean": "https://minimalgallery.com",
    "clickhouse": "https://clickhouse.com",
    "cohere": "https://cohere.com",
    "coinbase": "https://www.coinbase.com",
    "colorful": "https://coolors.co",
    "composio": "https://composio.dev",
    "contemporary": "https://contemporary-design.com",
    "corporate": "https://www.ibm.com/design",
    "cosmic": "https://www.nasa.gov",
    "creative": "https://dribbble.com",
    "cursor": "https://www.cursor.com",
    "dashboard": "https://dribbble.com/tags/dashboard",
    "discord": "https://discord.com",
    "dithered": "https://doodad.dev/dither-me-this/",
    "doodle": "https://excalidraw.com",
    "dramatic": "https://www.awwwards.com/websites/dark/",
    "duolingo": "https://design.duolingo.com",
    "editorial": "https://theoutline.com",
    "elegant": "https://www.vogue.com",
    "elevenlabs": "https://elevenlabs.io",
    "energetic": "https://www.redbull.com",
    "enterprise": "https://polaris.shopify.com",
    "expo": "https://expo.dev",
    "expressive": "https://m3.material.io/styles/color/expressive",
    "fantasy": "https://worldofwarcraft.blizzard.com",
    "ferrari": "https://www.ferrari.com",
    "figma": "https://www.figma.com",
    "flat": "https://flatuicolors.com",
    "framer": "https://www.framer.com",
    "friendly": "https://mailchimp.com/design/",
    "futuristic": "https://cyberpunk.net",
    "github": "https://primer.style",
    "glassmorphism": "https://glassmorphism.com",
    "gradient": "https://cssgradient.io",
    "hashicorp": "https://helios.hashicorp.design",
    "hud": "https://www.hudsandguis.com",
    "huggingface": "https://huggingface.co",
    "ibm": "https://carbondesignsystem.com",
    "intercom": "https://www.intercom.com",
    "kami": "https://www.moma.org/collection/terms/japanese-paper",
    "kraken": "https://www.kraken.com",
    "lamborghini": "https://www.lamborghini.com",
    "levels": "https://growth.design",
    "linear-app": "https://linear.app",
    "lingo": "https://www.lingoapp.com",
    "loom": "https://www.loom.com",
    "lovable": "https://lovable.dev",
    "luxury": "https://www.rolex.com",
    "mastercard": "https://brand.mastercard.com",
    "material": "https://m3.material.io",
    "meta": "https://about.meta.com",
    "minimal": "https://minimalgallery.com",
    "minimax": "https://www.minimaxi.com",
    "mintlify": "https://mintlify.com",
    "miro": "https://miro.com",
    "mission-control": "https://eyes.nasa.gov",
    "mistral-ai": "https://mistral.ai",
    "modern": "https://godly.website",
    "mongodb": "https://www.mongodb.com",
    "mono": "https://monospaced.com",
    "neobrutalism": "https://neobrutalism.dev",
    "neon": "https://neon.tech",
    "neumorphism": "https://neumorphism.io",
    "default": "https://github.com",
    "nike": "https://www.nike.com",
    "notion": "https://www.notion.so",
    "nvidia": "https://www.nvidia.com",
    "ollama": "https://ollama.com",
    "openai": "https://openai.com",
    "opencode-ai": "https://opencode.ai",
    "pacman": "https://pacman.com",
    "paper": "https://ia.net/writer",
    "perplexity": "https://www.perplexity.ai",
    "perspective": "https://spline.design",
    "pinterest": "https://gestalt.pinterest.systems",
    "playstation": "https://www.playstation.com",
    "posthog": "https://posthog.com",
    "premium": "https://www.apple.com",
    "professional": "https://www.microsoft.com/design/",
    "publication": "https://www.theatlantic.com",
    "raycast": "https://www.raycast.com",
    "refined": "https://linear.app/method",
    "renault": "https://www.renaultgroup.com",
    "replicate": "https://replicate.com",
    "resend": "https://resend.com",
    "retro": "https://poolsuite.net",
    "revolut": "https://www.revolut.com",
    "runwayml": "https://runwayml.com",
    "sanity": "https://www.sanity.io",
    "sentry": "https://sentry.io",
    "shadcn": "https://ui.shadcn.com",
    "shopify": "https://polaris.shopify.com",
    "simple": "https://basecamp.com/shapeup",
    "skeumorphism": "https://www.apple.com/ios/",
    "slack": "https://slack.design",
    "sleek": "https://arc.net",
    "spacex": "https://www.spacex.com",
    "spacious": "https://www.theverge.com",
    "spotify": "https://spotify.design",
    "starbucks": "https://creative.starbucks.com",
    "storytelling": "https://pudding.cool",
    "stripe": "https://stripe.com",
    "supabase": "https://supabase.com",
    "superhuman": "https://superhuman.com",
    "tesla": "https://www.tesla.com",
    "tetris": "https://tetris.com",
    "theverge": "https://www.theverge.com",
    "together-ai": "https://www.together.ai",
    "totality-festival": "https://totalityfestival.com",
    "trading-terminal": "https://www.tradingview.com",
    "uber": "https://baseweb.design",
    "urdu": "https://urdu.rekhta.org",
    "vercel": "https://vercel.com/geist",
    "vibrant": "https://stripe.com/press",
    "vintage": "https://archive.org",
    "vodafone": "https://www.vodafone.com",
    "voltagent": "https://voltagent.com",
    "warm-editorial": "https://kinfolk.com",
    "warp": "https://www.warp.dev",
    "webex": "https://momentum.design",
    "webflow": "https://webflow.com",
    "wechat": "https://open.weixin.qq.com",
    "wired": "https://www.wired.com",
    "wise": "https://wise.design",
    "x-ai": "https://x.ai",
    "xiaohongshu": "https://www.xiaohongshu.com",
    "zapier": "https://zapier.com"
};

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
        console.warn(`  ⚠️ Could not parse design-tokens.json for ${path.basename(systemDir)}: ${e.message}`);
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
        console.warn(`  ⚠️ No manifest.json in ${path.basename(systemDir)}, skipping.`);
        return null;
    }

    let manifest;
    try {
        manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (e) {
        console.warn(`  ⚠️ Invalid manifest.json in ${path.basename(systemDir)}: ${e.message}`);
        return null;
    }

    const dirName = path.basename(systemDir);
    const brandId = manifest.id || dirName;
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
    const website = manifest.website || manifest.url || (manifest.source && manifest.source.url) || BRAND_WEBSITES[brandId] || BRAND_WEBSITES[dirName] || 'https://github.com';

    return {
        brand: brandId,
        name: manifest.name || dirName.charAt(0).toUpperCase() + dirName.slice(1),
        file: `design-systems/${dirName}/DESIGN.md`,
        category: manifest.category || 'Uncategorized',
        size: formatSize(sizeBytes),
        size_bytes: sizeBytes,
        description: description,
        website: website,
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
    console.log('🔨 Building brands_metadata.js from design-systems/...\n');

    const entries = [];
    const dirs = fs.readdirSync(DESIGN_SYSTEMS_DIR)
        .filter(d => {
            const fullPath = path.join(DESIGN_SYSTEMS_DIR, d);
            return fs.statSync(fullPath).isDirectory() && !SKIP_DIRS.has(d);
        })
        .sort();

    console.log(`📁 Found ${dirs.length} design system directories.\n`);

    for (const dir of dirs) {
        const systemDir = path.join(DESIGN_SYSTEMS_DIR, dir);
        const entry = buildEntryFromManifest(systemDir);
        if (entry) {
            entries.push(entry);
            console.log(`  ✅ ${entry.name} (${entry.category}) — ${entry.size}, ${entry.colors.length} colors, website: ${entry.website}`);
        }
    }

    // Sort alphabetically by name
    entries.sort((a, b) => a.name.localeCompare(b.name));

    // Write output
    const output = `const BRANDS_METADATA = ${JSON.stringify(entries, null, 2)};\n`;
    fs.writeFileSync(OUTPUT_FILE, output, 'utf8');

    // Count unique categories
    const categories = new Set(entries.map(e => e.category));

    console.log(`\n✨ Done! Generated ${entries.length} entries across ${categories.size} categories.`);
    console.log(`📄 Output: ${OUTPUT_FILE}`);
}

build();
