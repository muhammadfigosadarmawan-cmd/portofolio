/* =============================================
   CONTACT: isi email display & kirim ke WhatsApp
   ============================================= */
const displayEmail = document.getElementById("displayEmail");
if (displayEmail) displayEmail.textContent = CONFIG.email;

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const text = `Halo Figo, saya ${name}.\nEmail: ${email}\n\n${message}`;
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener");
  });
}

/* ---------- Footer year ---------- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();