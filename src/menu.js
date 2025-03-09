import {Menu} from './core/menu'
import { openMenu, closeMenu, addMenuItem } from './utils-menu'


export class ContextMenu extends Menu {
   constructor(selector) {
      super(selector)
      this.modules = []
      
      document.body.addEventListener('contextmenu', (event) => {
        event.preventDefault()
        this.open(event.clientX, event.clientY)
      })
  
      document.body.addEventListener('click', (event) => {
        if (!this.el.contains(event.target)) {
          this.close()
        }
      })
    }
  
    open(x, y) {
      openMenu(this.el, x ,y)
    }
  
    close() {
      closeMenu(this.el)
    }
    add(module) {
      this.modules.push(module)
      addMenuItem(this.el, module)
    }

    addAllModules() {
      this.modules.forEach((module) => {
        addMenuItem(this.el, module); // Добавляем все модули
      });
    }
}