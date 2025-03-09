import { playSound } from './audio-menu'

export function openMenu(menuElement, x ,y) {
  const menuWidth = menuElement.offsetWidth
  const menuHeight = menuElement.offsetHeight
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  if(x + menuWidth > windowWidth) {
    x = windowWidth - menuWidth 
  }

  if(y + menuHeight > windowHeight) {
    y = windowHeight - menuHeight
  }

  

  menuElement.classList.add('open')
  menuElement.style.left = `${x}px`
  menuElement.style.top = `${y}px`

  playSound(784)
}

export function closeMenu(menuElement) {

  if(menuElement.classList.contains('open')){
    menuElement.classList.remove('open')
    playSound(523)

    return true
  }
  return false
}

export function addMenuItem(menuElement, module) {
  const menuItem = document.createElement('li')
  menuItem.className = 'menu-item'
  menuItem.textContent = module.text

  menuItem.addEventListener('click', () => {
    if(module.trigger){
      module.trigger()
    }
    closeMenu(menuElement)
  })

  menuElement.appendChild(menuItem)
}