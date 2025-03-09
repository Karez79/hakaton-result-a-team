import './styles.css'
import { useFetch } from './api'
import { ContextMenu } from './menu'
import { BackgroundModule } from './modules/background.module'
// import { ClicksModule } from './modules/click.module'
// import { ShapeModule } from './modules/shape.module'


useFetch({url: 'https://jsonplaceholder.typicode.com/albums'})


const menu = new ContextMenu('#menu')

// const backgroundModule = new BackgroundModule();
// menu.add(backgroundModule);
export const modules = [new BackgroundModule()]

modules.forEach((module) => menu.add(module))
console.log(modules)


// menu.add({
//   text: 'Поменять цвет',

// }) 

// menu.add({
//   text: 'Добавить фигуру',
// })

// menu.add({
//   text: 'Слушать звук',
// }) 

// menu.add({
//   text: 'Добавить сообщение',
// }) 

// menu.add({
//   text: 'Считать клики',
// }) 

// menu.add({
//   text: 'Включить таймер',
// }) 
