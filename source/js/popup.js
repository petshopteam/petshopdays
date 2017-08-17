
(function() {
  'use strict';

  var trigger = $('.j-popup-title'),
      popup = $('.j-popup-window'),
      close = $('.j-popup-close'),
      layout = $('.j-map-bg'),
      nextBlock = $('#speakers').offset().top,
      prevBlock = $('.about__map').offset().top;

  trigger.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    // скрываем все окна при клике на очередное
    $(popup).slideUp();
    $(e.target).siblings(popup).slideDown('100');
  });

  close.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $(e.target).closest(popup).slideUp('100');
  });

  layout.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $(popup).slideUp('100');
  });

  // закрываем все окна, если они вылезают за пределы карты
  $(window).scroll(function(){
    if( $(window).scrollTop() > (nextBlock / 1.25) || $(window).scrollTop() < (prevBlock / 1.5) ) {
      $(popup).slideUp();
    }
  });



})();
