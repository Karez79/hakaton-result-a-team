export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export const checkValidString = ({ str = '' } = {}) => typeof (str) !== 'string' || str.trim() === '';

export const callRemoveEvent = function ({ ms = 3000 } = {}) {
  setTimeout(function () {
    this.removeEvent();
  }.bind(this), ms)
};