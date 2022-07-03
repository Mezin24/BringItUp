import Slider from './slider';

export default class MiniSlider extends Slider {
  constructor(container, btns, prev, next, autoplay, activeClass, animate) {
    super(container, btns, prev, next, autoplay, activeClass, animate);
  }

  decoreateSlide() {
    this.slides.forEach((slide) => {
      if (this.animate) {
        slide.querySelector('.card__controls-arrow').style.opacity = 0;
        slide.querySelector('.card__title').style.opacity = 0.4;
      }
      slide.classList.remove(this.activeClass);
    });

    if (this.animate) {
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = 1;
      this.slides[0].querySelector('.card__title').style.opacity = 1;
    }
    this.slides[0].classList.add(this.activeClass);
  }

  bindTriggers() {
    this.next.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.nextSlide();
      });
    });

    this.prev.forEach((btn) => {
      btn.addEventListener('click', () => {
        if ([...this.slides].some((item) => item.tagName === 'BUTTON')) {
          this.container.insertBefore(
            this.slides[this.slides.length - 3],
            this.slides[0]
          );
        } else {
          this.container.insertBefore(
            this.slides[this.slides.length - 1],
            this.slides[0]
          );
        }
        this.decoreateSlide();
      });
    });
  }

  nextSlide() {
    if ([...this.slides].some((item) => item.tagName === 'BUTTON')) {
      this.container.insertBefore(
        this.slides[0],
        this.slides[this.slides.length - 3]
      );
    } else {
      this.container.append(this.slides[0]);
    }
    this.decoreateSlide();
  }

  activateAnimation() {
    if (this.autoplay) {
      this.paused = setInterval(() => this.nextSlide(), 3000);
    }
  }

  init() {
    try {
      this.container.style.cssText = `
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      align-items: flex-start;
      `;
      this.bindTriggers();
      this.decoreateSlide();
      this.activateAnimation();

      [...this.prev, ...this.next].forEach((btn) => {
        btn.addEventListener('mouseover', () => {
          clearInterval(this.paused);
        });

        btn.addEventListener('mouseleave', () => {
          this.activateAnimation();
        });
      });
    } catch (e) {}
  }
}
