;(function(){

  // add active class on scroll;
  var section = $('.about').offset().top;
  var menu = $('.j-main-menu');
  var close = $('.j-menu-close');
  var toggle = $('.j-menu-toggle');

  $(window).scroll(function(){
			if( $(window).scrollTop() > section ) {
					$('.main-menu').addClass('active');
          $('.main-menu__item.buy').removeClass('hidden');
          $('.main-menu__item.logo').removeClass('hidden');
			} else {
					$('.main-menu').removeClass('active');
          $('.main-menu__item.buy').addClass('hidden');
          $('.main-menu__item.logo').addClass('hidden');
			}
	});

  // Main nav smooth scroll;
$(".main-menu__list").on("click","a", function (event) {
    if ($(event.target).hasClass('j-scroll-link')) {
      event.preventDefault();
      var id  = $(this).attr('href'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 500);
    }
  });

  // Tkachi smooth scroll;
$(".main-head__place-link").on("click", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 500);
  });

// main menu toggle
toggle.on("click", function (event) {
    event.preventDefault();
    menu.css({
      'visibility': 'visible',
      'transform': 'translateY(0)'
    });
  });
// main menu close
close.on("click", function (event) {
    event.preventDefault();
    menu.css({
      'transform': 'translateY(-100%)',
      'visibility': 'visible'
    });
  });



}());
