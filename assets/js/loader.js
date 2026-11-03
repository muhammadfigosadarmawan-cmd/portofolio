/* =============================================
   LOADING SCREEN
   ============================================= */
const loader = document.getElementById("loader");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

let progress = 0;
let pageLoaded = document.readyState === "complete";
const startTime = Date.now();

window.addEventListener("load", () => {
  pageLoaded = true;
});

const loadingInterval = setInterval(() => {
  // Naik perlahan sampai 90%
  if (progress < 90) {
    progress = Math.min(progress + Math.random() * 3 + 0.5, 90);
  }

  // Lompat ke 100% kalau halaman sudah load & minimal 1.8 detik
  if (pageLoaded && Date.now() - startTime >= 1800) {
    progress = 100;
  }

  progressBar.style.width = progress + "%";
  progressText.textContent = Math.floor(progress) + "%";

  if (progress >= 100) {
    clearInterval(loadingInterval);
    setTimeout(() => loader.classList.add("hide"), 350);
  }
}, 35);