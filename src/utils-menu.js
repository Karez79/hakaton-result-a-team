export function openMenu(menuElement, x ,y) {
  menuElement.classList.add('open')
  menuElement.style.left = `${x}px`
  menuElement.style.top = `${y}px`
}

export function closeMenu(menuElement) {
  menuElement.classList.remove('open')
}

export function addMenuItem(menuElement, module) {
  const menuItem = document.createElement('li')
  menuItem.className = 'menu-item'
  menuItem.textContent = module.text

  menuItem.addEventListener('click', () => {
    module.trigger()
    closeMenu(menuElement)
  })

  menuElement.appendChild(menuItem)
}