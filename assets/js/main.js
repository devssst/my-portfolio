// NOTE FROM DEVS: The credentials are hardcoded as of now. Will connect it to firebase later.

const backBtn = document.getElementById("backToVST");
const vstBtn = document.getElementById("vst");
const logo = document.getElementById("logo");
const modeLabel = document.getElementById("mode-label");
const visitorSection = document.getElementById("visitor-section");
const devSection = document.getElementById("dev-section");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const loginBtn = document.querySelector('#loginForm button[type="submit"]');

// HARDCODED CREDENTIALS (dev/testing only — replace with Firebase later)
const HARDCODED_EMAIL = "viencalderon15@gmail.com";
const HARDCODED_PASSWORD = "gerald32145fw";

// EMAIL FORMAT CHECK
const EMAIL_VALIDATOR = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

// BACK BUTTON
if (backBtn && visitorSection && modeLabel && devSection) {
  backBtn.addEventListener("click", () => {
    isDevMode = false;
    devSection.classList.remove("visible");
    setTimeout(() => {
        visitorSection.classList.remove("hidden");
        modeLabel.textContent = "VISITOR";
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    }, 200);
});
}

// SHOW/HIDE PASSWORD
togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  this.textContent = type === "password" ? "SHOW" : "HIDE";
});

// ERROR HELPERS
let btnResetTimer = null;

function triggerInputError(input) {
  const shakeTarget = input.closest(".p-wrapper") || input;

  input.classList.remove("input-error");
  shakeTarget.classList.remove("shake");
  void shakeTarget.offsetWidth;

  input.classList.add("input-error");
  shakeTarget.classList.add("shake");

  shakeTarget.addEventListener(
    "animationend",
    () => {
      shakeTarget.classList.remove("shake");
    },
    { once: true },
  );

  input.addEventListener(
    "animationend",
    () => {
      input.classList.remove("input-error");
    },
    { once: true },
  );
}

// ERROR AND SUCCESS BUTTON RESETS
function triggerBtnError(message) {
  if (btnResetTimer) clearTimeout(btnResetTimer);
  loginBtn.classList.remove("btn-error", "btn-success");
  void loginBtn.offsetWidth;
  loginBtn.classList.add("btn-error");
  loginBtn.textContent = message;

  btnResetTimer = setTimeout(() => {
    loginBtn.classList.remove("btn-error");
    loginBtn.textContent = "LOGIN";
  }, 1000);
}

function triggerBtnSuccess() {
  if (btnResetTimer) clearTimeout(btnResetTimer);
  loginBtn.classList.remove("btn-error");
  loginBtn.classList.add("btn-success");
  loginBtn.textContent = "WELCOME BACK, VIEN!";
  loginBtn.disabled = true;

  btnResetTimer = setTimeout(() => {
    loginBtn.classList.remove("btn-success");
    loginBtn.textContent = "LOGIN";
  }, 1000);

  setTimeout(() => {
    window.location.href = "pages/dashboard.html?mode=admin";
  }, 1500);
}

// LOGIN FORM VALIDATION
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
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

    if (email !== HARDCODED_EMAIL) {
      triggerInputError(emailInput);
      triggerBtnError("NOT AUTHORIZED EMAIL");
      return;
    }

    if (password !== HARDCODED_PASSWORD) {
      triggerInputError(passwordInput);
      triggerBtnError("WRONG PASSWORD");
      return;
    }

    triggerBtnSuccess();
  });
}
