
(function() {
  'use strict';

  // slick slider init and settings here:
  var slickInit = function(){
    $('.j-slider-container').slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 8,
    centerMode: true,
    variableWidth: true
    });
  };
  slickInit();


})();
