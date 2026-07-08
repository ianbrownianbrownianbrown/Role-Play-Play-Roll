const rollButton = document.querySelector("#roll-button");
const result = document.querySelector("#result");
const resultLabel = document.querySelector("#result-label");
const page = document.body;
const chillOverlay = document.querySelector("#chill-overlay");
const rapidTapWindowMs = 7000;
const rapidTapTarget = 20;

let rollTapTimes = [];
let isRolling = false;
let shuffleTimer;
let pagePulseTimer;

const rollMessages = {
  1: "Nat 1 - beautiful disaster",
  2: "the ancient tomes foretold this",
  3: "egads!",
  4: "rookie numbers",
  5: "a humble and dare i say suspicious start",
  6: "just squeaking by with this one",
  7: "you perchanced this didn't you?",
  8: "8 is ian's favorite number",
  9: "needs more eye of newt",
  10: "perfectly mid",
  11: "slightly less lackluster than 10",
  12: "wowee zowee",
  13: "cursed number, blessed audience",
  14: "let's hope for a modifier here",
  15: "how about these apples?",
  16: "boom shakalaka",
  17: "boo yah grandma",
  18: "main character type shiz",
  19: "miracles are real",
  20: "Nat 20 - spotlight moment",
};

function rollD20() {
  if (isRolling || page.classList.contains("chill-mode")) {
    return;
  }

  isRolling = true;

  if (pagePulseTimer) {
    clearTimeout(pagePulseTimer);
    pagePulseTimer = null;
  }

  page.classList.add("page-rolling");
  resultLabel.textContent = "Rolling...";
  result.classList.remove("rolling", "nat-1", "nat-20");

  let ticks = 0;
  shuffleTimer = setInterval(() => {
    result.textContent = Math.floor(Math.random() * 20) + 1;
    ticks += 1;

    if (ticks === 10) {
      clearInterval(shuffleTimer);
      shuffleTimer = null;
      showFinalRoll();
    }
  }, 45);
}

function showFinalRoll() {
  const roll = Math.floor(Math.random() * 20) + 1;

  result.textContent = roll;
  resultLabel.textContent = rollMessages[roll] || "the dice are being mysterious";
  result.classList.toggle("nat-1", roll === 1);
  result.classList.toggle("nat-20", roll === 20);
  result.classList.add("rolling");
  pagePulseTimer = setTimeout(() => {
    page.classList.remove("page-rolling");
    pagePulseTimer = null;
  }, 420);
  isRolling = false;
}

function trackRollTap() {
  const now = Date.now();

  rollTapTimes = rollTapTimes.filter((tapTime) => now - tapTime < rapidTapWindowMs);
  rollTapTimes.push(now);

  if (rollTapTimes.length >= rapidTapTarget) {
    triggerChillMode();
  }
}

function triggerChillMode() {
  if (page.classList.contains("chill-mode")) {
    return;
  }

  if (shuffleTimer) {
    clearInterval(shuffleTimer);
    shuffleTimer = null;
  }

  if (pagePulseTimer) {
    clearTimeout(pagePulseTimer);
    pagePulseTimer = null;
  }

  isRolling = false;
  rollButton.disabled = true;
  result.classList.remove("rolling", "nat-1", "nat-20");
  page.classList.remove("page-rolling");
  page.classList.add("chill-mode");
  chillOverlay.setAttribute("aria-hidden", "false");
}

rollButton.addEventListener("click", () => {
  trackRollTap();
  rollD20();
});
