// =====================================
// NOVATRUST PRIVATE BANKING - APP JS
// UI Enhancements & Interactions
// =====================================
// –––– SESSION CHECK ––––
document.addEventListener(“DOMContentLoaded”, function () {
const savedUser = localStorage.getItem(“novatrust_user”);

if (savedUser) {
console.log(“Session active:”, savedUser);
}

// Smooth fade-in effect
const main = document.querySelector(”.main”);
if (main) {
main.style.opacity = 0;
main.style.transform = “translateY(10px)”;
setTimeout(() => {
main.style.transition = “0.6s ease”;
main.style.opacity = 1;
main.style.transform = “translateY(0)”;
}, 100);
}
});

// –––– NUMBER ANIMATION FOR BALANCES ––––
function animateValue(element, start, end, duration) {
if (!element) return;

let startTimestamp = null;

const step = (timestamp) => {
if (!startTimestamp) startTimestamp = timestamp;

```
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
```

};

window.requestAnimationFrame(step);
}

// –––– AUTO ANIMATE DASHBOARD BALANCES ––––
window.addEventListener(“load”, function () {
const balanceElements = document.querySelectorAll(”.card h2”);

balanceElements.forEach((el) => {
let text = el.innerText.replace(/[$,+]/g, “”);
let value = parseFloat(text);
if (!isNaN(value) && value > 1000) {
animateValue(el, 0, value, 1200);
}
});
});

// –––– NOTIFICATION SYSTEM ––––
function showNotification(message) {
const notif = document.createElement(“div”);

notif.innerText = message;

notif.style.position = “fixed”;
notif.style.top = “20px”;
notif.style.right = “20px”;
notif.style.background = “#d4af37”;
notif.style.color = “#000”;
notif.style.padding = “12px 18px”;
notif.style.borderRadius = “10px”;
notif.style.boxShadow = “0 10px 25px rgba(0,0,0,0.3)”;
notif.style.zIndex = 9999;
notif.style.fontWeight = “600”;
notif.style.fontSize = “14px”;

document.body.appendChild(notif);

setTimeout(() => {
notif.style.transition = “opacity 0.4s”;
notif.style.opacity = 0;
setTimeout(() => notif.remove(), 400);
}, 3000);
}

// –––– DASHBOARD WELCOME ––––
setTimeout(() => {
if (window.location.pathname.includes(“dashboard”)) {
showNotification(“Welcome to NovaTrust Private Banking”);
}
}, 1500);

// –––– TRANSFER SUCCESS ––––
function triggerTransferSuccess() {
showNotification(“Transfer completed successfully”);
}
console.log(“NovaTrust Private Banking loaded successfully”);
