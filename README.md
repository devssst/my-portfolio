# 🧑‍💻 Developer VIEN — Portfolio
### 🔰 Phase 3 — Dashboard Sections (In Progress)
![Portfolio Background](assets/images/banner.png)

A personal developer portfolio for **Vien Fritzgerald V. Calderon**, built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no backend. Features a dark glassmorphism aesthetic, dual-mode welcome page (Visitor & Developer), and a fully editable admin dashboard.

---

## 🎯 Overview

This portfolio is designed to present Vien's developer life, projects, and background in a clean, interactive format. Visitors can browse the portfolio in read-only mode, while the developer (Vien) can log in through a restricted login form to gain admin access — enabling live edits to content directly on the dashboard.

### 👨‍💻 Developer
**Developer VIEN (Vien Fritzgerald V. Calderon)**

---

## ✨ Key Features

### 🏠 Welcome Page
- Dual-mode landing page — **Visitor Mode** (default) and **Developer Mode** (toggle via double-clicking the logo)
- Visitor Mode: click "Visit Page" to enter the dashboard in read-only mode
- Developer Mode: restricted login form with email/password fields, Google and Microsoft OAuth buttons, SHOW/HIDE password toggle, and animated error/success feedback

### 📊 Dashboard
- **Home**: Hero section with profile photo, name, and social icon links; CV/Resume doc cards with PDF.js thumbnails
- **WHO AM I?**: Age (live-calculated, updates every minute), educational background, and stat cards (Projects, Certificates, Yrs Experience, Languages) — stat cards are clickable and navigate to their respective sections
- **Languages & Tools**: Animated horizontal skill bars with language logo icons and brand colors (HTML orange, CSS purple, JS yellow, Python blue, Java red); level labels per bar; a legend card (right of bars) showing all 6 proficiency levels as color-coded dots — click the legend to open a full modal with level definitions
- **TIMESTAMPS**: Developer life milestones rendered from a JS data array, grouped by year; date shown on hover
- **Projects**: Year-grouped card grid rendered from a JS data array; universal card spec with preview zone (banner image from `INFO.json` or placeholder icon), accordion expand footer showing contribution text + Live and Source buttons; `INFO.json` fetched async from `raw.githubusercontent.com` per repo
- **Certificates**: Structure in place — rendering not yet implemented
- **SEND ME YOUR DM**: Contact form (name, email, subject, message) — EmailJS integration pending

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
- **Contact**: EmailJS (free tier, no backend) — *planned, not yet integrated*
- **PDF Preview**: PDF.js (v3.11.174) — canvas-based first-page thumbnail rendering
- **Persistence**: localStorage (admin edits, profile card state)
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
│   │   └── dashboard.js        # Dashboard rendering, navigation, admin edit mode
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
│   │   └── resume.pdf          # Sample resume for the website
│   └── list.json               # CV/Resume/Certificate metadata (not yet created — JS falls back to in-code arrays)
│
├── 📂 pages/
│   └── dashboard.html          # Main portfolio dashboard
│
├── index.html                  # Welcome & login page (entry point)
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet

### Running on your web
- Access through the web: https://devssst.github.io/my-portfolio

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
- [x] **WHO AM I?** — live age counter (updates every minute), education card, bio paragraph; profile card collapse animation; stat grid with clickable cards (Projects → projects, Certificates → certificates, Experience → timeline, Languages → pointer cursor only)
- [x] **Languages & Tools** — animated horizontal bars with language logo icons, brand-colored fills, level labels; legend card (right-side) with 6 color-coded proficiency dots; clicking legend opens a modal with full level definitions; bar animation triggers once on first ABOUT section entry
- [x] **TIMESTAMPS** — year-grouped timeline rendered from `TIMELINE_DATA` JS array; date shown on hover
- [x] **Projects** — universal card spec: 110px preview zone (banner from `INFO.json` full raw URL or `fa-code` placeholder), body with PROJECT eyebrow + name + desc + stack tags, accordion expand footer with contribution text above LIVE + SOURCE buttons; `INFO.json` fetched async per repo from `raw.githubusercontent.com`; `align-items: start` on grid fixes row-stretch expand bug
- [x] **CV / Resume** — document cards with PDF.js first-page canvas thumbnail, click to expand, VIEW + SAVE buttons; loads from `data/list.json` → localStorage → fallback array
- [ ] **Certificates** — HTML structure exists, rendering function not yet implemented
- [ ] **SEND ME YOUR DM** — HTML structure exists, EmailJS integration pending

### Phase 4 — Admin Edit Mode
- [ ] EDIT in badge dropdown triggers edit mode globally (currently `console.log` placeholder)
- [ ] WHO AM I?: inline editing; Save writes to `localStorage`
- [ ] TIMESTAMPS: inline "Add entry" form (date, title, description) + delete icon per entry
- [ ] Projects: FETCH button to pull INFO.json from a GitHub repo; auto-creates card and timeline entry; remove button per card
- [ ] Certificates: UPLOAD button with config form (title, description, type)
- [ ] CV/Resume: UPLOAD button with config form (type selector, auto-fill date)
- [ ] On page load, check `localStorage` first — override default JS arrays if data exists

### Phase 5 — Polish & Deploy
- [ ] Mobile responsiveness — test at 375px, fix header, hero, timeline, project grid
- [ ] Scroll-triggered entrance animations via `IntersectionObserver`
- [ ] Deploy to GitHub Pages (repo: `devssst/my-portfolio`)
- [ ] Update Firebase authorized domains to include GitHub Pages URL

---

## 📋 Update Logs

### Phase 3 — Dashboard Sections (In Progress, May 2026)

**Projects Section — Universal Card Spec (Feature 6)**
- `.project-card` rebuilt to match the universal card spec used by CV/Resume doc cards
- Preview zone (110px): banner image fetched async from `INFO.json` in each project repo via `raw.githubusercontent.com`; falls back to `fa-code` placeholder icon if field is missing or fetch fails
- Body: PROJECT type eyebrow, project name, description, tech stack tag pills
- Accordion expand footer: contribution text (`info.contributions`) rendered above LIVE + SOURCE action buttons; contribution row omitted if field is absent
- Buttons use `.doc-card-btn` classes — shared styling with CV/Resume cards
- `align-items: start` added to `.projects-grid` — fixes the row-stretch bug where collapsed sibling cards grew to match the expanded card's height, making them appear partially open
- Outside-click collapse wired in the global document handler alongside doc cards and timeline entries
- `highlight` class (used by TIMESTAMPS "Learn More" cross-link) preserved

**INFO.json format** — place at the root of each project repo:
```json
{
    "name": "Project Name",
    "banner": "https://raw.githubusercontent.com/{user}/{repo}/main/data/previews/banner.png",
    "contributions": "What you built or contributed. One or two sentences."
}
```

---



**Clickable Stat Cards (ABOUT section)**
- PROJECT, CERTIFICATES, and EXPERIENCE stat cards now navigate to their respective sections on click using `switchSection()`
- LANGUAGES card gets `cursor: pointer` but stays in place (it's immediately below the stat grid)
- Implemented via `data-goto` attributes in HTML and a single `querySelectorAll` event listener loop in JS — no style changes, pointer is the only visual indicator

**Languages & Tools Skills Block (ABOUT section)**
- New `about-block` added after the stat grid in the WHO AM I? section
- Each language rendered as a row: logo icon (colored) + language name + animated bar fill + level label
- Bar fill color matches the official language brand color (HTML orange, CSS purple, JS yellow, Python blue, Java red)
- Bar fill animates from 0% to target width on first ABOUT section entry only (triggered by `switchSection()` with a 350ms delay to let the section fade in first)
- Animation uses a `--bar-w` CSS variable set inline per bar, with staggered `transition-delay` (0.1s increments per language)
- Legend card sits to the right of the bars showing all 6 proficiency levels as color-coded dots
- Clicking the legend card opens a modal (reusing the FAQ card structure) with full definitions for each level
- `LANG_DATA` and `LEVEL_DATA` arrays added to `dashboard.js`; `renderSkills()` builds both the bars and legend; `langCount` in stat grid now reads `LANG_DATA.length` dynamically

---

**Earlier Phase 3 work:**
- Section navigation system with 6 sections; supports header nav clicks and wheel/touch hijacking with 300ms cooldown
- TIMESTAMPS rendered dynamically from `TIMELINE_DATA` array; grouped by year
- Projects rendered dynamically from `PROJECTS_DATA` array; universal card spec with accordion expand, banner image, contribution text, LIVE + SOURCE buttons
- CV/Resume document cards with PDF.js canvas thumbnails (first page, scaled to 220px width); click to expand, VIEW + SAVE buttons; loads from `data/list.json` → localStorage → fallback array
- Profile card collapse: smooth `translateX` slide-out + synchronized negative `margin-right`; state synced across all 4 sections; persisted to `localStorage`
- Live age counter (`calcAge()`) updating every minute in the WHO AM I? section
- Purple scrollbar auto-show on scroll, auto-hide after 1.5s via per-element timeout map
- Mode badge dropdown: VISITOR/ADMIN badge is clickable, shows FAQ and LEAVE items (plus EDIT for admin); LEAVE redirects to `../index.html`; FAQ opens an overlay card; EDIT is a `console.log` placeholder until Phase 4

**Design decisions:**
- Glassmorphism moved from per-card `backdrop-filter` to a single `body::before` overlay for performance
- Card backgrounds set to `rgba(255, 255, 255, 0.001–0.01)` — near-invisible tint, borders provide definition
- Section names finalized: **WHO AM I?**, **TIMESTAMPS**, **SEND ME YOUR DM** (vs. original About Me / Timeline / Reach Me)
- Header scroll-hide disabled — header stays fixed at all times; `hideHeader()` / `showHeader()` functions and `.dash-header.hidden` class are left in code intentionally for future re-enablement

---

### Phase 2 — Dashboard Shell (Completed, May 2026)
**Completed:**
- Dashboard HTML skeleton (`pages/dashboard.html`) with all 6 section anchors
- Sticky header with ADMIN/VISITOR badge
- `dashboard.js`: `isAdmin` flag, `switchSection()`, `loadFromStorage()` localStorage wrapper
- `section-fade-in` CSS animation on section switch (0.3s)

---

### Phase 1 — Welcome Page & Auth (Completed, May 2026)
**Completed:**
- Dual-mode welcome page (Visitor / Developer toggle via logo double-click)
- Login card UI with glassmorphism styling — email, password, SHOW/HIDE toggle
- Google and Microsoft social login button layout
- Form validation: empty field check, email format check, hardcoded credential check
- Animated feedback: shake on invalid input, red/green button states, success redirect
- Back to Visitor Mode button wired to mode toggle
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
