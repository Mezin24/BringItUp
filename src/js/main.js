import MainSlider from './modules/slider/mainSlider';
import MiniSlider from './modules/slider/miniSlider';
import PlayVideo from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const mainSlider = new MainSlider({ container: '.page', btns: '.next' });
  mainSlider.render();

  const playVideo = new PlayVideo('.showup .play', '.overlay');
  playVideo.init();

  const showupSlider = new MiniSlider({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active',
  });
  showupSlider.init();

  const modulesSlider = new MiniSlider({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
  });
  modulesSlider.init();

  const feedSlider = new MiniSlider({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active',
  });
  feedSlider.init();
});
