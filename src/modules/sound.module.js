import { Module } from '../core/module';
import { getRandomTrack } from '../api';

export class SoundModule extends Module {
  constructor() {
    super('deezerSound', 'Послушать');
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'sound-wrapper';

    this.$closeBtn = document.createElement('button');
    this.$closeBtn.id = 'closeSound';
    this.$closeBtn.className = 'icon-close';
    this.$closeBtn.textContent = '×';
    this.$closeBtn.addEventListener('click', this.closePlayer.bind(this));
    this.$rootElement.append(this.$closeBtn);

    this.audio = null;
    this.currentTrack = null;
    this.playlist = [];
    this.currentIndex = -1;
  }

  trigger() {
    this.$rootElement.classList.add('open');
    this.playSound();
  }

  closePlayer() {
    this.$rootElement.classList.remove('open');
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  renderModule() {
    if (!this.$rootElement.querySelector('.sound__player')) {
      const player = document.createElement('div');
      player.className = 'sound__player';
      player.id = 'audio-player';

      const cover = document.createElement('img');
      cover.id = 'player-cover';
      cover.className = 'sound__player-cover';

      const title = document.createElement('span');
      title.id = 'player-title';
      title.className = 'sound__player-title';

      const controls = document.createElement('div');
      controls.className = 'sound__player-controls';

      const prevButton = document.createElement('button');
      prevButton.id = 'player-prev';
      prevButton.textContent = 'Prev';
      prevButton.onclick = () => this.playPrev();

      const playButton = document.createElement('button');
      playButton.id = 'player-play';
      playButton.textContent = 'Play';
      playButton.onclick = () => this.togglePlay();

      const nextButton = document.createElement('button');
      nextButton.id = 'player-next';
      nextButton.textContent = 'Next';
      nextButton.onclick = () => this.playNext();

      controls.append(prevButton, playButton, nextButton);

      const volumeContainer = document.createElement('div');
      volumeContainer.className = 'sound__player-volume';

      const volumeSlider = document.createElement('input');
      volumeSlider.type = 'range';
      volumeSlider.min = '0';
      volumeSlider.max = '1';
      volumeSlider.step = '0.01';
      volumeSlider.value = '0.5';
      volumeSlider.oninput = () => {
        if (this.audio) {
          this.audio.volume = parseFloat(volumeSlider.value);
        }
      };

      volumeContainer.appendChild(volumeSlider);

      player.append(cover, title, controls, volumeContainer);
      this.$rootElement.appendChild(player);
      document.body.appendChild(this.$rootElement);
    }
  }

  async playSound() {
    try {
      const track = await getRandomTrack();
      this.addToPlaylist(track);
      this.playTrack(track);
    } catch (error) {
      console.error(error);
    }
  }

  playTrack(track) {
    if (this.audio) {
      this.audio.pause();
    }
    this.currentTrack = track;
    if (track.preview) {
      this.audio = new Audio(track.preview);
      const volumeSlider = this.$rootElement.querySelector('.sound__player-volume input[type="range"]');
      if (volumeSlider) {
        this.audio.volume = parseFloat(volumeSlider.value);
      }
      this.audio.play();
      this.renderPlayer();
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
    const cover = this.$rootElement.querySelector('#player-cover');
    const title = this.$rootElement.querySelector('#player-title');
    const playButton = this.$rootElement.querySelector('#player-play');

    if (cover) {
      cover.src =
        (this.currentTrack &&
          this.currentTrack.album &&
          (this.currentTrack.album.cover_medium || this.currentTrack.album.cover)) ||
        '';
    }
    if (title) {
      title.textContent = this.currentTrack ? this.currentTrack.title : '';
    }
    if (playButton) {
      playButton.textContent = this.audio && !this.audio.paused ? 'Pause' : 'Play';
    }
  }

  togglePlay() {
    if (!this.audio) {
      this.playSound();
    } else {
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
      this.renderPlayer();
    }
  }
}
