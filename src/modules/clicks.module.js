import { Module } from "../core/module";

export class ClicksModule extends Module {
  constructor(time) {
    super("Clicks", "Счётчик кликов");
    this.time = time;
  }
  trigger() {
    this.startCount( this.time);
  }

  startCount(time) {
    let clicks = 0;
    let clicksCount = 0;
    let dblsClicksCount = 0;
    let clickTimeout;

    let sumOfClicks = 0;
    document.addEventListener("click", () => {
      clicks++;
      if (clicks === 1) {
        clickTimeout = setTimeout(() => {
          clicksCount++;
          clicks = 0;
        }, 300);
      } else {
        clearTimeout(clickTimeout);
        dblsClicksCount++;
        clicks = 0;
      }
    });

    setTimeout(() => {
      sumOfClicks = clicksCount + dblsClicksCount;

      const msg = document.createElement("div");
      msg.textContent = `За всё время сделанно: ${sumOfClicks} кликов. Из них двойных ${dblsClicksCount}, а одиночных было: ${clicksCount}`;
      document.body.append(msg);
      setTimeout(() => {
        msg.remove();
      }, 2500);
      sumOfClicks = 0;
    }, time * 1000);
  }

  renderModule() {}
}
