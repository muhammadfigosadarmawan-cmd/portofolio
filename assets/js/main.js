document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-link");
  const year = document.getElementById("year");
  const backToTop = document.getElementById("back-to-top");
  const profilePhoto = document.getElementById("profile-photo");
  const profilePlaceholder = document.getElementById("profile-placeholder");
  const themeToggle = document.getElementById("theme-toggle");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (year) year.textContent = new Date().getFullYear();

  // Foto fallback jika images/foto-figo.jpg belum ditambahkan.
  if (profilePhoto && profilePlaceholder) {
    const fallback = () => { profilePhoto.style.display = "none"; profilePlaceholder.style.display = "flex"; };
    profilePhoto.addEventListener("error", fallback);
    profilePhoto.addEventListener("load", () => { profilePhoto.style.display = "block"; profilePlaceholder.style.display = "none"; });
    if (profilePhoto.complete && profilePhoto.naturalWidth === 0) fallback();
  }

  // Menu mobile
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuToggle.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    navItems.forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  // Theme toggle: tema gelap dan terang.
  if (themeToggle) {
    const savedTheme = localStorage.getItem("figo-theme");
    if (savedTheme === "light") document.body.classList.add("light-theme");
    themeToggle.textContent = document.body.classList.contains("light-theme") ? "☾" : "☼";
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const light = document.body.classList.contains("light-theme");
      themeToggle.textContent = light ? "☾" : "☼";
      localStorage.setItem("figo-theme", light ? "light" : "dark");
    });
  }

  // Reveal animation on scroll.
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealElements.forEach(el => observer.observe(el));
  } else revealElements.forEach(el => el.classList.add("visible"));

  // Typing headline.
  const typing = document.getElementById("typing-text");
  if (typing) {
    const phrases = ["Aspiring Web Developer", "Frontend Enthusiast", "Creative Problem Solver"];
    let phraseIndex = 0, charIndex = phrases[0].length, deleting = true;
    typing.textContent = phrases[0];
    const tick = () => {
      if (deleting) {
        charIndex--;
        typing.textContent = phrases[phraseIndex].substring(0, charIndex);
        if (charIndex <= 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(tick, 300); return; }
      } else {
        charIndex++;
        typing.textContent = phrases[phraseIndex].substring(0, charIndex);
        if (charIndex >= phrases[phraseIndex].length) { deleting = true; setTimeout(tick, 1400); return; }
      }
      setTimeout(tick, deleting ? 42 : 65);
    };
    setTimeout(tick, 1400);
  }

  // Project category filter.
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card[data-category]");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(btn => btn.classList.toggle("active", btn === button));
    projectCards.forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("filtered-out", !show);
    });
  }));

  // Active nav state based on visible section.
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) navItems.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }), { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const updateTop = () => { if (backToTop) backToTop.classList.toggle("show", window.scrollY > 500); };
  window.addEventListener("scroll", updateTop, { passive: true });
  updateTop();
  if (backToTop) backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Form demo: mailto, tidak mengirim ke backend/database.
  if (contactForm) contactForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    if (!name || !email || !subject || !message) {
      if (formStatus) formStatus.textContent = "Mohon lengkapi semua bidang formulir.";
      return;
    }
    const recipient = "EMAIL_KAMU"; // GANTI dengan email aktif milikmu.
    if (recipient === "EMAIL_KAMU") {
      if (formStatus) formStatus.textContent = "Formulir siap, tetapi ganti EMAIL_KAMU di js/main.js dengan email aktif agar bisa digunakan.";
      return;
    }
    const body = `Nama: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;
    if (formStatus) formStatus.textContent = "Aplikasi email sedang dibuka untuk mengirim pesan.";
  });
});
