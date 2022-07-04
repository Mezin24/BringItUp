export default class Download {
  constructor(trigger) {
    this.triggers = document.querySelectorAll(trigger);
    this.path = 'assets/img/mainbg.jpg';
  }

  downloadItem(path) {
    const link = document.createElement('a');
    link.setAttribute('href', path);
    link.setAttribute('download', 'nice_picture');
    link.style.display = 'none';
    document.body.append(link);
    link.click();
    link.remove();
  }

  init() {
    this.triggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.downloadItem(this.path);
      });
    });
  }
}
