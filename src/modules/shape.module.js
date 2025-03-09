import { Module } from '../core/module';

export class ShapeModule extends Module {
  constructor() {
    super('shape', 'Random Shapes');
  }

  trigger() {
    this.drawRandomShapes();
  }

  drawRandomShapes() {
    const shapes = ['circle', 'rectangle', 'triangle', 'ellipse', 'diamond', 'pentagon', 'star', 'hexagon'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const size = 20 + Math.random() * 100;
    const top = Math.random() * window.innerHeight;
    const left = Math.random() * window.innerWidth;

    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;

    switch (shape) {
      case 'circle':
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = color;
        element.style.borderRadius = '50%';
        break;
      case 'rectangle':
        element.style.width = `${size}px`;
        element.style.height = `${size * 0.6}px`;
        element.style.backgroundColor = color;
        break;
      case 'triangle':
        element.style.width = '0';
        element.style.height = '0';
        element.style.borderLeft = `${size / 2}px solid transparent`;
        element.style.borderRight = `${size / 2}px solid transparent`;
        element.style.borderBottom = `${size}px solid ${color}`;
        break;
      case 'ellipse':
        element.style.width = `${size}px`;
        element.style.height = `${size * 0.6}px`;
        element.style.backgroundColor = color;
        element.style.borderRadius = '50% / 50%';
        break;
      case 'diamond':
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = color;
        element.style.transform = 'rotate(45deg)';
        break;
      case 'pentagon':
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = color;
        element.style.clipPath = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
        break;
      case 'star':
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = color;
        element.style.clipPath =
          'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        break;
      case 'hexagon':
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = color;
        element.style.clipPath = 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)';
        break;
      default:
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = color;
        break;
    }

    document.body.appendChild(element);
    setTimeout(() => element.remove(), 3000);
  }

  renderButtonShape() {
    const btn = document.createElement('button');
    btn.id = 'shape';
    btn.textContent = this.text;
    btn.onclick = () => this.trigger();
    document.body.appendChild(btn);
  }
}
