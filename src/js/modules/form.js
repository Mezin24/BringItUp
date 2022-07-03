import Requests from '../services/requests';

export default class Form {
  constructor(form) {
    this.form = document.querySelector(form);
    this.message = {
      success: 'Спасибо! Скоро с вами свяжутся',
      failure: 'Что-то пошло не так',
      loading: 'Загрузка...',
    };
    this.path = 'assets/question.php';
  }

  bindTriggers() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.text = this.message.loading;
      statusMessage.classList.add('animate__animated', 'animate__fadeInUp');
      statusMessage.style.cssText = `
        margin-top: 10px;
        text-align: center;
        color: #fff;
        font-family: sans-serif;
        font-size: 20px;  
      `;

      setTimeout(() => {
        this.form.parentNode.append(statusMessage);
      }, 400);

      const formData = new FormData(this.form);

      new Requests(this.path)
        .postData(formData)
        .then((res) => {
          statusMessage.textContent = this.message.success;
          console.log(res);
        })
        .catch(() => {
          statusMessage.textContent = this.message.failure;
        })
        .finally(() => {
          this.form.reset();
          setInterval(() => {
            statusMessage.remove();
          }, 4000);
        });
    });
  }

  init() {
    this.bindTriggers();
  }
}
