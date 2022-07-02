export default class PlayVideo {
  constructor(triggerBtn, overlay) {
    this.overlay = document.querySelector(overlay);
    this.btns = document.querySelectorAll(triggerBtn);
    this.close = this.overlay.querySelector('.close');
  }

  bindTrigger() {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.overlay.querySelector('iframe#frame')) {
          this.overlay.style.display = 'flex';
        } else {
          const path = btn.getAttribute('data-url');
          this.createPlayer(path);
        }
      });
    });
  }

  bindClose() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }

  createPlayer(path) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: path,
    });
    this.overlay.style.display = 'flex';
  }

  init() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindTrigger();
    this.bindClose();
  }
}
