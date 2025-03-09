import {Menu} from './core/menu'
import { openMenu, closeMenu, addMenuItem } from './utils-menu'
import { initAudio } from './audio-menu'


export class ContextMenu extends Menu {
   constructor(selector) {
      super(selector)
      this.modules = []
      initAudio()
      
      document.body.addEventListener('contextmenu', (event) => {
        event.preventDefault()
        this.open(event.clientX, event.clientY)
      })
  
      document.body.addEventListener('click', (event) => {
        if (this.el.classList.contains('open') && !this.el.contains(event.target)) {
          this.close()
        }
      })
    }
  
    open(x, y) {
      openMenu(this.el, x ,y)
    }
  
    close() {
      return closeMenu(this.el)
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