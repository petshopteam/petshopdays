
(function() {
  'use strict';

  var text = $('.j-section-text'),
      toggle = $('.j-section-toggle'),
      item = $('.j-section-item')

  text.hide();

  toggle.on('click', function(e){
    e.preventDefault();
    var sib = $(this).siblings();
    $(sib[1]).slideToggle();
    $(sib[0]).toggleClass('toggle');
    $(this).toggleClass('toggle');
  });


})();
