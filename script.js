// ── CURSOR ──
const cursorStar = document.getElementById("cursor-star");
const trailEl = document.getElementById("cursor-trail");
let mx = 0,
  my = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursorStar.style.left = mx + "px";
  cursorStar.style.top = my + "px";
  spawnTrail(mx, my);
});
document.addEventListener("click", () => {
  cursorStar.style.transform = "translate(-50%,-50%) scale(1.8)";
  setTimeout(() => (cursorStar.style.transform = ""), 200);
});
function spawnTrail(x, y) {
  const d = document.createElement("div");
  d.className = "trail-dot";
  d.style.left = x + "px";
  d.style.top = y + "px";
  trailEl.appendChild(d);
  setTimeout(() => d.remove(), 600);
}

// ── SPARKLE CANVAS ──
const canvas = document.getElementById("sparkle-canvas");
const ctx = canvas.getContext("2d");
let sparks = [];
function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
function createSpark() {
  sparks.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    alpha: Math.random(),
    da: (Math.random() - 0.5) * 0.02,
    color: ["#f472b6", "#c084fc", "#818cf8", "#fbbf24", "#ffffff"][
      Math.floor(Math.random() * 5)
    ],
  });
}
for (let i = 0; i < 120; i++) createSpark();
function animateSparks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sparks.forEach((s) => {
    s.alpha += s.da;
    if (s.alpha <= 0 || s.alpha >= 1) s.da *= -1;
    ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(animateSparks);
}
animateSparks();

// ── FLOATING HEARTS ──
const heartContainer = document.getElementById("floating-hearts");
const heartsArr = ["💜", "🌸", "✨", "💫", "🦋", "💕", "🌺", "⭐"];
function spawnHeart() {
  const h = document.createElement("div");
  h.className = "floating-heart";
  h.textContent = heartsArr[Math.floor(Math.random() * heartsArr.length)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration = Math.random() * 10 + 8 + "s";
  h.style.fontSize = Math.random() * 0.8 + 0.6 + "rem";
  h.style.opacity = Math.random() * 0.2 + 0.05;
  heartContainer.appendChild(h);
  setTimeout(() => h.remove(), 18000);
}
setInterval(spawnHeart, 1200);
spawnHeart();

// ── TYPING ANIMATION ──
const fullName = "Salma Hamada Mostafa";
const typedEl = document.getElementById("typed-text");
const cheerEmojis = ["🌸", "✨", "💜", "⭐", "🦋", "💫", "🎀"];
let charIdx = 0;
function typeNext() {
  if (charIdx < fullName.length) {
    typedEl.textContent += fullName[charIdx];
    if (Math.random() > 0.5) spawnHeroCheer();
    charIdx++;
    setTimeout(typeNext, 90 + Math.random() * 60);
  }
}
function spawnHeroCheer() {
  const cheersEl = document.getElementById("hero-cheers");
  const c = document.createElement("div");
  c.className = "hero-emoji-burst";
  c.textContent = cheerEmojis[Math.floor(Math.random() * cheerEmojis.length)];
  c.style.left = 30 + Math.random() * 40 + "%";
  c.style.top = 20 + Math.random() * 40 + "%";
  c.style.setProperty("--tx", Math.random() * 120 - 60 + "px");
  c.style.setProperty("--ty", -Math.random() * 100 - 40 + "px");
  cheersEl.appendChild(c);
  setTimeout(() => c.remove(), 1000);
}
setTimeout(typeNext, 800);

// ── ID CARD DRAG ──
const card = document.getElementById("id-card");
let isDragging = false,
  startX,
  startY,
  initLeft,
  initTop;
card.addEventListener("mousedown", (e) => {
  isDragging = true;
  const rect = card.getBoundingClientRect();
  startX = e.clientX;
  startY = e.clientY;
  initLeft = card.offsetLeft;
  initTop = card.offsetTop;
  card.style.position = "relative";
  card.style.cursor = "grabbing";
  card.style.zIndex = "999";
});
document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  card.style.left = initLeft + e.clientX - startX + "px";
  card.style.top = initTop + e.clientY - startY + "px";
});
document.addEventListener("mouseup", () => {
  isDragging = false;
  card.style.cursor = "grab";
});

// Tilt on mouse move
card.addEventListener("mousemove", (e) => {
  const r = card.getBoundingClientRect();
  const xPct = ((e.clientX - r.left) / r.width - 0.5) * 20;
  const yPct = ((e.clientY - r.top) / r.height - 0.5) * 20;
  card.style.transform = `perspective(600px) rotateY(${xPct}deg) rotateX(${-yPct}deg)`;
});
card.addEventListener("mouseleave", () => {
  card.style.transform = "";
});

// ID card hover cheers
card.addEventListener("mouseenter", () => {
  for (let i = 0; i < 5; i++) setTimeout(() => spawnCardCheer(), i * 120);
});
function spawnCardCheer() {
  const c = document.createElement("div");
  c.className = "id-hover-cheers";
  c.textContent = cheerEmojis[Math.floor(Math.random() * cheerEmojis.length)];
  c.style.left = Math.random() * 220 + "px";
  c.style.top = Math.random() * 100 + "px";
  card.appendChild(c);
  setTimeout(() => c.remove(), 800);
}

// ── SKILL CARDS ──
function toggleCard(el) {
  const wasExpanded = el.classList.contains("expanded");
  document
    .querySelectorAll(".skill-card")
    .forEach((c) => c.classList.remove("expanded"));
  if (!wasExpanded) el.classList.add("expanded");
}

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.15 },
);
reveals.forEach((r) => observer.observe(r));
