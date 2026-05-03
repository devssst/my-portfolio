// ── DATA ─────────────────────────────────────────────────────

const TIMELINE_DATA = [
    {
        year: 2026,
        entries: [
            { title: "My Portfolio", date: "May 2026", desc: "Personal developer portfolio — vanilla HTML/CSS/JS.", type: "project" },
            { title: "SLIMS", date: "February 2026", desc: "School Library Inventory Management System for DPLBaliuag.", type: "project" }
        ]
    },
    {
        year: 2025,
        entries: [
            { title: "BSIT - Dalubhasaang Politekniko ng Lungsod ng Baliwag", date: "June 2025", desc: "Mr. Calderon goes to college." }
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
                source: "https://github.com/devssst/btech-slims"
            }
        ]
    }
];

const LANG_DATA = [
    { name: 'HTML',       icon: 'fa-brands fa-html5',   color: '#E34F26', level: 'Familiar',   pct: 30 },
    { name: 'CSS',        icon: 'fa-brands fa-css3-alt', color: '#663399', level: 'Comfortable', pct: 55 },
    { name: 'JavaScript', icon: 'fa-brands fa-js',       color: '#F7DF1E', level: 'Comfortable', pct: 55 },
    { name: 'Python',     icon: 'fa-brands fa-python',   color: '#3776AB', level: 'Comfortable', pct: 55 },
    { name: 'Java',       icon: 'fa-brands fa-java',     color: '#E32C2E', level: 'Familiar',   pct: 30 },
];

const LEVEL_DATA = [
    { level: 'Exposure',   color: '#6b7280', desc: "Seen it, read about it, maybe ran someone else's code. Haven't written anything independently." },
    { level: 'Familiar',   color: '#f59e0b', desc: 'Can write basic things independently. Understands the fundamentals but has clear gaps. Needs reference for anything beyond basics.' },
    { level: 'Comfortable', color: '#10b981', desc: 'Builds real things with it. Understands how and why things work, not just copying patterns. Still has a ceiling but can problem-solve within that ceiling.' },
    { level: 'Proficient', color: '#3b82f6', desc: 'Confident across most use cases. Writes clean, intentional code. Knows best practices and applies them. Gaps exist but they are specific and narrow.' },
    { level: 'Advanced',   color: '#8b5cf6', desc: 'Deep knowledge including internals, edge cases, and patterns. Can mentor others. Knows what they do not know and knows how to find it.' },
    { level: 'Expert',     color: '#ec4899', desc: 'Mastery. Contributes to the language or ecosystem itself, or is a go-to authority in professional settings. Rare.' },
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
    ],
};

// ── INIT ─────────────────────────────────────────────────────

const params   = new URLSearchParams(window.location.search);
const isAdmin  = params.get('mode') === 'admin';
const badge    = document.getElementById('modeBadge');
const header   = document.getElementById('dashHeader');
const content  = document.getElementById('dashContent');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.dash-section');

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

// ── SKILLS ANIMATION ──────────────────────────────
let skillsAnimated = false;

function switchSection(id) {
    if (id === currentSection) return;

    const current = document.getElementById('section-' + currentSection);
    const target  = document.getElementById('section-' + id);
    if (!target) return;

    if (current) {
        current.classList.remove('active');
    }

    target.classList.add('active');

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

    if (id === 'about' && !skillsAnimated) {
        setTimeout(() => {
            const barsEl = document.getElementById('skillsBars');
            if (barsEl) barsEl.classList.add('animated');
            skillsAnimated = true;
        }, 350);
    }
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
        el.classList.add('scrolling');
        clearTimeout(scrollbarTimers.get(el));
        scrollbarTimers.set(el, setTimeout(() => {
            el.classList.remove('scrolling');
        }, 1500));

        // HEADER SHOW/HIDE WHEN SCROLLING

        /*
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
        }*/
    });
}

sections.forEach(section => attachScrollListener(section));
document.querySelectorAll('.section-with-profile').forEach(el => attachScrollListener(el));

// ── SECTION-HIJACK SCROLL ────────────────────────────────────

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

document.addEventListener('wheel', (e) => {
    const activeSection = document.getElementById('section-' + currentSection);
    if (!activeSection) return;

    const scrollEl = activeSection.querySelector('.section-with-profile') || activeSection;

    const atBottom = scrollEl.scrollHeight - scrollEl.scrollTop - scrollEl.clientHeight <= 5;
    const atTop    = scrollEl.scrollTop <= 0;

    if (e.deltaY > 0 && atBottom) {
        tryHijack(1);
    } else if (e.deltaY < 0 && atTop) {
        tryHijack(-1);
    }
}, { passive: true });

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

            const learnMoreHTML = entry.type === 'project'
                ? `<button class="timeline-learn-more">Learn More <i class="fa-solid fa-arrow-right"></i></button>`
                : '';

            el.innerHTML = `
                <div class="timeline-entry-body">
                    <span class="timeline-entry-title">${entry.title}</span>
                    ${entry.desc ? `<span class="timeline-entry-desc">${entry.desc}</span>` : ''}
                </div>
                <div class="timeline-entry-reveal">
                    <div class="timeline-entry-reveal-inner">
                        <span class="timeline-entry-date">${entry.date}</span>
                        ${learnMoreHTML}
                    </div>
                </div>
            `;

            // Click to expand / collapse (accordion)
            el.addEventListener('click', (e) => {
                if (e.target.closest('.timeline-learn-more')) return;
                const isExpanded = el.classList.contains('expanded');
                document.querySelectorAll('.timeline-entry.expanded').forEach(c => c.classList.remove('expanded'));
                if (!isExpanded) el.classList.add('expanded');
            });

            // Learn More — switch to Projects and briefly highlight matching card
            const learnMoreBtn = el.querySelector('.timeline-learn-more');
            if (learnMoreBtn) {
                learnMoreBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    switchSection('projects');
                    setTimeout(() => {
                        const allCards = document.querySelectorAll('.project-card');
                        allCards.forEach(card => {
                            const nameEl = card.querySelector('.project-name');
                            if (nameEl && nameEl.textContent.trim() === entry.title) {
                                card.classList.add('highlight');
                                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                setTimeout(() => card.classList.remove('highlight'), 1500);
                            }
                        });
                    }, 350);
                });
            }

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

// ── RENDER DOC CARD ───────────────────────────────

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

    // Async PDF preview
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
            .catch(() => {});
    }

    card.addEventListener('click', (e) => {
        if (e.target.closest('.doc-card-actions')) return;
        const isExpanded = card.classList.contains('expanded');
        document.querySelectorAll('.doc-card.expanded').forEach(c => c.classList.remove('expanded'));
        if (!isExpanded) card.classList.add('expanded');
    });

    return card;
}

// ── RENDER DOCS (HOME SECTION) ───────────────────

async function renderDocs() {
    const grid = document.getElementById('homeDocsGrid');
    if (!grid) return;

    let docData = null;

    try {
        const stored = localStorage.getItem('portfolio_docs');
        if (stored) docData = JSON.parse(stored);
    } catch {}

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
        } catch {}
    }

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

// ── PROFILE CARD COLLAPSE / EXPAND ────────────────
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

document.querySelectorAll('.profile-card-collapse').forEach(btn => {
    btn.addEventListener('click', () => setProfileCardState(true));
});

document.querySelectorAll('.profile-card-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => setProfileCardState(false));
});

// ── REAL-TIME AGE ──────────────────────────────────

const DOB = new Date('2006-12-15T00:00:00');

function calcAge() {
    const now   = new Date();
    let years   = now.getFullYear() - DOB.getFullYear();
    let months  = now.getMonth()    - DOB.getMonth();
    let days    = now.getDate()     - DOB.getDate();

    if (days < 0) {
        months--;
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
setInterval(updateAge, 1000 * 60);

// ── STAT CARDS ─────────────────────────────────────

async function populateStats() {
    let listData = null;

    try {
        const res = await fetch('../data/list.json');
        if (res.ok) listData = await res.json();
    } catch {}

    const projectCount = listData
        ? (listData.projects || []).length
        : PROJECTS_DATA.reduce((sum, g) => sum + g.projects.length, 0);

    const certCount = listData
        ? (listData.certificates || []).length
        : 0;

    const startYear = 2025;
    const yearsExp  = new Date().getFullYear() - startYear;
    const langCount = LANG_DATA.length;

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

// ── STAT CARD NAVIGATION ──────────────────────────
document.querySelectorAll('.about-stat-card[data-goto]').forEach(card => {
    card.addEventListener('click', () => {
        const target = card.dataset.goto;
        if (target) switchSection(target);
    });
});
// ── RENDER SKILLS ─────────────────────────────────

function renderSkills() {
    const barsEl   = document.getElementById('skillsBars');
    const legendEl = document.getElementById('skillsLegend');
    if (!barsEl || !legendEl) return;

    // Build bars
    barsEl.innerHTML = '';
    LANG_DATA.forEach((lang, i) => {
        const row = document.createElement('div');
        row.className = 'skills-bar-row';
        row.innerHTML = `
            <div class="skills-bar-meta">
                <div class="skills-bar-left">
                    <i class="${lang.icon} skills-bar-icon" style="color:${lang.color};"></i>
                    <span class="skills-bar-name">${lang.name}</span>
                </div>
                <span class="skills-bar-level">${lang.level}</span>
            </div>
            <div class="skills-bar-track">
                <div class="skills-bar-fill"
                     style="--bar-w:${lang.pct}%; background:${lang.color}; transition-delay:${i * 0.1}s;"></div>
            </div>
        `;
        barsEl.appendChild(row);
    });

    // Build legend card
    legendEl.innerHTML = `<div class="skills-legend-title">LEGEND</div>`;
    LEVEL_DATA.forEach(lvl => {
        const item = document.createElement('div');
        item.className = 'skills-legend-item';
        item.innerHTML = `
            <div class="skills-legend-dot" style="background:${lvl.color};"></div>
            <span class="skills-legend-label">${lvl.level}</span>
        `;
        legendEl.appendChild(item);
    });
    legendEl.innerHTML += `<div class="skills-legend-hint">CLICK FOR DETAILS</div>`;

    // Build levels modal content
    const modalContent = document.getElementById('levelsModalContent');
    if (modalContent) {
        modalContent.innerHTML = '';
        LEVEL_DATA.forEach(lvl => {
            const item = document.createElement('div');
            item.className = 'level-item';
            item.innerHTML = `
                <div class="level-item-dot" style="background:${lvl.color};"></div>
                <div class="level-item-body">
                    <div class="level-item-name" style="color:${lvl.color};">${lvl.level}</div>
                    <div class="level-item-desc">${lvl.desc}</div>
                </div>
            `;
            modalContent.appendChild(item);
        });
    }
}

// ── LEVELS MODAL ──────────────────────────────────

const levelsOverlay = document.getElementById('levelsOverlay');
const levelsClose   = document.getElementById('levelsClose');
const skillsLegend  = document.getElementById('skillsLegend');

if (skillsLegend) {
    skillsLegend.addEventListener('click', () => {
        if (levelsOverlay) levelsOverlay.classList.add('open');
    });
}

if (levelsClose) {
    levelsClose.addEventListener('click', () => levelsOverlay.classList.remove('open'));
}

if (levelsOverlay) {
    levelsOverlay.addEventListener('click', (e) => {
        if (e.target === levelsOverlay) levelsOverlay.classList.remove('open');
    });
}

// ── BOOT ──────────────────────────────────────────────────────

renderTimeline();
renderProjects();
renderDocs();
renderSkills();

// ── BADGE DROPDOWN ────────────────────────────────

const badgeWrap     = document.getElementById('badgeWrap');
const badgeDropdown = document.getElementById('badgeDropdown');
const menuFaq       = document.getElementById('menuFaq');
const menuEdit      = document.getElementById('menuEdit');
const menuLeave     = document.getElementById('menuLeave');
const faqOverlay    = document.getElementById('faqOverlay');
const faqClose      = document.getElementById('faqClose');

if (isAdmin && menuEdit) {
    menuEdit.classList.add('visible');
}

if (badgeWrap) {
    badgeWrap.querySelector('.mode-badge').addEventListener('click', (e) => {
        e.stopPropagation();
        badgeWrap.classList.toggle('open');
    });
}

document.addEventListener('click', (e) => {
    if (badgeWrap && !badgeWrap.contains(e.target)) {
        badgeWrap.classList.remove('open');
    }
    if (!e.target.closest('.doc-card')) {
        document.querySelectorAll('.doc-card.expanded').forEach(c => c.classList.remove('expanded'));
    }
    if (!e.target.closest('.timeline-entry')) {
        document.querySelectorAll('.timeline-entry.expanded').forEach(c => c.classList.remove('expanded'));
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