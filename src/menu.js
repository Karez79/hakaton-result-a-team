import {Menu} from './core/menu'
import { openMenu, closeMenu, addMenuItem } from '../hakaton-result-a-team/src/utils-menu'

export class ContextMenu extends Menu {
   constructor(selector) {
      super(selector)
      
      document.body.addEventListener('contextmenu', (event) => {
        event.preventDefault()
        openMenu(this.el, event.clientX, event.clientY)
      })
  
      document.body.addEventListener('click', (event) => {
        if (!this.el.contains(event.target)) {
          closeMenu(this.el)
        }
      })
    }
  
    open() {
      openMenu(this.el)
    }
  
    close() {
      closeMenu(this.el)
      // this.el.classList.remove('open')
    }
    add(module) {
      addMenuItem(this.el, module)
    }
}