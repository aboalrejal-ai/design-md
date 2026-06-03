// Application State
let activeCategory = 'all';
let searchQuery = '';
let selectedBrand = null;
let rawMarkdown = '';

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
        
        card.innerHTML = `
            ${swatchesHtml}
            <div class="brand-category">${brand.category}</div>
            <h3>${brand.name} <span class="brand-size">${brand.size}</span></h3>
            <p class="brand-description">${brand.description || 'No description available for this system guidelines.'}</p>
            <div class="card-footer">
                <button class="btn btn-card-action" onclick="openReader('${brand.brand}')">
                    <span>View Guidelines</span> <i class="fa-solid fa-arrow-right"></i>
                </button>
                <div class="card-action-row">
                    <button class="btn btn-outline btn-sm btn-card-secondary" onclick="copyBrandRaw(event, '${brand.brand}')" title="Copy Markdown">
                        <i class="fa-solid fa-copy"></i> Copy
                    </button>
                    <button class="btn btn-outline btn-sm btn-card-secondary" onclick="downloadBrandFile(event, '${brand.brand}')" title="Download MD File">
                        <i class="fa-solid fa-download"></i> Download
                    </button>
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
   Reader Drawer Logic & Markdown Rendering
   ========================================================================== */
async function openReader(brandKey) {
    const meta = BRANDS_METADATA.find(b => b.brand === brandKey);
    if (!meta) return;
    
    selectedBrand = meta;
    drawerTitle.textContent = meta.name;
    drawerCategory.textContent = meta.category;
    drawerSize.textContent = meta.size;
    
    // Clear previous drawer panel contents
    markdownBody.innerHTML = '<div class="loading-state"><div class="spinner"></div><p>Fetching design markdown guidelines...</p></div>';
    sidebarNav.innerHTML = '';
    drawerPaletteList.innerHTML = '';
    
    // Open drawer overlay
    readerDrawer.classList.add('open');
    document.body.style.overflow = 'hidden'; // lock scrolling on main body
    
    try {
        // Fetch the file
        const response = await fetch(`./${meta.file}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        rawMarkdown = await response.text();
        
        // Parse markdown to HTML
        let parsedHtml = marked.parse(rawMarkdown);
        markdownBody.innerHTML = parsedHtml;
        
        // Highlight hex codes dynamically using DOM traversal
        injectInlineColorChips(markdownBody);
        
        // Generate Index Navigation and visual swatches list
        generateSidebarContent();
        
    } catch (error) {
        console.error("Failed to load DESIGN file:", error);
        markdownBody.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-triangle-exclamation" style="color:var(--accent-orange)"></i>
                <h4>Failed to load guidelines</h4>
                <p>The markdown file could not be read or does not exist in the root folder.</p>
                <p style="font-size:0.8rem; color:var(--text-muted)">Details: ${error.message}</p>
            </div>
        `;
    }
}

function closeReader() {
    readerDrawer.classList.remove('open');
    document.body.style.overflow = ''; // restore scrolling
    selectedBrand = null;
    rawMarkdown = '';
}

btnCloseDrawer.addEventListener('click', closeReader);
drawerOverlay.addEventListener('click', closeReader);

// Handle ESC key to close drawer
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && readerDrawer.classList.contains('open')) {
        closeReader();
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

btnDownloadFile.addEventListener('click', () => {
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

/* ==========================================================================
   Card Secondary Action Buttons (Copy / Download)
   ========================================================================== */
async function copyBrandRaw(event, brandKey) {
    event.stopPropagation();
    const meta = BRANDS_METADATA.find(b => b.brand === brandKey);
    if (!meta) return;
    
    try {
        const response = await fetch(`./${meta.file}`);
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

async function downloadBrandFile(event, brandKey) {
    event.stopPropagation();
    const meta = BRANDS_METADATA.find(b => b.brand === brandKey);
    if (!meta) return;
    
    try {
        const response = await fetch(`./${meta.file}`);
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

/* ==========================================================================
   Initialization on Load
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCategoryPills();
    renderBrands();
});
