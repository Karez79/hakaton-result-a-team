import { Module } from "../core/module";

export class TimerModule extends Module {
  constructor() {
    super("Timer", "Таймер");

    this.$hoursInput = document.querySelector("#hours");

    this.$minutesInput = document.querySelector("#minutes");

    this.$secondsInput = document.querySelector("#seconds");
    this.$secondsInput.addEventListener("input", (event) => {
      console.log(event.target.value);
    });

    this.startBtn = document.querySelector("#start");
    this.pauseBtn = document.querySelector("#pause");
    this.resetBtn = document.querySelector("#reset");
  }

  updateTimer() {}
  createMessageBlock() {}

  closeModal() {}

  openModal() {}

  startTimer() {
    let ms = prompt("Введите кол-во секунд для таймера").trim() * 1000;

    while (isNaN(ms)) {
      ms = prompt("Вводите только цифры!").trim() * 1000;
    }

    if (!isNaN(ms)) {
      setTimeout(() => {
        console.log(`Таймер закончился за ${ms / 1000} секунд`);
      }, ms);
    }
  }
}
