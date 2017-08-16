
(function() {
  'use strict';

  // slick slider init and settings here:
  var slickInit = function(){
    $('.j-slider-container').slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 4,
    centerMode: true,
    variableWidth: true,
    autoplay: true,
    responsive: [
    {
      breakpoint: 769, //768px autoscroll off
      settings: {
        autoplay: false
      }
    }
  ]
    });
  };
  slickInit();


})();
