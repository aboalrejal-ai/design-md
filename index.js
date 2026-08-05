// Application State
let activeCategory = 'all';
let searchQuery = '';
let selectedBrand = null;
let rawMarkdown = '';
let activeDrawerTab = 'design';

// DOM Elements
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const categoryPillsContainer = document.getElementById('category-pills');
const brandsGrid = document.getElementById('brands-grid');
const statCount = document.getElementById('stat-count');
const statCatCount = document.getElementById('stat-cat-count');
const themeToggleBtn = document.getElementById('theme-toggle');

// Reader Drawer Elements
const readerDrawer = document.getElementById('reader-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const drawerTitle = document.getElementById('drawer-title');
const drawerCategory = document.getElementById('drawer-category');
const drawerSize = document.getElementById('drawer-size');
const markdownBody = document.getElementById('markdown-body');
const sidebarNav = document.getElementById('sidebar-nav');
const drawerPaletteList = document.getElementById('drawer-palette-list');
const btnCloseDrawer = document.getElementById('btn-close-drawer');
const btnCopyRaw = document.getElementById('btn-copy-raw');
const btnDownloadFile = document.getElementById('btn-download-file');
const drawerTabs = document.getElementById('drawer-tabs');

// Drawer Download Dropdown Elements
const btnDownloadMd = document.getElementById('btn-download-md');
const btnDownloadZip = document.getElementById('btn-download-zip');
const drawerDownloadMenu = document.getElementById('drawer-download-menu');

// Toast Notification
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

/* ==========================================================================
   Theme Management
   ========================================================================== */
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
        showToast('Dark Mode Activated');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('theme', 'light');
        showToast('Light Mode Activated');
    }
});

/* ==========================================================================
   Toast Notifications
   ========================================================================== */
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

/* ==========================================================================
   Dashboard Populating & Filtering
   ========================================================================== */
function getUniqueCategories() {
    const cats = new Set(BRANDS_METADATA.map(b => b.category));
    return Array.from(cats).sort();
}

function initCategoryPills() {
    const categories = getUniqueCategories();
    statCatCount.textContent = categories.length;
    
    // Clear and reset pills container with active pill
    categoryPillsContainer.innerHTML = '<button class="pill-btn active" data-category="all">All Brands</button>';
    
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'pill-btn';
        btn.setAttribute('data-category', cat);
        btn.textContent = cat;
        categoryPillsContainer.appendChild(btn);
    });
    
    // Add Event Listeners to pills
    categoryPillsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('pill-btn')) {
            document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            activeCategory = e.target.getAttribute('data-category');
            renderBrands();
        }
    });
}

function renderBrands() {
    brandsGrid.innerHTML = '';
    
    const filtered = BRANDS_METADATA.filter(brand => {
        const matchesCategory = activeCategory === 'all' || brand.category === activeCategory;
        const matchesSearch = brand.name.toLowerCase().includes(searchQuery) ||
                              brand.brand.toLowerCase().includes(searchQuery) ||
                              brand.description.toLowerCase().includes(searchQuery) ||
                              brand.category.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });
    
    statCount.textContent = filtered.length;
    
    if (filtered.length === 0) {
        brandsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-circle-question"></i>
                <h4>No brands match your filters</h4>
                <p>Try searching for a different keyword or resetting the category pill.</p>
            </div>
        `;
        return;
    }
    
    filtered.forEach(brand => {
        const card = document.createElement('article');
        card.className = 'brand-card';
        
        // Swatches block
        let swatchesHtml = '';
        if (brand.colors && brand.colors.length > 0) {
            swatchesHtml = `<div class="card-swatches">`;
            brand.colors.forEach(col => {
                swatchesHtml += `<div class="swatch-dot" style="background-color: ${col};" data-color="${col}"></div>`;
            });
            swatchesHtml += `</div>`;
        }
        
        // Package badge for full systems
        const packageBadge = brand.hasFullPackage
            ? `<span class="package-badge"><i class="fa-solid fa-cube"></i> Full Package</span>`
            : '';
        
        card.innerHTML = `
            ${swatchesHtml}
            <div class="brand-category">${brand.category}</div>
            <h3>${brand.name} <span class="brand-size">${brand.size}</span></h3>
            <p class="brand-description">${brand.description || 'No description available for this system guidelines.'}</p>
            ${packageBadge}
            <div class="card-footer">
                <button class="btn btn-card-action" onclick="openReader('${brand.brand}')">
                    <span>View Guidelines</span> <i class="fa-solid fa-arrow-right"></i>
                </button>
                <div class="card-action-row">
                    <button class="btn btn-outline btn-sm btn-card-secondary" onclick="copyBrandRaw(event, '${brand.brand}')" title="Copy Markdown">
                        <i class="fa-solid fa-copy"></i> Copy
                    </button>
                    <div class="card-download-dropdown">
                        <button class="btn btn-outline btn-sm btn-card-secondary" onclick="toggleCardDropdown(event, '${brand.brand}')" title="Download">
                            <i class="fa-solid fa-download"></i> Download <i class="fa-solid fa-caret-down" style="margin-left:2px;font-size:0.6rem"></i>
                        </button>
                        <div class="download-dropdown-menu" id="card-dropdown-${brand.brand}">
                            <button class="dropdown-item" onclick="downloadBrandFile(event, '${brand.brand}', 'md')">
                                <i class="fa-solid fa-file-lines"></i> Markdown File
                                <span class="dropdown-item-desc">.md file only</span>
                            </button>
                            ${brand.hasFullPackage ? `
                            <button class="dropdown-item" onclick="downloadBrandFile(event, '${brand.brand}', 'zip')">
                                <i class="fa-solid fa-file-zipper"></i> Full Package (ZIP)
                                <span class="dropdown-item-desc">All tokens, components & files</span>
                            </button>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        brandsGrid.appendChild(card);
    });

    // Wire swatch click handler to copy colors inside cards
    document.querySelectorAll('.swatch-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            const color = dot.getAttribute('data-color');
            navigator.clipboard.writeText(color);
            showToast(`Copied color ${color}`);
        });
    });
}

// Search Inputs Event Listeners
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    if (searchQuery.length > 0) {
        clearSearchBtn.style.display = 'block';
    } else {
        clearSearchBtn.style.display = 'none';
    }
    renderBrands();
});

clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderBrands();
    searchInput.focus();
});

/* ==========================================================================
   URL Resolution Helper for GitHub Pages & Local Servers
   ========================================================================== */
function getFileUrl(filePath) {
    let base = window.location.origin + window.location.pathname;
    if (!base.endsWith('/') && !base.substring(base.lastIndexOf('/')).includes('.')) {
        base += '/';
    }
    return new URL(filePath, base).href;
}

/* ==========================================================================
   Download Dropdown Logic
   ========================================================================== */
function closeAllDropdowns() {
    document.querySelectorAll('.download-dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
    });
}

// Card dropdown toggle
function toggleCardDropdown(event, brandKey) {
    event.stopPropagation();
    const menu = document.getElementById(`card-dropdown-${brandKey}`);
    const isOpen = menu.classList.contains('show');
    closeAllDropdowns();
    if (!isOpen) {
        menu.classList.add('show');
    }
}

// Drawer dropdown toggle
btnDownloadFile.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drawerDownloadMenu.classList.contains('show');
    closeAllDropdowns();
    if (!isOpen) {
        drawerDownloadMenu.classList.add('show');
    }
});

// Close dropdowns on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.download-dropdown') && !e.target.closest('.card-download-dropdown')) {
        closeAllDropdowns();
    }
});

/* ==========================================================================
   ZIP Download Functionality
   ========================================================================== */
function showZipLoading(brandName) {
    const overlay = document.createElement('div');
    overlay.className = 'zip-loading-overlay';
    overlay.id = 'zip-loading-overlay';
    overlay.innerHTML = `
        <div class="zip-loading-card">
            <div class="spinner"></div>
            <h4>Packaging ${brandName}</h4>
            <p>Collecting design tokens, components, and files...</p>
        </div>
    `;
    document.body.appendChild(overlay);
}

function hideZipLoading() {
    const overlay = document.getElementById('zip-loading-overlay');
    if (overlay) overlay.remove();
}

async function downloadAsZip(brandMeta) {
    if (!brandMeta || !brandMeta.hasFullPackage) {
        showToast('ZIP not available for this brand');
        return;
    }

    showZipLoading(brandMeta.name);

    try {
        const zip = new JSZip();
        const folder = zip.folder(brandMeta.brand + '-design-system');

        // List of files to fetch
        const filesToFetch = [];
        
        if (brandMeta.files) {
            const fileMap = {
                design: 'DESIGN.md',
                tokens: 'tokens.css',
                tailwind: 'tailwind-v4.css',
                designTokens: 'design-tokens.json',
                components: 'components.html',
                componentsManifest: 'components.manifest.json',
                usage: 'USAGE.md'
            };

            for (const [key, filename] of Object.entries(fileMap)) {
                if (brandMeta.files[key]) {
                    filesToFetch.push({
                        path: `${brandMeta.packageDir}/${filename}`,
                        name: filename
                    });
                }
            }
        }

        // Always try to fetch manifest.json
        filesToFetch.push({
            path: `${brandMeta.packageDir}/manifest.json`,
            name: 'manifest.json'
        });

        // Try to fetch preview files
        if (brandMeta.hasPreview) {
            const previewFiles = ['colors.html', 'typography.html', 'spacing.html'];
            for (const pf of previewFiles) {
                filesToFetch.push({
                    path: `${brandMeta.packageDir}/preview/${pf}`,
                    name: `preview/${pf}`
                });
            }
        }

        // Try to fetch source files
        const sourceFiles = ['evidence.md', 'tokens.source.json', 'token-contract.report.json'];
        for (const sf of sourceFiles) {
            filesToFetch.push({
                path: `${brandMeta.packageDir}/source/${sf}`,
                name: `source/${sf}`
            });
        }

        // Fetch all files in parallel
        const results = await Promise.allSettled(
            filesToFetch.map(async (f) => {
                const url = getFileUrl(f.path);
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const text = await response.text();
                return { name: f.name, content: text };
            })
        );

        // Add successful fetches to zip
        let fileCount = 0;
        for (const result of results) {
            if (result.status === 'fulfilled') {
                folder.file(result.value.name, result.value.content);
                fileCount++;
            }
        }

        if (fileCount === 0) {
            throw new Error('No files could be fetched');
        }

        // Generate and download ZIP
        const blob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${brandMeta.brand}-design-system.zip`);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast(`Downloaded ${brandMeta.name} package (${fileCount} files)`);
    } catch (error) {
        console.error('ZIP download failed:', error);
        showToast(`Failed to create ZIP: ${error.message}`);
    } finally {
        hideZipLoading();
    }
}

/* ==========================================================================
   Reader Drawer Logic & Markdown Rendering
   ========================================================================== */
async function openReader(brandKey) {
    const meta = BRANDS_METADATA.find(b => b.brand === brandKey);
    if (!meta) return;
    
    selectedBrand = meta;
    activeDrawerTab = 'design';
    drawerTitle.textContent = meta.name;
    drawerCategory.textContent = meta.category;
    drawerSize.textContent = meta.size;
    
    // Clear previous drawer panel contents
    markdownBody.innerHTML = '<div class="loading-state"><div class="spinner"></div><p>Fetching design markdown guidelines...</p></div>';
    sidebarNav.innerHTML = '';
    drawerPaletteList.innerHTML = '';
    
    // Setup tabs visibility
    setupDrawerTabs(meta);
    
    // Open drawer overlay
    readerDrawer.classList.add('open');
    document.body.style.overflow = 'hidden'; // lock scrolling on main body
    
    // Load the design tab content
    await loadTabContent('design', meta);
}

function setupDrawerTabs(meta) {
    const tabs = drawerTabs.querySelectorAll('.drawer-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active', 'disabled');
        const tabName = tab.getAttribute('data-tab');
        
        if (tabName === 'design') {
            tab.classList.add('active');
        } else if (!meta.hasFullPackage) {
            tab.classList.add('disabled');
        } else {
            // Check if specific files exist
            const fileCheck = {
                'tokens': meta.files && meta.files.tokens,
                'components': meta.files && meta.files.components,
                'usage': meta.files && meta.files.usage,
                'preview': meta.hasPreview
            };
            if (!fileCheck[tabName]) {
                tab.classList.add('disabled');
            }
        }
    });
}

// Tab click handler
drawerTabs.addEventListener('click', async (e) => {
    const tab = e.target.closest('.drawer-tab');
    if (!tab || tab.classList.contains('disabled') || tab.classList.contains('active')) return;
    
    drawerTabs.querySelectorAll('.drawer-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    activeDrawerTab = tab.getAttribute('data-tab');
    await loadTabContent(activeDrawerTab, selectedBrand);
});

async function loadTabContent(tabName, meta) {
    markdownBody.innerHTML = '<div class="loading-state"><div class="spinner"></div><p>Loading content...</p></div>';
    
    try {
        switch (tabName) {
            case 'design':
                await loadDesignTab(meta);
                break;
            case 'tokens':
                await loadTokensTab(meta);
                break;
            case 'components':
                await loadComponentsTab(meta);
                break;
            case 'usage':
                await loadUsageTab(meta);
                break;
            case 'preview':
                await loadPreviewTab(meta);
                break;
        }
    } catch (error) {
        console.error(`Failed to load ${tabName} tab:`, error);
        markdownBody.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-triangle-exclamation" style="color:var(--accent-orange)"></i>
                <h4>Failed to load ${tabName}</h4>
                <p>The file could not be read.</p>
                <p style="font-size:0.8rem; color:var(--text-muted)">Details: ${error.message}</p>
            </div>
        `;
    }
}

async function loadDesignTab(meta) {
    const fileUrl = getFileUrl(meta.file);
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    rawMarkdown = await response.text();
    let parsedHtml = marked.parse(rawMarkdown);
    markdownBody.innerHTML = parsedHtml;
    
    // Highlight hex codes dynamically
    injectInlineColorChips(markdownBody);
    
    // Generate sidebar content
    generateSidebarContent();
}

async function loadTokensTab(meta) {
    const fileUrl = getFileUrl(`${meta.packageDir}/tokens.css`);
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const cssContent = await response.text();
    markdownBody.innerHTML = `
        <h2 style="font-family:var(--font-headings);margin-bottom:16px">
            <i class="fa-solid fa-code" style="color:var(--accent-orange)"></i> Design Tokens (CSS Custom Properties)
        </h2>
        <p style="color:var(--text-muted);margin-bottom:20px;font-size:0.9rem">
            CSS variables for ${meta.name} — copy this file into your project for instant theming.
        </p>
        <div class="tab-code-display"><code>${escapeHtml(cssContent)}</code></div>
    `;
}

async function loadComponentsTab(meta) {
    const fileUrl = getFileUrl(`${meta.packageDir}/components.html`);
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const htmlContent = await response.text();
    
    // Also try to load components manifest for a nice summary
    let manifestHtml = '';
    try {
        const manifestUrl = getFileUrl(`${meta.packageDir}/components.manifest.json`);
        const manifestResp = await fetch(manifestUrl);
        if (manifestResp.ok) {
            const manifest = await manifestResp.json();
            if (manifest.components && Array.isArray(manifest.components)) {
                manifestHtml = `
                    <div style="margin-bottom:24px">
                        <h3 style="font-family:var(--font-headings);font-size:1.1rem;margin-bottom:12px">
                            <i class="fa-solid fa-cubes" style="color:var(--accent-orange)"></i> 
                            ${manifest.components.length} Components Available
                        </h3>
                        <div style="display:flex;flex-wrap:wrap;gap:6px">
                            ${manifest.components.map(c => 
                                `<span class="badge">${c.name || c.id || 'Component'}</span>`
                            ).join('')}
                        </div>
                    </div>
                `;
            }
        }
    } catch (e) {
        // Manifest load failed, not critical
    }
    
    markdownBody.innerHTML = `
        <h2 style="font-family:var(--font-headings);margin-bottom:16px">
            <i class="fa-solid fa-cubes" style="color:var(--accent-orange)"></i> Component Library
        </h2>
        <p style="color:var(--text-muted);margin-bottom:20px;font-size:0.9rem">
            HTML component snippets for ${meta.name} — ready to drop into your project.
        </p>
        ${manifestHtml}
        <div class="tab-code-display"><code>${escapeHtml(htmlContent)}</code></div>
    `;
}

async function loadUsageTab(meta) {
    const fileUrl = getFileUrl(`${meta.packageDir}/USAGE.md`);
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const mdContent = await response.text();
    markdownBody.innerHTML = marked.parse(mdContent);
}

async function loadPreviewTab(meta) {
    const previewFiles = [
        { name: 'Colors', file: 'colors.html' },
        { name: 'Typography', file: 'typography.html' },
        { name: 'Spacing', file: 'spacing.html' }
    ];
    
    let tabsHtml = `<div class="preview-tabs">`;
    previewFiles.forEach((pf, idx) => {
        tabsHtml += `<button class="preview-tab-btn ${idx === 0 ? 'active' : ''}" 
                       onclick="switchPreview(this, '${meta.packageDir}/preview/${pf.file}')">${pf.name}</button>`;
    });
    tabsHtml += `</div>`;
    
    const firstPreviewUrl = getFileUrl(`${meta.packageDir}/preview/${previewFiles[0].file}`);
    
    markdownBody.innerHTML = `
        <h2 style="font-family:var(--font-headings);margin-bottom:16px">
            <i class="fa-solid fa-eye" style="color:var(--accent-orange)"></i> Visual Preview
        </h2>
        ${tabsHtml}
        <iframe class="preview-frame" id="preview-iframe" src="${firstPreviewUrl}" sandbox="allow-same-origin"></iframe>
    `;
}

function switchPreview(btn, filePath) {
    document.querySelectorAll('.preview-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const iframe = document.getElementById('preview-iframe');
    if (iframe) {
        iframe.src = getFileUrl(filePath);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function closeReader() {
    readerDrawer.classList.remove('open');
    document.body.style.overflow = ''; // restore scrolling
    selectedBrand = null;
    rawMarkdown = '';
    closeAllDropdowns();
}

btnCloseDrawer.addEventListener('click', closeReader);
drawerOverlay.addEventListener('click', closeReader);

// Handle ESC key to close drawer
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.querySelector('.download-dropdown-menu.show')) {
            closeAllDropdowns();
        } else if (readerDrawer.classList.contains('open')) {
            closeReader();
        }
    }
});

/* ==========================================================================
   Sidebar Navigation & Markdown Helper Utilities
   ========================================================================== */
function generateSidebarContent() {
    sidebarNav.innerHTML = '';
    drawerPaletteList.innerHTML = '';
    
    // 1. Gather all H2 headings in the rendered Markdown for sidebar TOC
    const headings = markdownBody.querySelectorAll('h2');
    if (headings.length === 0) {
        sidebarNav.innerHTML = '<span style="font-size:0.8rem; color:var(--text-muted)">No headings detected.</span>';
    } else {
        headings.forEach((heading, idx) => {
            // Assign ID to heading if not existing
            const id = heading.id || `section-heading-${idx}`;
            heading.id = id;
            
            const link = document.createElement('a');
            link.className = 'sidebar-link';
            link.href = `#${id}`;
            link.innerHTML = `<i class="fa-solid fa-chevron-right" style="font-size:0.7rem"></i> ${heading.textContent.trim().replace(/^\d+\.\s+/, '')}`;
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Select link item visually
                document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Scroll content viewport directly to heading
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            
            sidebarNav.appendChild(link);
        });
    }
    
    // 2. Render visual palette swatches from extracted colors in metadata
    if (selectedBrand && selectedBrand.colors && selectedBrand.colors.length > 0) {
        selectedBrand.colors.forEach(color => {
            const card = document.createElement('div');
            card.className = 'sidebar-swatch-card';
            card.innerHTML = `
                <div class="sidebar-swatch-color" style="background-color: ${color}"></div>
                <div class="sidebar-swatch-val">${color}</div>
            `;
            
            card.addEventListener('click', () => {
                navigator.clipboard.writeText(color);
                showToast(`Copied ${color}`);
            });
            
            drawerPaletteList.appendChild(card);
        });
    } else {
        drawerPaletteList.innerHTML = '<span style="font-size:0.8rem; color:var(--text-muted)">No swatches pre-loaded.</span>';
    }
}

function injectInlineColorChips(container) {
    const walk = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    let node;
    const textNodes = [];
    
    while (node = walk.nextNode()) {
        // Skip tags like code, pre, script, styling rules or anchors
        if (node.parentElement.tagName === 'CODE' || 
            node.parentElement.tagName === 'PRE' || 
            node.parentElement.closest('code') || 
            node.parentElement.closest('pre') ||
            node.parentElement.tagName === 'A' ||
            node.parentElement.closest('a')) {
            continue;
        }
        textNodes.push(node);
    }
    
    const hexRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g;
    textNodes.forEach(node => {
        const text = node.nodeValue;
        if (hexRegex.test(text)) {
            const span = document.createElement('span');
            hexRegex.lastIndex = 0;
            span.innerHTML = text.replace(hexRegex, (match) => {
                return `<span class="color-chip-inline" data-color="${match}"><span class="color-chip-swatch" style="background-color: ${match}"></span>${match}</span>`;
            });
            
            // Replace standard node with styled span wrapper
            if (node.parentNode) {
                node.parentNode.replaceChild(span, node);
            }
        }
    });
    
    // Add copy functionality on clicking the newly injected color swatches
    container.querySelectorAll('.color-chip-inline').forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.stopPropagation();
            const color = chip.getAttribute('data-color');
            navigator.clipboard.writeText(color);
            showToast(`Copied ${color}`);
        });
    });
}

/* ==========================================================================
   Action Buttons (Copy Raw / Download)
   ========================================================================== */
btnCopyRaw.addEventListener('click', () => {
    if (!rawMarkdown) return;
    navigator.clipboard.writeText(rawMarkdown);
    showToast('Copied raw markdown to clipboard!');
});

// Drawer download: Markdown only
btnDownloadMd.addEventListener('click', () => {
    closeAllDropdowns();
    if (!selectedBrand || !rawMarkdown) return;
    
    const blob = new Blob([rawMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', selectedBrand.file.split('/').pop());
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(`Downloading ${selectedBrand.file.split('/').pop()}`);
});

// Drawer download: ZIP
btnDownloadZip.addEventListener('click', async () => {
    closeAllDropdowns();
    if (!selectedBrand) return;
    await downloadAsZip(selectedBrand);
});

/* ==========================================================================
   Card Secondary Action Buttons (Copy / Download)
   ========================================================================== */
async function copyBrandRaw(event, brandKey) {
    event.stopPropagation();
    const meta = BRANDS_METADATA.find(b => b.brand === brandKey);
    if (!meta) return;
    
    try {
        const fileUrl = getFileUrl(meta.file);
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        await navigator.clipboard.writeText(text);
        showToast(`Copied ${meta.name} design markdown!`);
    } catch (error) {
        console.error("Failed to copy design file:", error);
        showToast(`Failed to copy: ${error.message}`);
    }
}

async function downloadBrandFile(event, brandKey, type) {
    event.stopPropagation();
    closeAllDropdowns();
    
    const meta = BRANDS_METADATA.find(b => b.brand === brandKey);
    if (!meta) return;
    
    if (type === 'zip') {
        await downloadAsZip(meta);
        return;
    }
    
    // Download Markdown only
    try {
        const fileUrl = getFileUrl(meta.file);
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', meta.file.split('/').pop());
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast(`Downloading ${meta.name} file...`);
    } catch (error) {
        console.error("Failed to download design file:", error);
        showToast(`Failed to download: ${error.message}`);
    }
}

// Make globally accessible
window.openReader = openReader;
window.copyBrandRaw = copyBrandRaw;
window.downloadBrandFile = downloadBrandFile;
window.toggleCardDropdown = toggleCardDropdown;
window.switchPreview = switchPreview;

/* ==========================================================================
   Initialization on Load
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCategoryPills();
    renderBrands();
});
