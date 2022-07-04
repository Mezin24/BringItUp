export default class PlayVideo {
  constructor(triggerBtn, overlay) {
    this.overlay = document.querySelector(overlay);
    this.btns = document.querySelectorAll(triggerBtn);
    this.close = this.overlay.querySelector('.close');
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  bindTrigger() {
    this.btns.forEach((btn, i) => {
      try {
        btn
          .closest('.module__video-item')
          .setAttribute('data-disabled', 'false');

        if (i % 2 === 0) {
          btn
            .closest('.module__video-item')
            .setAttribute('data-disabled', 'true');
        }
      } catch (e) {}

      btn.addEventListener('click', () => {
        if (
          btn.closest('.showup__video') ||
          btn.closest('.module__video-item').getAttribute('data-disabled') ===
            'true'
        ) {
          this.activeBtn = btn;
          if (this.overlay.querySelector('iframe#frame')) {
            this.overlay.style.display = 'flex';

            if (this.path !== btn.getAttribute('data-url')) {
              this.path = btn.getAttribute('data-url');
              this.player.loadVideoById({
                videoId: this.path,
              });
            }
          } else {
            this.path = btn.getAttribute('data-url');
            this.createPlayer(this.path);
          }
        }
      });
    });
  }

  bindClose() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      try {
        this.player.stopVideo();
      } catch (e) {}
    });
  }

  createPlayer(path) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: path,
      events: {
        onStateChange: this.onPlayerStateChange,
      },
    });
    this.overlay.style.display = 'flex';
  }

  onPlayerStateChange(state) {
    try {
      if (state.data === 0) {
        const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
        const sibilingEl = this.activeBtn.closest(
          '.module__video-item'
        ).nextElementSibling;

        if (
          sibilingEl
            .querySelector('.play__text')
            .classList.contains('attention')
        ) {
          sibilingEl.style.opacity = 1;
          sibilingEl.style.filter = 'none';
          sibilingEl.querySelector('.play__text').classList.remove('attention');
          sibilingEl.querySelector('.play__text').textContent = 'play video';
          sibilingEl.querySelector('.play__circle').classList.remove('closed');
          sibilingEl.querySelector('.play__circle').innerHTML = '';
          sibilingEl.querySelector('.play__circle').append(playBtn);
          sibilingEl.setAttribute('data-disabled', 'true');
        }
      }
    } catch (e) {}
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
