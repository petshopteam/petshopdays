
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
            // center: new google.maps.LatLng(59.9153036,30.343999999999974),
            center: new google.maps.LatLng(59.9153036,30.353999999999974),
            // zoom: 17,
            zoom: 15,
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

        // центрирование карты на мобильных (320px - 767px)
        var windowSize = document.documentElement.clientWidth;
        if (windowSize < 768) {
          map.panTo(marker.getPosition());
          // mapOptions.zoom = 3;
        }

    }



}());


(function() {
  'use strict';

  // var scrolled = $(window).scrollTop();
  //
  // $('.parallax').css('top', -(scrolled) + 'px');
  //
  // function parallax(){
  //   var scrolled = $(window).scrollTop();
  //   $('.parallax').css('top', -(scrolled * 0.3) + 'px');
  // }
  //
  // $(window).scroll(function(e){
  //   parallax();
  // });

  var rellax = new Rellax('.rellax');



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

(function(){


  // &access_token=94217bb8d09bc8b84ac8aa8552a27cb99af2d7480839945d011ed2375307d5aabed0ecd6b53d148955eb0&expires_in=offine&user_id=173947858

  var token = '94217bb8d09bc8b84ac8aa8552a27cb99af2d7480839945d011ed2375307d5aabed0ecd6b53d148955eb0',
      id = '173947858', //user id
      albumId = '246690306'; //test_album

$.ajax({
  url: "http://api.vk.com/method/photos.get?album_id=173947858&owner_id=246690306",
  dataType: 'jsonp',
  type: 'GET',
  success: function(result){
    // var resp = result.response;
    console.log(result);
    // for (var i = 0; i < resp.length; i++) {
    //   console.log(result);
    //   console.log(resp[i]);
    // }
  },
  error: function(result){
    // console.log(result);
  }
});




}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1haW5NZW51LmpzIiwibWFwLmpzIiwicGFyYWxsYXguanMiLCJwb3B1cC5qcyIsInNlY3Rpb25zVG9nZ2xlLmpzIiwidGFicy5qcyIsInZrQXBpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIHNsaWNrIHNsaWRlciBpbml0IGFuZCBzZXR0aW5ncyBoZXJlOlxuICB2YXIgc2xpY2tJbml0ID0gZnVuY3Rpb24oKXtcbiAgICAkKCcuai1zbGlkZXItY29udGFpbmVyJykuc2xpY2soe1xuICAgIGRvdHM6IGZhbHNlLFxuICAgIGFycm93czogdHJ1ZSxcbiAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICBzcGVlZDogMzAwLFxuICAgIHNsaWRlc1RvU2hvdzogOCxcbiAgICBzbGlkZXNUb1Njcm9sbDogOCxcbiAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgIHZhcmlhYmxlV2lkdGg6IHRydWVcbiAgICB9KTtcbiAgfTtcbiAgc2xpY2tJbml0KCk7XG5cblxufSkoKTtcbiIsIjsoZnVuY3Rpb24oKXtcblxuICAvLyBhZGQgYWN0aXZlIGNsYXNzIG9uIHNjcm9sbDtcbiAgdmFyIHNlY3Rpb24gPSAkKCcuYWJvdXQnKS5vZmZzZXQoKS50b3A7XG4gIHZhciBtZW51ID0gJCgnLmotbWFpbi1tZW51Jyk7XG4gIHZhciBjbG9zZSA9ICQoJy5qLW1lbnUtY2xvc2UnKTtcbiAgdmFyIHRvZ2dsZSA9ICQoJy5qLW1lbnUtdG9nZ2xlJyk7XG5cbiAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xuXHRcdFx0aWYoICQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNlY3Rpb24gKSB7XG5cdFx0XHRcdFx0JCgnLm1haW4tbWVudScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAkKCcubWFpbi1tZW51X19pdGVtLmJ1eScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAkKCcubWFpbi1tZW51X19pdGVtLmxvZ28nKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdCQoJy5tYWluLW1lbnUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgJCgnLm1haW4tbWVudV9faXRlbS5idXknKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgJCgnLm1haW4tbWVudV9faXRlbS5sb2dvJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuXHRcdFx0fVxuXHR9KTtcblxuICAvLyBNYWluIG5hdiBzbW9vdGggc2Nyb2xsO1xuJChcIi5tYWluLW1lbnVfX2xpc3RcIikub24oXCJjbGlja1wiLFwiYVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoJChldmVudC50YXJnZXQpLmhhc0NsYXNzKCdqLXNjcm9sbC1saW5rJykpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgaWQgID0gJCh0aGlzKS5hdHRyKCdocmVmJyksXG4gICAgICAgICAgdG9wID0gJChpZCkub2Zmc2V0KCkudG9wO1xuICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCA1MDApO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gVGthY2hpIHNtb290aCBzY3JvbGw7XG4kKFwiLm1haW4taGVhZF9fcGxhY2UtbGlua1wiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGlkICA9ICQodGhpcykuYXR0cignaHJlZicpLFxuICAgICAgICB0b3AgPSAkKGlkKS5vZmZzZXQoKS50b3A7XG4gICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiB0b3B9LCA1MDApO1xuICB9KTtcblxuLy8gbWFpbiBtZW51IHRvZ2dsZVxudG9nZ2xlLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBtZW51LmNzcyh7XG4gICAgICAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJyxcbiAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlWSgwKSdcbiAgICB9KTtcbiAgfSk7XG4vLyBtYWluIG1lbnUgY2xvc2VcbmNsb3NlLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBtZW51LmNzcyh7XG4gICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZVkoLTEwMCUpJyxcbiAgICAgICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnXG4gICAgfSk7XG4gIH0pO1xuXG5cblxufSgpKTtcbiIsIjsoZnVuY3Rpb24oKXtcblxuICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih3aW5kb3csICdsb2FkJywgaW5pdCk7XG4gICAgdmFyIG1hcCwgbWFya2Vyc0FycmF5ID0gW107XG5cbiAgICBmdW5jdGlvbiBiaW5kSW5mb1dpbmRvdyhtYXJrZXIsIG1hcCwgbG9jYXRpb24pIHtcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNsb3NlKGxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2xvc2UobG9jYXRpb24pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXJrZXJzQXJyYXkuZm9yRWFjaChmdW5jdGlvbihsb2MsIGluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYy5pYiAmJiBsb2MuaWIgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlKGxvYyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciBib3hUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgYm94VGV4dC5zdHlsZS5jc3NUZXh0ID0gJ2JhY2tncm91bmQ6ICNmZmY7JztcbiAgICAgICAgICAgICAgICBib3hUZXh0LmNsYXNzTGlzdC5hZGQoJ21kLXdoaXRlZnJhbWUtMmRwJyk7XG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBidWlsZFBpZWNlcyhsb2NhdGlvbiwgZWwsIHBhcnQsIGljb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uW3BhcnRdID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLml3W3BhcnRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2goZWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Bob3RvJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uLnBob3RvKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LXBob3RvXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJyArIGxvY2F0aW9uLnBob3RvICsgJyk7XCI+PC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaXctdG9vbGJhcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LXRvb2xiYXJcIj48aDMgY2xhc3M9XCJtZC1zdWJoZWFkXCI+JyArIGxvY2F0aW9uLnRpdGxlICsgJzwvaDM+PC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGl2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHBhcnQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjojNDI4NWY0O1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPjxhIGhyZWY9XCJtYWlsdG86JyArIGxvY2F0aW9uLmVtYWlsICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBsb2NhdGlvbi5lbWFpbCArICc8L2E+PC9zcGFuPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd3ZWInOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjojNDI4NWY0O1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPjxhIGhyZWY9XCInICsgbG9jYXRpb24ud2ViICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBsb2NhdGlvbi53ZWJfZm9ybWF0dGVkICsgJzwvYT48L3NwYW4+PC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Rlc2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGxhYmVsIGNsYXNzPVwiaXctZGVzY1wiIGZvcj1cImNiX2RldGFpbHNcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjYl9kZXRhaWxzXCIvPjxoMyBjbGFzcz1cIml3LXgtZGV0YWlsc1wiPkRldGFpbHM8L2gzPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgdG9nZ2xlLW9wZW4tZGV0YWlsc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxwIGNsYXNzPVwiaXcteC1kZXRhaWxzXCI+JyArIGxvY2F0aW9uLmRlc2MgKyAnPC9wPjwvbGFiZWw+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctZGV0YWlsc1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj4nICsgbG9jYXRpb25bcGFydF0gKyAnPC9zcGFuPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvcGVuX2hvdXJzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW1zID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbi5vcGVuX2hvdXJzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbi5vcGVuX2hvdXJzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcyArPSAnPGxpPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbaV0uZGF5ICsgJzwvc3Ryb25nPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbaV0uaG91cnMgKyc8L3N0cm9uZz48L2xpPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdCA9ICc8bGk+PGxhYmVsIGZvcj1cImNiX2hvdXJzXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2JfaG91cnNcIi8+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1swXS5kYXkgKyAnPC9zdHJvbmc+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1swXS5ob3VycyArJzwvc3Ryb25nPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgdG9nZ2xlLW9wZW4taG91cnNcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy9rZXlib2FyZF9hcnJvd19kb3duLnN2Z1wiLz48L2k+PHVsPicgKyBpdGVtcyArICc8L3VsPjwvbGFiZWw+PC9saT4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctbGlzdFwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgZmlyc3QtbWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOiM0Mjg1ZjQ7XCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHVsPicgKyBmaXJzdCArICc8L3VsPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJveFRleHQuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdwaG90bycsICdwaG90bycsICcnKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnaXctdG9vbGJhcicsICd0aXRsZScsICcnKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2FkZHJlc3MnLCAnbG9jYXRpb25fb24nKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ3dlYicsICdwdWJsaWMnKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2VtYWlsJywgJ2VtYWlsJykgK1xuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICd0ZWwnLCAncGhvbmUnKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2ludF90ZWwnLCAncGhvbmUnKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnb3Blbl9ob3VycycsICdvcGVuX2hvdXJzJywgJ2FjY2Vzc190aW1lJykgK1xuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdkZXNjJywgJ2tleWJvYXJkX2Fycm93X2Rvd24nKTtcblxuICAgICAgICAgICAgICAgIHZhciBteU9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFsaWduQm90dG9tOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBib3hUZXh0LFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQXV0b1BhbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgICAgIHBpeGVsT2Zmc2V0OiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgtMTQwLCAtNDApLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGJveFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcyODBweCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCb3hNYXJnaW46ICcwcHggMHB4IDBweCAwcHgnLFxuICAgICAgICAgICAgICAgICAgICBpbmZvQm94Q2xlYXJhbmNlOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgxLCAxKSxcbiAgICAgICAgICAgICAgICAgICAgaXNIaWRkZW46IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBwYW5lOiAnZmxvYXRQYW5lJyxcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlRXZlbnRQcm9wYWdhdGlvbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIgPSBuZXcgSW5mb0JveChteU9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliLm9wZW4obWFwLCBtYXJrZXIpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdmFyIG1hcE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAvLyBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTkuOTE1MzAzNiwzMC4zNDM5OTk5OTk5OTk5NzQpLFxuICAgICAgICAgICAgY2VudGVyOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDU5LjkxNTMwMzYsMzAuMzUzOTk5OTk5OTk5OTc0KSxcbiAgICAgICAgICAgIC8vIHpvb206IDE3LFxuICAgICAgICAgICAgem9vbTogMTUsXG4gICAgICAgICAgICBnZXN0dXJlSGFuZGxpbmc6ICdhdXRvJyxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5Db250cm9sOiBmYWxzZSxcbiAgICAgICAgICAgIHpvb21Db250cm9sOiB0cnVlLFxuICAgICAgICAgICAgZGlzYWJsZURvdWJsZUNsaWNrWm9vbTogdHJ1ZSxcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiB0cnVlLFxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgc3R5bGU6IGdvb2dsZS5tYXBzLk1hcFR5cGVDb250cm9sU3R5bGUuSE9SSVpPTlRBTF9CQVIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxuICAgICAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxuICAgICAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IHRydWUsXG4gICAgICAgICAgICBkcmFnZ2FibGUgOiB0cnVlLFxuICAgICAgICAgICAgY2xpY2thYmxlSWNvbnM6IGZhbHNlLFxuICAgICAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcbiAgICAgICAgICAgIHN0eWxlczogW3tcbiAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXG4gICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzQ0NDQ0NFwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2YyZjJmMlwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcbiAgICAgICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IC0xMDBcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDQ1XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMWY2Y2I0XCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAge1xuICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICB9XG4gICAgICAgXVxuICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cblxuICAgICAgICB2YXIgbWFwRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXBraXQtNzE4MScpO1xuICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtYXBFbGVtZW50LCBtYXBPcHRpb25zKTtcbiAgICAgICAgdmFyIGxvY2F0aW9ucyA9IFtcbiAgICAgICAgICAgIHtcInRpdGxlXCI6XCLQmtGA0LXQsNGC0LjQstC90L7QtSDQv9GA0L7RgdGC0YDQsNC90YHRgtCy0L4gXFxcItCi0LrQsNGH0LhcXFwiXCIsXG4gICAgICAgICAgICBcImFkZHJlc3NcIjpcItCd0LDQsdC10YDQtdC20L3QsNGPINCe0LHQstC+0LTQvdC+0LPQviDQutCw0L3QsNC70LAsIDYwLCDQodGC0LDQvdGG0LjRjyDQvNC10YLRgNC+IFxcXCLQntCx0LLQvtC00L3Ri9C5INC60LDQvdCw0LtcXFwiXCIsXG4gICAgICAgICAgICBcImRlc2NcIjpcIlwiLFxuICAgICAgICAgICAgXCJ0ZWxcIjpcIjggKDgxMikgOTIyLTY2LTQyXCIsXG4gICAgICAgICAgICBcImludF90ZWxcIjpcIis3IDgxMiA5MjItNjYtNDJcIixcbiAgICAgICAgICAgIFwiZW1haWxcIjpcIlwiLFxuICAgICAgICAgICAgXCJ3ZWJcIjpcIlwiLFxuICAgICAgICAgICAgXCJ3ZWJfZm9ybWF0dGVkXCI6XCJcIixcbiAgICAgICAgICAgIFwib3BlblwiOlwiXCIsXCJ0aW1lXCI6XCIxMDEwXCIsXG4gICAgICAgICAgICBcImxhdFwiOjU5LjkxNTMwMzcsXG4gICAgICAgICAgICBcImxuZ1wiOjMwLjM0MTEzNTA5OTk5OTk3NCxcbiAgICAgICAgICAgIFwidmljaW5pdHlcIjpcIk9idm9kbml5IGNoYW5uZWwgZW1iYW5rbWVudCwgNjAsIFNhaW50IFBldGVyc2J1cmdcIixcbiAgICAgICAgICAgIFwib3Blbl9ob3Vyc1wiOlwiXCIsXG4gICAgICAgICAgICBcIm1hcmtlclwiOntcInVybFwiOlwiLi4vYXNzZXRzL2ltZy9pY29ucy9wbGFjZWhvbGRlci5wbmdcIixcInNjYWxlZFNpemVcIjp7XCJ3aWR0aFwiOjU4LFwiaGVpZ2h0XCI6ODIsXCJmXCI6XCJweFwiLFwiYlwiOlwicHhcIn0sXCJvcmlnaW5cIjp7XCJ4XCI6MCxcInlcIjowfSxcImFuY2hvclwiOntcInhcIjoxMixcInlcIjo0Mn19LFwiaXdcIjp7XCJhZGRyZXNzXCI6dHJ1ZSxcImRlc2NcIjp0cnVlLFwiZW1haWxcIjp0cnVlLFwiZW5hYmxlXCI6dHJ1ZSxcImludF90ZWxcIjp0cnVlLFwib3BlblwiOnRydWUsXCJvcGVuX2hvdXJzXCI6dHJ1ZSxcInBob3RvXCI6dHJ1ZSxcInRlbFwiOnRydWUsXCJ0aXRsZVwiOnRydWUsXCJ3ZWJcIjp0cnVlfX1cbiAgICAgICAgXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICAgICAgaWNvbjogbG9jYXRpb25zW2ldLm1hcmtlcixcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsb2NhdGlvbnNbaV0ubGF0LCBsb2NhdGlvbnNbaV0ubG5nKSxcbiAgICAgICAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICAgICAgICB0aXRsZTogbG9jYXRpb25zW2ldLnRpdGxlLFxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGxvY2F0aW9uc1tpXS5hZGRyZXNzLFxuICAgICAgICAgICAgICAgIGRlc2M6IGxvY2F0aW9uc1tpXS5kZXNjLFxuICAgICAgICAgICAgICAgIHRlbDogbG9jYXRpb25zW2ldLnRlbCxcbiAgICAgICAgICAgICAgICBpbnRfdGVsOiBsb2NhdGlvbnNbaV0uaW50X3RlbCxcbiAgICAgICAgICAgICAgICB2aWNpbml0eTogbG9jYXRpb25zW2ldLnZpY2luaXR5LFxuICAgICAgICAgICAgICAgIG9wZW46IGxvY2F0aW9uc1tpXS5vcGVuLFxuICAgICAgICAgICAgICAgIG9wZW5faG91cnM6IGxvY2F0aW9uc1tpXS5vcGVuX2hvdXJzLFxuICAgICAgICAgICAgICAgIHBob3RvOiBsb2NhdGlvbnNbaV0ucGhvdG8sXG4gICAgICAgICAgICAgICAgdGltZTogbG9jYXRpb25zW2ldLnRpbWUsXG4gICAgICAgICAgICAgICAgZW1haWw6IGxvY2F0aW9uc1tpXS5lbWFpbCxcbiAgICAgICAgICAgICAgICB3ZWI6IGxvY2F0aW9uc1tpXS53ZWIsXG4gICAgICAgICAgICAgICAgaXc6IGxvY2F0aW9uc1tpXS5pd1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtYXJrZXJzQXJyYXkucHVzaChtYXJrZXIpO1xuXG4gICAgICAgICAgICBpZiAobG9jYXRpb25zW2ldLml3LmVuYWJsZSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgYmluZEluZm9XaW5kb3cobWFya2VyLCBtYXAsIGxvY2F0aW9uc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyDRhtC10L3RgtGA0LjRgNC+0LLQsNC90LjQtSDQutCw0YDRgtGLINC90LAg0LzQvtCx0LjQu9GM0L3Ri9GFICgzMjBweCAtIDc2N3B4KVxuICAgICAgICB2YXIgd2luZG93U2l6ZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgaWYgKHdpbmRvd1NpemUgPCA3NjgpIHtcbiAgICAgICAgICBtYXAucGFuVG8obWFya2VyLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgIC8vIG1hcE9wdGlvbnMuem9vbSA9IDM7XG4gICAgICAgIH1cblxuICAgIH1cblxuXG5cbn0oKSk7XG4iLCJcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIHZhciBzY3JvbGxlZCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgLy9cbiAgLy8gJCgnLnBhcmFsbGF4JykuY3NzKCd0b3AnLCAtKHNjcm9sbGVkKSArICdweCcpO1xuICAvL1xuICAvLyBmdW5jdGlvbiBwYXJhbGxheCgpe1xuICAvLyAgIHZhciBzY3JvbGxlZCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgLy8gICAkKCcucGFyYWxsYXgnKS5jc3MoJ3RvcCcsIC0oc2Nyb2xsZWQgKiAwLjMpICsgJ3B4Jyk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbihlKXtcbiAgLy8gICBwYXJhbGxheCgpO1xuICAvLyB9KTtcblxuICB2YXIgcmVsbGF4ID0gbmV3IFJlbGxheCgnLnJlbGxheCcpO1xuXG5cblxufSkoKTtcbiIsIlxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHRyaWdnZXIgPSAkKCcuai1wb3B1cC10aXRsZScpLFxuICAgICAgcG9wdXAgPSAkKCcuai1wb3B1cC13aW5kb3cnKSxcbiAgICAgIGNsb3NlID0gJCgnLmotcG9wdXAtY2xvc2UnKSxcbiAgICAgIGxheW91dCA9ICQoJy5qLW1hcC1iZycpXG5cbiAgdHJpZ2dlci5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAvLyAkKGUudGFyZ2V0KS5zaWJsaW5ncyhwb3B1cCkuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAkKGUudGFyZ2V0KS5zaWJsaW5ncyhwb3B1cCkuc2xpZGVEb3duKCcxMDAnKTtcbiAgfSk7XG5cbiAgY2xvc2Uub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgJChlLnRhcmdldCkuY2xvc2VzdChwb3B1cCkuc2xpZGVVcCgnMTAwJyk7XG4gIH0pO1xuXG4gIGxheW91dC5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAkKHBvcHVwKS5zbGlkZVVwKCcxMDAnKTtcbiAgfSk7XG5cblxuXG5cbn0pKCk7XG4iLCJcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0ZXh0ID0gJCgnLmotc2VjdGlvbi10ZXh0JyksXG4gICAgICB0b2dnbGUgPSAkKCcuai1zZWN0aW9uLXRvZ2dsZScpLFxuICAgICAgaXRlbSA9ICQoJy5qLXNlY3Rpb24taXRlbScpXG5cbiAgdGV4dC5oaWRlKCk7XG5cbiAgdG9nZ2xlLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgc2liID0gJCh0aGlzKS5zaWJsaW5ncygpO1xuICAgICQoc2liWzFdKS5zbGlkZVRvZ2dsZSgpO1xuICAgICQoc2liWzBdKS50b2dnbGVDbGFzcygndG9nZ2xlJyk7XG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygndG9nZ2xlJyk7XG4gIH0pO1xuXG5cbn0pKCk7XG4iLCJcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vINCi0LDQsdGLINC00LvRjyDRgdC/0LjQutC10YDQvtCyXG4gIHZhciB0YWJMaW5rMSA9ICQoJy5qLXNwLWxpbmstMScpLFxuICAgICAgdGFiTGluazIgPSAkKCcuai1zcC1saW5rLTInKSxcbiAgICAgIHRhYjEgPSAkKCcuai1zcC10YWItMScpLFxuICAgICAgdGFiMiA9ICQoJy5qLXNwLXRhYi0yJyk7XG5cbiAgdGFiMi5oaWRlKCk7XG5cbiAgdGFiTGluazIub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRhYkxpbmsyLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB0YWJMaW5rMS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgdGFiMi5zaG93KCk7XG4gICAgdGFiMS5oaWRlKCk7XG4gIH0pO1xuXG4gIHRhYkxpbmsxLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0YWJMaW5rMS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdGFiTGluazIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRhYjEuc2hvdygpO1xuICAgIHRhYjIuaGlkZSgpO1xuICB9KTtcblxuXG4gIC8vINCi0LDQsdGLINC00LvRjyDRgNCw0YHQv9C40YHQsNC90LjRj1xuICB2YXIgdGFiTGluazExID0gJCgnLmotc2MtbGluay0xJyksXG4gICAgICB0YWJMaW5rMjIgPSAkKCcuai1zYy1saW5rLTInKSxcbiAgICAgIHRhYjExID0gJCgnLmotc2MtdGFiLTEnKSxcbiAgICAgIHRhYjIyID0gJCgnLmotc2MtdGFiLTInKTtcblxuICB0YWIyMi5oaWRlKCk7XG5cbiAgdGFiTGluazIyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0YWJMaW5rMjIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRhYkxpbmsxMS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgdGFiMjIuc2hvdygpO1xuICAgIHRhYjExLmhpZGUoKTtcbiAgfSk7XG5cbiAgdGFiTGluazExLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0YWJMaW5rMTEuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRhYkxpbmsyMi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgdGFiMTEuc2hvdygpO1xuICAgIHRhYjIyLmhpZGUoKTtcbiAgfSk7XG5cblxuXG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcblxuXG4gIC8vICZhY2Nlc3NfdG9rZW49OTQyMTdiYjhkMDliYzhiODRhYzhhYTg1NTJhMjdjYjk5YWYyZDc0ODA4Mzk5NDVkMDExZWQyMzc1MzA3ZDVhYWJlZDBlY2Q2YjUzZDE0ODk1NWViMCZleHBpcmVzX2luPW9mZmluZSZ1c2VyX2lkPTE3Mzk0Nzg1OFxuXG4gIHZhciB0b2tlbiA9ICc5NDIxN2JiOGQwOWJjOGI4NGFjOGFhODU1MmEyN2NiOTlhZjJkNzQ4MDgzOTk0NWQwMTFlZDIzNzUzMDdkNWFhYmVkMGVjZDZiNTNkMTQ4OTU1ZWIwJyxcbiAgICAgIGlkID0gJzE3Mzk0Nzg1OCcsIC8vdXNlciBpZFxuICAgICAgYWxidW1JZCA9ICcyNDY2OTAzMDYnOyAvL3Rlc3RfYWxidW1cblxuJC5hamF4KHtcbiAgdXJsOiBcImh0dHA6Ly9hcGkudmsuY29tL21ldGhvZC9waG90b3MuZ2V0P2FsYnVtX2lkPTE3Mzk0Nzg1OCZvd25lcl9pZD0yNDY2OTAzMDZcIixcbiAgZGF0YVR5cGU6ICdqc29ucCcsXG4gIHR5cGU6ICdHRVQnLFxuICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpe1xuICAgIC8vIHZhciByZXNwID0gcmVzdWx0LnJlc3BvbnNlO1xuICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCByZXNwLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgIC8vICAgY29uc29sZS5sb2cocmVzcFtpXSk7XG4gICAgLy8gfVxuICB9LFxuICBlcnJvcjogZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICB9XG59KTtcblxuXG5cblxufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
