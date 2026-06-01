// =====================================
// NOVATRUST PRIVATE BANKING - APP JS
// Deinteractions & UI enhancements
// =====================================

// -------- LOGIN MEMORY  --------
document.addEventListener("DOMContentLoaded", function () {
  const savedUser = localStorage.getItem("novatrust_user");

  // If user is logged in before, show greeting (optional use)
  if (savedUser) {
    console.log("Welcome back,", savedUser);
  }

  // Add smooth fade-in effect to main page
  const main = document.querySelector(".main");
  if (main) {
    main.style.opacity = 0;
    main.style.transform = "translateY(10px)";
    setTimeout(() => {
      main.style.transition = "0.6s ease";
      main.style.opacity = 1;
      main.style.transform = "translateY(0)";
    }, 100);
  }
});

// -------- LOGIN STORAGE (OPTIONAL USE) --------
// You can call this manually if you want later
function setDemoUser() {
  localStorage.setItem("novatrust_user", "Vanessa Morgan");
}

// -------- NUMBER ANIMATION FOR BALANCES --------
function animateValue(element, start, end, duration) {
  if (!element) return;

  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;

    const progress = Math.min(
      (timestamp - startTimestamp) / duration,
      1
    );

    const value = progress * (end - start) + start;

    element.innerText =
      "$" + value.toLocaleString(undefined, { maximumFractionDigits: 2 });

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

// -------- AUTO ANIMATE DASHBOARD BALANCES --------
window.addEventListener("load", function () {
  const balanceElements = document.querySelectorAll(".card h2");

  balanceElements.forEach((el) => {
    let text = el.innerText.replace(/[$,]/g, "");

    let value = parseFloat(text);

    if (!isNaN(value)) {
      animateValue(el, 0, value, 1200);
    }
  });
});

// -------- SIMPLE NOTIFICATION SYSTEM --------
function showNotification(message) {
  const notif = document.createElement("div");

  notif.innerText = message;

  notif.style.position = "fixed";
  notif.style.top = "20px";
  notif.style.right = "20px";
  notif.style.background = "#d4af37";
  notif.style.color = "#000";
  notif.style.padding = "12px 18px";
  notif.style.borderRadius = "10px";
  notif.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
  notif.style.zIndex = 9999;
  notif.style.fontWeight = "600";

  document.body.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 3000);
}

// --------  TRIGGER (OPTIONAL) --------
setTimeout(() => {
  if (window.location.pathname.includes("dashboard")) {
    showNotification("Welcome to NovaTrust Private Banking");
  }
}, 1500);

// -------- TRANSFER SUCCESS LINKING --------
function triggerTransferSuccess() {
  showNotification("Transfer completed successfully");
}

// -------- GLOBAL DEBUG (optional) --------
console.log("NovaTrust Private Banking loaded successfully");
