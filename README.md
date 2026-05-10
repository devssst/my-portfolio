# 🧑‍💻 Developer VIEN — Portfolio
### 🔰 Phase 3 — Complete | Phase 4 — Complete ✓ | Phase 5 — In Progress
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
- **TIMESTAMPS**: Auto-generated from Firestore `portfolio/timestamp` — repo slugs (with date), education sync entries, and milestone entries (`type: 'milestone'`); all sources merged and grouped by year descending, then sorted by month descending within each year; date shown on click (accordion toggle); "Learn More" on project/cert/education entries cross-links to the matching card; milestones show a delete X button in edit mode
- **Projects**: Year-grouped card grid auto-fetched via `timestamp` → `INFO.json` per repo; year derived from the `date` field stored in the Firestore `timestamp` entry (not from INFO.json); universal card spec with banner preview, accordion expand showing contribution text + Live and Source buttons; add/delete in edit mode
- **Certificates**: Gallery layout (220px cards, PNG previews, title, details, date); companies with one certificate share a top row with the company name overlaid on the banner bottom-left; companies with two or more certificates each get their own labeled group below; clicking a card opens a full-screen image overlay; add/delete in edit mode — data from Firestore `portfolio/certs`
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
├── config          # EmailJS config (publicly readable — no auth required)
├── credentials     # Auth UIDs, GitHub PAT (auth-gated read — Vien's UIDs only)
├── about           # Bio text, education array, proficiency array
├── certs           # Certificate metadata array
├── docs            # CV/Resume metadata arrays (cv + resume)
├── lang            # Language metadata array (name, color, icon)
└── timestamp       # Timeline registry — repo slugs (with date), education sync entries, milestones
```

Each document stores its data under a `data` field. Example for `timestamp`:
```json
{
    "data": [
        { "repo": "devssst/my-portfolio", "date": "2026-05" },
        { "repo": "devssst/btech-slims", "date": "2025-06" },
        { "type": "education", "title": "BSIT - DPLmB", "date": "2024-08", "desc": "Dalubhasaang Politekniko ng Lungsod ng Baliwag" },
        { "id": "milestone-1746432000000", "type": "milestone", "title": "Started freelancing", "desc": "First paid project.", "date": "05-01-2026" }
    ]
}
```
> Repo entries require a `date` field (`YYYY-MM`) — this is entered by the admin through the project add modal and is the single source of truth for project year/month grouping. The `date` field in INFO.json is ignored.
> Milestone `date` is stored as `MM-DD-YYYY`; rendered in the timeline as `Month YYYY`.

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


Example for `certs`:
```json
{
    "data": [
        {
            "id": "cert-1778321059676",
            "title": "Certificate Title",
            "details": "Issued by Company Name",
            "company": "Company Name",
            "date": "05-09-2026",
            "file": "data/files/certificate.png"
        }
    ]
}
```
> `date` stored as `MM-DD-YYYY`; rendered on the card as `Month DD, YYYY` (e.g. `May 9, 2026`). `file` is the path within the repo; the dashboard builds the full `raw.githubusercontent.com` URL at render time.
> Both old `{ data: { certificates: [] } }` format and new flat `{ data: [] }` format are read correctly.


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
    "description": "One sentence shown on the card.",
    "about": "Full paragraph shown on expand.",
    "contributions": "Your role and what you built.",
    "stack": ["PROGRAMMING", "LANGUAGE", "STACK"],
    "banner": "https://raw.githubusercontent.com/nickname/your-project-repo/main/assets/images/banner.png",
    "live": "https://nickname.github.io/your-project-repo",
    "source": "https://github.com/nickname/your-project-repo"
}
```
> `year` and `date` fields are no longer read from INFO.json. Date is entered by the admin in the project add modal and stored in `portfolio/timestamp`. Remove both fields from existing INFO.json files to avoid confusion.
> **banner** must be a full `raw.githubusercontent.com` URL. Relative paths will 404. Omit the field to show the `fa-code` placeholder icon.

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection (for Firestore, GitHub fetch + EmailJS)

### Running
Access the live site: https://devssst.github.io/my-portfolio

### Adding a new project — Edit Mode
1. Log in and activate edit mode from the badge dropdown
2. Navigate to the **PROJECTS** section — a **+ New Project** button appears in the heading
3. Enter the repo slug (`nickname/project-repo`) and select the project month/year
4. Click Add Project — the site fetches `INFO.json` to verify the repo is public, then saves `{ repo, date }` to `portfolio/timestamp`; the card renders immediately

### Deleting a project — Edit Mode
1. Activate edit mode and navigate to **PROJECTS**
2. Red X buttons appear on each project card
3. Click the X and confirm — the repo entry is removed from `portfolio/timestamp` and the card is removed from the grid immediately

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

### Adding a milestone — Edit Mode
1. Log in and activate edit mode from the badge dropdown
2. Navigate to the **TIMESTAMPS** section — an **+ Add Milestone** button appears in the heading
3. Click it and fill in the title, an optional description, and a date
4. Click Save Milestone — the entry (`type: 'milestone'`) is written to `portfolio/timestamp` and the timeline re-renders immediately

### Deleting a milestone — Edit Mode
1. Activate edit mode and navigate to **TIMESTAMPS**
2. Red X buttons appear on each milestone entry
3. Click the X and confirm — the entry is removed from `portfolio/timestamp` and the timeline updates in place

### Adding a certificate — Edit Mode
1. Log in and activate edit mode from the badge dropdown
2. Navigate to the **CERTIFICATES** section — an **+ Add Certificate** button appears in the heading
3. Drag and drop or browse for a PNG, JPG, or WEBP image
4. Fill in the title, details (e.g. course name), company, and date — date uses the native date picker and is stored as `MM-DD-YYYY`
5. Click Upload — the image is pushed to `data/files/` on GitHub (using the original filename) and the metadata is saved to `portfolio/certs`; the card renders immediately and the timeline updates in place

### Deleting a certificate — Edit Mode
1. Activate edit mode and navigate to **CERTIFICATES**
2. Red X buttons appear on each certificate card
3. Click the X and confirm — the image is removed from GitHub (non-fatal if already missing) and the entry is removed from `portfolio/certs`; the card and timeline entry are removed immediately

### Adding a certificate (manual fallback)
Certificates can also be added manually by uploading the image to `data/files/` and adding an entry to `portfolio/certs` in Firestore under the `data` array directly.

> **Existing repos**: if you added repos to `portfolio/timestamp` before the project add modal existed (bare `{ "repo": "..." }` entries with no `date` field), go into Firestore and manually add a `date: "YYYY-MM"` field to each entry — otherwise they will render without a date and sort to the current year.

---

## 🎨 Design Language

### Color Palette
- **Background**: Python code-art image (`background.png`), `background-attachment: fixed`
- **Overlay**: Single `body::before` — `rgba(0, 0, 0, 0.75)` + `backdrop-filter: blur(6px)` applied once globally
- **Header**: `rgba(17, 25, 40, 0.80)` with its own `backdrop-filter: blur(8px) saturate(180%)`
- **Cards**: `transparent` to `rgba(255, 255, 255, 0.01)` — defined primarily by borders, not fill
- **Accent Purple**: `#a855f7` / `#7c22e8` / `#c026d3`
- **Logo**: Red `#FF2200` V on black
- **Text Primary**: `#ffffff`
- **Text Muted**: `rgba(255, 255, 255, 0.35–0.65)`

> Per-card `backdrop-filter` is disabled (commented out) for performance. Glassmorphism is achieved via the single global overlay. Commented blocks are left intentionally for future re-enablement.

### Language Bar Colors
- **HTML**: `#E34F26` — **CSS**: `#663399` — **JavaScript**: `#F7DF1E` — **Python**: `#013763` — **Java**: `#E32C2E`

### UI Highlights
- 6-section tab navigation: `home`, `about`, `timeline`, `projects`, `certificates`, `reach`
- Mouse wheel and touch swipe section hijacking (300ms cooldown, two consecutive boundary events required) — textarea and open modal scroll excluded
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

### Phase 4 — Edit Mode *(Complete)*
- [x] Edit mode toggle in badge dropdown — global `isEditMode` state; exits with 2s delayed reload
- [x] **Home — Documents**: ADD button injected into card grid; drag-and-drop upload modal (title + type fields); file pushed to GitHub via Contents API; metadata saved to Firestore; card re-renders in place without reload
- [x] **Home — Documents**: per-card delete button (red X, edit mode only); confirm modal; file removed from GitHub + entry removed from Firestore
- [x] **WHO AM I? — About**: edit modal with Bio, stackable Education entries (add/remove per entry), Proficiency language picker; saves to Firestore `portfolio/about`; education changes sync to `portfolio/timestamp`; all sections show proper empty states
- [x] **TIMESTAMPS — Milestones**: Add Milestone button in heading (edit mode); modal with title, description, date fields; entry saved to `portfolio/timestamp` with `type: 'milestone'`; timeline re-renders in place
- [x] **TIMESTAMPS — Milestones**: per-entry delete X (edit mode only); confirm modal; entry removed from `portfolio/timestamp`; timeline re-renders in place
- [x] **Projects**: Add Project button in heading (edit mode); modal with repo slug + month/year date input; verifies INFO.json exists before saving; `{ repo, date }` written to `portfolio/timestamp`; in-place re-render; stats update immediately
- [x] **Projects**: per-card delete X (edit mode only); confirm modal; repo entry removed from `portfolio/timestamp`; card removed immediately; stats update immediately
- [x] **Certificates**: Add Certificate button in heading (edit mode); drag-and-drop modal (PNG/JPG/WEBP); fields for title, details, company, date (native date picker → stored `MM-DD-YYYY`); image pushed to GitHub using original filename; metadata saved to `portfolio/certs` flat array; cards, timeline, and stats update immediately
- [x] **Certificates**: per-card delete X (edit mode only); confirm modal; image removed from GitHub (non-fatal); entry removed from `portfolio/certs`; cards, timeline, and stats update immediately

### Phase 5 — Polish & Deploy *(In Progress)*
- [x] **Code quality pass** — `@keyframes shake` unified across `style.css` and `dashboard.css`; `rgba(255,255,255,0.001)` replaced with `transparent` throughout `dashboard.css`; `--font-display` CSS variable added to `:root` — replaces ~12 hardcoded `font-family: Arial, Helvetica, sans-serif` declarations; `legendEl.innerHTML +=` anti-pattern replaced with `createElement` / `appendChild`; `startYear` in `populateStats()` derived from the earliest entry in `FETCHED_TIMELINE` / `FETCHED_MILESTONES` instead of hardcoded `2025`; dead `max-width: 100vw` removed from `.about-bio`
- [x] **UX fixes** — `text-align: justify` removed from `.about-bio`, `.about-edit-field textarea`, and `.reach-field textarea`; `.cert-overlay` z-index raised from `200` to `500` (consistent with `.faq-overlay` and `.levels-overlay`); section scroll hijack now requires two consecutive at-boundary wheel events before switching — prevents accidental jumps during slow or careful scrolling
- [x] **Escape key support** — single `keydown` listener closes whichever modal or overlay is currently open; priority order mirrors modal depth (delete confirms → upload modals → content overlays → FAQ)
- [x] **Loading state** — `.loading` CSS class applied to all section roots during `boot()` data fetch; removed after `loadAllData()` resolves so sections never appear empty without context
- [x] **`<noscript>` fallback** — added to both `index.html` and `dashboard.html`; users with JavaScript disabled see an informative message instead of a blank page
- [x] **Mobile welcome heading** — `.welcome h1` changed from fixed `100px` to `clamp(2rem, 10vw, 100px)` as an interim fix ahead of full breakpoints
- [x] **EmailJS bug fix** — `EMAILJS_*` credentials were never populated for any session; `_credentialsCache` was nulled in all three IIFE branches before `boot()` called `loadAllData()`; fixed by extracting EmailJS fields from cache in the IIFE `verified` branch (editor path) and reading `portfolio/config` in `loadAllData()` when not already set (visitor path); `portfolio/config` is covered by the existing wildcard `allow read: if true` Firestore rule
- [ ] Mobile responsiveness — full 375px breakpoints across all dashboard sections
- [ ] Scroll-triggered entrance animations via `IntersectionObserver`
- [ ] GitHub Pages live deploy confirmation

---

## 📋 Update Logs

### Phase 5 — EmailJS Bug Fix (May 11 2026)
- **Root cause**: `_credentialsCache` was nulled in all three branches of the auth-gated IIFE (`verified`, `_editRequested`, visitor) before `boot()` ran — so `loadAllData()` always read `_credentialsCache || {}` as an empty object; `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, and `EMAILJS_PUBLIC_KEY` were always `null`; the Reach Me form immediately threw `EMAIL NOT CONFIGURED` for every user
- **Editor path fix**: EmailJS fields are now extracted from `_credentialsCache` in the IIFE `verified` branch (same pattern as `GH_TOKEN` / `GH_OWNER` / `GH_REPO`) before the cache is cleared
- **Visitor path fix**: `loadAllData()` step 3 replaced — instead of reading the dead cache, it reads `portfolio/config` directly when `EMAILJS_PUBLIC_KEY` is not already set; the `!EMAILJS_PUBLIC_KEY` guard doubles as a no-op for editor sessions (already populated from cache) to avoid a redundant Firestore round-trip
- **Firestore**: `portfolio/config` document created with `emailjs.publicKey`, `emailjs.serviceId`, `emailjs.templateId`; EmailJS credentials removed from `portfolio/credentials`; covered by the existing wildcard `allow read: if true` rule — no Firestore rule change needed

### Phase 5 — Code Quality, UX & Polish Pass (May 10 2026)
- **`@keyframes shake` unified**: `style.css` definition updated to match `dashboard.css`'s keyframe stops — both files now use the same easing curve and stop points; eliminates inconsistent shake behavior between the login page and the reach form
- **`rgba(255,255,255,0.001)` → `transparent`**: all 5 instances replaced in `dashboard.css`; semantically correct and avoids legacy compositing edge cases
- **`--font-display` CSS variable**: `Arial, Helvetica, sans-serif` extracted to a `:root` variable in `dashboard.css`; all ~12 hardcoded `font-family` declarations replaced with `var(--font-display)` — single point of change if the display font ever changes
- **`legendEl.innerHTML +=` fixed**: replaced with `createElement` / `appendChild` — avoids re-parsing and re-serializing the entire legend subtree on every render
- **`startYear` derived from data**: `populateStats()` no longer hardcodes `2025` — derives the start year from the earliest entry in `FETCHED_TIMELINE` / `FETCHED_MILESTONES`; falls back to the current year when no data exists; stat will now drift correctly each year without a code change
- **`max-width: 100vw` removed**: dead rule removed from `.about-bio` in `dashboard.css`; the parent layout already constrains width and `100vw` causes overflow on mobile
- **`text-align: justify` removed**: removed from `.about-bio`, `.about-edit-field textarea`, and `.reach-field textarea` — changed to `text-align: left`; justified alignment creates uneven word spacing ("rivers") on screen, particularly with long Filipino and technical words
- **`.cert-overlay` z-index raised**: corrected from `200` to `500` — now consistent with `.faq-overlay` and `.levels-overlay`; previously the cert image overlay could render behind the badge dropdown if both were triggered in the same DOM stacking context
- **Escape key handler**: single `document.addEventListener('keydown')` listener added to `dashboard.js`; closes whichever modal or overlay is currently open; priority order: delete confirms → upload modals → content overlays → FAQ; no modal previously supported keyboard dismissal
- **Boot loading state**: `_setLoadingState(true/false)` wraps `loadAllData()` in `boot()`; applies a `.loading` CSS class (40% opacity, `pointer-events: none`) to all four section roots while data fetches; removed as soon as data resolves so sections no longer flash empty content on load
- **`<noscript>` fallback**: added to both `index.html` and `dashboard.html`; displays a centred message with inline style on a dark background — users with JavaScript disabled now see an informative message instead of a blank screen
- **Welcome heading mobile fix**: `.welcome h1` font-size changed from `100px` to `clamp(2rem, 10vw, 100px)` in `style.css`; heading now scales down on narrow viewports as an interim measure until full Phase 5 breakpoints are implemented
- **Section scroll hijack threshold raised**: `tryHijack()` now requires two consecutive at-boundary wheel events in the same direction before switching sections; a `_hijackPrimed` / `_hijackPrimedDir` state pair tracks the intent; primed state resets when the scroll is not at a boundary or direction reverses; accidental section jumps during slow or deliberate scrolling are eliminated

### Phase 4 — Certificates Edit Mode + Final Fixes (May 9 2026)
- **Certificates add complete**: "+ Add Certificate" button injected into CERTIFICATES heading in edit mode; drag-and-drop modal accepts PNG, JPG, WEBP; fields for title, details, company, and date (native date picker, stored as `MM-DD-YYYY`); image pushed to GitHub under original filename (not id); metadata written to `portfolio/certs` flat array; cards, timeline entry, and stats update immediately in place
- **Certificates delete complete**: red X button on each cert card (edit mode only); confirm modal; image removed from GitHub (non-fatal if missing); entry removed from `portfolio/certs`; cards, timeline, and stats update immediately
- **Certificate layout**: solo-company certs (one per company) share a top row; company name overlaid on the banner bottom-left via gradient scrim; multi-company certs (two or more) each get a labeled group row below; 4-card CSS grid, `position: relative` added to `.cert-card-preview` to anchor the overlay correctly
- **Certificate date display**: date shown on card as `Month DD, YYYY` (full day included); timeline shows `Month YYYY` (month-level granularity sufficient)
- **Certificate date picker**: input changed from plain text (`MM-DD-YYYY` placeholder) to `type="date"` native picker; value converted from `YYYY-MM-DD` → `MM-DD-YYYY` on save
- **Certificate timeline date fix**: `renderTimeline` cert block now correctly parses `MM-DD-YYYY` format (reads `parts[0]` as month, `parts[2]` as year) — previously treated all dates as `YYYY-MM` causing `Invalid Date`
- **Firestore format compatibility**: `loadAllData`, `handleCertUpload`, `handleCertDelete` all handle both old `{ data: { certificates: [] } }` and new flat `{ data: [] }` format transparently
- **Stats instant update**: `populateStats()` now called after every project add, project delete, cert upload, and cert delete — counts update without page reload
- **Timeline instant update**: `renderTimeline()` now called after cert upload and cert delete — timeline entry appears/disappears immediately

### Phase 4 — Projects Edit Mode + Date Architecture Overhaul (May 9 2026)
- **Projects add complete**: "+ New Project" button injected into PROJECTS heading in edit mode; modal with repo slug input and `type="month"` date picker; validates `INFO.json` exists and is accessible before saving; guards against duplicate repos; writes `{ repo, date }` to `portfolio/timestamp`; re-renders projects and timeline in place
- **Projects delete complete**: red X button on each project card (visible in edit mode only); confirm modal; removes repo entry from `portfolio/timestamp` by slug; filters `FETCHED_PROJECTS` in memory; re-renders both projects and timeline immediately
- **Date ownership moved to Firestore**: project dates are no longer read from `INFO.json` — `date` field is entered by the admin in the add modal and stored in the `portfolio/timestamp` entry as `YYYY-MM`; `loadAllData()` now attaches `e.date` from the Firestore entry onto each project object, overriding anything in INFO.json
- **`year` field removed from project sorting**: `renderProjects()` previously used `info.year` (from INFO.json) for year-group bucketing; now derives year from `info.date.split('-')[0]` — same source as timeline month sort; `year` and `date` fields should be removed from existing INFO.json files
- **INFO.json cache busting**: all `raw.githubusercontent.com` INFO.json fetches now append `?t=${Date.now()}` — prevents browser and GitHub CDN from serving stale cached responses after INFO.json edits
- **Milestones moved to `portfolio/timestamp`**: milestones are no longer stored in a separate `portfolio/milestones` Firestore document — they are entries with `type: 'milestone'` inside `portfolio/timestamp`; `loadAllData()` derives `FETCHED_MILESTONES` by filtering for `type === 'milestone'` directly from the timestamp array; the `portfolio/milestones` collection can be deleted

### Phase 4 — Milestones Edit Mode + Bug Fixes + Timeline Sort (May 8 2026)
- **Milestone add complete**: "Add Milestone" button injected into the TIMESTAMPS section heading in edit mode; modal with title, description, and date fields; date stored as `MM-DD-YYYY`; entry written to `portfolio/timestamp` with `type: 'milestone'`; timeline re-renders in place without reload
- **Milestone delete complete**: red X button on each milestone entry (visible in edit mode only); confirm modal matching universal delete spec; entry removed from `portfolio/timestamp` by id; timeline re-renders in place
- **Timeline sort by month**: entries within each year group are now sorted by month descending (newest first) — previously entries were pushed in source order (timeline → projects → certs → milestones) with no secondary sort; all four sources now carry a `month` field (1–12) used for sorting
- **Bug — `education` default**: `loadAllData()` was defaulting `education` to `{}` (object) instead of `[]` (array) when the Firestore field was absent — broke `Array.isArray()` guards downstream; fixed to `|| []`
- **Bug — `handleDocDelete` hard-gate removed**: an early `return` when `GH_TOKEN` was null was blocking Firestore deletion entirely; the inner `try/catch` around `ghDeleteFile` already handles GitHub failure gracefully — Firestore deletion now always proceeds regardless of GitHub cred state
- **Bug — `certsRoot` class**: `#certsRoot` incorrectly had `class="certs-grid"` — the outer container was a flex wrapper causing company groups to sit side-by-side; class removed, groups now stack vertically as intended
- **Bug — `text-align: justify` scoping**: the property was incorrectly applied to `input` elements via the shared `input, textarea` selector; moved to `.about-edit-field textarea` only, along with `resize: vertical`
- **Non-bug — `parseStoredDate` hoisted**: function was declared inside `eduArr.forEach()` on every iteration; moved above the loop
- **Firestore structure**: milestones are stored in `portfolio/timestamp` with `type: 'milestone'` — there is no separate `portfolio/milestones` collection

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
