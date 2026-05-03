# 🧑‍💻 Developer VIEN — Portfolio
### 🔰 Phase 3 — Dashboard Sections (Complete) | Phase 4 — Admin Edit Mode (Planned)
![Portfolio Background](assets/images/banner.png)

A personal developer portfolio for **Vien Fritzgerald V. Calderon**, built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no backend. Features a dark glassmorphism aesthetic, dual-mode welcome page (Visitor & Developer), and a fully editable admin dashboard powered by JSON data files and GitHub-hosted project metadata.

---

## 🎯 Overview

This portfolio is designed to present Vien's developer life, projects, and background in a clean, interactive format. Visitors can browse the portfolio in read-only mode, while the developer (Vien) can log in through a restricted login form to gain admin access — enabling live edits to content directly on the dashboard.

All content (projects, certificates, CV/resume documents) is driven by JSON files — no hardcoded data in JavaScript. Projects are fetched automatically from their own GitHub repos via `INFO.json`.

### 👨‍💻 Developer
**Developer VIEN (Vien Fritzgerald V. Calderon)**

---

## ✨ Key Features

### 🏠 Welcome Page
- Dual-mode landing page — **Visitor Mode** (default) and **Developer Mode** (toggle via double-clicking the logo)
- Visitor Mode: click "Visit Page" to enter the dashboard in read-only mode
- Developer Mode: restricted login form with email/password fields, Google and Microsoft OAuth buttons, SHOW/HIDE password toggle, and animated error/success feedback

### 📊 Dashboard
- **Home**: Hero section with profile photo, name, and social icon links; CV/Resume doc cards with PDF.js thumbnails — data loaded from `data/docs.json`
- **WHO AM I?**: Age (live-calculated, updates every minute), educational background, and stat cards (Projects, Certificates, Yrs Experience, Languages) — counts auto-derived from JSON data; stat cards are clickable and navigate to their respective sections
- **Languages & Tools**: Animated horizontal skill bars with language logo icons and brand colors (HTML orange, CSS purple, JS yellow, Python blue, Java red); level labels per bar; a legend card (right of bars) showing all 6 proficiency levels as color-coded dots — click the legend to open a full modal with level definitions
- **TIMESTAMPS**: Auto-generated from `projects.json` (project entries) + `certs.json` (certificate entries) + hardcoded `TIMELINE_DATA` (education/milestones); grouped by year descending; date shown on click (accordion toggle); "Learn More" on project entries cross-links to PROJECTS by `data-project-id`
- **Projects**: Year-grouped card grid auto-fetched via `data/projects.json` registry — each entry fetches its repo's `INFO.json` from `raw.githubusercontent.com`; universal card spec with preview zone (banner or placeholder icon), accordion expand footer with contribution text + Live and Source buttons
- **Certificates**: Gallery layout with certificate cards (220px, PNG preview, title, short details, date obtained); clicking a card opens the certificate as a full-screen image overlay with blur backdrop and outside-click/X-button close — data from `data/certs.json`
- **SEND ME YOUR DM**: Contact form (name, email, subject, message) with full validation (all fields required, email format checked), animated error states (shake + red border per field, red button with message), success state (green button, auto-reset + form clear after 2.5s), and EmailJS integration — sends directly to Vien's Gmail inbox with Reply-To set to the sender's email

### 🔐 Authentication
- Developer Mode toggle via logo double-click on the welcome page
- Hardcoded credentials as a placeholder (Firebase Auth to be added later)
- Admin redirect to dashboard with `?mode=admin` query param
- Mode badge (VISITOR / ADMIN) with a dropdown: FAQ, EDIT (admin only), LEAVE

### ✏️ Admin Edit Mode *(Phase 4 — Planned)*
- Edit button revealed in badge dropdown when logged in as admin (currently `console.log` placeholder)
- WHO AM I?: inline editing; Save writes to `localStorage`
- TIMESTAMPS: add and remove entries with date, title, and description
- Projects: add project via GitHub repo fetch (reads INFO.json), remove button per card
- All changes persisted via `localStorage`

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS — glassmorphism (body-level backdrop-filter), CSS Grid, CSS Variables
- **Auth**: Firebase Authentication (Google OAuth) — *planned, not yet integrated*
- **Contact**: EmailJS (free tier, no backend) — Gmail service, domain-restricted to `devssst.github.io`
- **PDF Preview**: PDF.js (v3.11.174) — canvas-based first-page thumbnail rendering
- **Persistence**: localStorage (admin edits, profile card state, cert/doc overrides)
- **Font**: Plus Jakarta Sans
- **Icons**: Font Awesome 6

🔗 ***Links***:
- **Firebase Console**: [console.firebase.google.com](https://console.firebase.google.com)
- **EmailJS**: [emailjs.com](https://www.emailjs.com)
- **Font**: [Plus Jakarta Sans — Google Fonts](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Icons**: [Font Awesome](https://fontawesome.com)
- **Grid Tool**: [CSS Grid Generator](https://cssgrid-generator.netlify.app/)
- **Glass Reference**: [Glassmorphism Generator](https://hype4.academy/tools/glassmorphism-generator)

---

## 📁 Project Structure

```
my-portfolio/
│
├── 📂 assets/
│   ├── 📂 css/
│   │   ├── style.css           # Welcome page styles (index.html)
│   │   └── dashboard.css       # Dashboard styles (pages/dashboard.html)
│   │
│   ├── 📂 js/
│   │   ├── main.js             # Welcome page logic, mode toggle, login form
│   │   └── dashboard.js        # Dashboard rendering, navigation, boot sequence
│   │
│   └── 📂 images/
│       ├── logo.png            # Red V logo (favicon + header)
│       ├── background.png      # Python code-art background
│       ├── picture.jpeg        # Developer profile picture
│       ├── google.png          # Google OAuth icon
│       ├── banner.png          # README.md preview
│       └── microsoft.png       # Microsoft OAuth icon
│
├── 📂 data/
│   ├── 📂 files/
│   │   └── resume.pdf          # PDFs and certificate PNGs go here
│   ├── projects.json           # Registry of project repo slugs
│   ├── docs.json               # CV/Resume metadata
│   └── certs.json              # Certificate metadata
│
├── 📂 pages/
│   └── dashboard.html          # Main portfolio dashboard
│
├── INFO.json                   # This repo's own project data
├── index.html                  # Welcome & login page (entry point)
└── README.md                   # Project documentation
```

---

## 🗂️ Data Files

All dashboard content is driven by JSON files. No project, certificate, or document data is hardcoded in JavaScript.

### data/projects.json — project registry
```json
[
    { "repo": "devssst/my-portfolio" },
    { "repo": "devssst/your-next-project" }
]
```
Add one line per project repo. The site fetches `INFO.json` from each repo automatically.

### INFO.json — place at root of each project repo
```json
{
    "id": "proj-001",
    "name": "Project Name",
    "year": 2026,
    "date": "2026-03",
    "description": "One sentence shown on the project card.",
    "about": "Full paragraph shown on expand.",
    "contributions": "Your role and what you specifically built.",
    "stack": ["HTML", "CSS", "JS"],
    "banner": "https://raw.githubusercontent.com/devssst/your-repo/main/data/previews/banner.png",
    "live": "https://devssst.github.io/your-repo",
    "source": "https://github.com/devssst/your-repo"
}
```
> **banner** must be a full `raw.githubusercontent.com` URL — relative paths will 404. Omit the field to show the `fa-code` placeholder instead.

### data/certs.json — certificate metadata
```json
{
    "certificates": [
        {
            "id": "cert-001",
            "title": "Certificate Title",
            "company": "Microsoft",
            "details": "Short description.",
            "date": "2026-01",
            "file": "data/files/cert1.png"
        }
    ]
}
```
`date` format: `YYYY-MM`, rendered as "Jan 2026". Place PNG files in `data/files/`.

### data/docs.json — CV/Resume metadata
```json
{
    "cv": [
        {
            "id": "doc-cv-001",
            "title": "Curriculum Vitae",
            "type": "CV",
            "uploaded": "2026-05-01",
            "file": "data/files/cv.pdf"
        }
    ],
    "resume": [
        {
            "id": "doc-resume-001",
            "title": "Resume",
            "type": "Resume",
            "uploaded": "2026-05-01",
            "file": "data/files/resume.pdf"
        }
    ]
}
```

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection

### Running on the web
- Access through the web: https://devssst.github.io/my-portfolio

### Adding a new project
1. Place an `INFO.json` at the root of the project repo
2. Add one line to `data/projects.json`: `{ "repo": "devssst/your-repo" }`
3. Push both — the portfolio auto-fetches the rest

### Firebase Setup *(planned — not yet active)*
1. Go to [Firebase Console](https://console.firebase.google.com) and create a project
2. Enable **Google Sign-In** under Authentication → Sign-in method
3. Add your Firebase config to `main.js`
4. Whitelist only your Google UID under authorized users

---

## 🎨 Design Language

### Color Palette
- **Background**: Python code-art image (`background.png`), fixed attachment
- **Overlay**: Single `body::before` with `rgba(0, 0, 0, 0.75)` + `backdrop-filter: blur(6px)` applied once globally
- **Header**: `rgba(17, 25, 40, 0.80)` with its own `backdrop-filter: blur(8px) saturate(180%)`
- **Cards**: `rgba(255, 255, 255, 0.001–0.01)` — extremely subtle white tint, defined by borders
- **Accent Purple**: `#a855f7` / `#7c22e8` / `#c026d3`
- **Logo**: Red `#FF2200` V on black
- **Text Primary**: `#ffffff`
- **Text Muted**: `rgba(255, 255, 255, 0.35–0.65)`

> **Note:** Per-card `backdrop-filter` is currently disabled (commented out) due to performance issues. Glassmorphism is achieved via the single global `body::before` blur instead. Commented-out blocks are intentionally left in the code for future re-enablement.

### Language Bar Colors
Each skill bar uses the official brand color of the language:
- **HTML**: `#E34F26` (orange)
- **CSS**: `#663399` (purple)
- **JavaScript**: `#F7DF1E` (yellow)
- **Python**: `#3776AB` (blue)
- **Java**: `#E32C2E` (red)

### UI Highlights
- Section-based navigation: 6 sections (`home`, `about`, `timeline`, `projects`, `certificates`, `reach`)
- Mouse wheel and touch swipe hijacking between sections (300ms cooldown, 5px bottom threshold)
- Profile card smooth slide-out animation with synchronized content shift; state synced across all 4 sections
- Purple scrollbar that auto-appears on scroll, fades after 1.5s of inactivity
- Purple gradient buttons with hover lift and glow
- Shake animation on login errors, green/red button state transitions on success/failure
- Animated skill bars triggered once on first ABOUT section entry
- Clickable stat cards with section navigation
- Consistent empty states across all sections: centered icon + muted text, uniform style

---

## 🚧 Roadmap

### Phase 1 — Welcome Page & Auth
- [x] Visitor Mode welcome screen with Visit Page button
- [x] Double-click logo toggle between Visitor and Developer modes
- [x] Developer login form UI (email, password, SHOW/HIDE toggle)
- [x] Google and Microsoft OAuth button layout
- [x] Form validation with animated error states (shake + red inputs)
- [x] Login success state (green button → redirect to dashboard)
- [x] Back to Visitor Mode button
- [ ] Firebase project setup and Google Sign-In integration
- [ ] Developer UID whitelist in Firebase
- [x] Redirect to `pages/dashboard.html?mode=admin` on successful login
- [ ] Store auth state in `sessionStorage`

### Phase 2 — Dashboard Shell
- [x] Sticky header matching `index.html` style — show "ADMIN" badge if `?mode=admin`
- [x] HTML skeleton with 6 section anchors: `home`, `about`, `timeline`, `projects`, `certificates`, `reach`
- [x] Section navigation via header nav links and mouse wheel/touch hijacking
- [x] Full-page scrolling layout, dark overlay, consistent padding
- [x] Read `?mode=admin` param in `dashboard.js` and set global `isAdmin` flag

### Phase 3 — Dashboard Sections
- [x] **Home** — profile photo, name, tagline, social icon links, CV/Resume doc cards with PDF.js thumbnails
- [x] **WHO AM I?** — live age counter, education card, bio paragraph; profile card collapse animation; stat grid with clickable cards; stat counts auto-derived from JSON data
- [x] **Languages & Tools** — animated horizontal bars, brand-colored fills, level labels; legend card; proficiency level modal
- [x] **TIMESTAMPS** — auto-generated from `projects.json` + `certs.json` + hardcoded `TIMELINE_DATA`; date accordion; "Learn More" cross-links to PROJECTS by id
- [x] **Projects** — auto-fetched via `projects.json` → `INFO.json` chain; universal card spec; `data-project-id` for timeline cross-linking
- [x] **CV / Resume** — doc cards with PDF.js thumbnails; VIEW + SAVE buttons; loads from `data/docs.json` → fallback; empty state on missing file
- [x] **Certificates** — gallery layout; PNG card previews; full-screen image overlay; data from `data/certs.json`; empty state on no data
- [x] **Auto-rendering** — all content sourced from JSON; stats auto-counted; timeline auto-generated; boot crash-isolated per render function
- [x] **SEND ME YOUR DM** — full validation (name, email format, subject, message); shake + error animations; EmailJS wired (service_14k6rn2, template_3vpd3va); success/spinner states; domain-restricted to devssst.github.io

### Phase 4 — Admin Edit Mode
- [ ] EDIT in badge dropdown triggers edit mode globally (currently `console.log` placeholder)
- [ ] WHO AM I?: inline editing; Save writes to `localStorage`
- [ ] TIMESTAMPS: inline "Add entry" form (date, title, description) + delete icon per entry
- [ ] Projects: FETCH button to pull INFO.json from a GitHub repo; auto-creates card and timeline entry; remove button per card
- [ ] Certificates: UPLOAD button with config form (title, description, date, company)
- [ ] CV/Resume: UPLOAD button with config form (type selector, auto-fill date)
- [ ] On page load, check `localStorage` first — override JSON file data if present

### Phase 5 — Polish & Deploy
- [ ] Mobile responsiveness — test at 375px, fix header, hero, timeline, project grid
- [ ] Scroll-triggered entrance animations via `IntersectionObserver`
- [ ] Deploy to GitHub Pages (repo: `devssst/my-portfolio`)
- [ ] Update Firebase authorized domains to include GitHub Pages URL

---

## 📋 Update Logs

### Phase 3 — Auto-Rendering Refinements (May 2026)

**JSON-driven content architecture**
- Removed all hardcoded project and certificate data from `dashboard.js`
- Introduced `data/projects.json` as a registry of GitHub repo slugs — the "highway" file. `loadAllData()` reads it first, then fetches each repo's `INFO.json` in parallel using `Promise.all`
- `FETCHED_PROJECTS[]` and `FETCHED_CERTS[]` module-level stores hold all fetched data before any render function runs
- `boot()` converted to `async` — `await loadAllData()` runs first, then all render functions execute against pre-loaded data
- Each render call in `boot()` wrapped in individual `try/catch` — one failing render no longer cascades and kills the rest

**File renames**
- `data/metadata.json` → `data/certs.json` (intent clarified)
- `data/list.json` → `data/docs.json` (intent clarified)
- New `data/projects.json` added for project repo registry

**Schema updates**
- `INFO.json` gains `id` field — required for stats counting and timeline cross-linking
- `certs.json` entries gain `id` and `company` fields — `company` is store-only for now
- `docs.json` entries gain `id` field

**renderTimeline() rewritten**
- Merges three sources: manual `TIMELINE_DATA`, project entries from `FETCHED_PROJECTS`, cert entries from `FETCHED_CERTS`
- Groups by year, sorted descending after merge
- Guard added: `(block.entries || []).forEach()` — empty objects in `TIMELINE_DATA` no longer crash the render

**renderProjects() rewritten**
- No longer fetches `INFO.json` inside each card — data already loaded by `loadAllData()`
- Groups by year, sorted descending
- `data-project-id` on each card — timeline "Learn More" matches by id first, falls back to name

**populateStats() rewritten**
- Synchronous — reads `FETCHED_PROJECTS.length` and `FETCHED_CERTS.length` directly

**Bug fixes**
- `renderDocs()`: null-guard added — missing `docs.json` + no localStorage now renders "No documents yet." instead of crashing
- `boot()`: individual `try/catch` per render — one crash no longer silently kills the rest
- `renderTimeline()`: `(block.entries || [])` guard — empty `TIMELINE_DATA` objects no longer throw

**Consistent empty states**
- All sections now use the same style: centered 32px FA icon + muted text + `padding: 40px 0`
- Icons: `fa-folder-open` (docs), `fa-clock` (timeline), `fa-code` (projects), `fa-certificate` (certs)

---

**REACH ME Section — Feature 8 (May 2026)**
- Full form validation: name, email (regex format check), subject, message — all required; first invalid field triggers error
- Error animations ported from login page: `.shake` on `.reach-field` wrapper, `.input-error` red border on input, `.btn-error` red gradient on button with descriptive message
- Success state: green button "Sent!", auto-resets after 2.5s and clears the form
- Spinner state ("Sending...") while EmailJS request is in-flight; button disabled during send
- EmailJS integrated: `service_14k6rn2`, `template_3vpd3va`, Public Key `Ud1McQEFvE0f7-f5I`
- Template variables: `from_name`, `from_email`, `subject`, `message`; Reply-To set to sender's email
- Domain allowlist set in EmailJS Security tab: `https://devssst.github.io`
- Telegram and Messenger buttons dropped entirely from scope

---

**Certificates Section — Feature 7**
- Gallery layout using `.certs-grid` (flex-wrap, `align-items: flex-start`)
- `.cert-card` matches the universal card visual spec (220px) but has no accordion expand footer — full card is the click target
- Preview zone: PNG from `data.file`; broken image falls back to `fa-certificate` placeholder icon
- Body: title, short details, date obtained formatted "Mon YYYY" in purple
- Clicking a card opens `#certOverlay` — full-screen image modal with `backdrop-filter: blur(4px)`, X button, outside-click close
- Data source: `data/certs.json` → `certificates` array; localStorage `portfolio_certs` overrides on load

---

**Projects Section — Universal Card Spec (Feature 6)**
- `.project-card` rebuilt to match the universal card spec used by CV/Resume doc cards
- Preview zone (110px): banner image from `INFO.json` full raw URL; falls back to `fa-code` placeholder
- Body: PROJECT type eyebrow, project name, description, tech stack tag pills
- Accordion expand footer: contribution text above LIVE + SOURCE action buttons
- `align-items: start` on `.projects-grid` — fixes row-stretch expand bug
- Outside-click collapse wired in the global document handler
- `highlight` class for TIMESTAMPS "Learn More" cross-link preserved

---

**Clickable Stat Cards + Skills Block (ABOUT section)**
- PROJECT, CERTIFICATES, EXPERIENCE stat cards navigate to their respective sections on click
- `LANG_DATA` and `LEVEL_DATA` arrays added; `renderSkills()` builds bars and legend card
- Bar animation triggers once on first ABOUT section entry (350ms delay, staggered per bar)
- Clicking the legend card opens a levels modal with full proficiency definitions

---

**Earlier Phase 3 work:**
- Section navigation system with 6 sections; wheel/touch hijacking with 300ms cooldown
- TIMESTAMPS and Projects rendered from JS data arrays; grouped by year
- CV/Resume doc cards with PDF.js canvas thumbnails; VIEW + SAVE buttons
- Profile card collapse with `translateX` slide-out; state synced across 4 sections
- Live age counter updating every minute
- Purple scrollbar auto-show/hide via per-element timeout map
- Mode badge dropdown with FAQ, EDIT (admin only), LEAVE

**Design decisions:**
- Glassmorphism moved from per-card `backdrop-filter` to a single `body::before` overlay for performance
- Section names finalized: **WHO AM I?**, **TIMESTAMPS**, **SEND ME YOUR DM**
- Header scroll-hide disabled — header stays fixed; functions left in code for future re-enablement

---

### Phase 2 — Dashboard Shell (Completed, May 2026)
- Dashboard HTML skeleton with all 6 section anchors
- Sticky header with ADMIN/VISITOR badge
- `dashboard.js`: `isAdmin` flag, `switchSection()`, `loadFromStorage()` localStorage wrapper
- `section-fade-in` CSS animation on section switch (0.3s)

---

### Phase 1 — Welcome Page & Auth (Completed, May 2026)
- Dual-mode welcome page (Visitor / Developer toggle via logo double-click)
- Login card UI with glassmorphism styling — email, password, SHOW/HIDE toggle
- Google and Microsoft social login button layout
- Form validation: empty field check, email format check, hardcoded credential check
- Animated feedback: shake on invalid input, red/green button states, success redirect
- Hardcoded credentials as placeholder (to be replaced with Firebase Auth)

**Technical:**
- `main.js`: mode toggle, form validation, `triggerInputError()`, `triggerBtnError()`, `triggerBtnSuccess()`
- `style.css`: `.login-card` glassmorphism, `.input-groups`, `.p-wrapper`, `.toggle-text`, `.divider`, `.social-btn`, `.btn-error`, `.btn-success`, `@keyframes shake`

---

## 📄 License

This project is proprietary software. All rights reserved by Developer VIEN.
The source code is publicly visible on GitHub for portfolio evaluation purposes only.
See [LICENSE.md](LICENSE.md) for full terms.

---

## 👨‍💻 Developer

**Developer VIEN**

- Full name: Vien Fritzgerald V. Calderon
- Course & Section: Bachelor of Science in Information Technology — 1I
- Institution: Dalubhasaang Politekniko ng Lungsod ng Baliwag
- GitHub: [devssst/my-portfolio](https://github.com/devssst/my-portfolio)
- Year: 2026

---

## 📞 Contact

- Email: viencalderon15@gmail.com
- GitHub: [github.com/devssst](https://github.com/devssst)

---

**Made with ❤️ — a personal space to grow as a developer.**

*"Know the process and learn how to play with it."* — Developer VIEN
