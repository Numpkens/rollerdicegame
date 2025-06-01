let point = null;
let isGameActive = false;

const dieImages = [
  "images/d1.png",
  "images/d2.png",
  "images/d3.png",
  "images/d4.png",
  "images/d5.png",
  "images/d6.png"
];

const die1Img = document.getElementById("die1");
const die2Img = document.getElementById("die2");
const message = document.getElementById("message");

document.getElementById("roll").addEventListener("click", comeOutRoll);
document.getElementById("reroll").addEventListener("click", pointPhaseRoll);
document.getElementById("quit").addEventListener("click", resetGame);

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function updateDice(d1, d2) {
  die1Img.src = dieImages[d1 - 1];
  die2Img.src = dieImages[d2 - 1];
}

function showMessage(msg) {
  message.textContent = msg;
}

function comeOutRoll() {
  if (point !== null) {
    showMessage("You're in the point phase. Use 'Roll Again'.");
    return;
  }

  const die1 = rollDie();
  const die2 = rollDie();
  const sum = die1 + die2;
  updateDice(die1, die2);

  if (sum === 7 || sum === 11) {
    showMessage("Natural! You win!");
  } else if (sum === 2 || sum === 3 || sum === 12) {
    showMessage("Craps! You lose.");
  } else {
    point = sum;
    showMessage(`Point is set to ${point}. Use 'Roll Again'!`);
  }
}

function pointPhaseRoll() {
  if (point === null) {
    showMessage("Use 'Roll' for the come-out roll first.");
    return;
  }

  const die1 = rollDie();
  const die2 = rollDie();
  const sum = die1 + die2;
  updateDice(die1, die2);

  if (sum === point) {
    showMessage("You hit your point again! You win!");
    point = null;
  } else if (sum === 7) {
    showMessage("Seven-out! You lose.");
    point = null;
  } else {
    showMessage(`Rolling for point ${point}...`);
  }
}

function resetGame() {
  point = null;
  updateDice(1, 2);
  showMessage("Game reset. Click 'Roll' to start.");
}


