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

    this.slides.forEach((item) => {
      item.style.display = 'none';
    });

    this.slides[this.slideIndex - 1].style.display = 'block';
  }

  plusSlide(n) {
    this.showSlide((this.slideIndex += n));
  }

  render() {
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
