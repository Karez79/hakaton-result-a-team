import { Module } from "../core/module";

export class TimerModule extends Module {
  constructor() {
    super("Timer", "Таймер");

    this.$rootElement = document.querySelector(".timer-container");
    this.$rootElement.setAttribute("hidden", "");

    this.$hoursInput = document.querySelector("#hours");

    this.$minutesInput = document.querySelector("#minutes");

    this.$secondsInput = document.querySelector("#seconds");

    this.startBtn = document.querySelector("#start");
    this.startBtn.addEventListener("click", this.startTimer.bind(this));
    this.pauseBtn = document.querySelector("#pause");
    this.pauseBtn.addEventListener("click", this.pauseTimer.bind(this));
    this.resetBtn = document.querySelector("#reset");
    this.resetBtn.addEventListener("click", this.resetTimer.bind(this));

    this.closeBtn = document.querySelector("#close");
    this.closeBtn.classList.add("icon-close");
    this.closeBtn.addEventListener("click", this.closeModal.bind(this));

    this.timerTest = document.querySelector("#timer");
    this.timerTest.addEventListener("click", this.openModal.bind(this));

    this.timerInterval = null;
    this.remainingTime = 0;
  }

  createMessageBlock() {
    const msg = document.createElement("div");
    msg.textContent = "Таймер закончен";
    document.body.append(msg);
    setTimeout(() => {
      msg.remove();
    }, 2500);
  }

  closeModal() {
    this.$rootElement.setAttribute("hidden", "");
    this.timerTest.removeAttribute("hidden");
  }

  openModal() {
    this.$rootElement.removeAttribute("hidden");
    this.timerTest.setAttribute("hidden", "");
  }

  startTimer() {
    if (this.timerInterval) {
      return;
    }

    let totalSeconds;

    if (this.remainingTime > 0) {
      totalSeconds = this.remainingTime;
    } else {
      const hours = Number(this.$hoursInput.value);
      const minutes = Number(this.$minutesInput.value);
      const seconds = Number(this.$secondsInput.value);

      totalSeconds = hours * 3600 + minutes * 60 + seconds;
    }

    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      alert("Введите корректное время!");
      return;
    }

    this.timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        this.remainingTime = totalSeconds;
        this.updateTimer(totalSeconds);
      } else {
        this.stopTimer();
        this.createMessageBlock();
      }
    }, 1000);
  }

  updateTimer(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.$hoursInput.value = String(hours).padStart(2, "0");
    this.$minutesInput.value = String(minutes).padStart(2, "0");
    this.$secondsInput.value = String(seconds).padStart(2, "0");
  }

  pauseTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.remainingTime = 0;
  }

  resetTimer() {
    this.$hoursInput.value = "00";
    this.$minutesInput.value = "00";
    this.$secondsInput.value = "00";
    this.stopTimer();
  }
}
