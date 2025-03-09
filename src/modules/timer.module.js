import { Module } from "../core/module";

export class TimerModule extends Module {
  constructor() {
    super("Timer", "Таймер");
  }

  createMessageBlock() {}

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
  renderModule() {}
}
