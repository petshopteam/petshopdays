
(function() {
  'use strict';

  var trigger = $('.j-popup-title'),
      popup = $('.j-popup-window'),
      close = $('.j-popup-close'),
      layout = $('.j-map-bg'),

      mapStart = $('.about__map').offset().top,
      mapHeight = document.querySelector('.about__map').offsetHeight,
      mapEnd = (mapStart + mapHeight) - 1000,
      activePop;

  trigger.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    // скрываем все окна при клике на очередное
    $(popup).slideUp();
    $(popup).removeClass('active');
    $(e.target).siblings(popup).slideDown('100');
    $(e.target).siblings(popup).addClass('active');
    activePop = $(e.target).siblings(popup).css('top');
  });

  close.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $(e.target).closest(popup).slideUp('100');
    $(e.target).closest(popup).removeClass('active');
  });

  layout.on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $(popup).slideUp('100');
    $(popup).removeClass('active');
  });


  // закрываем все окна, если они вылезают за пределы карты
  $(window).scroll(function(){
    var winHeight = this.scrollY;

    if ( $(popup).hasClass('active') ) {
      var thisPop = popup;
      var thisPopTop = popup.css('top');



      // если скроллить ниже карты
      if (winHeight > mapEnd) {
        var newHeight = (mapStart - winHeight) + 1400;
        $(thisPop).css({
          'top': newHeight
        });
        if (winHeight > 3000) {
          $(popup).css('opacity', '0');
          $(popup).removeClass('active');
          setTimeout(function(){
              $(thisPop).css({
                'top': activePop,
                'opacity': 1,
                'display': 'none'
            });
          },500);
        }


        // если скроллить выше карты
      } else if ( winHeight < (mapStart) - 300 ) {
        var newHeight = (mapStart - winHeight) + 90;
        $(thisPop).css('top', newHeight);
        if (winHeight < 700) {
          $(popup).css('opacity', '0');
          $(popup).removeClass('active');
          setTimeout(function(){
              $(thisPop).css({
                'top': activePop,
                'opacity': 1,
                'display': 'none'
            });
          },500);
        }
      }
    }

  });



})();
