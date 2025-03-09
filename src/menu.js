import { Menu } from './core/menu'
import { openMenu, closeMenu, addMenuItem } from './utils-menu'
import { initAudio } from './audio-menu'
import { modules } from './modules'


export class ContextMenu extends Menu {
  constructor(selector) {
    super(selector)
    this.modules = modules;
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
    openMenu(this.el, x, y)
  }

  close() {
    return closeMenu(this.el)
  }

  add() {
    this.modules.forEach((module) => {
      this.el.insertAdjacentHTML('beforeend', module.toHTML())
    });
  }

  handlerModules() {
    this.el.addEventListener('click', (e) => {
      console.log(e.target)
      const target = e.target.closest('[data-type]');
      const currentModule =  this.modules.find(module => module.type === target.dataset.type)

      currentModule.trigger()
      this.close()
    })
  }

  renderModules() {
    this.modules.forEach((module) => {
      console.log(module)
      module.renderModule()
    });
  }

  init() {
    this.add()
    this.renderModules()
    this.handlerModules()
  }
}