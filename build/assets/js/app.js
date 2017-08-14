
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
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 500);
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

;(function(){

  google.maps.event.addDomListener(window, 'load', init);
    var map, markersArray = [];

    function bindInfoWindow(marker, map, location) {
        google.maps.event.addListener(marker, 'click', function() {
            function close(location) {
                location.ib.close();
                location.infoWindowVisible = false;
                location.ib = null;
            }

            if (location.infoWindowVisible === true) {
                close(location);
            } else {
                markersArray.forEach(function(loc, index){
                    if (loc.ib && loc.ib !== null) {
                        close(loc);
                    }
                });

                var boxText = document.createElement('div');
                boxText.style.cssText = 'background: #fff;';
                boxText.classList.add('md-whiteframe-2dp');

                function buildPieces(location, el, part, icon) {
                    if (location[part] === '') {
                        return '';
                    } else if (location.iw[part]) {
                        switch(el){
                            case 'photo':
                                if (location.photo){
                                    return '<div class="iw-photo" style="background-image: url(' + location.photo + ');"></div>';
                                 } else {
                                    return '';
                                }
                                break;
                            case 'iw-toolbar':
                                return '<div class="iw-toolbar"><h3 class="md-subhead">' + location.title + '</h3></div>';
                                break;
                            case 'div':
                                switch(part){
                                    case 'email':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="mailto:' + location.email + '" target="_blank">' + location.email + '</a></span></div>';
                                        break;
                                    case 'web':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="' + location.web + '" target="_blank">' + location.web_formatted + '</a></span></div>';
                                        break;
                                    case 'desc':
                                        return '<label class="iw-desc" for="cb_details"><input type="checkbox" id="cb_details"/><h3 class="iw-x-details">Details</h3><i class="material-icons toggle-open-details"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><p class="iw-x-details">' + location.desc + '</p></label>';
                                        break;
                                    default:
                                        return '<div class="iw-details"><i class="material-icons"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span>' + location[part] + '</span></div>';
                                    break;
                                }
                                break;
                            case 'open_hours':
                                var items = '';
                                if (location.open_hours.length > 0){
                                    for (var i = 0; i < location.open_hours.length; ++i) {
                                        if (i !== 0){
                                            items += '<li><strong>' + location.open_hours[i].day + '</strong><strong>' + location.open_hours[i].hours +'</strong></li>';
                                        }
                                        var first = '<li><label for="cb_hours"><input type="checkbox" id="cb_hours"/><strong>' + location.open_hours[0].day + '</strong><strong>' + location.open_hours[0].hours +'</strong><i class="material-icons toggle-open-hours"><img src="//cdn.mapkit.io/v1/icons/keyboard_arrow_down.svg"/></i><ul>' + items + '</ul></label></li>';
                                    }
                                    return '<div class="iw-list"><i class="material-icons first-material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><ul>' + first + '</ul></div>';
                                 } else {
                                    return '';
                                }
                                break;
                         }
                    } else {
                        return '';
                    }
                }

                boxText.innerHTML =
                    buildPieces(location, 'photo', 'photo', '') +
                    buildPieces(location, 'iw-toolbar', 'title', '') +
                    buildPieces(location, 'div', 'address', 'location_on') +
                    buildPieces(location, 'div', 'web', 'public') +
                    buildPieces(location, 'div', 'email', 'email') +
                    buildPieces(location, 'div', 'tel', 'phone') +
                    buildPieces(location, 'div', 'int_tel', 'phone') +
                    buildPieces(location, 'open_hours', 'open_hours', 'access_time') +
                    buildPieces(location, 'div', 'desc', 'keyboard_arrow_down');

                var myOptions = {
                    alignBottom: true,
                    content: boxText,
                    disableAutoPan: true,
                    maxWidth: 0,
                    pixelOffset: new google.maps.Size(-140, -40),
                    zIndex: null,
                    boxStyle: {
                        opacity: 1,
                        width: '280px'
                    },
                    closeBoxMargin: '0px 0px 0px 0px',
                    infoBoxClearance: new google.maps.Size(1, 1),
                    isHidden: false,
                    pane: 'floatPane',
                    enableEventPropagation: false
                };

                location.ib = new InfoBox(myOptions);
                location.ib.open(map, marker);
                location.infoWindowVisible = true;
            }
        });
    }

    function init() {
        var mapOptions = {
            // center: new google.maps.LatLng(59.9153037,30.341135099999974),
            center: new google.maps.LatLng(59.9153036,30.343999999999974),
            zoom: 17,
            gestureHandling: 'auto',
            fullscreenControl: false,
            zoomControl: true,
            disableDoubleClickZoom: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            },
            scaleControl: true,
            scrollwheel: false,
            streetViewControl: true,
            draggable : true,
            clickableIcons: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{
              "featureType": "administrative",
              "elementType": "labels.text.fill",
                "stylers": [{
                  "color": "#444444"
                }]
              },
              {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                  "color": "#f2f2f2"
                }]
              },
              {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                  "visibility": "off"
                }]
              },
              {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
                    "saturation": -100
                  },
                  {
                    "lightness": 45
                  }
                ]
              },
              {
       "featureType": "water",
       "elementType": "all",
       "stylers": [
           {
               "color": "#1f6cb4"
           },
           {
               "visibility": "on"
           }
       ]
   }
            ]
          }

        var mapElement = document.getElementById('mapkit-7181');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
            {"title":"Креативное пространство \"Ткачи\"",
            "address":"Набережная Обводного канала, 60, Станция метро \"Обводный канал\"",
            "desc":"",
            "tel":"8 (812) 922-66-42",
            "int_tel":"+7 812 922-66-42",
            "email":"",
            "web":"",
            "web_formatted":"",
            "open":"","time":"1010",
            "lat":59.9153037,
            "lng":30.341135099999974,
            "vicinity":"Obvodniy channel embankment, 60, Saint Petersburg",
            "open_hours":"",
            "marker":{"url":"../assets/img/icons/placeholder.png","scaledSize":{"width":58,"height":82,"f":"px","b":"px"},"origin":{"x":0,"y":0},"anchor":{"x":12,"y":42}},"iw":{"address":true,"desc":true,"email":true,"enable":true,"int_tel":true,"open":true,"open_hours":true,"photo":true,"tel":true,"title":true,"web":true}}
        ];
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                icon: locations[i].marker,
                position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
                map: map,
                title: locations[i].title,
                address: locations[i].address,
                desc: locations[i].desc,
                tel: locations[i].tel,
                int_tel: locations[i].int_tel,
                vicinity: locations[i].vicinity,
                open: locations[i].open,
                open_hours: locations[i].open_hours,
                photo: locations[i].photo,
                time: locations[i].time,
                email: locations[i].email,
                web: locations[i].web,
                iw: locations[i].iw
            });
            markersArray.push(marker);

            if (locations[i].iw.enable === true){
                bindInfoWindow(marker, map, locations[i]);
            }
        }
    }

}());


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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1haW5NZW51LmpzIiwibWFwLmpzIiwicGFyYWxsYXguanMiLCJwb3B1cC5qcyIsInNlY3Rpb25zVG9nZ2xlLmpzIiwidGFicy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBzbGljayBzbGlkZXIgaW5pdCBhbmQgc2V0dGluZ3MgaGVyZTpcbiAgdmFyIHNsaWNrSW5pdCA9IGZ1bmN0aW9uKCl7XG4gICAgJCgnLmotc2xpZGVyLWNvbnRhaW5lcicpLnNsaWNrKHtcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBhcnJvd3M6IHRydWUsXG4gICAgaW5maW5pdGU6IHRydWUsXG4gICAgc3BlZWQ6IDMwMCxcbiAgICBzbGlkZXNUb1Nob3c6IDgsXG4gICAgc2xpZGVzVG9TY3JvbGw6IDgsXG4gICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICB2YXJpYWJsZVdpZHRoOiB0cnVlXG4gICAgfSk7XG4gIH07XG4gIHNsaWNrSW5pdCgpO1xuXG5cbn0pKCk7XG4iLCI7KGZ1bmN0aW9uKCl7XG5cbiAgLy8gYWRkIGFjdGl2ZSBjbGFzcyBvbiBzY3JvbGw7XG4gIHZhciBzZWN0aW9uID0gJCgnLmFib3V0Jykub2Zmc2V0KCkudG9wO1xuICB2YXIgbWVudSA9ICQoJy5qLW1haW4tbWVudScpO1xuICB2YXIgY2xvc2UgPSAkKCcuai1tZW51LWNsb3NlJyk7XG4gIHZhciB0b2dnbGUgPSAkKCcuai1tZW51LXRvZ2dsZScpO1xuXG4gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcblx0XHRcdGlmKCAkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBzZWN0aW9uICkge1xuXHRcdFx0XHRcdCQoJy5tYWluLW1lbnUnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgJCgnLm1haW4tbWVudV9faXRlbS5idXknKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgJCgnLm1haW4tbWVudV9faXRlbS5sb2dvJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQkKCcubWFpbi1tZW51JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQoJy5tYWluLW1lbnVfX2l0ZW0uYnV5JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICQoJy5tYWluLW1lbnVfX2l0ZW0ubG9nbycpLmFkZENsYXNzKCdoaWRkZW4nKTtcblx0XHRcdH1cblx0fSk7XG5cbiAgLy8gTWFpbiBuYXYgc21vb3RoIHNjcm9sbDtcbiQoXCIubWFpbi1tZW51X19saXN0XCIpLm9uKFwiY2xpY2tcIixcImFcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaWQgID0gJCh0aGlzKS5hdHRyKCdocmVmJyksXG4gICAgICAgIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcDtcbiAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHRvcH0sIDUwMCk7XG4gIH0pO1xuXG4gIC8vIFRrYWNoaSBzbW9vdGggc2Nyb2xsO1xuJChcIi5tYWluLWhlYWRfX3BsYWNlLWxpbmtcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBpZCAgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKSxcbiAgICAgICAgdG9wID0gJChpZCkub2Zmc2V0KCkudG9wO1xuICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogdG9wfSwgNTAwKTtcbiAgfSk7XG5cbi8vIG1haW4gbWVudSB0b2dnbGVcbnRvZ2dsZS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbWVudS5jc3Moe1xuICAgICAgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScsXG4gICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZVkoMCknXG4gICAgfSk7XG4gIH0pO1xuLy8gbWFpbiBtZW51IGNsb3NlXG5jbG9zZS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbWVudS5jc3Moe1xuICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGVZKC0xMDAlKScsXG4gICAgICAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJ1xuICAgIH0pO1xuICB9KTtcblxuXG5cbn0oKSk7XG4iLCI7KGZ1bmN0aW9uKCl7XG5cbiAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LCAnbG9hZCcsIGluaXQpO1xuICAgIHZhciBtYXAsIG1hcmtlcnNBcnJheSA9IFtdO1xuXG4gICAgZnVuY3Rpb24gYmluZEluZm9XaW5kb3cobWFya2VyLCBtYXAsIGxvY2F0aW9uKSB7XG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBjbG9zZShsb2NhdGlvbikge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaW5mb1dpbmRvd1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYiA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNsb3NlKGxvY2F0aW9uKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWFya2Vyc0FycmF5LmZvckVhY2goZnVuY3Rpb24obG9jLCBpbmRleCl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2MuaWIgJiYgbG9jLmliICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZShsb2MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgYm94VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGJveFRleHQuc3R5bGUuY3NzVGV4dCA9ICdiYWNrZ3JvdW5kOiAjZmZmOyc7XG4gICAgICAgICAgICAgICAgYm94VGV4dC5jbGFzc0xpc3QuYWRkKCdtZC13aGl0ZWZyYW1lLTJkcCcpO1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYnVpbGRQaWVjZXMobG9jYXRpb24sIGVsLCBwYXJ0LCBpY29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbltwYXJ0XSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2NhdGlvbi5pd1twYXJ0XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGVsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwaG90byc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbi5waG90byl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1waG90b1wiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCcgKyBsb2NhdGlvbi5waG90byArICcpO1wiPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2l3LXRvb2xiYXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy10b29sYmFyXCI+PGgzIGNsYXNzPVwibWQtc3ViaGVhZFwiPicgKyBsb2NhdGlvbi50aXRsZSArICc8L2gzPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Rpdic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChwYXJ0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj48YSBocmVmPVwibWFpbHRvOicgKyBsb2NhdGlvbi5lbWFpbCArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgbG9jYXRpb24uZW1haWwgKyAnPC9hPjwvc3Bhbj48L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnd2ViJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj48YSBocmVmPVwiJyArIGxvY2F0aW9uLndlYiArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgbG9jYXRpb24ud2ViX2Zvcm1hdHRlZCArICc8L2E+PC9zcGFuPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkZXNjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxsYWJlbCBjbGFzcz1cIml3LWRlc2NcIiBmb3I9XCJjYl9kZXRhaWxzXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2JfZGV0YWlsc1wiLz48aDMgY2xhc3M9XCJpdy14LWRldGFpbHNcIj5EZXRhaWxzPC9oMz48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHRvZ2dsZS1vcGVuLWRldGFpbHNcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48cCBjbGFzcz1cIml3LXgtZGV0YWlsc1wiPicgKyBsb2NhdGlvbi5kZXNjICsgJzwvcD48L2xhYmVsPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHNwYW4+JyArIGxvY2F0aW9uW3BhcnRdICsgJzwvc3Bhbj48L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnb3Blbl9ob3Vycyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtcyA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24ub3Blbl9ob3Vycy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb24ub3Blbl9ob3Vycy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMgKz0gJzxsaT48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzW2ldLmRheSArICc8L3N0cm9uZz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzW2ldLmhvdXJzICsnPC9zdHJvbmc+PC9saT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSAnPGxpPjxsYWJlbCBmb3I9XCJjYl9ob3Vyc1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNiX2hvdXJzXCIvPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbMF0uZGF5ICsgJzwvc3Ryb25nPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbMF0uaG91cnMgKyc8L3N0cm9uZz48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHRvZ2dsZS1vcGVuLWhvdXJzXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMva2V5Ym9hcmRfYXJyb3dfZG93bi5zdmdcIi8+PC9pPjx1bD4nICsgaXRlbXMgKyAnPC91bD48L2xhYmVsPjwvbGk+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWxpc3RcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIGZpcnN0LW1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjojNDI4NWY0O1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjx1bD4nICsgZmlyc3QgKyAnPC91bD48L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBib3hUZXh0LmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAncGhvdG8nLCAncGhvdG8nLCAnJykgK1xuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2l3LXRvb2xiYXInLCAndGl0bGUnLCAnJykgK1xuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdhZGRyZXNzJywgJ2xvY2F0aW9uX29uJykgK1xuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICd3ZWInLCAncHVibGljJykgK1xuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdlbWFpbCcsICdlbWFpbCcpICtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAndGVsJywgJ3Bob25lJykgK1xuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdpbnRfdGVsJywgJ3Bob25lJykgK1xuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ29wZW5faG91cnMnLCAnb3Blbl9ob3VycycsICdhY2Nlc3NfdGltZScpICtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnZGVzYycsICdrZXlib2FyZF9hcnJvd19kb3duJyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbXlPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBhbGlnbkJvdHRvbTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogYm94VGV4dCxcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZUF1dG9QYW46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAwLFxuICAgICAgICAgICAgICAgICAgICBwaXhlbE9mZnNldDogbmV3IGdvb2dsZS5tYXBzLlNpemUoLTE0MCwgLTQwKSxcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBib3hTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjgwcHgnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQm94TWFyZ2luOiAnMHB4IDBweCAwcHggMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgaW5mb0JveENsZWFyYW5jZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMSwgMSksXG4gICAgICAgICAgICAgICAgICAgIGlzSGlkZGVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcGFuZTogJ2Zsb2F0UGFuZScsXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZUV2ZW50UHJvcGFnYXRpb246IGZhbHNlXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliID0gbmV3IEluZm9Cb3gobXlPcHRpb25zKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYi5vcGVuKG1hcCwgbWFya2VyKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHZhciBtYXBPcHRpb25zID0ge1xuICAgICAgICAgICAgLy8gY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDU5LjkxNTMwMzcsMzAuMzQxMTM1MDk5OTk5OTc0KSxcbiAgICAgICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg1OS45MTUzMDM2LDMwLjM0Mzk5OTk5OTk5OTk3NCksXG4gICAgICAgICAgICB6b29tOiAxNyxcbiAgICAgICAgICAgIGdlc3R1cmVIYW5kbGluZzogJ2F1dG8nLFxuICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlLFxuICAgICAgICAgICAgem9vbUNvbnRyb2w6IHRydWUsXG4gICAgICAgICAgICBkaXNhYmxlRG91YmxlQ2xpY2tab29tOiB0cnVlLFxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IHRydWUsXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBzdHlsZTogZ29vZ2xlLm1hcHMuTWFwVHlwZUNvbnRyb2xTdHlsZS5IT1JJWk9OVEFMX0JBUixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2FsZUNvbnRyb2w6IHRydWUsXG4gICAgICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXG4gICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogdHJ1ZSxcbiAgICAgICAgICAgIGRyYWdnYWJsZSA6IHRydWUsXG4gICAgICAgICAgICBjbGlja2FibGVJY29uczogZmFsc2UsXG4gICAgICAgICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxuICAgICAgICAgICAgc3R5bGVzOiBbe1xuICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcbiAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcbiAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNDQ0NDQ0XCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcbiAgICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjZjJmMmYyXCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcbiAgICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgICAgICAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbe1xuICAgICAgICAgICAgICAgICAgICBcInNhdHVyYXRpb25cIjogLTEwMFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogNDVcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcbiAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgXCJzdHlsZXJzXCI6IFtcbiAgICAgICAgICAge1xuICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiMxZjZjYjRcIlxuICAgICAgICAgICB9LFxuICAgICAgICAgICB7XG4gICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXG4gICAgICAgICAgIH1cbiAgICAgICBdXG4gICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYXBFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcGtpdC03MTgxJyk7XG4gICAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcEVsZW1lbnQsIG1hcE9wdGlvbnMpO1xuICAgICAgICB2YXIgbG9jYXRpb25zID0gW1xuICAgICAgICAgICAge1widGl0bGVcIjpcItCa0YDQtdCw0YLQuNCy0L3QvtC1INC/0YDQvtGB0YLRgNCw0L3RgdGC0LLQviBcXFwi0KLQutCw0YfQuFxcXCJcIixcbiAgICAgICAgICAgIFwiYWRkcmVzc1wiOlwi0J3QsNCx0LXRgNC10LbQvdCw0Y8g0J7QsdCy0L7QtNC90L7Qs9C+INC60LDQvdCw0LvQsCwgNjAsINCh0YLQsNC90YbQuNGPINC80LXRgtGA0L4gXFxcItCe0LHQstC+0LTQvdGL0Lkg0LrQsNC90LDQu1xcXCJcIixcbiAgICAgICAgICAgIFwiZGVzY1wiOlwiXCIsXG4gICAgICAgICAgICBcInRlbFwiOlwiOCAoODEyKSA5MjItNjYtNDJcIixcbiAgICAgICAgICAgIFwiaW50X3RlbFwiOlwiKzcgODEyIDkyMi02Ni00MlwiLFxuICAgICAgICAgICAgXCJlbWFpbFwiOlwiXCIsXG4gICAgICAgICAgICBcIndlYlwiOlwiXCIsXG4gICAgICAgICAgICBcIndlYl9mb3JtYXR0ZWRcIjpcIlwiLFxuICAgICAgICAgICAgXCJvcGVuXCI6XCJcIixcInRpbWVcIjpcIjEwMTBcIixcbiAgICAgICAgICAgIFwibGF0XCI6NTkuOTE1MzAzNyxcbiAgICAgICAgICAgIFwibG5nXCI6MzAuMzQxMTM1MDk5OTk5OTc0LFxuICAgICAgICAgICAgXCJ2aWNpbml0eVwiOlwiT2J2b2RuaXkgY2hhbm5lbCBlbWJhbmttZW50LCA2MCwgU2FpbnQgUGV0ZXJzYnVyZ1wiLFxuICAgICAgICAgICAgXCJvcGVuX2hvdXJzXCI6XCJcIixcbiAgICAgICAgICAgIFwibWFya2VyXCI6e1widXJsXCI6XCIuLi9hc3NldHMvaW1nL2ljb25zL3BsYWNlaG9sZGVyLnBuZ1wiLFwic2NhbGVkU2l6ZVwiOntcIndpZHRoXCI6NTgsXCJoZWlnaHRcIjo4MixcImZcIjpcInB4XCIsXCJiXCI6XCJweFwifSxcIm9yaWdpblwiOntcInhcIjowLFwieVwiOjB9LFwiYW5jaG9yXCI6e1wieFwiOjEyLFwieVwiOjQyfX0sXCJpd1wiOntcImFkZHJlc3NcIjp0cnVlLFwiZGVzY1wiOnRydWUsXCJlbWFpbFwiOnRydWUsXCJlbmFibGVcIjp0cnVlLFwiaW50X3RlbFwiOnRydWUsXCJvcGVuXCI6dHJ1ZSxcIm9wZW5faG91cnNcIjp0cnVlLFwicGhvdG9cIjp0cnVlLFwidGVsXCI6dHJ1ZSxcInRpdGxlXCI6dHJ1ZSxcIndlYlwiOnRydWV9fVxuICAgICAgICBdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgICAgICBpY29uOiBsb2NhdGlvbnNbaV0ubWFya2VyLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxvY2F0aW9uc1tpXS5sYXQsIGxvY2F0aW9uc1tpXS5sbmcpLFxuICAgICAgICAgICAgICAgIG1hcDogbWFwLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBsb2NhdGlvbnNbaV0udGl0bGUsXG4gICAgICAgICAgICAgICAgYWRkcmVzczogbG9jYXRpb25zW2ldLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgZGVzYzogbG9jYXRpb25zW2ldLmRlc2MsXG4gICAgICAgICAgICAgICAgdGVsOiBsb2NhdGlvbnNbaV0udGVsLFxuICAgICAgICAgICAgICAgIGludF90ZWw6IGxvY2F0aW9uc1tpXS5pbnRfdGVsLFxuICAgICAgICAgICAgICAgIHZpY2luaXR5OiBsb2NhdGlvbnNbaV0udmljaW5pdHksXG4gICAgICAgICAgICAgICAgb3BlbjogbG9jYXRpb25zW2ldLm9wZW4sXG4gICAgICAgICAgICAgICAgb3Blbl9ob3VyczogbG9jYXRpb25zW2ldLm9wZW5faG91cnMsXG4gICAgICAgICAgICAgICAgcGhvdG86IGxvY2F0aW9uc1tpXS5waG90byxcbiAgICAgICAgICAgICAgICB0aW1lOiBsb2NhdGlvbnNbaV0udGltZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogbG9jYXRpb25zW2ldLmVtYWlsLFxuICAgICAgICAgICAgICAgIHdlYjogbG9jYXRpb25zW2ldLndlYixcbiAgICAgICAgICAgICAgICBpdzogbG9jYXRpb25zW2ldLml3XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1hcmtlcnNBcnJheS5wdXNoKG1hcmtlcik7XG5cbiAgICAgICAgICAgIGlmIChsb2NhdGlvbnNbaV0uaXcuZW5hYmxlID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBiaW5kSW5mb1dpbmRvdyhtYXJrZXIsIG1hcCwgbG9jYXRpb25zW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufSgpKTtcbiIsIlxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHNjcm9sbGVkID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICQoJy5wYXJhbGxheCcpLmNzcygndG9wJywgLShzY3JvbGxlZCkgKyAncHgnKTtcblxuICBmdW5jdGlvbiBwYXJhbGxheCgpe1xuICAgIHZhciBzY3JvbGxlZCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAkKCcucGFyYWxsYXgnKS5jc3MoJ3RvcCcsIC0oc2Nyb2xsZWQgKiAwLjMpICsgJ3B4Jyk7XG4gIH1cblxuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKGUpe1xuICAgIHBhcmFsbGF4KCk7XG4gIH0pO1xuXG5cblxufSkoKTtcbiIsIlxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHRyaWdnZXIgPSAkKCcuai1wb3B1cC10aXRsZScpLFxuICAgICAgcG9wdXAgPSAkKCcuai1wb3B1cC13aW5kb3cnKSxcbiAgICAgIGNsb3NlID0gJCgnLmotcG9wdXAtY2xvc2UnKSxcbiAgICAgIGxheW91dCA9ICQoJy5qLW1hcC1iZycpXG5cbiAgdHJpZ2dlci5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAvLyAkKGUudGFyZ2V0KS5zaWJsaW5ncyhwb3B1cCkuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAkKGUudGFyZ2V0KS5zaWJsaW5ncyhwb3B1cCkuc2xpZGVEb3duKCcxMDAnKTtcbiAgfSk7XG5cbiAgY2xvc2Uub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgJChlLnRhcmdldCkuY2xvc2VzdChwb3B1cCkuc2xpZGVVcCgnMTAwJyk7XG4gIH0pO1xuXG4gIGxheW91dC5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAkKHBvcHVwKS5zbGlkZVVwKCcxMDAnKTtcbiAgfSk7XG5cblxuXG5cbn0pKCk7XG4iLCJcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0ZXh0ID0gJCgnLmotc2VjdGlvbi10ZXh0JyksXG4gICAgICB0b2dnbGUgPSAkKCcuai1zZWN0aW9uLXRvZ2dsZScpLFxuICAgICAgaXRlbSA9ICQoJy5qLXNlY3Rpb24taXRlbScpXG5cbiAgdGV4dC5oaWRlKCk7XG5cbiAgdG9nZ2xlLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgc2liID0gJCh0aGlzKS5zaWJsaW5ncygpO1xuICAgICQoc2liWzFdKS5zbGlkZVRvZ2dsZSgpO1xuICAgICQoc2liWzBdKS50b2dnbGVDbGFzcygndG9nZ2xlJyk7XG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygndG9nZ2xlJyk7XG4gIH0pO1xuXG5cbn0pKCk7XG4iLCJcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vINCi0LDQsdGLINC00LvRjyDRgdC/0LjQutC10YDQvtCyXG4gIHZhciB0YWJMaW5rMSA9ICQoJy5qLXNwLWxpbmstMScpLFxuICAgICAgdGFiTGluazIgPSAkKCcuai1zcC1saW5rLTInKSxcbiAgICAgIHRhYjEgPSAkKCcuai1zcC10YWItMScpLFxuICAgICAgdGFiMiA9ICQoJy5qLXNwLXRhYi0yJyk7XG5cbiAgdGFiMi5oaWRlKCk7XG5cbiAgdGFiTGluazIub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRhYkxpbmsyLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB0YWJMaW5rMS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgdGFiMi5zaG93KCk7XG4gICAgdGFiMS5oaWRlKCk7XG4gIH0pO1xuXG4gIHRhYkxpbmsxLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0YWJMaW5rMS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdGFiTGluazIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRhYjEuc2hvdygpO1xuICAgIHRhYjIuaGlkZSgpO1xuICB9KTtcblxuXG4gIC8vINCi0LDQsdGLINC00LvRjyDRgNCw0YHQv9C40YHQsNC90LjRj1xuICB2YXIgdGFiTGluazExID0gJCgnLmotc2MtbGluay0xJyksXG4gICAgICB0YWJMaW5rMjIgPSAkKCcuai1zYy1saW5rLTInKSxcbiAgICAgIHRhYjExID0gJCgnLmotc2MtdGFiLTEnKSxcbiAgICAgIHRhYjIyID0gJCgnLmotc2MtdGFiLTInKTtcblxuICB0YWIyMi5oaWRlKCk7XG5cbiAgdGFiTGluazIyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0YWJMaW5rMjIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRhYkxpbmsxMS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgdGFiMjIuc2hvdygpO1xuICAgIHRhYjExLmhpZGUoKTtcbiAgfSk7XG5cbiAgdGFiTGluazExLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0YWJMaW5rMTEuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRhYkxpbmsyMi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgdGFiMTEuc2hvdygpO1xuICAgIHRhYjIyLmhpZGUoKTtcbiAgfSk7XG5cblxuXG5cbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
