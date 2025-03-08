import { useFetch } from '../api';
import { Module } from '../core/module'
import { random } from '../utils';

export class MessageModule extends Module {
    constructor() {
        super('message', 'Случайное сообщение');
    }



    async trigger() {
        const randomText = await this.getRandomText();
        const $message = await this.renderMessage({text: randomText})
        $message.classList.add('open')       
        document.body.append($message)     
    }

    async renderMessage({ text = "" } = {}) {
        const $parent = document.createElement('div');
        $parent.className = 'modal transition';
        $parent.textContent = text;
        return $parent;
    }

    async getRandomText() {
        return await useFetch({ url: `https://jsonplaceholder.typicode.com/posts/${random(1, 100)}` }).then(data => data.body)
    }
}