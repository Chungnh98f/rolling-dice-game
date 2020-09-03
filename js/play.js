"use strict";
import { Player } from "./player.js";
import { random } from "./ultil.js";
// import { roll } from "./roll.js";

// const player = [player1, player2];
let player = [];
let rollingPlayer;
export let target;

const newBtn = document.querySelector(".btn-new");
const rollBtn = document.querySelector(".btn-roll");
const holdBtn = document.querySelector(".btn-hold");
const resetBtn = document.querySelector(".btn-reset");
const targetInput = document.querySelector("input");
const targetScore = document.querySelector("h4.final-score");
export const img = document.querySelector("img");
const player1Panel = document.querySelector(".player-0-panel");
const player2Panel = document.querySelector(".player-1-panel");

const curScore1 = document.getElementById("current-0");
const finalScore1 = document.getElementById("score-0");
const curScore2 = document.getElementById("current-1");
const finalScore2 = document.getElementById("score-1");

export const notiPanel = document.querySelector(".noti-panel");

newBtn.addEventListener("click", () => {
  const player1 = new Player("Player 1", 0, 0, 0, false);
  const player2 = new Player("Player 2", 0, 0, 0, false);
  player.push(player1, player2);
  if (!targetInput.value) {
    alert(`Fill in target score`);
  } else {
    target = targetInput.value;
    console.log(target);
    newBtn.classList.add("d-none");
    notiPanel.classList.remove("d-none");
    rollBtn.classList.remove("d-none");
    holdBtn.classList.remove("d-none");
    targetInput.classList.add("d-none");
    targetScore.classList.remove("d-none");
    targetScore.textContent = `Target score: ${target}`;

    startGame();
    render();
  }
});

rollBtn.addEventListener("click", () => {
  img.classList.remove("d-none");
  const score = rollingPlayer.roll();
  if (score === 1) {
    switchTurn();
  }

  render();
});

holdBtn.addEventListener("click", () => {
  rollingPlayer.hold();
  render();
  if (rollingPlayer.score >= target) {
    isWon();
  } else {
    switchTurn();
    render();
  }
});

resetBtn.addEventListener("click", () => {
  reset();
});

function startGame() {
  const startPlayer = player[random(2)];
  startPlayer.playing = true;
  startPlayer.turn++;
  rollingPlayer = startPlayer;
  notiPanel.textContent = `${startPlayer.name} go first`;
}

function switchTurn() {
  if (player[0].playing) {
    player[0].playing = false;
    player[1].playing = true;
    player[1].turn++;
    rollingPlayer = player[1];
  } else {
    player[1].playing = false;
    player[0].playing = true;
    player[0].turn++;
    rollingPlayer = player[0];
  }

  notiPanel.textContent += `\n${rollingPlayer.name} is rolling`;
}

function render() {
  curScore1.textContent = player[0].currentScore;
  finalScore1.textContent = player[0].score;
  curScore2.textContent = player[1].currentScore;
  finalScore2.textContent = player[1].score;
  if (rollingPlayer.name === "Player 1") {
    player1Panel.classList.add("active");
    player2Panel.classList.remove("active");
  } else {
    player2Panel.classList.add("active");
    player1Panel.classList.remove("active");
  }
}

function isWon() {
  notiPanel.textContent = `${rollingPlayer.name} has won`;
  resetBtn.classList.remove("d-none");
  img.classList.add("d-none");
  rollBtn.classList.add("d-none");
  holdBtn.classList.add("d-none");
}

function reset() {
  newBtn.classList.remove("d-none");
  notiPanel.classList.add("d-none");
  rollBtn.classList.add("d-none");
  holdBtn.classList.add("d-none");
  targetInput.classList.remove("d-none");
  targetInput.value = "";
  targetScore.classList.add("d-none");
  resetBtn.classList.add("d-none");
  player = [];
  curScore1.textContent = 0;
  finalScore1.textContent = 0;
  curScore2.textContent = 0;
  finalScore2.textContent = 0;
}
