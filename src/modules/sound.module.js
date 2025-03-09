import { Module } from '../core/module';

export class SoundModule extends Module {
  constructor() {
    super('deezerSound', 'Послушать');
    this.audio = null;
    this.currentTrack = null;
    this.playlist = [];
    this.currentIndex = -1;
  }

  jsonp(url) {
    return new Promise((resolve, reject) => {
      const cb = 'cb_' + Math.random().toString(36).substr(2, 5);
      const script = document.createElement('script');
      window[cb] = (data) => {
        delete window[cb];
        document.body.removeChild(script);
        resolve(data);
      };
      script.src = `${url}&callback=${cb}`;
      script.onerror = () => {
        delete window[cb];
        document.body.removeChild(script);
        reject(new Error('JSONP error'));
      };
      document.body.appendChild(script);
    });
  }

  async getTrack() {
    const url = 'https://api.deezer.com/search?q=track&limit=50&output=jsonp';
    const data = await this.jsonp(url);
    if (data.data && data.data.length > 0) {
      return data.data[Math.floor(Math.random() * data.data.length)];
    }
    throw new Error('Не удалось найти трек');
  }

  async playSound() {
    try {
      const track = await this.getTrack();
      this.addToPlaylist(track);
      this.playTrack(track);
    } catch (error) {
      console.error('Ошибка при воспроизведении трека из Deezer:', error);
    }
  }

  playTrack(track) {
    if (this.audio) this.audio.pause();
    this.currentTrack = track;
    if (track.preview) {
      this.audio = new Audio(track.preview);
      this.audio.play();
      this.renderPlayer();
    } else {
      console.error('Нет превью у трека');
    }
  }

  addToPlaylist(track) {
    if (this.currentIndex === this.playlist.length - 1) {
      this.playlist.push(track);
      this.currentIndex++;
    } else {
      this.playlist = this.playlist.slice(0, this.currentIndex + 1);
      this.playlist.push(track);
      this.currentIndex++;
    }
  }

  async playNext() {
    if (this.currentIndex < this.playlist.length - 1) {
      const track = this.playlist[this.currentIndex + 1];
      this.currentIndex++;
      this.playTrack(track);
    } else {
      await this.playSound();
    }
  }

  playPrev() {
    if (this.currentIndex > 0) {
      const track = this.playlist[this.currentIndex - 1];
      this.currentIndex--;
      this.playTrack(track);
    }
  }

  renderPlayer() {
    let player = document.getElementById('audio-player');
    if (!player) {
      player = document.createElement('div');
      player.id = 'audio-player';
      player.className = 'sound__player';
      const cover = document.createElement('img');
      cover.id = 'player-cover';
      cover.className = 'sound__player-cover';
      player.appendChild(cover);
      const title = document.createElement('span');
      title.id = 'player-title';
      title.className = 'sound__player-title';
      player.appendChild(title);
      const controls = document.createElement('div');
      controls.className = 'sound__player-controls';
      const prevButton = document.createElement('button');
      prevButton.id = 'player-prev';
      prevButton.className = 'sound__player-prev';
      prevButton.textContent = 'Prev';
      prevButton.onclick = () => this.playPrev();
      controls.appendChild(prevButton);
      const playButton = document.createElement('button');
      playButton.id = 'player-play';
      playButton.className = 'sound__player-play';
      playButton.onclick = () => this.togglePlay();
      controls.appendChild(playButton);
      const nextButton = document.createElement('button');
      nextButton.id = 'player-next';
      nextButton.className = 'sound__player-next';
      nextButton.textContent = 'Next';
      nextButton.onclick = () => this.playNext();
      controls.appendChild(nextButton);
      player.appendChild(controls);
      document.body.appendChild(player);
    }
    const cover = document.getElementById('player-cover');
    const title = document.getElementById('player-title');
    const playButton = document.getElementById('player-play');
    cover.src =
      (this.currentTrack &&
        this.currentTrack.album &&
        (this.currentTrack.album.cover_medium || this.currentTrack.album.cover)) ||
      '';
    title.textContent = this.currentTrack ? this.currentTrack.title : '';
    playButton.textContent = this.audio && !this.audio.paused ? 'Pause' : 'Play';
  }

  togglePlay() {
    if (this.audio) {
      this.audio.paused ? this.audio.play() : this.audio.pause();
      this.renderPlayer();
    }
  }

  renderButtonSound() {
    const btn = document.createElement('button');
    btn.id = 'sound';
    btn.className = 'sound__button';
    btn.textContent = this.text;
    btn.onclick = () => this.playSound();
    document.body.appendChild(btn);
  }

  renderModule() {}
}
