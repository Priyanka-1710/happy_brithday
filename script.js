// ===================== PAGE 1 — SECRET ENTRY =====================

const openSurpriseBtn = document.getElementById("openSurpriseBtn");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

openSurpriseBtn.addEventListener("click", () => {
  // Gently fade the page 1 text/button out
  page1.classList.add("is-leaving");

  // Then smoothly scroll down to the next section
  setTimeout(() => {
    page2.scrollIntoView({ behavior: "smooth" });
  }, 400);
});

// ===================== PAGE 2 — BIRTHDAY COUNTDOWN =====================

// 👉 EDIT THIS: set his birthday here.
// Format is Year, Month, Day, Hour, Minute — note that months start at 0
// (0 = January, 1 = February, ... 11 = December).
// Example: for December 25, 2026 at midnight, use: new Date(2026, 11, 25, 0, 0)
const BIRTHDAY_DATE = new Date(2026, 8, 30, 0, 0);

const countdownPage = document.getElementById("page2");
const cdDays = document.getElementById("cd-days");
const cdHours = document.getElementById("cd-hours");
const cdMinutes = document.getElementById("cd-minutes");
const cdSeconds = document.getElementById("cd-seconds");

function updateCountdown() {
  const now = new Date();
  const diff = BIRTHDAY_DATE - now;

  if (diff <= 0) {
    // The birthday has arrived — hide the numbers, show the message instead
    countdownPage.classList.add("has-arrived");
    return;
  }

  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;

  const days = Math.floor(diff / oneDay);
  const hours = Math.floor((diff % oneDay) / oneHour);
  const minutes = Math.floor((diff % oneHour) / oneMinute);
  const seconds = Math.floor((diff % oneMinute) / oneSecond);

  // padStart(2, "0") turns "5" into "05" so it always shows two digits
  cdDays.textContent = String(days).padStart(2, "0");
  cdHours.textContent = String(hours).padStart(2, "0");
  cdMinutes.textContent = String(minutes).padStart(2, "0");
  cdSeconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// "There's more..." button — scrolls to Page 3
const moreBtn = document.getElementById("moreBtn");
const page3 = document.getElementById("page3");

moreBtn.addEventListener("click", () => {
  page3.scrollIntoView({ behavior: "smooth" });
});

// ===================== PAGE 3 — WHY YOU? =====================
// Reveal each reason card as it scrolls into view, using
// IntersectionObserver (a built-in way to watch when an element
// enters the visible part of the screen).

const reasonCards = document.querySelectorAll(".reason-card");

const reasonObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        // Stop watching this card once it's been revealed
        reasonObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 } // fires when 30% of the card is visible
);

reasonCards.forEach((card) => reasonObserver.observe(card));

// ===================== PAGE 4 — OUR MEMORIES =====================
// Clicking (or pressing Enter/Space on) a polaroid flips it to reveal
// the memory written on its back.

const polaroids = document.querySelectorAll(".polaroid");

polaroids.forEach((polaroid) => {
  polaroid.addEventListener("click", () => {
    polaroid.classList.toggle("is-flipped");
  });

  // Also allow flipping with the keyboard (Enter or Space), since
  // these cards are focusable via tabindex="0" in the HTML
  polaroid.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      polaroid.classList.toggle("is-flipped");
    }
  });
});

// ===================== PAGE 5 — LONG DISTANCE =====================
// Draw the connecting line (and fade in the heart) once it scrolls
// into view, using the same IntersectionObserver approach as Page 3.

const ldConnector = document.querySelector(".ld-connector");

const ldObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        ldObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

ldObserver.observe(ldConnector);

// ===================== PAGE 6 — OUR SONG =====================

const playPauseBtn = document.getElementById("playPauseBtn");
const playIcon = document.getElementById("playIcon");
const songAudio = document.getElementById("songAudio");
const songPlayer = document.querySelector(".song-player");

playPauseBtn.addEventListener("click", () => {
  if (songAudio.paused) {
    songAudio.play();
  } else {
    songAudio.pause();
  }
});

// Keep the icon and the equalizer bars in sync with whatever
// the audio is actually doing (play, pause, or reaching the end)
songAudio.addEventListener("play", () => {
  playIcon.textContent = "⏸";
  playPauseBtn.setAttribute("aria-label", "Pause song");
  songPlayer.classList.add("is-playing");
});

songAudio.addEventListener("pause", () => {
  playIcon.textContent = "▶";
  playPauseBtn.setAttribute("aria-label", "Play song");
  songPlayer.classList.remove("is-playing");
});

// ===================== PAGE 7 — ONE LAST THING =====================
// Reveal the three lines (each fading in with its own --delay,
// set in the HTML) once this section scrolls into view.

const lastThingPage = document.getElementById("page7");

const lastThingObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        lastThingObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

lastThingObserver.observe(lastThingPage);

// ===================== FINAL PAGE — BIRTHDAY SURPRISE =====================

const giftBtn = document.getElementById("giftBtn");
const finalPage = document.getElementById("page8");
const confettiLayer = document.getElementById("confettiLayer");

// A small set of pieces in colors that match the site's palette,
// mixing hearts with plain color blocks
const confettiPieces = ["❤️", "🩷", "✨", "•", "•"];
const confettiColors = ["#d98a9b", "#7c3b46", "#f4ece9"];

function launchConfetti() {
  const pieceCount = 40;

  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement("span");
    const symbol = confettiPieces[Math.floor(Math.random() * confettiPieces.length)];
    piece.textContent = symbol;
    piece.className = "confetti-piece";

    // Random horizontal position across the section
    piece.style.left = `${Math.random() * 100}%`;

    // Random fall duration and slight start delay, so pieces
    // don't all move in perfect unison
    const duration = 3 + Math.random() * 2.5; // 3s–5.5s
    const delay = Math.random() * 0.6;
    piece.style.animationDuration = `${duration}s`;
    piece.style.animationDelay = `${delay}s`;

    // Give plain "•" pieces a random palette color instead of black text
    if (symbol === "•") {
      piece.style.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      piece.style.fontSize = "1.6rem";
    }

    confettiLayer.appendChild(piece);

    // Clean up each piece once its fall animation finishes,
    // so they don't pile up in the page forever
    piece.addEventListener("animationend", () => piece.remove());
  }
}

giftBtn.addEventListener("click", () => {
  finalPage.classList.add("is-opened");
  launchConfetti();
});

// ===================== "NEXT" BUTTONS (Pages 3–7) =====================
// Each button carries a data-target attribute naming the section id
// it should scroll to — one shared handler works for all of them.

const nextButtons = document.querySelectorAll(".next-btn");

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetSection = document.getElementById(button.dataset.target);
    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});
