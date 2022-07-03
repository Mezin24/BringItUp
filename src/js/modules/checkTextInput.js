export default class CheckTextInput {
  constructor(inputSelector) {
    this.inputs = document.querySelectorAll(inputSelector);
  }

  init() {
    console.log('init');
    this.inputs.forEach((item) => {
      item.addEventListener('keypress', (e) => {
        if (!e.key.match(/[a-z@ 0-9]/gi)) {
          e.preventDefault();
        }
      });

      item.addEventListener('blur', function (e) {
        item.value = item.value.replace(/[a-z]/gi, '');
      });
    });
  }
}
