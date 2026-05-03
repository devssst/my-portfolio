// ── DATA ─────────────────────────────────────────────────────

// ── FOR MANUAL TIMELINE ENTRIES ────────────────────────────── 
TIMELINE_DATA = [
    {
        year: 2025,
        entries: [
            { title: "BSIT - Dalubhasaang Politekniko ng Lungsod ng Baliwag", date: "June 2025", desc: "Mr. Calderon goes to college." }
        ]
    }
];

const LANG_DATA = [
    { name: 'HTML',       icon: 'fa-brands fa-html5',   color: '#E34F26', level: 'Familiar',    pct: 30 },
    { name: 'CSS',        icon: 'fa-brands fa-css3-alt', color: '#663399', level: 'Comfortable', pct: 55 },
    { name: 'JavaScript', icon: 'fa-brands fa-js',       color: '#F7DF1E', level: 'Comfortable', pct: 55 },
    { name: 'Python',     icon: 'fa-brands fa-python',   color: '#013763', level: 'Comfortable', pct: 55 },
    { name: 'Java',       icon: 'fa-brands fa-java',     color: '#E32C2E', level: 'Familiar',    pct: 30 },
];

const LEVEL_DATA = [
    { level: 'Exposure',    color: '#6b7280', desc: "Seen it, read about it, maybe ran someone else's code. Haven't written anything independently." },
    { level: 'Familiar',    color: '#f59e0b', desc: 'Can write basic things independently. Understands the fundamentals but has clear gaps. Needs reference for anything beyond basics.' },
    { level: 'Comfortable', color: '#10b981', desc: 'Builds real things with it. Understands how and why things work, not just copying patterns. Still has a ceiling but can problem-solve within that ceiling.' },
    { level: 'Proficient',  color: '#3b82f6', desc: 'Confident across most use cases. Writes clean, intentional code. Knows best practices and applies them. Gaps exist but they are specific and narrow.' },
    { level: 'Advanced',    color: '#8b5cf6', desc: 'Deep knowledge including internals, edge cases, and patterns. Can mentor others. Knows what they do not know and knows how to find it.' },
    { level: 'Expert',      color: '#ec4899', desc: 'Mastery. Contributes to the language or ecosystem itself, or is a go-to authority in professional settings. Rare.' },
];

// ── FETCHED DATA STORES ───────────────────────────────────────
// Populated by loadAllData() before any render function runs

let FETCHED_PROJECTS = []; // INFO.json objects, one per project repo
let FETCHED_CERTS    = []; // entries from certs.json (or localStorage override)

// ── LOAD ALL DATA ─────────────────────────────────────────────

async function loadAllData() {

    // 1. Projects: read projects.json registry, then fetch each repo's INFO.json
    try {
        const res = await fetch('../data/projects.json');
        if (res.ok) {
            const repos = await res.json();
            const results = await Promise.all(
                repos.map(r =>
                    fetch(`https://raw.githubusercontent.com/${r.repo}/main/INFO.json`)
                        .then(r => r.ok ? r.json() : null)
                        .catch(() => null)
                )
            );
            FETCHED_PROJECTS = results.filter(Boolean);
        }
    } catch {}

    // 2. Certs: localStorage override first, else fetch certs.json
    try {
        const stored = localStorage.getItem('portfolio_certs');
        if (stored) {
            FETCHED_CERTS = JSON.parse(stored) || [];
        } else {
            const res = await fetch('../data/certs.json');
            if (res.ok) {
                const json = await res.json();
                FETCHED_CERTS = json.certificates || [];
            }
        }
    } catch {}
}

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
    root.innerHTML = '';

    // Build a flat entry list from all three sources
    const allEntries = [];

    // 1. Manual entries from TIMELINE_DATA (education, milestones, etc.)
    TIMELINE_DATA.forEach(block => {
        (block.entries || []).forEach(entry => {
            allEntries.push({ year: block.year, ...entry });
        });
    });

    // 2. Project entries auto-generated from FETCHED_PROJECTS
    FETCHED_PROJECTS.forEach(info => {
        // Prefer date (YYYY-MM) over year (YYYY) for month-accurate timeline display
        const raw     = info.date || null;
        const year    = raw
            ? parseInt(raw.split('-')[0])
            : (info.year || new Date().getFullYear());
        const d       = raw ? new Date(raw + '-01') : null;
        const dateStr = d
            ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
            : String(year);

        allEntries.push({
            year,
            title: info.name,
            date:  dateStr,
            desc:  info.description || '',
            type:  'project',
            id:    info.id || null,
        });
    });

    // 3. Cert entries auto-generated from FETCHED_CERTS
    FETCHED_CERTS.forEach(cert => {
        const year    = cert.date ? parseInt(cert.date.split('-')[0]) : new Date().getFullYear();
        const d       = cert.date ? new Date(cert.date + '-01') : null;
        const dateStr = d
            ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
            : String(year);

        allEntries.push({
            year,
            title: cert.title,
            date:  dateStr,
            desc:  cert.company ? `Issued by ${cert.company}` : (cert.details || ''),
            type:  'cert',
            id:    cert.id || null,
        });
    });

    // Group by year, sort years descending
    const byYear = {};
    allEntries.forEach(e => {
        if (!byYear[e.year]) byYear[e.year] = [];
        byYear[e.year].push(e);
    });

    const sortedYears = Object.keys(byYear).map(Number).sort((a, b) => b - a);

    if (sortedYears.length === 0) {
        root.innerHTML = `
            <div style="text-align:center;padding:40px 0;color:rgba(255,255,255,0.2);">
                <i class="fa-regular fa-clock" style="font-size:32px;margin-bottom:10px;display:block;"></i>
                No activity to timestamp.
            </div>
        `;
        return;
    }

    sortedYears.forEach((year, i) => {
        const entries = byYear[year];
        const block   = document.createElement('div');
        block.className = 'timeline-year-block';

        const isLast = i === sortedYears.length - 1;

        block.innerHTML = `
            <div class="timeline-year-row">
                <span class="timeline-year-label">${year}</span>
                <div class="timeline-line-col">
                    <div class="timeline-dot"></div>
                    ${!isLast || entries.length > 0 ? '<div class="timeline-vline"></div>' : ''}
                </div>
                <div class="timeline-entries" id="entries-${year}"></div>
            </div>
        `;

        root.appendChild(block);

        const entriesEl = document.getElementById('entries-' + year);

        entries.forEach(entry => {
            const el = document.createElement('div');
            el.className = 'timeline-entry';

            const learnMoreHTML = (entry.type === 'project' || entry.type === 'cert')
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

            // Learn More — switch to relevant section and highlight matching card
            const learnMoreBtn = el.querySelector('.timeline-learn-more');
            if (learnMoreBtn) {
                learnMoreBtn.addEventListener('click', (e) => {
                    e.stopPropagation();

                    if (entry.type === 'project') {
                        switchSection('projects');
                        setTimeout(() => {
                            document.querySelectorAll('.project-card').forEach(card => {
                                const matchById   = entry.id && card.dataset.projectId === entry.id;
                                const matchByName = !entry.id && card.querySelector('.project-name')?.textContent.trim() === entry.title;
                                if (matchById || matchByName) {
                                    card.classList.add('highlight');
                                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    setTimeout(() => card.classList.remove('highlight'), 1500);
                                }
                            });
                        }, 350);
                    } else if (entry.type === 'cert') {
                        switchSection('certificates');
                        setTimeout(() => {
                            document.querySelectorAll('.cert-card').forEach(card => {
                                const matchById   = entry.id && card.dataset.certId === entry.id;
                                const matchByName = !entry.id && card.querySelector('.cert-card-title')?.textContent.trim() === entry.title;
                                if (matchById || matchByName) {
                                    card.classList.add('highlight');
                                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    setTimeout(() => card.classList.remove('highlight'), 1500);
                                }
                            });
                        }, 350);
                    }
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
    root.innerHTML = '';

    if (FETCHED_PROJECTS.length === 0) {
        root.innerHTML = `
            <div style="text-align:center;padding:40px 0;color:rgba(255,255,255,0.2);">
                <i class="fa-solid fa-code" style="font-size:32px;margin-bottom:10px;display:block;"></i>
                No projects yet.
            </div>
        `;
        return;
    }

    // Group by year, sort descending
    const byYear = {};
    FETCHED_PROJECTS.forEach(info => {
        const y = info.year || new Date().getFullYear();
        if (!byYear[y]) byYear[y] = [];
        byYear[y].push(info);
    });

    Object.keys(byYear).sort((a, b) => b - a).forEach(year => {
        const group = document.createElement('div');
        group.className = 'projects-year-group';
        group.innerHTML = `<div class="projects-year-label">${year}</div>`;

        const grid = document.createElement('div');
        grid.className = 'projects-grid';

        byYear[year].forEach(info => {
            const card = document.createElement('div');
            card.className = 'project-card';

            // Store id as data attribute for timeline "Learn More" cross-linking
            if (info.id) card.dataset.projectId = info.id;

            const tagsHTML = (info.stack || []).map(t => `<span class="project-tag">${t}</span>`).join('');

            const liveBtnHTML = info.live
                ? `<a href="${info.live}" target="_blank" class="doc-card-btn view"><i class="fa-solid fa-arrow-up-right-from-square"></i> LIVE</a>`
                : `<span class="doc-card-btn view" style="opacity:0.3;cursor:not-allowed;pointer-events:none;"><i class="fa-solid fa-ban"></i> NO LIVE</span>`;

            const sourceBtnHTML = info.source
                ? `<a href="${info.source}" target="_blank" class="doc-card-btn download"><i class="fa-brands fa-github"></i> SOURCE</a>`
                : '';

            // Banner is already in INFO.json — no secondary fetch needed
            const previewHTML = info.banner
                ? `<img src="${info.banner}" alt="${info.name}" class="project-card-banner">`
                : `<i class="fa-solid fa-code project-card-placeholder-icon"></i>`;

            const contribHTML = info.contributions
                ? `<div class="project-card-contribution">${info.contributions}</div>`
                : '';

            card.innerHTML = `
                <div class="project-card-preview">${previewHTML}</div>
                <div class="project-card-body">
                    <div class="project-card-type">PROJECT</div>
                    <div class="project-name">${info.name}</div>
                    <div class="project-desc">${info.description || ''}</div>
                    <div class="project-tags">${tagsHTML}</div>
                </div>
                <div class="project-card-expand">
                    <div class="project-card-expand-inner">
                        ${contribHTML}
                        <div class="project-card-actions">
                            ${liveBtnHTML}${sourceBtnHTML}
                        </div>
                    </div>
                </div>
            `;

            // Handle broken banner image -> fallback icon
            const img = card.querySelector('.project-card-banner');
            if (img) {
                img.addEventListener('error', () => {
                    img.replaceWith(Object.assign(
                        document.createElement('i'),
                        { className: 'fa-solid fa-code project-card-placeholder-icon' }
                    ));
                });
            }

            // Click accordion
            card.addEventListener('click', (e) => {
                if (e.target.closest('.project-card-actions')) return;
                const isExpanded = card.classList.contains('expanded');
                document.querySelectorAll('.project-card.expanded').forEach(c => c.classList.remove('expanded'));
                if (!isExpanded) card.classList.add('expanded');
            });

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
        const previewEl   = card.querySelector('.doc-card-preview');
        const placeholder = previewEl.querySelector('.doc-card-placeholder-icon');

        pdfjsLib.getDocument(filePath).promise
            .then(pdf => pdf.getPage(1))
            .then(page => {
                const viewport = page.getViewport({ scale: 1 });
                const scale    = 220 / viewport.width;
                const scaled   = page.getViewport({ scale });

                const canvas     = document.createElement('canvas');
                canvas.className = 'doc-card-canvas';
                canvas.width     = scaled.width;
                canvas.height    = scaled.height;

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

    // 1. localStorage override
    try {
        const stored = localStorage.getItem('portfolio_docs');
        if (stored) docData = JSON.parse(stored);
    } catch {}

    // 2. Fetch data/docs.json
    if (!docData) {
        try {
            const res = await fetch('../data/docs.json');
            if (res.ok) {
                const json = await res.json();
                docData = {
                    cv:     json.cv     || [],
                    resume: json.resume || []
                };
            }
        } catch {}
    }

    // If neither localStorage nor docs.json returned anything, treat as empty
    if (!docData) docData = { cv: [], resume: [] };

    grid.innerHTML = '';

    const allDocs = [
        ...docData.cv.map(d => ({ ...d, type: 'CV' })),
        ...docData.resume.map(d => ({ ...d, type: 'Resume' }))
    ];

    if (allDocs.length === 0) {
        grid.innerHTML = `
            <div style="text-align:center;padding:40px 0;color:rgba(255,255,255,0.2);width:100%;">
                <i class="fa-regular fa-folder-open" style="font-size:32px;margin-bottom:10px;display:block;"></i>
                No documents yet.
            </div>
        `;
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

// ── REACH ME FORM ─────────────────────────────────────────────

// EmailJS config — fill in your actual IDs before going live
const EMAILJS_SERVICE_ID  = 'service_14k6rn2';
const EMAILJS_TEMPLATE_ID = 'template_3vpd3va';
const EMAILJS_PUBLIC_KEY  = 'Ud1McQEFvE0f7-f5I';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const reachForm = document.getElementById('reachForm');

let reachBtnResetTimer = null;

function triggerReachInputError(input) {
    const field = input.closest('.reach-field');

    input.classList.remove('input-error');
    if (field) field.classList.remove('shake');
    void input.offsetWidth;

    input.classList.add('input-error');
    if (field) field.classList.add('shake');

    if (field) {
        field.addEventListener('animationend', () => {
            field.classList.remove('shake');
        }, { once: true });
    }

    input.addEventListener('input', () => {
        input.classList.remove('input-error');
    }, { once: true });
}

function triggerReachBtnError(message) {
    const btn = reachForm.querySelector('.reach-btn');
    if (!btn) return;
    if (reachBtnResetTimer) clearTimeout(reachBtnResetTimer);
    btn.classList.remove('btn-error', 'btn-success');
    void btn.offsetWidth;
    btn.classList.add('btn-error');
    btn.innerHTML = `${message} <i class="fa-solid fa-xmark"></i>`;
    reachBtnResetTimer = setTimeout(() => {
        btn.classList.remove('btn-error');
        btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    }, 1800);
}

function triggerReachBtnSuccess() {
    const btn = reachForm.querySelector('.reach-btn');
    if (!btn) return;
    if (reachBtnResetTimer) clearTimeout(reachBtnResetTimer);
    btn.classList.remove('btn-error');
    btn.classList.add('btn-success');
    btn.innerHTML = 'Sent! <i class="fa-solid fa-check"></i>';
    btn.disabled = true;
    reachBtnResetTimer = setTimeout(() => {
        btn.classList.remove('btn-success');
        btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        btn.disabled = false;
        reachForm.reset();
    }, 2500);
}

if (reachForm) {
    reachForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput    = document.getElementById('r-name');
        const emailInput   = document.getElementById('r-email');
        const subjectInput = document.getElementById('r-subject');
        const msgInput     = document.getElementById('r-message');

        const name    = nameInput.value.trim();
        const email   = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = msgInput.value.trim();

        // Validate all fields in order
        if (!name) {
            triggerReachInputError(nameInput);
            triggerReachBtnError('ENTER YOUR NAME');
            return;
        }
        if (!email) {
            triggerReachInputError(emailInput);
            triggerReachBtnError('ENTER YOUR EMAIL');
            return;
        }
        if (!EMAIL_REGEX.test(email)) {
            triggerReachInputError(emailInput);
            triggerReachBtnError('INVALID EMAIL');
            return;
        }
        if (!subject) {
            triggerReachInputError(subjectInput);
            triggerReachBtnError('ENTER A SUBJECT');
            return;
        }
        if (!message) {
            triggerReachInputError(msgInput);
            triggerReachBtnError('ENTER YOUR MESSAGE');
            return;
        }

        // Send via EmailJS
        const btn = reachForm.querySelector('.reach-btn');
        btn.disabled = true;
        btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                { from_name: name, from_email: email, subject, message },
                EMAILJS_PUBLIC_KEY
            );
            triggerReachBtnSuccess();
        } catch (err) {
            console.error('EmailJS error:', err);
            btn.disabled = false;
            triggerReachBtnError('FAILED TO SEND');
        }
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

function populateStats() {
    // Counts derived entirely from fetched JSON data
    const projectCount = FETCHED_PROJECTS.length;
    const certCount    = FETCHED_CERTS.length;
    const startYear    = 2025;
    const yearsExp     = new Date().getFullYear() - startYear;
    const langCount    = LANG_DATA.length;

    const setValue = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    setValue('statProjects', projectCount);
    setValue('statCerts',    certCount);
    setValue('statYears',    yearsExp);
    setValue('statLangs',    langCount);
}

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

// ── RENDER CERTIFICATES ───────────────────────────────────────

function renderCertCard(data) {
    const card = document.createElement('div');
    card.className = 'cert-card';
    if (data.id) card.dataset.certId = data.id;

    const filePath = data.file ? `../${data.file}` : null;

    let dateStr = '';
    if (data.date) {
        const d = new Date(data.date + '-01');
        dateStr = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }

    const previewHTML = filePath
        ? `<img src="${filePath}" alt="${data.title}" loading="lazy">`
        : `<i class="fa-solid fa-certificate cert-card-placeholder-icon"></i>`;

    card.innerHTML = `
        <div class="cert-card-preview">${previewHTML}</div>
        <div class="cert-card-body">
            <div class="cert-card-title">${data.title}</div>
            ${data.details ? `<div class="cert-card-details">${data.details}</div>` : ''}
            ${dateStr ? `<div class="cert-card-date">${dateStr}</div>` : ''}
        </div>
    `;

    // Handle broken image -> fallback to placeholder icon
    const img = card.querySelector('.cert-card-preview img');
    if (img) {
        img.addEventListener('error', () => {
            img.replaceWith(Object.assign(
                document.createElement('i'),
                { className: 'fa-solid fa-certificate cert-card-placeholder-icon' }
            ));
        });
    }

    // Click anywhere on card -> open overlay
    card.addEventListener('click', () => {
        const overlay   = document.getElementById('certOverlay');
        const overlayImg = document.getElementById('certOverlayImg');
        if (!overlay || !overlayImg || !filePath) return;
        overlayImg.src = filePath;
        overlayImg.alt = data.title;
        overlay.classList.add('open');
    });

    return card;
}

function renderCerts() {
    const root    = document.getElementById('certsRoot');
    const sortBar = document.getElementById('certsSortBar');
    if (!root) return;

    if (!FETCHED_CERTS || FETCHED_CERTS.length === 0) {
        if (sortBar) sortBar.innerHTML = '';
        root.innerHTML = `
            <div style="text-align:center;padding:40px 0;color:rgba(255,255,255,0.2);width:100%;">
                <i class="fa-solid fa-certificate" style="font-size:32px;margin-bottom:10px;display:block;"></i>
                No certificates yet.
            </div>
        `;
        return;
    }

    // Build unique company list, sorted alphabetically, Unknown last
    const companies = [];
    FETCHED_CERTS.forEach(cert => {
        const c = (cert.company || '').trim() || 'Unknown';
        if (!companies.includes(c)) companies.push(c);
    });
    companies.sort((a, b) => a === 'Unknown' ? 1 : b === 'Unknown' ? -1 : a.localeCompare(b));

    // Always show company pills as labels (no click/filter)
    if (sortBar) {
        sortBar.innerHTML = '';
        companies.forEach(company => {
            const pill = document.createElement('span');
            pill.className = 'certs-sort-btn active';
            pill.textContent = company.toUpperCase();
            sortBar.appendChild(pill);
        });
    }

    // Always render grouped by company
    root.innerHTML = '';
    companies.forEach(company => {
        const group = FETCHED_CERTS.filter(c =>
            ((c.company || '').trim() || 'Unknown') === company
        );
        if (group.length === 0) return;

        const groupEl = document.createElement('div');
        groupEl.className = 'certs-company-group';
        groupEl.innerHTML = `<div class="certs-company-label">${company.toUpperCase()}</div>`;

        const grid = document.createElement('div');
        grid.className = 'certs-grid';
        group.forEach(cert => grid.appendChild(renderCertCard(cert)));
        groupEl.appendChild(grid);
        root.appendChild(groupEl);
    });
}

// ── CERT OVERLAY WIRING ───────────────────────────────────────

const certOverlay      = document.getElementById('certOverlay');
const certOverlayClose = document.getElementById('certOverlayClose');

if (certOverlayClose) {
    certOverlayClose.addEventListener('click', () => certOverlay.classList.remove('open'));
}

if (certOverlay) {
    certOverlay.addEventListener('click', (e) => {
        if (e.target === certOverlay) certOverlay.classList.remove('open');
    });
}

// ── BOOT ──────────────────────────────────────────────────────

async function boot() {
    try { await loadAllData(); } catch(e) { console.warn('loadAllData failed:', e); }
    try { renderTimeline(); }  catch(e) { console.warn('renderTimeline failed:', e); }
    try { renderProjects(); }  catch(e) { console.warn('renderProjects failed:', e); }
    try { renderDocs(); }      catch(e) { console.warn('renderDocs failed:', e); }
    try { renderSkills(); }    catch(e) { console.warn('renderSkills failed:', e); }
    try { renderCerts(); }     catch(e) { console.warn('renderCerts failed:', e); }
    try { populateStats(); }   catch(e) { console.warn('populateStats failed:', e); }
}

boot();

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
    if (!e.target.closest('.project-card')) {
        document.querySelectorAll('.project-card.expanded').forEach(c => c.classList.remove('expanded'));
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
