
(function() {
  'use strict';

  var scrolled = $(window).scrollTop();

  $('.parallax').css('top', -(scrolled) + 'px');

  function parallax(){
    var scrolled = $(window).scrollTop();
    $('.parallax').css('top', -(scrolled * 0.3) + 'px');
  }

  $(window).scroll(function(e){
    parallax();
  });



})();
