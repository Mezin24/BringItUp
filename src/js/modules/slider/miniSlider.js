import Slider from './slider';

export default class MiniSlider extends Slider {
  constructor(container, btns, prev, next, autoplay, activeClass, animate) {
    super(container, btns, prev, next, autoplay, activeClass, animate);
  }

  decoreateSlide() {
    this.slides.forEach((slide) => {
      if (slide.querySelector('.card__controls-arrow')) {
        slide.querySelector('.card__controls-arrow').style.opacity = 0;
        slide.querySelector('.card__title').style.opacity = 0.4;
      }
      slide.classList.remove(this.activeClass);
    });

    if (this.slides[0].querySelector('.card__controls-arrow')) {
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = 1;
      this.slides[0].querySelector('.card__title').style.opacity = 1;
    }
    this.slides[0].classList.add(this.activeClass);
  }

  bindTriggers() {
    this.prev.addEventListener('click', () => {
      this.container.append(this.slides[0]);
      this.decoreateSlide();
    });

    this.next.addEventListener('click', () => {
      // if (this.slides[0].tagName !== 'BUTTON') {
      //   this.container.insertBefore(
      //     this.slides[this.slides.length - 1],
      //     this.slides[0]
      //   );
      //   this.container.insertBefore(
      //     this.slides[this.slides.length - 1],
      //     this.slides[1]
      //   );
      //   this.container.insertBefore(
      //     this.slides[this.slides.length - 1],
      //     this.slides[2]
      //   );
      //   console.log('btn');
      // }
      this.container.insertBefore(
        this.slides[this.slides.length - 1],
        this.slides[0]
      );
      this.decoreateSlide();
    });
  }

  init() {
    this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
    `;

    this.bindTriggers();
    this.decoreateSlide();
  }
}
