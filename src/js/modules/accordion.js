export default class Accordion {
  constructor(trigger) {
    this.triggers = document.querySelectorAll(trigger);
  }

  bindTriggers() {
    this.triggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        const msgEl = btn.closest('.module__info-show ').nextElementSibling;
        if (!msgEl.classList.contains('show')) {
          msgEl.classList.add('animate__animated', 'animate__fadeInUp', 'show');
          msgEl.classList.remove('animate__fadeOutDown');
          msgEl.style.display = 'block';
        } else {
          msgEl.classList.add('animate__fadeOutDown');
          msgEl.classList.remove('animate__fadeInUp');
          setTimeout(() => {
            msgEl.style.display = 'none';
            msgEl.classList.remove('animate__animated', 'show');
          }, 700);
        }
      });
    });
  }

  init() {
    this.bindTriggers();
  }
}
