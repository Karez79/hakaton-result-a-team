import { Module } from '../core/module';

export class SoundModule extends Module {
  constructor() {
    super('sound', 'Послушать');
  }

  async playSound() {
    try {
      const response = await fetch('https://www.soundy.top', {
        headers: {
          accept: 'application/json; version=1',
        },
      });
      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }
      const data = await response.json();
      console.log('Данные с сервера:', data);
      // Предполагаем, что API возвращает массив звуков
      const sounds = Array.isArray(data) ? data : data.sounds;
      if (!sounds || sounds.length === 0) {
        throw new Error('Нет доступных звуков');
      }
      const randomIndex = Math.floor(Math.random() * sounds.length);
      const randomSound = sounds[randomIndex];
      if (!randomSound.url) {
        throw new Error('Не найден URL для выбранного звука');
      }
      // Если URL начинается с '//', добавляем протокол
      let soundUrl = randomSound.url;
      if (soundUrl.startsWith('//')) {
        soundUrl = 'https:' + soundUrl;
      }
      const audio = new Audio(soundUrl);
      audio.play();
    } catch (error) {
      console.error('Ошибка при воспроизведении звука:', error);
    }
  }

  renderButtonSound() {
    const btn = document.createElement('button');
    btn.id = 'sound';
    btn.textContent = this.text;
    btn.className = 'sound';
    btn.addEventListener('click', () => this.playSound());
    document.body.appendChild(btn);
  }
}
