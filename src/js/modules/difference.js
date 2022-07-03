export default class Difference {
  constructor(container, item) {
    this.container = document.querySelector(container);
    this.items = this.container.querySelectorAll(item);
    this.counter = 0;
  }

  hideTabs() {
    this.items.forEach((el, i, arr) => {
      if (i !== arr.length - 1) {
        el.style.display = 'none';
      }
    });
  }

  bindTriggers() {
    this.plus = this.container.querySelector('.plus');

    this.plus.addEventListener('click', () => {
      if (this.counter < this.items.length - 2) {
        this.items[this.counter].style.display = 'flex';
        this.items[this.counter].classList.add(
          'animate__animated',
          'animate__fadeIn'
        );
        this.counter++;
      } else {
        this.items[this.counter].style.display = 'flex';
        this.items[this.counter].classList.add(
          'animate__animated',
          'animate__fadeIn'
        );
        this.items[this.items.length - 1].classList.add(
          'animate__animated',
          'animate__fadeOut'
        );
        setTimeout(() => {
          this.items[this.items.length - 1].remove();
        }, 1000);
      }
    });
  }

  init() {
    this.hideTabs();
    this.bindTriggers();
  }
}
