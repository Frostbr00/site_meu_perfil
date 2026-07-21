document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector("img").alt;
    lightbox.classList.add("active");
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxImg.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.style.boxShadow = window.scrollY > 20 ? "0 8px 24px rgba(0,0,0,0.35)" : "none";
});

const orb = document.getElementById("orb");
const orbSize = 44;
let orbX = Math.random() * (window.innerWidth - orbSize);
let orbY = Math.random() * (window.innerHeight - orbSize);
let orbAngle = Math.random() * Math.PI * 2;
let orbSpeed = 1.6;
let orbHue = Math.random() * 360;
let orbPopAt = -Infinity;

function setOrbColor(hue) {
  orb.style.background = `radial-gradient(circle at 32% 28%, hsl(${hue} 100% 80%), hsl(${hue} 90% 45%))`;
  orb.style.boxShadow = `0 0 24px 4px hsl(${hue} 100% 60% / 0.55), 0 0 4px hsl(${hue} 100% 85% / 0.9) inset`;
}

// Movement, ambient pulse and click-pop all feed into a single transform here,
// since a CSS keyframe animation on the same property would overwrite this translate.
function stepOrb(now) {
  orbHue = (orbHue + 0.25) % 360;
  setOrbColor(orbHue);

  orbX += Math.cos(orbAngle) * orbSpeed;
  orbY += Math.sin(orbAngle) * orbSpeed;

  const maxX = window.innerWidth - orbSize;
  const maxY = window.innerHeight - orbSize;

  if (orbX <= 0 || orbX >= maxX) {
    orbAngle = Math.PI - orbAngle;
    orbX = Math.min(Math.max(orbX, 0), maxX);
  }
  if (orbY <= 0 || orbY >= maxY) {
    orbAngle = -orbAngle;
    orbY = Math.min(Math.max(orbY, 0), maxY);
  }

  let scale = 1 + 0.06 * Math.sin(now / 400);
  const popElapsed = now - orbPopAt;
  if (popElapsed >= 0 && popElapsed < 350) {
    scale += Math.sin((popElapsed / 350) * Math.PI) * 0.5;
  }

  orb.style.transform = `translate(${orbX}px, ${orbY}px) scale(${scale})`;
  requestAnimationFrame(stepOrb);
}
requestAnimationFrame(stepOrb);

window.addEventListener("resize", () => {
  orbX = Math.min(orbX, window.innerWidth - orbSize);
  orbY = Math.min(orbY, window.innerHeight - orbSize);
});

let orbAudioCtx = null;
function playOrbSound() {
  orbAudioCtx = orbAudioCtx || new (window.AudioContext || window.webkitAudioContext)();
  const ctx = orbAudioCtx;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(760, now + 0.15);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.25);
}

orb.addEventListener("click", () => {
  playOrbSound();
  orbAngle = Math.random() * Math.PI * 2;
  orbHue = (orbHue + 90 + Math.random() * 90) % 360;
  setOrbColor(orbHue);
  orbPopAt = performance.now();
});
