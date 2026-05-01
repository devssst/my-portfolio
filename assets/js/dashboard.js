// ============================================================
// dashboard.js — Developer VIEN Portfolio Dashboard
// ============================================================

// ── DATA ────────────────────────────────────────────────────

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
                live: null,
                source: "https://github.com/devssst/slims"
            }
        ]
    }
];

// ── INIT ─────────────────────────────────────────────────────

const params   = new URLSearchParams(window.location.search);
const isAdmin  = params.get('mode') === 'admin';

const badge    = document.getElementById('modeBadge');
const header   = document.getElementById('dashHeader');
const content  = document.getElementById('dashContent');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.dash-section');

// Set mode badge
if (badge) {
    badge.textContent = isAdmin ? 'ADMIN' : 'VISITOR';
    if (isAdmin) badge.classList.add('admin');
}

// ── SECTION SWITCHING ─────────────────────────────────────────

let currentSection = 'home';

function switchSection(id) {
    if (id === currentSection) return;

    const current = document.getElementById('section-' + currentSection);
    const target  = document.getElementById('section-' + id);
    if (!target) return;

    if (current) {
        current.classList.remove('active');
    }

    target.classList.add('active');
    target.scrollTop = 0;
    currentSection = id;

    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
    });

    // Show header whenever section switches
    showHeader();
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        switchSection(link.dataset.section);
    });
});

// ── HEADER HIDE/SHOW ON SECTION SCROLL ───────────────────────

let lastScrollY   = 0;
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

// Attach scroll listeners to each section
sections.forEach(section => {
    section.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = section.scrollTop;

                if (scrollY > lastScrollY && scrollY > 60) {
                    hideHeader();
                } else if (scrollY < lastScrollY) {
                    showHeader();
                }

                lastScrollY = scrollY;
                ticking = false;
            });
            ticking = true;
        }
    });
});

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
        // TODO: wire EmailJS in Phase 3
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

// ── BOOT ──────────────────────────────────────────────────────

renderTimeline();
renderProjects();
