import Slider from './modules/slider';
import PlayVideo from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const slider = new Slider('.page', '.next');
  const playVideo = new PlayVideo('.showup .play', '.overlay');

  slider.render();
  playVideo.init();
});
