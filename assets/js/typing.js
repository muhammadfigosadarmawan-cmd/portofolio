/* =============================================
   TYPING ANIMATION
   ============================================= */
const typingEl = document.getElementById("typing");
let roleIndex = 0;
let letter = 0;
let deleting = false;

function typeText() {
  if (!typingEl) return;

  const word = CONFIG.roles[roleIndex];

  typingEl.textContent = deleting
    ? word.substring(0, letter - 1)
    : word.substring(0, letter + 1);

  letter += deleting ? -1 : 1;

  let delay = deleting ? 45 : 90;

  if (!deleting && letter === word.length) {
    deleting = true;
    delay = 1300;
  } else if (deleting && letter === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % CONFIG.roles.length;
    delay = 400;
  }

  setTimeout(typeText, delay);
}

typeText();