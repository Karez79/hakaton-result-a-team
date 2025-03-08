import './styles.css';
import { useFetch } from './api';
import { random } from './utils';
import { MessageModule } from './modules/message.modules';
import { BackgroundModule } from './modules/background.module';
import { SoundModule } from './modules/sound.module';

useFetch({ url: `https://jsonplaceholder.typicode.com/posts/${random(1, 100)}` });

const message = new MessageModule();
message.renderMessage();

document.querySelector('#message')?.addEventListener('click', () => {
  message.trigger();
});

const backgroundModule = new BackgroundModule();
backgroundModule.renderButtonBackground();

const soundModule = new SoundModule();
soundModule.renderButtonSound();
