import './styles.css'
import { useFetch } from './api'
import { ContextMenu } from './menu'

useFetch({url: 'https://jsonplaceholder.typicode.com/albums'})


const menu = new ContextMenu('#menu')

menu.add({
  text: 'Поменять цвет',
}) 

menu.add({
  text: 'Добавить фигуру',
})

menu.add({
  text: 'Слушать звук',
}) 

menu.add({
  text: 'Добавить сообщение',
}) 

menu.add({
  text: 'Считать клики',
}) 

menu.add({
  text: 'Включить таймер',
}) 