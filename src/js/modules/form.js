import Requests from '../services/requests';

export default class Form {
  constructor(form) {
    this.forms = document.querySelectorAll(form);
    this.message = {
      success: "Thank you! We'll get in touch with you in 5 minutes!",
      failure: 'Something went wrong... Please, try again',
      loading: 'Loading...',
    };
    this.path = 'assets/question.php';
  }

  checkTextInput() {
    const inputs = document.querySelectorAll('[name="email"]');

    inputs.forEach((item) => {
      item.addEventListener('keypress', (e) => {
        if (!e.key.match(/[a-z@ 0-9 \.]/gi)) {
          e.preventDefault();
        }
      });

      item.addEventListener('blur', function (e) {
        item.value = item.value.replace(/[а-яё]/gi, '');
      });
    });
  }

  mask() {
    const inputs = document.querySelectorAll('[name="phone"]');
    const setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);

        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };

    function createMask(event) {
      let matrix = '+1 (___) ___-__-__',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ''
          : a;
      });

      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    inputs.forEach((input) => {
      input.addEventListener('input', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }

  bindTriggers() {
    this.forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.text = this.message.loading;
        statusMessage.classList.add('animate__animated', 'animate__fadeInUp');
        statusMessage.style.cssText = `
        margin-top: 10px;
        font-family: sans-serif;
        font-size: 20px;  
      `;

        setTimeout(() => {
          form.parentNode.append(statusMessage);
        }, 400);

        const formData = new FormData(form);

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
            form.reset();
            setInterval(() => {
              statusMessage.remove();
            }, 4000);
          });
      });
    });
  }

  init() {
    this.bindTriggers();
    this.checkTextInput();
    this.mask();
  }
}
