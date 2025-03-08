import { useFetch } from '../api';
import { Module } from '../core/module'
import { random } from '../utils';

export class MessageModule extends Module {
    constructor(text = "") {
        super('message', 'Случайное сообщение');
        this.$rootElement = document.createElement('div');
        this.$rootElement.className = 'modal transition';
        this.textContent = text
    }

    removeEvent() {
        this.$rootElement.classList.remove('open')
    }

    visibleMessage() {
        this.$rootElement.classList.add('open')
    }

    addBodyMessage() {
        document.body.append(this.$rootElement);
    }

    async trigger() {
        const randomText = await this.getRandomText();
        this.$rootElement.textContent = randomText;
        this.visibleMessage()
        this.callRemoveEvent()
        return this.$rootElement;
    }

    async renderMessage() {
        this.$rootElement.textContent = this.textContent || await this.getRandomText();  
        this.addBodyMessage()      
        return this.$rootElement;
    }

    async getRandomText() {
        return await useFetch({ url: `https://jsonplaceholder.typicode.com/posts/${random(1, 100)}` }).then(data => data.body)
    }
}