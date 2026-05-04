# 🧑‍💻 Developer VIEN — Portfolio
### 🔰 Phase 3 — Complete | Phase 4 — Admin Edit Mode (Planned)
![Portfolio Background](assets/images/banner.png)

A personal developer portfolio for **Vien Fritzgerald V. Calderon**, built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no backend. Features a dark aesthetic, dual-mode welcome page (Visitor & Developer), and a fully data-driven dashboard powered by JSON files and GitHub-hosted project metadata.

---

## 🎯 Overview

This portfolio presents Vien's developer life, projects, and background in a clean, interactive format. Visitors browse in read-only mode. The developer (Vien) logs in through a restricted login form to gain admin access — enabling live edits to content directly on the dashboard.

All content (projects, certificates, CV/resume documents, timeline events) is driven by JSON files. No data is hardcoded in JavaScript. Projects are fetched automatically from their own GitHub repos via `INFO.json`.

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
- **WHO AM I?**: Live age counter (updates every minute from DOB Dec 15 2006), educational background, bio paragraph, stat cards (Projects, Certificates, Yrs Experience, Languages) — counts auto-derived from JSON data; stat cards navigate to their section on click
- **Languages & Tools**: Animated horizontal skill bars with language logo icons and brand colors; level labels per bar; legend card with 6 proficiency levels — click legend to open the full levels modal
- **TIMESTAMPS**: Auto-generated from `data/timestamp.json` (project + cert + manual entries); grouped by year descending; date shown on click (accordion toggle); "Learn More" on project/cert entries cross-links to the matching card
- **Projects**: Year-grouped card grid auto-fetched via `timestamp.json` → `INFO.json` per repo; universal card spec with banner preview, accordion expand showing contribution text + Live and Source buttons
- **Certificates**: Gallery layout (220px cards, PNG previews, title, details, date); clicking a card opens a full-screen image overlay — data from `data/certs.json`
- **SEND ME YOUR DM**: Contact form (name, email, subject, message) with full validation, animated error states, EmailJS integration with success/spinner states

### 🔐 Authentication
- Developer Mode toggle via logo double-click on the welcome page
- Hardcoded credentials as placeholder (Firebase Auth to be added later)
- Admin redirect to `pages/dashboard.html?mode=admin`
- Mode badge (VISITOR / ADMIN) with dropdown: FAQ, EDIT (admin only), LEAVE

### ✏️ Admin Edit Mode *(Phase 4 — Planned)*
- EDIT in badge dropdown triggers edit mode (currently `console.log` placeholder)
- Inline editing per section, saves to `localStorage`
- Project fetch by GitHub URL, certificate/document upload with config form

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS — single global `body::before` blur overlay, CSS Grid, CSS Variables
- **Auth**: Firebase Authentication — *planned, not yet integrated*
- **Contact**: EmailJS (free tier, no backend) — Gmail service
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
│       ├── banner.png          # README.md preview image
│       ├── google.png          # Google OAuth icon
│       └── microsoft.png       # Microsoft OAuth icon
│
├── 📂 data/
│   ├── 📂 files/               # PDFs and certificate PNGs go here
│   │   └── resume.pdf
│   ├── timestamp.json          # Registry: project repo slugs + manual timeline entries
│   ├── docs.json               # CV/Resume metadata
│   ├── certs.json              # Certificate metadata
│   └── credentials.json        # EmailJS service/template/public key
│
├── 📂 pages/
│   └── dashboard.html          # Main portfolio dashboard
│
├── INFO.json                   # This repo's own project metadata
├── index.html                  # Welcome & login page (entry point)
├── README.md                   # Project documentation
└── LICENSE.md                  # Proprietary license
```

---

## 🗂️ Data Files

All dashboard content is driven by JSON files. No data is hardcoded in JavaScript.

> **Important:** JSON does not support comments (`//` or `/* */`). Adding any comment to a JSON file will cause a `SyntaxError` on parse — the affected section will silently render its empty state instead. Use a `_note` field if inline documentation is needed.

### data/timestamp.json — timeline registry
Mixed array: each entry is either a repo slug (fetched as project) or a direct timeline entry.
```json
[
    { "repo": "nickname/your-project-repo" },
    { "year": YYYY, "title": "Activity/Milestone Title", "date": "YYYY-MM", "desc": "Short description of your milestone." }
]
```
Add a `{ "repo": "..." }` line per new project. Add a direct object for milestone entries. The site fetches `INFO.json` from each repo automatically.

### INFO.json — place at root of each project repo
```json
{
    "id": "unique-id",
    "name": "Project Name",
    "year": YYYY,
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

### data/certs.json — certificate metadata
```json
{
    "certificates": [
        {
            "id": "unique-id",
            "title": "Certificate Title",
            "company": "Issued by Whom?",
            "details": "Short description.",
            "date": "YYYY-MM",
            "file": "data/files/your-certificate-name.png"
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
            "id": "unique-id",
            "title": "Curriculum Vitae",
            "type": "CV",
            "uploaded": "YYYY-MM-DD",
            "file": "data/files/cv-title.pdf"
        }
    ],
    "resume": [
        {
            "id": "unique-id",
            "title": "Resume",
            "type": "Resume",
            "uploaded": "YYYY-MM-DD",
            "file": "data/files/resume-title.pdf"
        }
    ]
}
```

### data/credentials.json — EmailJS config
```json
{
    "emailjs": {
        "serviceId": "your-service-id",
        "templateId": "your-template-id",
        "publicKey": "your-public-key"
    }
}
```
> Planned: move `data/` to a private cloud server. Until then, avoid committing real keys to public repos or add `data/credentials.json` to `.gitignore`.

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection (for GitHub fetch + EmailJS)

### Running
Access the live site: https://devssst.github.io/my-portfolio

### Adding a new project
1. Place an `INFO.json` at the root of the project repo
2. Add one line to `data/timestamp.json`: `{ "repo": "devssst/your-repo" }`
3. Push both — the portfolio auto-fetches and renders the card

### Adding a certificate
1. Place the PNG in `data/files/`
2. Add an entry to `data/certs.json → certificates`
3. Push — the cert card and timeline entry render automatically

### Firebase Setup *(planned — not yet active)*
1. Go to [Firebase Console](https://console.firebase.google.com) and create a project
2. Enable **Google Sign-In** under Authentication → Sign-in method
3. Add Firebase config to `main.js`
4. Whitelist only your Google UID

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
- Mouse wheel and touch swipe section hijacking (300ms cooldown, 5px threshold) — textarea scroll is excluded
- Profile card smooth slide-out; state synced across all 4 content sections
- Purple scrollbar auto-appears on scroll, fades after 1.5s
- Animated skill bars triggered once on first ABOUT entry
- Clickable stat cards navigate to their section
- Consistent empty states: centered FA icon + muted text

---

## 🚧 Roadmap

### Phase 1 — Welcome Page & Auth
- [x] Visitor Mode welcome screen with Visit Page button
- [x] Double-click logo toggle between Visitor and Developer modes
- [x] Developer login form UI (email, password, SHOW/HIDE toggle)
- [x] Google and Microsoft OAuth button layout
- [x] Form validation with animated error states
- [x] Login success state → redirect to dashboard with `?mode=admin`
- [x] Back to Visitor Mode button
- [ ] Firebase project setup and Google Sign-In integration
- [ ] Developer UID whitelist in Firebase
- [ ] Store auth state in `sessionStorage`

### Phase 2 — Dashboard Shell
- [x] Sticky header with ADMIN/VISITOR badge dropdown (FAQ, EDIT, LEAVE)
- [x] 6-section HTML skeleton
- [x] Section switching with fade animation
- [x] Wheel + touch section hijacking (300ms cooldown)
- [x] `isAdmin` flag from `?mode=admin` param

### Phase 3 — Dashboard Sections
- [x] **Home** — hero, social icons, CV/Resume doc cards with PDF.js thumbnails
- [x] **WHO AM I?** — live age, education, bio, collapsible profile card, stat grid, skills bars + legend modal
- [x] **TIMESTAMPS** — auto-generated from `timestamp.json` (repos + direct entries) + certs; accordion date reveal; Learn More cross-links
- [x] **Projects** — auto-fetched via `timestamp.json` → `INFO.json`; universal card spec; year groups
- [x] **Certificates** — gallery layout; PNG previews; full-screen overlay; grouped by company
- [x] **SEND ME YOUR DM** — full validation; EmailJS wired; credentials loaded from `data/credentials.json`
- [x] **Data architecture** — `timestamp.json` replaces `projects.json`; mixed repo + direct entries; `renderDocs()` awaited in boot; `TIMELINE_DATA` removed from JS entirely

### Phase 4 — Admin Edit Mode
- [ ] EDIT in badge dropdown triggers edit mode globally
- [ ] WHO AM I?: inline text editing → `localStorage`
- [ ] TIMESTAMPS: add/remove entries via modal form
- [ ] Projects: FETCH by GitHub URL → auto-creates card + timeline entry
- [ ] Certificates: UPLOAD PNG + config form → `localStorage`
- [ ] CV/Resume: UPLOAD PDF + config form → `localStorage`
- [ ] COMMIT CHANGES button per section

### Phase 5 — Polish & Deploy
- [ ] Mobile responsiveness — 375px breakpoints
- [ ] Scroll-triggered entrance animations via `IntersectionObserver`
- [ ] Firebase Auth integration (replace hardcoded credentials)
- [ ] Move `data/` to private cloud server (credentials security)
- [ ] GitHub Pages live deploy confirmation

---

## 📋 Update Logs

### Phase 3 — Data Architecture Refinements (May 4 2026)
- `data/projects.json` renamed to `data/timestamp.json` — now accepts both repo slugs and direct timeline entries in the same array
- `TIMELINE_DATA` constant removed from `dashboard.js` entirely — all timeline data now lives in JSON files
- `FETCHED_TIMELINE[]` added as a third data store alongside `FETCHED_PROJECTS[]` and `FETCHED_CERTS[]`
- `renderDocs()` now properly `await`-ed in `boot()` — previously called without await
- EmailJS credentials moved from hardcoded JS constants to `data/credentials.json` — fetched in `loadAllData()`, guarded before send
- `certs-sort-btn` filter pills removed from certificates section — company group labels serve as visual separators (same pattern as project year labels)
- Textarea scroll guard added to wheel hijack handler — scrolling inside the message box no longer triggers section switch

### Phase 3 — Full Dashboard (May 3 2026)
- All 6 sections built and functional
- JSON-driven content: projects via `INFO.json` fetch chain, certs via `certs.json`, docs via `docs.json`
- `boot()` async with individual `try/catch` per render — crash isolation
- Profile card collapse synced across ABOUT, TIMESTAMPS, PROJECTS, CERTIFICATES
- EmailJS integrated and confirmed working (test send verified in Gmail)
- Universal card spec applied to CV/Resume, Projects, Certificates
- Skills bar animation, levels modal, stat card navigation
- Per-element scrollbar Map — fixes shared scroll state bug
- Section-hijack scroll: wheel + touch, 300ms cooldown, resolves `.section-with-profile` inner scroll

### Phase 2 — Dashboard Shell (April 28 2026)
- Dashboard HTML skeleton with 6 section anchors
- Sticky header with ADMIN/VISITOR badge and dropdown
- `switchSection()`, `loadFromStorage()`, `isAdmin` flag

### Phase 1 — Welcome Page (April 19 2026)
- Dual-mode welcome page with glassmorphism login card
- Form validation with shake/error/success animations
- Hardcoded credentials placeholder

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
