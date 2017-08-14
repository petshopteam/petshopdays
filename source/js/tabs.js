
(function() {
  'use strict';

  // Табы для спикеров
  var tabLink1 = $('.j-sp-link-1'),
      tabLink2 = $('.j-sp-link-2'),
      tab1 = $('.j-sp-tab-1'),
      tab2 = $('.j-sp-tab-2');

  tab2.hide();

  tabLink2.on('click', function(e){
    e.preventDefault();
    tabLink2.addClass('active');
    tabLink1.removeClass('active');
    tab2.show();
    tab1.hide();
  });

  tabLink1.on('click', function(e){
    e.preventDefault();
    tabLink1.addClass('active');
    tabLink2.removeClass('active');
    tab1.show();
    tab2.hide();
  });


  // Табы для расписания
  var tabLink11 = $('.j-sc-link-1'),
      tabLink22 = $('.j-sc-link-2'),
      tab11 = $('.j-sc-tab-1'),
      tab22 = $('.j-sc-tab-2');

  tab22.hide();

  tabLink22.on('click', function(e){
    e.preventDefault();
    tabLink22.addClass('active');
    tabLink11.removeClass('active');
    tab22.show();
    tab11.hide();
  });

  tabLink11.on('click', function(e){
    e.preventDefault();
    tabLink11.addClass('active');
    tabLink22.removeClass('active');
    tab11.show();
    tab22.hide();
  });




})();
