import { initializeApp }                              from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword,
         signInWithPopup, GoogleAuthProvider }        from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc }                  from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

// ── FIREBASE INIT ─────────────────────────────────────────────

const _cfg = {
    apiKey:            "AIzaSyAZLCVYWX2Nn6GYYYHpwSFkZXj2ZjIJhRE",
    authDomain:        "developer-vien-portfolio.firebaseapp.com",
    projectId:         "developer-vien-portfolio",
    storageBucket:     "developer-vien-portfolio.firebasestorage.app",
    messagingSenderId: "830687475736",
    appId:             "1:830687475736:web:4ad1263787f0d1af112b6d"
};

const _app  = initializeApp(_cfg);
const _auth = getAuth(_app);
const _db   = getFirestore(_app);

// ── CONFIG ────────────────

let _ALLOWED         = null;
let _ALLOWED_UID_EMAIL  = null;
let _ALLOWED_UID_GOOGLE = null;

async function loadConfig() {
    try {
        const snap = await getDoc(doc(_db, "portfolio", "credentials"));
        if (!snap.exists()) throw new Error("credentials doc missing");
        const json           = snap.data().data || {};
        _ALLOWED             = json.auth?.allowed    || null;
        _ALLOWED_UID_EMAIL   = json.auth?.uid_email  || null;
        _ALLOWED_UID_GOOGLE  = json.auth?.uid_google || null;
    } catch (err) {
        _ALLOWED             = null;
        _ALLOWED_UID_EMAIL   = null;
        _ALLOWED_UID_GOOGLE  = null;
    }
}

// ── DOM REFS ──────────────────────────────────────────────────

const backBtn        = document.getElementById("backToVST");
const vstBtn         = document.getElementById("vst");
const logo           = document.getElementById("logo");
const modeLabel      = document.getElementById("mode-label");
const visitorSection = document.getElementById("visitor-section");
const devSection     = document.getElementById("dev-section");
const togglePassword = document.getElementById("togglePassword");
const passwordInput  = document.getElementById("password");
const emailInput     = document.getElementById("email");
const loginBtn       = document.querySelector('#loginForm button[type="submit"]');
const socialBtn      = document.getElementById("socialBtn");

// ── EMAIL FORMAT CHECK ────────────────────────────────────────

const EMAIL_VALIDATOR = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── VISIT BUTTON ──────────────────────────────────────────────

if (vstBtn) {
    vstBtn.addEventListener("click", () => {
        window.location.href = "pages/dashboard.html";
    });
}

// ── PANEL ────────────────

let _panel = false;

if (logo && modeLabel && visitorSection && devSection) {
    logo.addEventListener("dblclick", () => {
        _panel = !_panel;

        if (_panel) {
            visitorSection.classList.add("hidden");
            setTimeout(() => {
                devSection.classList.add("visible");
                modeLabel.textContent = "DEVELOPER";
            }, 200);
        } else {
            devSection.classList.remove("visible");
            setTimeout(() => {
                visitorSection.classList.remove("hidden");
                modeLabel.textContent = "VISITOR";
            }, 200);
        }
    });
}

// ── BACK BUTTON ───────────────────────────────────────────────

if (backBtn && visitorSection && modeLabel && devSection) {
    backBtn.addEventListener("click", () => {
        _panel = false;
        devSection.classList.remove("visible");
        setTimeout(() => {
            visitorSection.classList.remove("hidden");
            modeLabel.textContent = "VISITOR";
            document.getElementById("email").value    = "";
            document.getElementById("password").value = "";
        }, 200);
    });
}

// ── SHOW/HIDE PASSWORD ────────────────────────────────────────

togglePassword.addEventListener("click", function () {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.textContent = type === "password" ? "SHOW" : "HIDE";
});

// ── ERROR / SUCCESS HELPERS ───────────────────────────────────

let btnResetTimer = null;

function triggerInputError(input) {
    const shakeTarget = input.closest(".p-wrapper") || input;

    input.classList.remove("input-error");
    shakeTarget.classList.remove("shake");
    void shakeTarget.offsetWidth;

    input.classList.add("input-error");
    shakeTarget.classList.add("shake");

    shakeTarget.addEventListener("animationend", () => {
        shakeTarget.classList.remove("shake");
    }, { once: true });

    input.addEventListener("animationend", () => {
        input.classList.remove("input-error");
    }, { once: true });
}

function triggerBtnError(message) {
    if (btnResetTimer) clearTimeout(btnResetTimer);
    loginBtn.classList.remove("btn-error", "btn-success");
    void loginBtn.offsetWidth;
    loginBtn.classList.add("btn-error");
    loginBtn.textContent = message;

    btnResetTimer = setTimeout(() => {
        loginBtn.classList.remove("btn-error");
        loginBtn.textContent = "LOGIN";
        loginBtn.disabled    = false;
    }, 1000);
}

function triggerBtnSuccess() {
    if (btnResetTimer) clearTimeout(btnResetTimer);
    loginBtn.classList.remove("btn-error");
    loginBtn.classList.add("btn-success");
    loginBtn.textContent = "WELCOME BACK, VIEN!";
    loginBtn.disabled    = true;

    setTimeout(() => {
        window.location.href = "pages/dashboard.html?ref=edit";
    }, 1500);
}

// ── LOGIN FORM — EMAIL / PASSWORD ─────────────────────────────

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email    = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email) {
            triggerInputError(emailInput);
            triggerBtnError("ENTER YOUR EMAIL");
            return;
        }

        if (!EMAIL_VALIDATOR.test(email)) {
            triggerInputError(emailInput);
            triggerBtnError("INVALID EMAIL");
            return;
        }

        if (!password) {
            triggerInputError(passwordInput);
            triggerBtnError("ENTER YOUR PASSWORD");
            return;
        }



        if (!_ALLOWED || (!_ALLOWED_UID_EMAIL && !_ALLOWED_UID_GOOGLE)) {
            triggerBtnError("UNAVAILABLE");
            return;
        }

        if (email !== _ALLOWED) {
            triggerInputError(emailInput);
            triggerBtnError("NOT AUTHORIZED");
            return;
        }
        loginBtn.disabled    = true;
        loginBtn.textContent = "SIGNING IN...";

        try {
            const result = await signInWithEmailAndPassword(_auth, email, password);
            const uidOk = result.user.uid === _ALLOWED_UID_EMAIL || result.user.uid === _ALLOWED_UID_GOOGLE;
            if (result.user.email !== _ALLOWED || !uidOk) {
                await _auth.signOut();
                triggerBtnError("NOT AUTHORIZED");
                return;
            }
            triggerBtnSuccess();
        } catch (err) {
            const code = err.code || "";
            if (code.includes("wrong-password") || code.includes("invalid-credential")) {
                triggerInputError(passwordInput);
                triggerBtnError("WRONG PASSWORD");
            } else if (code.includes("user-not-found")) {
                triggerInputError(emailInput);
                triggerBtnError("NOT AUTHORIZED");
            } else if (code.includes("too-many-requests")) {
                triggerBtnError("TOO MANY ATTEMPTS");
            } else {
                triggerBtnError("LOGIN FAILED");
            }
        }
    });
}

// ── GOOGLE SIGN-IN ────────────────────────────────────────────

const googleImg = socialBtn?.querySelector('img[alt="Google Logo"]');

if (googleImg) {
    googleImg.style.cursor = "pointer";
    googleImg.addEventListener("click", async () => {
        const provider = new GoogleAuthProvider();
        if (_ALLOWED) provider.setCustomParameters({ login_hint: _ALLOWED });

        try {
            const result = await signInWithPopup(_auth, provider);
            // Google may not return email — UID is the source of truth for Google sign-in
            const uidOk = result.user.uid === _ALLOWED_UID_GOOGLE;
            if (!uidOk) {
                await _auth.signOut();
                triggerBtnError("NOT AUTHORIZED");
                return;
            }
            triggerBtnSuccess();
        } catch (err) {
            if (err.code !== "auth/popup-closed-by-user") {
                triggerBtnError("GOOGLE SIGN-IN FAILED");
            }
        }
    });
}

// ── MICROSOFT — PROTEST ───────────────────────────────────────

const microsoftImg = socialBtn?.querySelector('img[alt="Microsoft Logo"]');

if (microsoftImg) {
    microsoftImg.style.cursor = "pointer";
    microsoftImg.addEventListener("click", () => {
        alert("Feature unavailable because I can't make my account part of development program.");
        console.log("SHIT, MICROSOFT!");
    });
}

// ── INIT ──────────────────────────────────────────────────────

async function init() {
    if (loginBtn) {
        loginBtn.disabled    = true;
        loginBtn.textContent = "LOADING...";
    }
    await loadConfig();
    if (loginBtn) {
        if (!_ALLOWED || (!_ALLOWED_UID_EMAIL && !_ALLOWED_UID_GOOGLE)) {
            loginBtn.textContent = "UNAVAILABLE";
            return; // keep disabled — config failed to load
        }
        loginBtn.disabled    = false;
        loginBtn.textContent = "LOGIN";
    }
}

init();
