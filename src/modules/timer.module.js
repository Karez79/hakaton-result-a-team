import { Module } from "../core/module";

export class TimerModule extends Module {
  constructor() {
    super("Timer", "Таймер");

    this.$hoursInput = document.querySelector("#hours");

    this.$minutesInput = document.querySelector("#minutes");

    this.$secondsInput = document.querySelector("#seconds");
    this.$secondsInput.addEventListener("input", (event) => {
      const value = Number(event.target.value);
      this.$secondsInputValue = value;
    });

    this.startBtn = document.querySelector("#start");
    this.startBtn.addEventListener("click", this.startTimer.bind(this));
    this.pauseBtn = document.querySelector("#pause");
    this.resetBtn = document.querySelector("#reset");
  }

  updateTimer() {}
  createMessageBlock() {}

  closeModal() {}

  openModal() {}

  startTimer() {
    let ms = this.$secondsInputValue * 1000;
    console.log(ms);

    if (!isNaN(ms)) {
      setTimeout(() => {
        console.log(`Таймер закончился за ${ms / 1000} секунд`);
      }, ms);
    }
  }
}
