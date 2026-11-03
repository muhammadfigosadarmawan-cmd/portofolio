document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const bar = document.getElementById("progress-bar");
  const label = document.getElementById("progress-text");
  if (!loader || !bar || !label) return;

  let progress = 0;
  let loaded = document.readyState === "complete";
  const startedAt = Date.now();
  window.addEventListener("load", () => { loaded = true; });

  const timer = setInterval(() => {
    if (progress < 90) progress = Math.min(progress + Math.random() * 3 + 0.7, 90);
    if (loaded && Date.now() - startedAt > 1500) progress = 100;
    bar.style.width = `${progress}%`;
    label.textContent = `${Math.floor(progress)}%`;
    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(() => loader.classList.add("hide"), 300);
    }
  }, 35);
});
