import './styles.css'
// import { useFetch } from './api'
import { ContextMenu } from './menu'
// import { BackgroundModule } from './modules/background.module'
// import { ClicksModule } from './modules/click.module'
// import { ShapeModule } from './modules/shape.module'


// useFetch({url: 'https://jsonplaceholder.typicode.com/albums'})


import { useFetch } from './api';
import { random } from './utils';
import { MessageModule } from './modules/message.modules'
import { BackgroundModule } from './modules/background.module'
import { SoundModule } from './modules/sound.module'
import { ShapeModule } from './modules/shape.module'
import { ClicksModule } from './modules/clicks.module'

useFetch({ url: `https://jsonplaceholder.typicode.com/posts/${random(1, 100)}` });

const menu = new ContextMenu('#menu')

export const modules = [new BackgroundModule(), new MessageModule(), new SoundModule(), new ShapeModule(), new ClicksModule()]

modules.forEach((module) => menu.add(module))

const message = new MessageModule();
message.renderMessage();

document.querySelector('#message')?.addEventListener('click', () => {
  message.trigger();
});

console.log(message)
document.querySelector("#message")?.addEventListener('click', () => {
    message.trigger()
})

const backgroundModule = new BackgroundModule();
backgroundModule.renderButtonBackground();

const soundModule = new SoundModule();
soundModule.renderButtonSound();

const shapeNodule = new ShapeModule();
shapeNodule.renderButtonShape();
