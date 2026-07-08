const rollButton = document.querySelector("#roll-button");
const result = document.querySelector("#result");
const resultLabel = document.querySelector("#result-label");
const page = document.body;

const rollMessages = {
  1: "Nat 1 - beautiful disaster",
  2: "the ancient tomes foretold this",
  3: "egads!",
  4: "rookie numbers",
  8: "8 is ian's favorite number",
  20: "Nat 20 - spotlight moment",
};

function rollD20() {
  rollButton.disabled = true;
  page.classList.add("page-rolling");
  resultLabel.textContent = "Rolling...";
  result.classList.remove("rolling", "nat-1", "nat-20");

  let ticks = 0;
  const shuffle = setInterval(() => {
    result.textContent = Math.floor(Math.random() * 20) + 1;
    ticks += 1;

    if (ticks === 10) {
      clearInterval(shuffle);
      showFinalRoll();
    }
  }, 45);
}

function showFinalRoll() {
  const roll = Math.floor(Math.random() * 20) + 1;

  result.textContent = roll;
  resultLabel.textContent = rollMessages[roll] || "The table has spoken";
  result.classList.toggle("nat-1", roll === 1);
  result.classList.toggle("nat-20", roll === 20);
  result.classList.add("rolling");
  setTimeout(() => page.classList.remove("page-rolling"), 420);
  rollButton.disabled = false;
}

rollButton.addEventListener("click", rollD20);
