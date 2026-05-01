const backBtn = document.getElementById("backToVST");
const vstBtn = document.getElementById("vst");
const logo = document.getElementById("logo");
const modeLabel = document.getElementById("mode-label");
const visitorSection = document.getElementById("visitor-section");
const devSection = document.getElementById("dev-section");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById('password');

// VISIT BUTTON
if (vstBtn) {
    vstBtn.addEventListener("click", () => {
        window.location.href = "pages/dashboard.html";
    });
}

// DEVELOPER-VISITOR MODE TOGGLE
let isDevMode = false;

if (logo && modeLabel && visitorSection && devSection) {
    logo.addEventListener("dblclick", () => {
        isDevMode = !isDevMode;

        if (isDevMode) {
            visitorSection.classList.add("hidden");
            devSection.classList.add("visible");
            modeLabel.textContent = "DEVELOPER";
        } else {
            visitorSection.classList.remove("hidden");
            devSection.classList.remove("visible");
            modeLabel.textContent = "VISITOR";
        }
    });
}

// BACK BUTTON
if (backBtn && visitorSection && modeLabel && devSection) {
    backBtn.addEventListener("click", () => {
        isDevMode = false;
        visitorSection.classList.remove("hidden");
        devSection.classList.remove("visible");
        modeLabel.textContent = "VISITOR";
    });
}

// SHOW/HIDE PASSWORD
togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? 'SHOW' : 'HIDE';
});
