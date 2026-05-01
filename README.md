# 🧑‍💻 Developer VIEN — Portfolio
### 🔰 Phase 1 — Welcome Page & Auth (In Progress)
![Portfolio Background](assets/images/background.jpg)

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
- **Hero Section**: Personal info, nickname, and a brief developer summary
- **About Me**: Educational background, skills, and additional info
- **Timeline**: Developer life milestones sorted by year — hover to reveal exact dates
- **Projects**: All projects sorted yearly, each with a Live link and GitHub source button
- **Reach Me**: Contact form (name, email, subject, message) powered by EmailJS — no backend required

### 🔐 Authentication
- Google Sign-In via Firebase Authentication (OAuth — no backend needed)
- Developer UID whitelist — only Vien's account grants admin access
- Admin redirect to dashboard with `?mode=admin` query param
- Session stored in `sessionStorage`

### ✏️ Admin Edit Mode
- Edit button revealed on About Me, Timeline, and Projects sections when logged in as admin
- About Me: `contenteditable` inline editing
- Timeline: add and remove entries with date, title, and description
- Projects: add and remove project cards (name, description, tech tags, live URL, GitHub URL)
- All changes persisted via `localStorage`

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS — glassmorphism, CSS Grid, CSS Variables
- **Auth**: Firebase Authentication (Google OAuth)
- **Contact**: EmailJS (free tier, no backend)
- **Persistence**: localStorage (admin edits)
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
│   │   └── dashboard.js        # Dashboard rendering, admin edit mode
│   │
│   └── 📂 images/
│       ├── logo.png            # Red V logo (favicon + header)
│       ├── background.jpg      # Lavender anime background
│       ├── picture.jpeg        # Developer profile picture
│       ├── google.png          # Google OAuth icon
│       └── microsoft.png       # Microsoft OAuth icon
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
- Firebase project with Google Authentication enabled
- EmailJS account with a configured service and template

### Running Locally
1. Clone the repository: `git clone https://github.com/devssst/my-portfolio`
2. Open `index.html` directly in a browser (no local server required)
3. Double-click the logo to switch to Developer Mode
4. Enter authorized credentials to access the admin dashboard

### Firebase Setup (for auth)
1. Go to [Firebase Console](https://console.firebase.google.com) and create a project
2. Enable **Google Sign-In** under Authentication → Sign-in method
3. Add your Firebase config to `main.js`
4. Whitelist only your Google UID under authorized users

---

## 🎨 Design Language

### Color Palette
- **Background**: Lavender anime art (`background.jpg`)
- **Overlay**: `rgba(0, 0, 0, 0.25)` dark tint
- **Header**: `rgba(17, 25, 40, 0.75)` blurred dark glass
- **Card**: `rgba(15, 10, 30, 0.55)` glassmorphism
- **Accent Purple**: `#a855f7` / `#7c22e8` / `#c026d3`
- **Logo**: Red `#FF2200` V on black
- **Text Primary**: `#ffffff`
- **Text Muted**: `rgba(255, 255, 255, 0.35–0.65)`

### UI Highlights
- CSS Grid 16-column × 12-row layout
- Glassmorphism cards with `backdrop-filter: blur()`
- Purple gradient buttons with hover lift and glow
- Shake animation on login errors
- Green/red button state transitions on success/failure
- `IntersectionObserver` scroll animations (Phase 5)

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
- [ ] Redirect to `pages/dashboard.html?mode=admin` on successful login
- [ ] Store auth state in `sessionStorage`

### Phase 2 — Dashboard Shell
- [ ] Sticky header matching `index.html` style — show "ADMIN" badge if `?mode=admin`
- [ ] HTML skeleton with section anchors: `#hero`, `#about`, `#timeline`, `#projects`, `#reach`
- [ ] Smooth scroll navigation links in header
- [ ] Full-page scrolling layout, dark overlay, consistent padding
- [ ] Read `?mode=admin` param in `dashboard.js` and set global `isAdmin` flag

### Phase 3 — Dashboard Sections
- [ ] **Hero** — profile photo, nickname, tagline, GitHub link
- [ ] **About Me** — education card (BSIT, DPLBaliuag), skills tags, bio paragraph; data from JS array
- [ ] **Timeline** — vertical timeline with year markers; hover reveals exact date; rendered from JS array
- [ ] **Projects** — card grid sorted by year; name, description, tech tags, Live + GitHub buttons; rendered from JS array
- [ ] **Reach Me** — EmailJS contact form (name, email, subject, message); test with developer's email

### Phase 4 — Admin Edit Mode
- [ ] Show edit pencil buttons on About, Timeline, and Projects when `isAdmin` is true
- [ ] About Me: `contenteditable` inline editing; Save writes to `localStorage`
- [ ] Timeline: inline "Add entry" form (date, title, description) + delete icon per entry
- [ ] Projects: "Add project" modal (name, desc, tech, live URL, GitHub URL) + remove button per card
- [ ] On page load, check `localStorage` first — override default JS arrays if data exists

### Phase 5 — Polish & Deploy
- [ ] Mobile responsiveness — test at 375px, fix header, hero, timeline, project grid
- [ ] Scroll-triggered entrance animations via `IntersectionObserver`
- [ ] Downloadable CV/resume link in Hero (PDF stored in `assets/files/`)
- [ ] Deploy to GitHub Pages (repo: `devssst/my-portfolio`)
- [ ] Update Firebase authorized domains to include GitHub Pages URL

---

## 📋 Update Logs

### Phase 1 — Welcome Page & Auth (In Progress, May 2026)
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

*"First, solve the problem. Then, write the code."* — John Johnson
