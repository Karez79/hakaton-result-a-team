import { useFetch } from '../api';
import { Module } from '../core/module';

export class WordsModule extends Module {
    constructor() {
        super('words', 'Угадай слово');

        this.wordRandom = '';
        this.wordTemplate = 'guess'

        this.arrayCell = [];
        this.arrayGuessSymbol = [];

        this.attempts = 10;
        this.countAttempts = this.attempts;

        this.$rootElement = document.createElement('div')
        this.$rootElement.className = 'word transition';

        this.$headerRoot = document.createElement('h2');
        this.$headerRoot.className = 'word__title'
        this.$headerRoot.textContent = 'Добро пожаловать в игру «Угадай слово»! 🔠✨ Загадываем слово — ты отгадываешь. Сможешь справиться? Давай проверим! 🚀'

        this.$container = document.createElement('div');
        this.$container.className = 'word__container';

        this.$btnResetWord = document.createElement('button');
        this.$btnResetWord.id = 'resetWord';
        this.$btnResetWord.className = 'word__reset';
        this.$container.append(this.$btnResetWord);
        this.$btnResetWord.addEventListener('click', this.resetWord.bind(this));

        this.$containerCheck = document.createElement('div');
        this.$containerCheck.className = 'word__check-container';

        this.$inputCheckSymbol = document.createElement('input');
        this.$inputCheckSymbol.className = 'word__check-input';
        this.$inputCheckSymbol.type = 'text'
        this.$inputCheckSymbol.maxLength = 1;

        this.$btnCheckSymbol = document.createElement('button');
        this.$btnCheckSymbol.className = 'word__check-btn';
        this.$btnCheckSymbol.textContent = 'check';
        this.$btnCheckSymbol.id = 'checkSymbol'
        this.$btnCheckSymbol.addEventListener('click', this.checkValue.bind(this));
        this.$btnCheckSymbol.setAttribute('data-attempts', `${this.countAttempts} / ${this.attempts}`)

        this.$closeWord = document.createElement('button');
        this.$closeWord.id = 'closeWord'
        this.$closeWord.className = 'icon-close';
        this.$closeWord.addEventListener('click', this.closeWord.bind(this));
    }


    async trigger() {
        this.$rootElement.classList.add('open')
        this.wordRandom = await this.getRandomWord();
    }

    async renderModule() {
        this.createCellSymbol()
        this.$containerCheck.append(this.$inputCheckSymbol, this.$btnCheckSymbol)
        this.$rootElement.append(this.$headerRoot, this.$container, this.$containerCheck, this.$closeWord)
        document.body.append(this.$rootElement)
    }

    async getRandomWord() {
        const data = await useFetch({ url: 'https://random-word-api.herokuapp.com/word?length=5' });
        return data[0].toLowerCase();
    }

    createCellSymbol() {
        for (let i = 0; i < 5; i++) {
            const cell = document.createElement('span')
            cell.className = 'word__cell';
            cell.textContent = this.wordTemplate[i]
            this.arrayCell.push(cell);
        }

        this.$container.append(...this.arrayCell)
        return this.arrayCell;
    }

    closeWord() {
        this.$rootElement.classList.remove('open')
    }

    async resetWord() {
        this.arrayGuessSymbol = [];

        this.arrayCell.forEach((item, idx) => {
            item.classList.remove('win')
            item.textContent = this.wordTemplate[idx]
        });

        this.countAttempts = this.attempts;
        this.$btnCheckSymbol.dataset.attempts = `${this.countAttempts} / ${this.attempts}`

        this.$inputCheckSymbol.disabled = false;
        this.$btnCheckSymbol.disabled = false;

        this.$inputCheckSymbol.focus()

        this.wordRandom = await this.getRandomWord();     

    }

    updateCountAttempts() {
        this.countAttempts -= 1;
        this.$btnCheckSymbol.dataset.attempts = `${this.countAttempts} / ${this.attempts}`
    }

    toggleClassValidation(text, className) {
        this.$containerCheck.setAttribute('data-validation', text)
        this.$containerCheck.classList.add(className)
        setTimeout(() => {
            this.$containerCheck.classList.remove(className)
            this.$containerCheck.removeAttribute('data-validation')
        }, 500)
    }

    resetValue() {
        this.$inputCheckSymbol.value = '';
        this.$inputCheckSymbol.focus()
    }

    checkPositionValue(validSymbol) {
        [...this.wordRandom].forEach((symbol, idx) => {
            if (validSymbol === symbol) {
                this.arrayCell[idx].classList.add('win')
                this.arrayCell[idx].textContent = validSymbol;
            }
        })
    }

    checkValue() {
        const symbol = this.$inputCheckSymbol.value.trim()
        const replace = symbol.replace(/[0-9!@#$%^&*()+=_\-{}\[\]|:;"'<>,.?/~]/g, '').trim()

        this.updateCountAttempts()

        if (this.countAttempts <= 0) {
            this.$inputCheckSymbol.disabled = true;
            this.$btnCheckSymbol.disabled = true;
        }

        if (!symbol) {

            this.toggleClassValidation('* введи символ', '--invalid')
            this.resetValue()


            return false;

        } else if (!replace) {

            this.toggleClassValidation('* введи букву', '--invalid')
            this.resetValue()


            return false;
        }

        const isValid = this.wordRandom.includes(this.$inputCheckSymbol.value);

        if (isValid) {


            if (!this.arrayGuessSymbol.includes(symbol)) {

                this.toggleClassValidation('* угадал', '--valid')
                this.checkPositionValue(symbol)
                this.resetValue()
                this.arrayGuessSymbol.push(symbol)

            } else {

                this.toggleClassValidation('* уже угадан', '--valid')
                this.resetValue()

            }

            return true;

        } else {

            this.toggleClassValidation('* не угадал', '--invalid')
            this.resetValue()


            return false;
        }
    }
}
