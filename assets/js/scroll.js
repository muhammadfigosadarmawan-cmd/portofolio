/* =============================================
   SCROLL: HEADER, BACK-TO-TOP, REVEAL, ACTIVE NAV
   ============================================= */
const header = document.getElementById("header");
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  header.classList.toggle("glass", window.scrollY > 30);
  backTop.classList.toggle("visible", window.scrollY > 400);
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(".reveal, .reveal-left, .reveal-right")
  .forEach((el) => revealObserver.observe(el));

/* ---------- Active nav link ---------- */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

document.querySelectorAll("main section[id]").forEach((section) => {
  sectionObserver.observe(section);
});