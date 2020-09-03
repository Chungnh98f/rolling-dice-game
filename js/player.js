"use strict";
import { random } from "./ultil.js";
import { notiPanel, img } from "./play.js";

class Player {
  constructor(name, score, currentScore, turn, playing) {
    this.name = name;
    this.score = score;
    this.currentScore = currentScore;
    this.turn = turn;
    this.playing = playing;
  }

  roll() {
    const score = random(6) + 1;
    img.src = `./../images/dice-${score}.png`;
    if (score === 1) {
      notiPanel.textContent = `${this.name} rolled ${score}`;
      this.currentScore = 0;
      return score;
    } else {
      this.currentScore += score;
      notiPanel.textContent = `${this.name} rolled ${score}`;
    }
  }

  hold() {
    this.score += this.currentScore;
    this.currentScore = 0;
    notiPanel.textContent = `${this.name} has held`;
  }

}

export { Player };
