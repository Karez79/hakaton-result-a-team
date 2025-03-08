import { callRemoveEvent } from "../utils";

export class Module {
  constructor(type, text) {
    if (!type) {
      throw new Error('Please specify "type" param')
    }
    if (!text) {
      throw new Error('Please specify "text" param')
    }
    this.type = type
    this.text = text
    this.callRemoveEvent = callRemoveEvent.bind(this);
  }

  removeEvent() {
    throw new Error(`removeEvent method should be implemented in module "${this.type}"`)
  }

  trigger() {
    throw new Error(`Trigger method should be implemented in module "${this.type}"`)
  }

  toHTML() {
    return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
  }
}