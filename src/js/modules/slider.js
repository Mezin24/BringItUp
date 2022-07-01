export default class Slider {
  constructor(page, btns) {
    this.page = document.querySelector(page);
    this.slides = this.page.children;
    this.btns = document.querySelectorAll(btns);
    this.slideIndex = 1;
  }

  showSlide(n) {
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
    });

    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  plusSlide(n) {
    this.showSlide((this.slideIndex += n));
  }

  render() {
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

    this.showSlide(this.slideIndex);
  }
}
