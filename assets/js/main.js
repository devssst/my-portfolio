// VISIT BUTTON
const vstBtn = document.getElementById("vst");
if (vstBtn) {
    vstBtn.addEventListener("click", () => {
        window.location.href = "pages/dashboard.html";
    });
}

// DEVELOPER-VISITOR MODE TOGGLE
const logo = document.getElementById("logo");
const modeLabel = document.getElementById("mode-label");
const visitorSection = document.getElementById("visitor-section");
const devSection = document.getElementById("dev-section");

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
