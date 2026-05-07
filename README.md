# 🧑‍💻 Developer VIEN — Portfolio
### 🔰 Phase 3 — Complete | Phase 4 — In Progress (WHO AM I? edit complete)
![Portfolio Background](assets/images/banner.png)

A personal developer portfolio for **Vien Fritzgerald V. Calderon**, built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no backend. Features a dark aesthetic, dual-mode welcome page (Visitor & Developer), and a fully data-driven dashboard powered by Firebase Firestore and GitHub-hosted project metadata.

---

## 🎯 Overview

This portfolio presents Vien's developer life, projects, and background in a clean, interactive format. Visitors browse in read-only mode. Content is managed directly by the developer through an in-dashboard edit mode.

All content (projects, certificates, CV/resume documents, timeline events) is driven by Firestore documents. No data is hardcoded in JavaScript. Projects are fetched automatically from their own GitHub repos via `INFO.json`. Physical files (PDFs, certificate images) are stored in the GitHub repo under `data/files/` and served via `raw.githubusercontent.com`.

### 👨‍💻 Developer
**Developer VIEN (Vien Fritzgerald V. Calderon)**

---

## ✨ Key Features

### 🏠 Welcome Page
- Simple landing page — click "Visit Page" to enter the portfolio dashboard

### 📊 Dashboard
- **Home**: Hero section with profile photo, name, and social icon links; CV/Resume doc cards with PDF.js thumbnails — data loaded from Firestore `portfolio/docs`; VIEW opens the GitHub PDF viewer, SAVE triggers a direct download
- **WHO AM I?**: Live age counter (updates every minute from DOB Dec 15 2006), stackable education cards (array — multiple degrees supported), bio paragraph, stat cards (Projects, Certificates, Yrs Experience, Languages) — counts auto-derived from Firestore data; stat cards navigate to their section on click; consistent empty states for bio, education, and languages
- **Languages & Tools**: Animated horizontal skill bars with language logo icons and brand colors; level labels per bar; legend card with 6 proficiency levels — click legend to open the full levels modal
- **TIMESTAMPS**: Auto-generated from Firestore `portfolio/timestamp` (project + manual entries); grouped by year descending; date shown on click (accordion toggle); "Learn More" on project entries cross-links to the matching card
- **Projects**: Year-grouped card grid auto-fetched via `timestamp` → `INFO.json` per repo; universal card spec with banner preview, accordion expand showing contribution text + Live and Source buttons
- **Certificates**: Gallery layout (220px cards, PNG previews, title, details, date); clicking a card opens a full-screen image overlay — data from Firestore `portfolio/certs`
- **SEND ME YOUR DM**: Contact form (name, email, subject, message) with full validation, animated error states, EmailJS integration with success/spinner states

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+ modules)
- **Styling**: Custom CSS — single global `body::before` blur overlay, CSS Grid, CSS Variables
- **Auth**: Firebase Authentication — Email/Password + Google Sign-In (both active)
- **Database**: Firebase Firestore — all portfolio data stored in `portfolio` collection
- **File hosting**: GitHub repo `data/files/` — served via `raw.githubusercontent.com`
- **File management**: GitHub Contents API — push, update, and delete files programmatically; PAT stored in Firestore, loaded at runtime in edit mode only
- **Contact**: EmailJS (free tier, no backend) — credentials stored in Firestore
- **PDF Preview**: PDF.js (v3.11.174) — canvas-based first-page thumbnail rendering
- **Font**: Plus Jakarta Sans
- **Icons**: Font Awesome 6.5.1
- **Hosting**: GitHub Pages

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
│   │   ├── main.js             # Welcome page logic and interactions
│   │   └── dashboard.js        # Dashboard rendering, navigation, boot sequence, Firestore fetch
│   │
│   └── 📂 images/
│       ├── logo.png            # Red V logo (favicon + header)
│       ├── background.png      # Python code-art background
│       ├── picture.jpeg        # Developer profile picture
│       ├── banner.png          # README.md preview image
│       ├── google.png          # Social icon
│       └── microsoft.png       # Social icon
│
├── 📂 data/
│   └── 📂 files/               # Physical files only — PDFs and certificate PNGs
│       ├── resume.pdf          # Example; actual filenames vary
│       └── cert1.png
│
├── 📂 pages/
│   └── dashboard.html          # Main portfolio dashboard
│
├── INFO.json                   # This repo's own project metadata
├── index.html                  # Welcome page (entry point)
├── README.md                   # Project documentation
└── LICENSE.md                  # Proprietary license
```

> **Note:** All JSON data files have been migrated to Firebase Firestore. The `data/` folder now only holds physical files (PDFs, images). Do not add JSON files back to `data/`.

---

## ☁️ Firestore Data Structure

All dashboard content is stored in the `portfolio` collection in Firestore. No data is hardcoded in JavaScript.

```
portfolio/
├── credentials     # EmailJS config, auth UIDs, GitHub PAT
├── about           # Bio text, education array, proficiency array
├── certs           # Certificate metadata array
├── docs            # CV/Resume metadata arrays (cv + resume)
└── timestamp       # Timeline registry (repo slugs + milestone entries)
```

Each document stores its data under a `data` field. Example for `timestamp`:
```json
{
    "data": [
        { "repo": "devssst/my-portfolio" },
        { "year": 2025, "title": "BSIT - DPLmB", "date": "2025-06", "desc": "..." }
    ]
}
```

Example for `about`:
```json
{
    "bio": { "text": "Your bio paragraph here." },
    "education": [
        {
            "course": "Bachelor of Science in Information Technology",
            "school": "Dalubhasaang Politekniko ng Lungsod ng Baliwag",
            "schoolStart": "08-12-2024",
            "schoolEnd": "05-30-2028",
            "year": "1st Year"
        }
    ],
    "proficiency": [
        { "language": "CSS", "level": 0 },
        { "language": "JavaScript", "level": 2 }
    ]
}
```
> **education** is an array — multiple degrees can be stacked. Dates stored as `MM-DD-YYYY`. If `schoolEnd` is in the future, the card shows `— present`; if past, shows `Graduated: YYYY`. Old single-map format is auto-migrated to array on first save.


Example for `docs`:
```json
{
    "data": {
        "cv": [],
        "resume": [
            {
                "id": "doc-1746432000000",
                "title": "Resume",
                "type": "Resume",
                "uploaded": "2026-05-06",
                "file": "data/files/Resume.pdf"
            }
        ]
    }
}
```

### INFO.json — place at root of each project repo
```json
{
    "id": "unique-id",
    "name": "Project Name",
    "year": 2026,
    "date": "YYYY-MM",
    "description": "One sentence shown on the card.",
    "about": "Full paragraph shown on expand.",
    "contributions": "Your role and what you built.",
    "stack": ["PROGRAMMING", "LANGUAGE", "STACK"],
    "banner": "https://raw.githubusercontent.com/nickname/your-project-repo/main/assets/images/banner.png",
    "live": "https://nickname.github.io/your-project-repo",
    "source": "https://github.com/nickname/your-project-repo"
}
```
> **banner** must be a full `raw.githubusercontent.com` URL. Relative paths will 404. Omit the field to show the `fa-code` placeholder icon.

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection (for Firestore, GitHub fetch + EmailJS)

### Running
Access the live site: https://devssst.github.io/my-portfolio

### Adding a new project
1. Place an `INFO.json` at the root of the project repo
2. Add a repo entry to `portfolio/timestamp` in Firestore: `{ "repo": "devssst/your-repo" }`
3. Push `INFO.json` — the portfolio auto-fetches and renders the card

### Uploading a document (CV / Resume) — Edit Mode
1. Log in and activate edit mode from the badge dropdown
2. Click the **+ New Document** button that appears in the HOME section
3. Drag and drop or browse for a PDF file
4. Fill in the title and select the document type (Resume or CV)
5. Click Upload — the file is pushed to `data/files/` via the GitHub Contents API and the metadata is saved to Firestore `portfolio/docs` automatically
6. The card renders immediately after upload, no page reload needed

### Deleting a document — Edit Mode
1. Activate edit mode — red X buttons appear on each document card
2. Click the X on the card you want to remove
3. Confirm in the delete dialog — the file is removed from GitHub and the metadata entry is removed from Firestore

### Adding a certificate
Certificates upload/delete via edit mode is planned for Phase 4. For now, add the PNG to `data/files/` manually and add an entry to `portfolio/certs` in Firestore under `data.certificates`.

---

## 🎨 Design Language

### Color Palette
- **Background**: Python code-art image (`background.png`), `background-attachment: fixed`
- **Overlay**: Single `body::before` — `rgba(0, 0, 0, 0.75)` + `backdrop-filter: blur(6px)` applied once globally
- **Header**: `rgba(17, 25, 40, 0.80)` with its own `backdrop-filter: blur(8px) saturate(180%)`
- **Cards**: `rgba(255, 255, 255, 0.001–0.01)` — defined primarily by borders, not fill
- **Accent Purple**: `#a855f7` / `#7c22e8` / `#c026d3`
- **Logo**: Red `#FF2200` V on black
- **Text Primary**: `#ffffff`
- **Text Muted**: `rgba(255, 255, 255, 0.35–0.65)`

> Per-card `backdrop-filter` is disabled (commented out) for performance. Glassmorphism is achieved via the single global overlay. Commented blocks are left intentionally for future re-enablement.

### Language Bar Colors
- **HTML**: `#E34F26` — **CSS**: `#663399` — **JavaScript**: `#F7DF1E` — **Python**: `#013763` — **Java**: `#E32C2E`

### UI Highlights
- 6-section tab navigation: `home`, `about`, `timeline`, `projects`, `certificates`, `reach`
- Mouse wheel and touch swipe section hijacking (300ms cooldown, 5px threshold) — textarea and open modal scroll excluded
- Profile card smooth slide-out; state synced across all 4 content sections
- Purple scrollbar auto-appears on scroll, fades after 1.5s
- Animated skill bars triggered once on first ABOUT entry
- Clickable stat cards navigate to their section
- Consistent empty states: centered FA icon + muted text

---

## 🚧 Roadmap

### Phase 1 — Welcome Page
- [x] Visitor Mode welcome screen with Visit Page button
- [x] Animated welcome page with mode transitions
- [x] Form validation with animated error states
- [x] Firebase Authentication integration — Email/Password + Google Sign-In
- [x] Redirect to dashboard on successful authentication

### Phase 2 — Dashboard Shell
- [x] Sticky header with mode badge dropdown (FAQ, EDIT, LEAVE)
- [x] 6-section HTML skeleton
- [x] Section switching with fade animation
- [x] Wheel + touch section hijacking (300ms cooldown)
- [x] Session-based access control via Firebase

### Phase 3 — Dashboard Sections
- [x] **Home** — hero, social icons, CV/Resume doc cards with PDF.js thumbnails
- [x] **WHO AM I?** — live age, education, bio, collapsible profile card, stat grid, skills bars + legend modal
- [x] **TIMESTAMPS** — auto-generated from Firestore (repos + direct entries); accordion date reveal; Learn More cross-links
- [x] **Projects** — auto-fetched via Firestore timestamp → `INFO.json`; universal card spec; year groups
- [x] **Certificates** — gallery layout; PNG previews; full-screen overlay; grouped by company
- [x] **SEND ME YOUR DM** — full validation; EmailJS wired
- [x] **Firestore migration** — all JSON data moved to Firestore `portfolio` collection; `data/` folder reduced to physical files only

### Phase 4 — Edit Mode *(In Progress)*
- [x] Edit mode toggle in badge dropdown — global `isEditMode` state; exits with 2s delayed reload
- [x] **Home — Documents**: ADD button injected into card grid; drag-and-drop upload modal (title + type fields); file pushed to GitHub via Contents API; metadata saved to Firestore; card re-renders in place without reload
- [x] **Home — Documents**: per-card delete button (red X, edit mode only); confirm modal; file removed from GitHub + entry removed from Firestore
- [x] **WHO AM I? — About**: edit modal with Bio, stackable Education entries (add/remove per entry), Proficiency language picker; saves to Firestore `portfolio/about`; education changes sync to `portfolio/timestamp`; all sections show proper empty states
- [ ] **TIMESTAMPS**: add/remove entries via modal (repo URL or manual milestone) → Firestore
- [ ] **Projects**: remove entry from timestamp → Firestore
- [ ] **Certificates**: upload PNG + config form (title, company, details, date) → GitHub + Firestore; per-card delete

### Phase 5 — Polish & Deploy
- [ ] Mobile responsiveness — 375px breakpoints
- [ ] Scroll-triggered entrance animations via `IntersectionObserver`
- [ ] GitHub Pages live deploy confirmation

---

## 📋 Update Logs

### Phase 4 — WHO AM I? Edit Mode + Bug Fixes (May 7 2026)
- **About edit modal complete**: Bio textarea, stackable Education entries (add/remove dynamically), Proficiency language picker — all write to Firestore `portfolio/about`
- **Education refactored to array**: `education` field in Firestore changed from a single map to an array — multiple degrees can be stacked (BSIT + Masters, etc.); old single-map format auto-migrated on first save
- **Education delete**: per-card delete button (edit mode only) removes the specific entry by index from the array; remaining entries and timeline stay intact
- **Education dates**: stored as `MM-DD-YYYY`; displayed as `Month DD, YYYY — present` (ongoing) or `Graduated: YYYY` (completed)
- **Timeline sync**: all education entries sync to `portfolio/timestamp` on save/delete — strip-and-rewrite strategy ensures no stale entries
- **Empty states**: Bio shows `fa-file-lines` + "No Bio"; Education shows `fa-graduation-cap` + "No listed education"; Languages shows `fa-code` + "No listed language" with legend hidden
- **Modal UX**: overlay click-to-close blocked while any input/textarea/select is focused; section dividers (border-top) added between BIO / EDUCATION / PROFICIENCY sections
- **Bio modal leak fixed**: `openAboutEditModal` no longer reads bio from DOM — reads from `FETCHED_ABOUT` only, preventing "No Bio" placeholder from leaking into the textarea
- **Cert/doc URL encoding**: `data.file` path segments now run through `encodeURIComponent` before building `raw.githubusercontent.com` and blob viewer URLs — fixes 404 on filenames with `[`, `]`, spaces, or other reserved characters
- **Lang delete X removed** from skill bars — delete is handled in the About edit modal only; `edit-active` toggle on `#skillsBars` also removed
- **Label accessibility fix**: `<label>LANGUAGE</label>` in the About modal now has `for="aboutLangSearch"` — resolves browser console accessibility warning
- **Text alignment**: Bio textarea and Reach Me message textarea now `text-align: justify`
- **CSS cleanup**: removed dead `.certs-sort-bar`, `.certs-sort-btn`, `.certs-empty` blocks; removed no-op `text-shadow: 0 1px 10px rgba(0,0,0,0)` from `.about-bio`; merged split `.about-edu-card` declaration; removed empty commented `.level-item-body {}` block

### Phase 4 — Documents Edit Mode + PDF Fixes (May 6 2026)
- Documents upload complete: drag-and-drop modal, title + type fields, GitHub Contents API push, Firestore metadata write, in-place re-render after upload
- Documents delete complete: red X per card (edit mode only), confirm modal, GitHub file deletion + Firestore metadata removal
- PDF.js thumbnail now fetches from `raw.githubusercontent.com` — fixes 404 on newly uploaded files before GitHub Pages redeploys
- VIEW button opens the GitHub blob viewer (`github.com/.../blob/main/...`) — renders PDF inline in browser without downloading
- SAVE button fetches the raw URL and triggers a named download via blob — works cross-origin without relying on the `download` attribute
- `cursor: pointer` added to `.doc-card-btn` — was implicit on `<a>` tags, now explicit for button elements

### Phase 3 — Firebase & Firestore Integration (May 5 2026)
- Firebase Authentication integrated — Email/Password + Google Sign-In, dual UID verification
- All JSON data migrated to Firestore `portfolio` collection — `timestamp`, `certs`, `docs`, `credentials` documents
- `data/` folder reduced to `files/` only (PDFs and certificate images)
- `loadAllData()` fully rewritten to use Firestore SDK
- EmailJS credentials now loaded from Firestore at runtime

### Phase 3 — Data Architecture Refinements (May 4 2026)
- `data/projects.json` renamed to `data/timestamp.json` — now accepts both repo slugs and direct timeline entries in the same array
- `TIMELINE_DATA` constant removed from `dashboard.js` entirely — all timeline data now lives in Firestore
- `FETCHED_TIMELINE[]` added as a third data store alongside `FETCHED_PROJECTS[]` and `FETCHED_CERTS[]`
- `renderDocs()` now properly `await`-ed in `boot()` — previously called without await
- EmailJS credentials moved from hardcoded JS constants to Firestore — fetched at runtime, guarded before send
- `certs-sort-btn` filter pills removed from certificates section — company group labels serve as visual separators
- Textarea scroll guard added to wheel hijack handler

### Phase 3 — Full Dashboard (May 3 2026)
- All 6 sections built and functional
- JSON-driven content: projects via `INFO.json` fetch chain, certs via `certs.json`, docs via `docs.json`
- `boot()` async with individual `try/catch` per render — crash isolation
- Profile card collapse synced across ABOUT, TIMESTAMPS, PROJECTS, CERTIFICATES
- EmailJS integrated and confirmed working
- Universal card spec applied to CV/Resume, Projects, Certificates
- Skills bar animation, levels modal, stat card navigation
- Per-element scrollbar Map — fixes shared scroll state bug

### Phase 2 — Dashboard Shell (April 28 2026)
- Dashboard HTML skeleton with 6 section anchors
- Sticky header with ADMIN/VISITOR badge and dropdown
- `switchSection()`, session-based access control

### Phase 1 — Welcome Page (April 19 2026)
- Welcome page with glassmorphism card design
- Form validation with shake/error/success animations

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
