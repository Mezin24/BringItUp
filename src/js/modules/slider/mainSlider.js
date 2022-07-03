import Slider from './slider';

export default class MainSlider extends Slider {
  constructor(btns, prev, next) {
    super(btns, prev, next);
  }

  showSlide(n) {
    try {
      if (n > this.slides.length) {
        this.slideIndex = 1;
      }

      if (n < 1) {
        this.slideIndex = this.slides.length;
      }

      try {
        this.hanson.style.opacity = '0';
        if (n === 3) {
          this.hanson.classList.add('animate__animated');
          setTimeout(() => {
            this.hanson.style.opacity = '1';
            this.hanson.classList.add('animate__slideInUp');
          }, 3000);
        } else {
          this.hanson.classList.remove('animate__slideInUp');
        }
      } catch (e) {}

      this.slides.forEach((item) => {
        item.style.display = 'none';
        this.slides[this.slideIndex - 1].classList.remove(
          'animate__animated',
          'animate__slideInRight'
        );
      });
      this.slides[this.slideIndex - 1].style.display = 'block';
      this.slides[this.slideIndex - 1].classList.add(
        'animate__animated',
        'animate__slideInRight'
      );
    } catch (e) {}
  }

  plusSlide(n) {
    this.showSlide((this.slideIndex += n));
  }

  bindTriggers() {
    try {
      this.hanson = document.querySelector('.hanson');
    } catch (e) {}
    this.btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.plusSlide(1);
      });
      btn.parentElement.previousElementSibling.addEventListener(
        'click',
        (e) => {
          e.preventDefault();
          this.slideIndex = 1;
          this.showSlide(this.slideIndex);
        }
      );
    });

    if (this.next) {
      this.next.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          this.plusSlide(1);
        });
      });
    }
    if (this.prev) {
      this.prev.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          this.plusSlide(-1);
        });
      });
    }
  }

  render() {
    if (this.container) {
      this.showSlide(this.slideIndex);
      this.bindTriggers();
    }
  }
}
