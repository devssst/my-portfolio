// ── DATA ─────────────────────────────────────────────────────

const TIMELINE_DATA = [
    {
        year: 2026,
        entries: [
            { title: "My Portfolio", date: "May 2026", desc: "Personal developer portfolio — vanilla HTML/CSS/JS." },
            { title: "SLIMS", date: "February 2026", desc: "School Library Inventory Management System for DPLBaliuag." }
        ]
    },
    {
        year: 2025,
        entries: [
            { title: "Learning Python", date: "2025", desc: "Started exploring Python for scripting and automation." }
        ]
    },
    {
        year: 2024,
        entries: []
    }
];

const PROJECTS_DATA = [
    {
        year: 2026,
        projects: [
            {
                name: "My Portfolio",
                desc: "A personal developer portfolio with dual-mode welcome page, glassmorphism UI, and admin edit mode.",
                tags: ["HTML", "CSS", "JS", "Firebase"],
                live: "https://devssst.github.io/my-portfolio",
                source: "https://github.com/devssst/my-portfolio"
            },
            {
                name: "SLIMS",
                desc: "School Library Inventory Management System for Dalubhasaang Politekniko ng Lungsod ng Baliwag.",
                tags: ["HTML", "CSS", "JS"],
                live: "https://devssst.github.io/btech-slims",
                source: "https://github.com/devssst/slims"
            }
        ]
    }
];

// Fallback doc data — replaced by data/list.json when available
const DOC_DATA_FALLBACK = {
    cv: [
        {
            title: "Curriculum Vitae",
            type: "CV",
            uploaded: "2026-05-01",
            file: "data/files/cv.pdf",
        }
    ],
    resume: [
        {
            title: "Resume",
            type: "Resume",
            uploaded: "2026-05-01",
            file: "data/files/resume.pdf",
        }
    ]
};

// ── INIT ─────────────────────────────────────────────────────

const params   = new URLSearchParams(window.location.search);
const isAdmin  = params.get('mode') === 'admin';

const badge    = document.getElementById('modeBadge');
const header   = document.getElementById('dashHeader');
const content  = document.getElementById('dashContent');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.dash-section');

// Fix: use innerHTML so the chevron <i> tag is preserved
if (badge) {
    badge.innerHTML = `${isAdmin ? 'ADMIN' : 'VISITOR'} <i class="fa-solid fa-chevron-down badge-chevron"></i>`;
    if (isAdmin) badge.classList.add('admin');
}

// ── PDF.js WORKER CONFIG ──────────────────────────────────────

if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

const SECTION_ORDER = ['home', 'about', 'timeline', 'projects', 'certificates', 'reach'];
let currentSection = 'home';

// ── SECTION SWITCHING ─────────────────────────────────────────

function switchSection(id) {
    if (id === currentSection) return;

    const current = document.getElementById('section-' + currentSection);
    const target  = document.getElementById('section-' + id);
    if (!target) return;

    if (current) {
        current.classList.remove('active');
    }

    target.classList.add('active');

    // Reset scroll — section-with-profile sections scroll their inner div, not the section
    const innerScroll = target.querySelector('.section-with-profile');
    if (innerScroll) {
        innerScroll.scrollTop = 0;
    } else {
        target.scrollTop = 0;
    }

    currentSection = id;

    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
    });
    showHeader();
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        switchSection(link.dataset.section);
    });
});

// ── HEADER HIDE/SHOW ON SECTION SCROLL ───────────────────────

let headerVisible = true;
let ticking       = false;

function hideHeader() {
    if (headerVisible) {
        header.classList.add('hidden');
        headerVisible = false;
    }
}

function showHeader() {
    if (!headerVisible) {
        header.classList.remove('hidden');
        headerVisible = true;
    }
}

// Per-section lastScrollY — fixes the shared state bug
const sectionScrollY   = new Map();
const scrollbarTimers  = new Map();

// Attach scroll listeners to both outer sections AND inner .section-with-profile divs
function attachScrollListener(el) {
    sectionScrollY.set(el, 0);

    el.addEventListener('scroll', () => {
        const scrollY = el.scrollTop;
        const lastY   = sectionScrollY.get(el);

        // Scrollbar fade-in / fade-out
        el.classList.add('scrolling');
        clearTimeout(scrollbarTimers.get(el));
        scrollbarTimers.set(el, setTimeout(() => {
            el.classList.remove('scrolling');
        }, 1500));

        // Header hide / show
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (scrollY > lastY && scrollY > 60) {
                    hideHeader();
                } else if (scrollY < lastY) {
                    showHeader();
                }
                sectionScrollY.set(el, scrollY);
                ticking = false;
            });
            ticking = true;
        }
    });
}

sections.forEach(section => attachScrollListener(section));

// Also attach to section-with-profile divs once DOM is ready
document.querySelectorAll('.section-with-profile').forEach(el => attachScrollListener(el));

// ── SECTION-HIJACK SCROLL — Feature 2 ────────────────────────

let hijackCooldown = false;

function getAdjacentSection(dir) {
    const idx  = SECTION_ORDER.indexOf(currentSection);
    const next = idx + dir;
    if (next < 0 || next >= SECTION_ORDER.length) return null;
    return SECTION_ORDER[next];
}

function tryHijack(dir) {
    if (hijackCooldown) return;
    const target = getAdjacentSection(dir);
    if (!target) return;
    hijackCooldown = true;
    switchSection(target);
    setTimeout(() => { hijackCooldown = false; }, 300);
}

// Wheel — hijack only at scroll boundaries
document.addEventListener('wheel', (e) => {
    const activeSection = document.getElementById('section-' + currentSection);
    if (!activeSection) return;

    // For profile-card sections, check the inner scrollable div
    const scrollEl = activeSection.querySelector('.section-with-profile') || activeSection;

    const atBottom = scrollEl.scrollHeight - scrollEl.scrollTop - scrollEl.clientHeight <= 5;
    const atTop    = scrollEl.scrollTop <= 0;

    if (e.deltaY > 0 && atBottom) {
        tryHijack(1);
    } else if (e.deltaY < 0 && atTop) {
        tryHijack(-1);
    }
}, { passive: true });

// Touch — hijack only at scroll boundaries
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    if (hijackCooldown) return;
    const deltaY = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) < 30) return;

    const activeSection = document.getElementById('section-' + currentSection);
    if (!activeSection) return;

    const scrollEl = activeSection.querySelector('.section-with-profile') || activeSection;

    const atBottom = scrollEl.scrollHeight - scrollEl.scrollTop - scrollEl.clientHeight <= 5;
    const atTop    = scrollEl.scrollTop <= 0;

    if (deltaY > 0 && atBottom) {
        tryHijack(1);
    } else if (deltaY < 0 && atTop) {
        tryHijack(-1);
    }
}, { passive: true });

// ── RENDER TIMELINE ───────────────────────────────────────────

function renderTimeline() {
    const root = document.getElementById('timelineRoot');
    if (!root) return;

    const data = loadFromStorage('portfolio_timeline', TIMELINE_DATA);
    root.innerHTML = '';

    data.forEach((yearBlock, i) => {
        const block = document.createElement('div');
        block.className = 'timeline-year-block';

        const isLast = i === data.length - 1;

        block.innerHTML = `
            <div class="timeline-year-row">
                <span class="timeline-year-label">${yearBlock.year}</span>
                <div class="timeline-line-col">
                    <div class="timeline-dot"></div>
                    ${!isLast || yearBlock.entries.length > 0 ? '<div class="timeline-vline"></div>' : ''}
                </div>
                <div class="timeline-entries" id="entries-${yearBlock.year}">
                    ${yearBlock.entries.length === 0 ? '<span style="font-size:12px;color:rgba(255,255,255,0.2);padding:4px 0;">No entries</span>' : ''}
                </div>
            </div>
        `;

        root.appendChild(block);

        const entriesEl = document.getElementById('entries-' + yearBlock.year);
        yearBlock.entries.forEach(entry => {
            const el = document.createElement('div');
            el.className = 'timeline-entry';
            el.innerHTML = `
                <span class="timeline-entry-title">${entry.title}</span>
                <span class="timeline-entry-date">${entry.date}</span>
                ${entry.desc ? `<span class="timeline-entry-desc">${entry.desc}</span>` : ''}
            `;
            entriesEl.appendChild(el);
        });
    });
}

// ── RENDER PROJECTS ───────────────────────────────────────────

function renderProjects() {
    const root = document.getElementById('projectsRoot');
    if (!root) return;

    const data = loadFromStorage('portfolio_projects', PROJECTS_DATA);
    root.innerHTML = '';

    data.forEach(yearGroup => {
        const group = document.createElement('div');
        group.className = 'projects-year-group';

        group.innerHTML = `<div class="projects-year-label">${yearGroup.year}</div>`;

        const grid = document.createElement('div');
        grid.className = 'projects-grid';

        yearGroup.projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';

            const tagsHTML = project.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
            const liveBtnHTML = project.live
                ? `<a href="${project.live}" target="_blank" class="project-btn live"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>`
                : `<span class="project-btn live" style="opacity:0.35;cursor:not-allowed;pointer-events:none;"><i class="fa-solid fa-ban"></i> No Live</span>`;
            const sourceBtnHTML = project.source
                ? `<a href="${project.source}" target="_blank" class="project-btn source"><i class="fa-brands fa-github"></i> Source</a>`
                : '';

            card.innerHTML = `
                <div class="project-name">${project.name}</div>
                <div class="project-desc">${project.desc}</div>
                <div class="project-tags">${tagsHTML}</div>
                <div class="project-btns">${liveBtnHTML}${sourceBtnHTML}</div>
            `;

            grid.appendChild(card);
        });

        group.appendChild(grid);
        root.appendChild(group);
    });
}

// ── RENDER DOC CARD — Feature 3 ───────────────────────────────

function renderDocCard(data) {
    const card = document.createElement('div');
    card.className = 'doc-card';

    const dateStr = data.uploaded
        ? new Date(data.uploaded).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : 'Date unknown';

    const filePath = data.file ? `../${data.file}` : null;

    card.innerHTML = `
        <div class="doc-card-preview">
            <i class="fa-regular fa-file-pdf doc-card-placeholder-icon"></i>
        </div>
        <div class="doc-card-body">
            <div class="doc-card-type">${(data.type || 'DOCUMENT').toUpperCase()}</div>
            <div class="doc-card-title">${data.title}</div>
            <div class="doc-card-date">${dateStr}</div>
        </div>
        <div class="doc-card-expand">
            <div class="doc-card-actions">
                <a href="${filePath || '#'}" target="_blank" class="doc-card-btn view">
                    <i class="fa-solid fa-eye"></i> VIEW
                </a>
                <a href="${filePath || '#'}" download class="doc-card-btn download">
                    <i class="fa-solid fa-download"></i> SAVE
                </a>
            </div>
        </div>
    `;

    // Async PDF preview — renders page 1 onto a canvas, swaps out placeholder
    if (filePath && window.pdfjsLib) {
        const previewEl  = card.querySelector('.doc-card-preview');
        const placeholder = previewEl.querySelector('.doc-card-placeholder-icon');

        pdfjsLib.getDocument(filePath).promise
            .then(pdf => pdf.getPage(1))
            .then(page => {
                const viewport = page.getViewport({ scale: 1 });
                const scale    = 220 / viewport.width;
                const scaled   = page.getViewport({ scale });

                const canvas    = document.createElement('canvas');
                canvas.className = 'doc-card-canvas';
                canvas.width    = scaled.width;
                canvas.height   = scaled.height;

                return page.render({
                    canvasContext: canvas.getContext('2d'),
                    viewport: scaled
                }).promise.then(() => {
                    placeholder.remove();
                    previewEl.appendChild(canvas);
                });
            })
            .catch(() => { /* file missing or error — placeholder stays */ });
    }

    // Click to toggle — accordion: collapse others, expand this one
    card.addEventListener('click', (e) => {
        if (e.target.closest('.doc-card-actions')) return;
        const isExpanded = card.classList.contains('expanded');
        document.querySelectorAll('.doc-card.expanded').forEach(c => c.classList.remove('expanded'));
        if (!isExpanded) card.classList.add('expanded');
    });

    return card;
}

// ── RENDER DOCS (HOME SECTION) — Feature 3 ───────────────────

async function renderDocs() {
    const grid = document.getElementById('homeDocsGrid');
    if (!grid) return;

    let docData = null;

    // 1. Check localStorage first
    try {
        const stored = localStorage.getItem('portfolio_docs');
        if (stored) docData = JSON.parse(stored);
    } catch { /* ignore */ }

    // 2. Try fetching data/list.json from the repo
    if (!docData) {
        try {
            const res = await fetch('../data/list.json');
            if (res.ok) {
                const json = await res.json();
                docData = {
                    cv:     json.cv     || [],
                    resume: json.resume || []
                };
            }
        } catch { /* file doesn't exist yet — use fallback */ }
    }

    // 3. Fall back to hardcoded placeholder
    if (!docData) {
        docData = DOC_DATA_FALLBACK;
    }

    grid.innerHTML = '';

    const allDocs = [
        ...docData.cv.map(d => ({ ...d, type: 'CV' })),
        ...docData.resume.map(d => ({ ...d, type: 'Resume' }))
    ];

    if (allDocs.length === 0) {
        grid.innerHTML = '<span style="font-size:12px;color:rgba(255,255,255,0.2);">No documents yet.</span>';
        return;
    }

    allDocs.forEach(doc => grid.appendChild(renderDocCard(doc)));
}

// ── LOCAL STORAGE HELPER ──────────────────────────────────────

function loadFromStorage(key, fallback) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch {
        return fallback;
    }
}

// ── REACH ME FORM (placeholder — wire EmailJS later) ──────────

const reachForm = document.getElementById('reachForm');
if (reachForm) {
    reachForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = reachForm.querySelector('.reach-btn');
        btn.textContent = 'Sent!';
        btn.style.background = 'linear-gradient(135deg, #0f7a3a, #22c55e)';
        setTimeout(() => {
            btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
            btn.style.background = '';
            reachForm.reset();
        }, 2000);
    });
}

// ── FEATURE 4: PROFILE CARD COLLAPSE / EXPAND ────────────────

// All profile card instances on the page (one per section)
const profileCardGroups = [
    {
        card:      document.getElementById('profileCard'),
        expandBtn: document.getElementById('profileCardExpandBtn'),
        content:   document.getElementById('aboutContent'),
    },
    {
        card:      document.getElementById('profileCardTimeline'),
        expandBtn: document.getElementById('profileCardExpandBtnTimeline'),
        content:   document.getElementById('timelineContent'),
    },
    {
        card:      document.getElementById('profileCardProjects'),
        expandBtn: document.getElementById('profileCardExpandBtnProjects'),
        content:   document.getElementById('projectsContent'),
    },
    {
        card:      document.getElementById('profileCardCertificates'),
        expandBtn: document.getElementById('profileCardExpandBtnCertificates'),
        content:   document.getElementById('certificatesContent'),
    },
];

// Shared collapse state — all cards mirror each other
let profileCardCollapsed = false;

function setProfileCardState(collapsed) {
    profileCardCollapsed = collapsed;

    profileCardGroups.forEach(({ card, expandBtn, content }) => {
        if (!card) return;

        if (collapsed) {
            card.classList.add('collapsed');
            if (expandBtn) expandBtn.classList.add('visible');
            if (content)   content.classList.add('card-hidden');
        } else {
            card.classList.remove('collapsed');
            if (expandBtn) expandBtn.classList.remove('visible');
            if (content)   content.classList.remove('card-hidden');
        }
    });
}

// Wire collapse buttons (one per card instance in HTML)
document.querySelectorAll('.profile-card-collapse').forEach(btn => {
    btn.addEventListener('click', () => setProfileCardState(true));
});

// Wire expand buttons
document.querySelectorAll('.profile-card-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => setProfileCardState(false));
});

// ── FEATURE 4: REAL-TIME AGE ──────────────────────────────────

const DOB = new Date('2006-12-15T00:00:00');

function calcAge() {
    const now   = new Date();
    let years   = now.getFullYear() - DOB.getFullYear();
    let months  = now.getMonth()    - DOB.getMonth();
    let days    = now.getDate()     - DOB.getDate();

    if (days < 0) {
        months--;
        // Days in the previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

function updateAge() {
    const el = document.getElementById('aboutAge');
    if (!el) return;
    const { years, months, days } = calcAge();
    el.innerHTML =
        `<span class="age-num">${years}</span> years, ` +
        `<span class="age-num">${months}</span> ${months === 1 ? 'month' : 'months'}, and ` +
        `<span class="age-num">${days}</span> ${days === 1 ? 'day' : 'days'}`;
}

updateAge();
setInterval(updateAge, 1000 * 60); // update every minute

// ── FEATURE 4: STAT CARDS ─────────────────────────────────────

async function populateStats() {
    let listData = null;

    try {
        const res = await fetch('../data/list.json');
        if (res.ok) listData = await res.json();
    } catch { /* file not present yet */ }

    const projectCount = listData
        ? (listData.projects || []).length
        : PROJECTS_DATA.reduce((sum, g) => sum + g.projects.length, 0);

    const certCount = listData
        ? (listData.certificates || []).length
        : 0;

    // Years experience — from first project year (2026) to now
    const startYear = 2024;
    const yearsExp  = new Date().getFullYear() - startYear;

    // Languages count — hardcoded for now, can be driven by data later
    const langCount = 5; // HTML, CSS, JS, Python, Java

    const setValue = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    setValue('statProjects', projectCount);
    setValue('statCerts',    certCount);
    setValue('statYears',    yearsExp);
    setValue('statLangs',    langCount);
}

populateStats();

// ── BOOT ──────────────────────────────────────────────────────

renderTimeline();
renderProjects();
renderDocs();

// ── BADGE DROPDOWN — Feature 1 ────────────────────────────────

const badgeWrap     = document.getElementById('badgeWrap');
const badgeDropdown = document.getElementById('badgeDropdown');
const menuFaq       = document.getElementById('menuFaq');
const menuEdit      = document.getElementById('menuEdit');
const menuLeave     = document.getElementById('menuLeave');
const faqOverlay    = document.getElementById('faqOverlay');
const faqClose      = document.getElementById('faqClose');

// Show EDIT button for admin
if (isAdmin && menuEdit) {
    menuEdit.classList.add('visible');
}

// Toggle dropdown
if (badgeWrap) {
    badgeWrap.querySelector('.mode-badge').addEventListener('click', (e) => {
        e.stopPropagation();
        badgeWrap.classList.toggle('open');
    });
}

// Close on outside click
document.addEventListener('click', (e) => {
    if (badgeWrap && !badgeWrap.contains(e.target)) {
        badgeWrap.classList.remove('open');
    }
    // Collapse any expanded doc card when clicking outside it
    if (!e.target.closest('.doc-card')) {
        document.querySelectorAll('.doc-card.expanded').forEach(c => c.classList.remove('expanded'));
    }
});

// FAQ
if (menuFaq) {
    menuFaq.addEventListener('click', () => {
        badgeWrap.classList.remove('open');
        faqOverlay.classList.add('open');
    });
}

if (faqClose) {
    faqClose.addEventListener('click', () => faqOverlay.classList.remove('open'));
}

if (faqOverlay) {
    faqOverlay.addEventListener('click', (e) => {
        if (e.target === faqOverlay) faqOverlay.classList.remove('open');
    });
}

// EDIT — placeholder until Feature 9 (admin edit mode)
if (menuEdit) {
    menuEdit.addEventListener('click', () => {
        badgeWrap.classList.remove('open');
        // TODO: trigger edit mode in Feature 9
        console.log('Edit mode triggered');
    });
}

// LEAVE
if (menuLeave) {
    menuLeave.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}