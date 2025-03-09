import { Module } from "../core/module";

export class TimerModule extends Module {
  constructor() {
    super("timer", "Таймер");

    this.timerTest = document.querySelector("#timer"); // Кнопка для открытия таймера
    this.timerTest.addEventListener("click", this.trigger.bind(this)); // Обработчик для кнопки открытия

    this.timerInterval = null;
    this.remainingTime = 0;
  }

  createTimerMarkup() {
    const timerContainer = document.createElement("div");
    timerContainer.classList.add("timer-container");

    const h2 = document.createElement("h2");
    h2.textContent = "TIMER";
    timerContainer.appendChild(h2);

    const closeButton = document.createElement("button");
    closeButton.id = "close";
    closeButton.textContent = "Close";
    closeButton.classList.add("icon-close");
    closeButton.addEventListener("click", this.closeModal.bind(this));
    timerContainer.appendChild(closeButton);

    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const hoursLabel = document.createElement("label");
    hoursLabel.setAttribute("for", "hours");
    const hoursInput = document.createElement("input");
    hoursInput.type = "number";
    hoursInput.id = "hours";
    hoursInput.min = "0";
    hoursInput.max = "99";
    hoursInput.placeholder = "99";
    hoursLabel.appendChild(hoursInput);
    hoursLabel.appendChild(document.createTextNode("Hours"));
    inputGroup.appendChild(hoursLabel);

    const minutesLabel = document.createElement("label");
    minutesLabel.setAttribute("for", "minutes");
    const minutesInput = document.createElement("input");
    minutesInput.type = "number";
    minutesInput.id = "minutes";
    minutesInput.min = "0";
    minutesInput.max = "59";
    minutesInput.placeholder = "59";
    minutesLabel.appendChild(minutesInput);
    minutesLabel.appendChild(document.createTextNode("Minutes"));
    inputGroup.appendChild(minutesLabel);

    const secondsLabel = document.createElement("label");
    secondsLabel.setAttribute("for", "seconds");
    const secondsInput = document.createElement("input");
    secondsInput.type = "number";
    secondsInput.id = "seconds";
    secondsInput.min = "0";
    secondsInput.max = "59";
    secondsInput.placeholder = "59";
    secondsLabel.appendChild(secondsInput);
    secondsLabel.appendChild(document.createTextNode("Seconds"));
    inputGroup.appendChild(secondsLabel);

    timerContainer.appendChild(inputGroup);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    const startButton = document.createElement("button");
    startButton.id = "start";
    startButton.textContent = "START";
    startButton.addEventListener("click", this.startTimer.bind(this));
    buttonsDiv.appendChild(startButton);

    const pauseButton = document.createElement("button");
    pauseButton.id = "pause";
    pauseButton.textContent = "PAUSE";
    pauseButton.addEventListener("click", this.pauseTimer.bind(this));
    buttonsDiv.appendChild(pauseButton);

    const resetButton = document.createElement("button");
    resetButton.id = "reset";
    resetButton.textContent = "RESET";
    resetButton.addEventListener("click", this.resetTimer.bind(this));
    buttonsDiv.appendChild(resetButton);

    timerContainer.appendChild(buttonsDiv);

    document.body.appendChild(timerContainer);
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
    const timerContainer = document.querySelector(".timer-container");
    if (timerContainer) {
      timerContainer.remove();
    }
    this.timerTest.removeAttribute("hidden");
  }

  trigger() {
    this.createTimerMarkup();
    this.timerTest.setAttribute("hidden", "");
  }

  startTimer() {
    const hoursInput = document.querySelector("#hours");
    const minutesInput = document.querySelector("#minutes");
    const secondsInput = document.querySelector("#seconds");

    if (this.timerInterval) {
      return;
    }

    let totalSeconds;

    if (this.remainingTime > 0) {
      totalSeconds = this.remainingTime;
    } else {
      const hours = Number(hoursInput.value);
      const minutes = Number(minutesInput.value);
      const seconds = Number(secondsInput.value);

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

    document.querySelector("#hours").value = String(hours).padStart(2, "0");
    document.querySelector("#minutes").value = String(minutes).padStart(2, "0");
    document.querySelector("#seconds").value = String(seconds).padStart(2, "0");
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
    document.querySelector("#hours").value = "00";
    document.querySelector("#minutes").value = "00";
    document.querySelector("#seconds").value = "00";
    this.stopTimer();
  }
}
