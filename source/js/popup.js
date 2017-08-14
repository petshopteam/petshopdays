
(function() {
  'use strict';

  var trigger = $('.j-popup-title'),
      popup = $('.j-popup-window'),
      close = $('.j-popup-close'),
      layout = $('.j-map-bg')

  trigger.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    // $(e.target).siblings(popup).css('visibility', 'visible');
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




})();
