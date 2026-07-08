const rollButton = document.querySelector("#roll-button");
const result = document.querySelector("#result");
const resultLabel = document.querySelector("#result-label");

const rollMessages = {
  1: "Nat 1 - beautiful disaster",
  20: "Nat 20 - spotlight moment",
};

function rollD20() {
  rollButton.disabled = true;
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
  rollButton.disabled = false;
}

rollButton.addEventListener("click", rollD20);
