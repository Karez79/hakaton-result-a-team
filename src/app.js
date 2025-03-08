import './styles.css'
import { useFetch } from './api'
import { ContextMenu } from './menu'

useFetch({url: 'https://jsonplaceholder.typicode.com/albums'})


const menu = new ContextMenu('#menu')

menu.addMenuItem({
  text: 'Поменять цвет',
}) 