/* =============================================
   STAR PARTICLES (CANVAS)
   ============================================= */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeStars() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  particles = Array.from(
    { length: Math.min(100, Math.floor(window.innerWidth / 12)) },
    () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.35 + 0.08,
      alpha: Math.random() * 0.65 + 0.2,
    })
  );
}

function animateStars() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((p) => {
    p.y -= p.speed;
    if (p.y < 0) {
      p.y = window.innerHeight;
      p.x = Math.random() * window.innerWidth;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180,190,255,${p.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

window.addEventListener("resize", resizeStars);
resizeStars();
animateStars();