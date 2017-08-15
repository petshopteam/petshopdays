
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

(function($) {
    $(function() {
        var nps = 'EmbedVkGallery';
        $[nps] = {
            /**
             * Can be [s,m,x,o,p,q,y,z,w]
             * Look into https://vk.com/dev/photo_sizes
             */
            full_image_size: 'x',
            width: 100,
            margin: 4,
            rev: 1,
            limit: 0,
            link: '',
            link_mapper: function(el){
                return [
                    el.href,
                    '<a href="'+el.href+'">'+el.title+'</a>'
                ]
            }
        };

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        $.fn[nps] = function(opts) {
            opts = opts || {};
            opts = (typeof(opts) !== 'object' ) ? {link:opts} : opts;
            var localOpts = $.extend({}, $[nps], opts),
                json;
            function showAlbum() {
                var $this = $(this),
                    $array_for_promises = [],
                    $loader_block,
                    $loader_blinding_block,
                    gallerySetName = 'gallerySetName' + +new Date(),
                    meta_opts = $.extend({}, localOpts, $this.data()),
                    res = /(-?\d+)_(\d+)/g.exec(meta_opts.link);
                    if (!res || res.length < 3) {return;}

                $loader_blinding_block = $('<span/>', {text: '...'});
                $loader_block = $('<div/>', {
                    text: 'Загрузка фотографий, пожалуйста подождите ',
                    style: 'text-align: center; padding: 20px 20px;',
                    'class': 'jquery-embedvkgallery-loader-block'
                });
                $loader_block.append($loader_blinding_block);
                $this.append($loader_block);
                setInterval(function() {
                    $loader_blinding_block.fadeOut(500).fadeIn(500);
                }, 1000);
                /**
                 * photo_sizes=1 returns special formats
                 * https://vk.com/dev/photo_sizes
                 */
                var query = 'https://api.vk.com/method/photos.get?&photo_sizes=1&extended=1&album_id=' + res[2]
                    + '&owner_id=' + res[1]
                    + '&rev=' + meta_opts.rev
                    /**
                     * Version of VK API
                     */
                    + '&v=5.62&callback=?';
                if (meta_opts.width < 0) {return;}
                meta_opts.height = meta_opts.width - (meta_opts.width / 2 ^ 0);

                function resize($img) {
                    var $div = $img.closest('div'),
                        d_h = $div.height(),
                        d_w = $div.width(),
                        i_h = $img.height(),
                        i_w = $img.width();
                    var max = d_h > d_w ? d_h : d_w;
                    if (i_h > i_w) { $img.width(max); } else { $img.height(max); }
                    return $img;
                }

                function getCountRows(count, width, parentWidth) {
                    var min = parentWidth / width ^ 0,
                        result = [];
                    if (count <= min) {
                        return [count];
                    } else {
                        while (count > 0) {
                            if ((count - min) > min) {
                                result[result.length] = min;
                            } else {
                                result[result.length] = count / 2 ^ 0;
                                result[result.length] = count - result[result.length - 1];
                                count = 0;
                            }
                            count -= result[result.length - 1];
                        }
                    }
                    for (var i = 0; i < result.length; i++) {
                        if (i % 2 === 0) {
                            if (i <= (result.length-2)) {
                                if (result[i] > 3 && result[i+1] > 3) {
                                    var max = (result[i] / 3 ^ 0) < (result[i+1] / 3 ^ 0) ?
                                        result[i] / 3 ^ 0 : result[i + 1] / 3 ^ 0,
                                        plusOrMinus = Math.random() < 0.5 ? -1 : 1,
                                        a = getRandomInt(1, max) * plusOrMinus;
                                    result[i] += a;
                                    result[i + 1] -= a;
                                }
                            }
                        }
                    }
                    return result;
                }

                function expanding($row) {
                    var $divs = $('div', $row),
                        totalWidth = $divs.length * meta_opts.margin,
                        diff,
                        newWidth,
                        newHeight;
                    $divs.each(function() {
                        totalWidth += $(this).data('newWidth');
                    });
                    totalWidth = totalWidth ^ 0;
                    var a = (totalWidth > $this.width()) ? -1 : 1;
                    while ( totalWidth !== $this.width() ) {
                        diff = ($this.width() - totalWidth ^ 0 ) / $divs.length ^ 0;
                        diff = Math.abs(diff);
                        if (diff > 2) { a *= diff; }
                        $divs.each(function() {
                            newWidth = $(this).data('newWidth') + a;
                            $(this).data({ newWidth: newWidth });
                            totalWidth += a;
                            return (totalWidth !== $this.width());
                        });
                        newHeight  = $divs.eq(0).data('newHeight') + a;
                        $divs.data('newHeight', newHeight);
                        a = (totalWidth > $this.width()) ? -1 : 1;
                    }
                    $divs.each(function() {
                        $(this).css({
                            width: $(this).data('newWidth'),
                            height: $(this).data('newHeight'),
                            float: 'left',
                            marginRight: meta_opts.margin + 'px',
                            marginTop: meta_opts.margin + 'px',
                            boxSizing: 'border-box',
                            overflow: 'hidden'

                        });
                        var $def = $.Deferred();
                        $array_for_promises.push($def);
                        var $a = $('<a/>', {
                                href: $(this).data('maxSrc'),
                                rel: gallerySetName,
                                'class': 'embedvkgallery_link',
                                'data-lightbox': gallerySetName,
                                title: $(this).data('text')
                            }),
                            $img = $('<img/>', {
                                src: $(this).data('src'),
                                'class': 'embedvkgallery_img'

                            })
                                .css({ margin: 0, display: 'none' })
                                .load(function() {
                                    resize( $(this) );
                                    $def.resolve();
                                })
                                .error(function() {
                                    $def.resolve();
                                });
                        $a.append($img).appendTo( $(this) );
                    });
                    return $row;
                }

                function renderAlbumList(data) {
                    if (data.response && data.response.count > 0) {
                        /**
                         * Slice array by option LIMIT
                         */
                        if (meta_opts.limit && +meta_opts.limit && meta_opts.limit < data.response.count) {
                            data.response.items.length = meta_opts.limit;
                            data.response.count = data.response.items.length;
                        }
                        json = data;
                        var arr = getCountRows(data.response.count, meta_opts.width,  $this.width()),
                            sizes = 2,
                            item = 0;
                        for (var i = 0; i < arr.length; i++) {
                            var $row = $('<div/>');
                            for (var j = 0; j < arr[i]; j++) {
                                var c_height = data.response.items[item].sizes[sizes].height,
                                    c_width = data.response.items[item].sizes[sizes].width,
                                    newWidth = c_width * meta_opts.height / c_height ^ 0,
                                    maxSrc,
                                    grepResults;

                                /**
                                 * Finding the maxSrc url which we need
                                 */
                                grepResults = $.grep(data.response.items[item].sizes, function(size) {
                                    return size.type == localOpts.full_image_size;
                                });
                                if ( ! grepResults || ! grepResults.length ) {
                                    grepResults = $.grep(data.response.items[item].sizes, function(size) {
                                        return size.type == 'm';
                                    });
                                    if ( ! grepResults || ! grepResults.length ) {
                                        grepResults = $.grep(data.response.items[item].sizes, function(size) {
                                            return size.type == 's';
                                        });
                                    }
                                }
                                if ( ! grepResults || ! grepResults.length ) {
                                    continue;
                                }
                                maxSrc = grepResults[0].src;


                                $('<div/>').data({
                                    newHeight: meta_opts.height,
                                    newWidth: newWidth,
                                    src: data.response.items[item].sizes[sizes].src,
                                    text: data.response.items[item].text,
                                    maxSrc: maxSrc
                                }).appendTo($row);
                                item++;
                            }
                            expanding($row).appendTo($this);
                            if ($.fn.slimbox){
                                $('a', $this).slimbox({}, meta_opts.link_mapper);
                            } else if ($.fn.swipebox) {
                                $('a.embedvkgallery_link', $this).swipebox({}, meta_opts.link_mapper);
                            }
                        }
                        $.when.apply(null, $array_for_promises).done(function() {
                            $loader_block.hide('slow');
                            $this.find('.embedvkgallery_img').fadeIn('slow');
                        });
                    } else {
                        $this.text('Album not found');
                    }
                }
                if (!json) {
                    $.getJSON(query, renderAlbumList)
                        .fail(function() {
                            $loader_block.html('Ошибка загрузки фотографий :(');
                        });
                } else {
                    renderAlbumList(json);
                }
            }
            return this.each(showAlbum);
        };
    });
})(jQuery);


$("#vk").EmbedVkGallery();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1haW5NZW51LmpzIiwibWFwLmpzIiwicGFyYWxsYXguanMiLCJwb3B1cC5qcyIsInNlY3Rpb25zVG9nZ2xlLmpzIiwidGFicy5qcyIsInZrQXBpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gc2xpY2sgc2xpZGVyIGluaXQgYW5kIHNldHRpbmdzIGhlcmU6XG4gIHZhciBzbGlja0luaXQgPSBmdW5jdGlvbigpe1xuICAgICQoJy5qLXNsaWRlci1jb250YWluZXInKS5zbGljayh7XG4gICAgZG90czogZmFsc2UsXG4gICAgYXJyb3dzOiB0cnVlLFxuICAgIGluZmluaXRlOiB0cnVlLFxuICAgIHNwZWVkOiAzMDAsXG4gICAgc2xpZGVzVG9TaG93OiA4LFxuICAgIHNsaWRlc1RvU2Nyb2xsOiA4LFxuICAgIGNlbnRlck1vZGU6IHRydWUsXG4gICAgdmFyaWFibGVXaWR0aDogdHJ1ZVxuICAgIH0pO1xuICB9O1xuICBzbGlja0luaXQoKTtcblxuXG59KSgpO1xuIiwiOyhmdW5jdGlvbigpe1xuXG4gIC8vIGFkZCBhY3RpdmUgY2xhc3Mgb24gc2Nyb2xsO1xuICB2YXIgc2VjdGlvbiA9ICQoJy5hYm91dCcpLm9mZnNldCgpLnRvcDtcbiAgdmFyIG1lbnUgPSAkKCcuai1tYWluLW1lbnUnKTtcbiAgdmFyIGNsb3NlID0gJCgnLmotbWVudS1jbG9zZScpO1xuICB2YXIgdG9nZ2xlID0gJCgnLmotbWVudS10b2dnbGUnKTtcblxuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XG5cdFx0XHRpZiggJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gc2VjdGlvbiApIHtcblx0XHRcdFx0XHQkKCcubWFpbi1tZW51JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQoJy5tYWluLW1lbnVfX2l0ZW0uYnV5JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICQoJy5tYWluLW1lbnVfX2l0ZW0ubG9nbycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0JCgnLm1haW4tbWVudScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAkKCcubWFpbi1tZW51X19pdGVtLmJ1eScpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAkKCcubWFpbi1tZW51X19pdGVtLmxvZ28nKS5hZGRDbGFzcygnaGlkZGVuJyk7XG5cdFx0XHR9XG5cdH0pO1xuXG4gIC8vIE1haW4gbmF2IHNtb290aCBzY3JvbGw7XG4kKFwiLm1haW4tbWVudV9fbGlzdFwiKS5vbihcImNsaWNrXCIsXCJhXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICgkKGV2ZW50LnRhcmdldCkuaGFzQ2xhc3MoJ2otc2Nyb2xsLWxpbmsnKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBpZCAgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKSxcbiAgICAgICAgICB0b3AgPSAkKGlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHRvcH0sIDUwMCk7XG4gICAgfVxuICB9KTtcblxuICAvLyBUa2FjaGkgc21vb3RoIHNjcm9sbDtcbiQoXCIubWFpbi1oZWFkX19wbGFjZS1saW5rXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaWQgID0gJCh0aGlzKS5hdHRyKCdocmVmJyksXG4gICAgICAgIHRvcCA9ICQoaWQpLm9mZnNldCgpLnRvcDtcbiAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHRvcH0sIDUwMCk7XG4gIH0pO1xuXG4vLyBtYWluIG1lbnUgdG9nZ2xlXG50b2dnbGUub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIG1lbnUuY3NzKHtcbiAgICAgICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnLFxuICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGVZKDApJ1xuICAgIH0pO1xuICB9KTtcbi8vIG1haW4gbWVudSBjbG9zZVxuY2xvc2Uub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIG1lbnUuY3NzKHtcbiAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlWSgtMTAwJSknLFxuICAgICAgJ3Zpc2liaWxpdHknOiAndmlzaWJsZSdcbiAgICB9KTtcbiAgfSk7XG5cblxuXG59KCkpO1xuIiwiOyhmdW5jdGlvbigpe1xuXG4gIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ2xvYWQnLCBpbml0KTtcbiAgICB2YXIgbWFwLCBtYXJrZXJzQXJyYXkgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGJpbmRJbmZvV2luZG93KG1hcmtlciwgbWFwLCBsb2NhdGlvbikge1xuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gY2xvc2UobG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaW5mb1dpbmRvd1Zpc2libGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjbG9zZShsb2NhdGlvbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hcmtlcnNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGxvYywgaW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICBpZiAobG9jLmliICYmIGxvYy5pYiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2UobG9jKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIGJveFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBib3hUZXh0LnN0eWxlLmNzc1RleHQgPSAnYmFja2dyb3VuZDogI2ZmZjsnO1xuICAgICAgICAgICAgICAgIGJveFRleHQuY2xhc3NMaXN0LmFkZCgnbWQtd2hpdGVmcmFtZS0yZHAnKTtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCBlbCwgcGFydCwgaWNvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb25bcGFydF0gPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9jYXRpb24uaXdbcGFydF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChlbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGhvdG8nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24ucGhvdG8pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctcGhvdG9cIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnICsgbG9jYXRpb24ucGhvdG8gKyAnKTtcIj48L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpdy10b29sYmFyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctdG9vbGJhclwiPjxoMyBjbGFzcz1cIm1kLXN1YmhlYWRcIj4nICsgbG9jYXRpb24udGl0bGUgKyAnPC9oMz48L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkaXYnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2gocGFydCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbWFpbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctZGV0YWlsc1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOiM0Mjg1ZjQ7XCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHNwYW4+PGEgaHJlZj1cIm1haWx0bzonICsgbG9jYXRpb24uZW1haWwgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIGxvY2F0aW9uLmVtYWlsICsgJzwvYT48L3NwYW4+PC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3dlYic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctZGV0YWlsc1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOiM0Mjg1ZjQ7XCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHNwYW4+PGEgaHJlZj1cIicgKyBsb2NhdGlvbi53ZWIgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIGxvY2F0aW9uLndlYl9mb3JtYXR0ZWQgKyAnPC9hPjwvc3Bhbj48L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGVzYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8bGFiZWwgY2xhc3M9XCJpdy1kZXNjXCIgZm9yPVwiY2JfZGV0YWlsc1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNiX2RldGFpbHNcIi8+PGgzIGNsYXNzPVwiaXcteC1kZXRhaWxzXCI+RGV0YWlsczwvaDM+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyB0b2dnbGUtb3Blbi1kZXRhaWxzXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHAgY2xhc3M9XCJpdy14LWRldGFpbHNcIj4nICsgbG9jYXRpb24uZGVzYyArICc8L3A+PC9sYWJlbD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPicgKyBsb2NhdGlvbltwYXJ0XSArICc8L3NwYW4+PC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29wZW5faG91cnMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbXMgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uLm9wZW5faG91cnMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2F0aW9uLm9wZW5faG91cnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zICs9ICc8bGk+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1tpXS5kYXkgKyAnPC9zdHJvbmc+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1tpXS5ob3VycyArJzwvc3Ryb25nPjwvbGk+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gJzxsaT48bGFiZWwgZm9yPVwiY2JfaG91cnNcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjYl9ob3Vyc1wiLz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzWzBdLmRheSArICc8L3N0cm9uZz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzWzBdLmhvdXJzICsnPC9zdHJvbmc+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyB0b2dnbGUtb3Blbi1ob3Vyc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zL2tleWJvYXJkX2Fycm93X2Rvd24uc3ZnXCIvPjwvaT48dWw+JyArIGl0ZW1zICsgJzwvdWw+PC9sYWJlbD48L2xpPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1saXN0XCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBmaXJzdC1tYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48dWw+JyArIGZpcnN0ICsgJzwvdWw+PC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYm94VGV4dC5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ3Bob3RvJywgJ3Bob3RvJywgJycpICtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdpdy10b29sYmFyJywgJ3RpdGxlJywgJycpICtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnYWRkcmVzcycsICdsb2NhdGlvbl9vbicpICtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnd2ViJywgJ3B1YmxpYycpICtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnZW1haWwnLCAnZW1haWwnKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ3RlbCcsICdwaG9uZScpICtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnaW50X3RlbCcsICdwaG9uZScpICtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdvcGVuX2hvdXJzJywgJ29wZW5faG91cnMnLCAnYWNjZXNzX3RpbWUnKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2Rlc2MnLCAna2V5Ym9hcmRfYXJyb3dfZG93bicpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG15T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25Cb3R0b206IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGJveFRleHQsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVBdXRvUGFuOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogMCxcbiAgICAgICAgICAgICAgICAgICAgcGl4ZWxPZmZzZXQ6IG5ldyBnb29nbGUubWFwcy5TaXplKC0xNDAsIC00MCksXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYm94U3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzI4MHB4J1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjbG9zZUJveE1hcmdpbjogJzBweCAwcHggMHB4IDBweCcsXG4gICAgICAgICAgICAgICAgICAgIGluZm9Cb3hDbGVhcmFuY2U6IG5ldyBnb29nbGUubWFwcy5TaXplKDEsIDEpLFxuICAgICAgICAgICAgICAgICAgICBpc0hpZGRlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHBhbmU6ICdmbG9hdFBhbmUnLFxuICAgICAgICAgICAgICAgICAgICBlbmFibGVFdmVudFByb3BhZ2F0aW9uOiBmYWxzZVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYiA9IG5ldyBJbmZvQm94KG15T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIub3BlbihtYXAsIG1hcmtlcik7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaW5mb1dpbmRvd1Zpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB2YXIgbWFwT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIC8vIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg1OS45MTUzMDM3LDMwLjM0MTEzNTA5OTk5OTk3NCksXG4gICAgICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTkuOTE1MzAzNiwzMC4zNDM5OTk5OTk5OTk5NzQpLFxuICAgICAgICAgICAgem9vbTogMTcsXG4gICAgICAgICAgICBnZXN0dXJlSGFuZGxpbmc6ICdhdXRvJyxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5Db250cm9sOiBmYWxzZSxcbiAgICAgICAgICAgIHpvb21Db250cm9sOiB0cnVlLFxuICAgICAgICAgICAgZGlzYWJsZURvdWJsZUNsaWNrWm9vbTogdHJ1ZSxcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiB0cnVlLFxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgc3R5bGU6IGdvb2dsZS5tYXBzLk1hcFR5cGVDb250cm9sU3R5bGUuSE9SSVpPTlRBTF9CQVIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2NhbGVDb250cm9sOiB0cnVlLFxuICAgICAgICAgICAgc2Nyb2xsd2hlZWw6IGZhbHNlLFxuICAgICAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IHRydWUsXG4gICAgICAgICAgICBkcmFnZ2FibGUgOiB0cnVlLFxuICAgICAgICAgICAgY2xpY2thYmxlSWNvbnM6IGZhbHNlLFxuICAgICAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcbiAgICAgICAgICAgIHN0eWxlczogW3tcbiAgICAgICAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXG4gICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHMudGV4dC5maWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzQ0NDQ0NFwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2YyZjJmMlwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcbiAgICAgICAgICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHlsZXJzXCI6IFt7XG4gICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxuICAgICAgICAgICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcbiAgICAgICAgICAgICAgICBcInN0eWxlcnNcIjogW3tcbiAgICAgICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IC0xMDBcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDQ1XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXG4gICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxuICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjMWY2Y2I0XCJcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAge1xuICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxuICAgICAgICAgICB9XG4gICAgICAgXVxuICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cblxuICAgICAgICB2YXIgbWFwRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXBraXQtNzE4MScpO1xuICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtYXBFbGVtZW50LCBtYXBPcHRpb25zKTtcbiAgICAgICAgdmFyIGxvY2F0aW9ucyA9IFtcbiAgICAgICAgICAgIHtcInRpdGxlXCI6XCLQmtGA0LXQsNGC0LjQstC90L7QtSDQv9GA0L7RgdGC0YDQsNC90YHRgtCy0L4gXFxcItCi0LrQsNGH0LhcXFwiXCIsXG4gICAgICAgICAgICBcImFkZHJlc3NcIjpcItCd0LDQsdC10YDQtdC20L3QsNGPINCe0LHQstC+0LTQvdC+0LPQviDQutCw0L3QsNC70LAsIDYwLCDQodGC0LDQvdGG0LjRjyDQvNC10YLRgNC+IFxcXCLQntCx0LLQvtC00L3Ri9C5INC60LDQvdCw0LtcXFwiXCIsXG4gICAgICAgICAgICBcImRlc2NcIjpcIlwiLFxuICAgICAgICAgICAgXCJ0ZWxcIjpcIjggKDgxMikgOTIyLTY2LTQyXCIsXG4gICAgICAgICAgICBcImludF90ZWxcIjpcIis3IDgxMiA5MjItNjYtNDJcIixcbiAgICAgICAgICAgIFwiZW1haWxcIjpcIlwiLFxuICAgICAgICAgICAgXCJ3ZWJcIjpcIlwiLFxuICAgICAgICAgICAgXCJ3ZWJfZm9ybWF0dGVkXCI6XCJcIixcbiAgICAgICAgICAgIFwib3BlblwiOlwiXCIsXCJ0aW1lXCI6XCIxMDEwXCIsXG4gICAgICAgICAgICBcImxhdFwiOjU5LjkxNTMwMzcsXG4gICAgICAgICAgICBcImxuZ1wiOjMwLjM0MTEzNTA5OTk5OTk3NCxcbiAgICAgICAgICAgIFwidmljaW5pdHlcIjpcIk9idm9kbml5IGNoYW5uZWwgZW1iYW5rbWVudCwgNjAsIFNhaW50IFBldGVyc2J1cmdcIixcbiAgICAgICAgICAgIFwib3Blbl9ob3Vyc1wiOlwiXCIsXG4gICAgICAgICAgICBcIm1hcmtlclwiOntcInVybFwiOlwiLi4vYXNzZXRzL2ltZy9pY29ucy9wbGFjZWhvbGRlci5wbmdcIixcInNjYWxlZFNpemVcIjp7XCJ3aWR0aFwiOjU4LFwiaGVpZ2h0XCI6ODIsXCJmXCI6XCJweFwiLFwiYlwiOlwicHhcIn0sXCJvcmlnaW5cIjp7XCJ4XCI6MCxcInlcIjowfSxcImFuY2hvclwiOntcInhcIjoxMixcInlcIjo0Mn19LFwiaXdcIjp7XCJhZGRyZXNzXCI6dHJ1ZSxcImRlc2NcIjp0cnVlLFwiZW1haWxcIjp0cnVlLFwiZW5hYmxlXCI6dHJ1ZSxcImludF90ZWxcIjp0cnVlLFwib3BlblwiOnRydWUsXCJvcGVuX2hvdXJzXCI6dHJ1ZSxcInBob3RvXCI6dHJ1ZSxcInRlbFwiOnRydWUsXCJ0aXRsZVwiOnRydWUsXCJ3ZWJcIjp0cnVlfX1cbiAgICAgICAgXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICAgICAgaWNvbjogbG9jYXRpb25zW2ldLm1hcmtlcixcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsb2NhdGlvbnNbaV0ubGF0LCBsb2NhdGlvbnNbaV0ubG5nKSxcbiAgICAgICAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICAgICAgICB0aXRsZTogbG9jYXRpb25zW2ldLnRpdGxlLFxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IGxvY2F0aW9uc1tpXS5hZGRyZXNzLFxuICAgICAgICAgICAgICAgIGRlc2M6IGxvY2F0aW9uc1tpXS5kZXNjLFxuICAgICAgICAgICAgICAgIHRlbDogbG9jYXRpb25zW2ldLnRlbCxcbiAgICAgICAgICAgICAgICBpbnRfdGVsOiBsb2NhdGlvbnNbaV0uaW50X3RlbCxcbiAgICAgICAgICAgICAgICB2aWNpbml0eTogbG9jYXRpb25zW2ldLnZpY2luaXR5LFxuICAgICAgICAgICAgICAgIG9wZW46IGxvY2F0aW9uc1tpXS5vcGVuLFxuICAgICAgICAgICAgICAgIG9wZW5faG91cnM6IGxvY2F0aW9uc1tpXS5vcGVuX2hvdXJzLFxuICAgICAgICAgICAgICAgIHBob3RvOiBsb2NhdGlvbnNbaV0ucGhvdG8sXG4gICAgICAgICAgICAgICAgdGltZTogbG9jYXRpb25zW2ldLnRpbWUsXG4gICAgICAgICAgICAgICAgZW1haWw6IGxvY2F0aW9uc1tpXS5lbWFpbCxcbiAgICAgICAgICAgICAgICB3ZWI6IGxvY2F0aW9uc1tpXS53ZWIsXG4gICAgICAgICAgICAgICAgaXc6IGxvY2F0aW9uc1tpXS5pd1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtYXJrZXJzQXJyYXkucHVzaChtYXJrZXIpO1xuXG4gICAgICAgICAgICBpZiAobG9jYXRpb25zW2ldLml3LmVuYWJsZSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgYmluZEluZm9XaW5kb3cobWFya2VyLCBtYXAsIGxvY2F0aW9uc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn0oKSk7XG4iLCJcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIHZhciBzY3JvbGxlZCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgLy9cbiAgLy8gJCgnLnBhcmFsbGF4JykuY3NzKCd0b3AnLCAtKHNjcm9sbGVkKSArICdweCcpO1xuICAvL1xuICAvLyBmdW5jdGlvbiBwYXJhbGxheCgpe1xuICAvLyAgIHZhciBzY3JvbGxlZCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgLy8gICAkKCcucGFyYWxsYXgnKS5jc3MoJ3RvcCcsIC0oc2Nyb2xsZWQgKiAwLjMpICsgJ3B4Jyk7XG4gIC8vIH1cbiAgLy9cbiAgLy8gJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbihlKXtcbiAgLy8gICBwYXJhbGxheCgpO1xuICAvLyB9KTtcblxuICB2YXIgcmVsbGF4ID0gbmV3IFJlbGxheCgnLnJlbGxheCcpO1xuXG5cblxufSkoKTtcbiIsIlxuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHRyaWdnZXIgPSAkKCcuai1wb3B1cC10aXRsZScpLFxuICAgICAgcG9wdXAgPSAkKCcuai1wb3B1cC13aW5kb3cnKSxcbiAgICAgIGNsb3NlID0gJCgnLmotcG9wdXAtY2xvc2UnKSxcbiAgICAgIGxheW91dCA9ICQoJy5qLW1hcC1iZycpXG5cbiAgdHJpZ2dlci5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAvLyAkKGUudGFyZ2V0KS5zaWJsaW5ncyhwb3B1cCkuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcbiAgICAkKGUudGFyZ2V0KS5zaWJsaW5ncyhwb3B1cCkuc2xpZGVEb3duKCcxMDAnKTtcbiAgfSk7XG5cbiAgY2xvc2Uub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgJChlLnRhcmdldCkuY2xvc2VzdChwb3B1cCkuc2xpZGVVcCgnMTAwJyk7XG4gIH0pO1xuXG4gIGxheW91dC5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAkKHBvcHVwKS5zbGlkZVVwKCcxMDAnKTtcbiAgfSk7XG5cblxuXG5cbn0pKCk7XG4iLCJcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0ZXh0ID0gJCgnLmotc2VjdGlvbi10ZXh0JyksXG4gICAgICB0b2dnbGUgPSAkKCcuai1zZWN0aW9uLXRvZ2dsZScpLFxuICAgICAgaXRlbSA9ICQoJy5qLXNlY3Rpb24taXRlbScpXG5cbiAgdGV4dC5oaWRlKCk7XG5cbiAgdG9nZ2xlLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgc2liID0gJCh0aGlzKS5zaWJsaW5ncygpO1xuICAgICQoc2liWzFdKS5zbGlkZVRvZ2dsZSgpO1xuICAgICQoc2liWzBdKS50b2dnbGVDbGFzcygndG9nZ2xlJyk7XG4gICAgJCh0aGlzKS50b2dnbGVDbGFzcygndG9nZ2xlJyk7XG4gIH0pO1xuXG5cbn0pKCk7XG4iLCJcbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vINCi0LDQsdGLINC00LvRjyDRgdC/0LjQutC10YDQvtCyXG4gIHZhciB0YWJMaW5rMSA9ICQoJy5qLXNwLWxpbmstMScpLFxuICAgICAgdGFiTGluazIgPSAkKCcuai1zcC1saW5rLTInKSxcbiAgICAgIHRhYjEgPSAkKCcuai1zcC10YWItMScpLFxuICAgICAgdGFiMiA9ICQoJy5qLXNwLXRhYi0yJyk7XG5cbiAgdGFiMi5oaWRlKCk7XG5cbiAgdGFiTGluazIub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRhYkxpbmsyLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB0YWJMaW5rMS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgdGFiMi5zaG93KCk7XG4gICAgdGFiMS5oaWRlKCk7XG4gIH0pO1xuXG4gIHRhYkxpbmsxLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0YWJMaW5rMS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdGFiTGluazIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRhYjEuc2hvdygpO1xuICAgIHRhYjIuaGlkZSgpO1xuICB9KTtcblxuXG4gIC8vINCi0LDQsdGLINC00LvRjyDRgNCw0YHQv9C40YHQsNC90LjRj1xuICB2YXIgdGFiTGluazExID0gJCgnLmotc2MtbGluay0xJyksXG4gICAgICB0YWJMaW5rMjIgPSAkKCcuai1zYy1saW5rLTInKSxcbiAgICAgIHRhYjExID0gJCgnLmotc2MtdGFiLTEnKSxcbiAgICAgIHRhYjIyID0gJCgnLmotc2MtdGFiLTInKTtcblxuICB0YWIyMi5oaWRlKCk7XG5cbiAgdGFiTGluazIyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0YWJMaW5rMjIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRhYkxpbmsxMS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgdGFiMjIuc2hvdygpO1xuICAgIHRhYjExLmhpZGUoKTtcbiAgfSk7XG5cbiAgdGFiTGluazExLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0YWJMaW5rMTEuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRhYkxpbmsyMi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgdGFiMTEuc2hvdygpO1xuICAgIHRhYjIyLmhpZGUoKTtcbiAgfSk7XG5cblxuXG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24oJCkge1xuICAgICQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBucHMgPSAnRW1iZWRWa0dhbGxlcnknO1xuICAgICAgICAkW25wc10gPSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENhbiBiZSBbcyxtLHgsbyxwLHEseSx6LHddXG4gICAgICAgICAgICAgKiBMb29rIGludG8gaHR0cHM6Ly92ay5jb20vZGV2L3Bob3RvX3NpemVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bGxfaW1hZ2Vfc2l6ZTogJ3gnLFxuICAgICAgICAgICAgd2lkdGg6IDEwMCxcbiAgICAgICAgICAgIG1hcmdpbjogNCxcbiAgICAgICAgICAgIHJldjogMSxcbiAgICAgICAgICAgIGxpbWl0OiAwLFxuICAgICAgICAgICAgbGluazogJycsXG4gICAgICAgICAgICBsaW5rX21hcHBlcjogZnVuY3Rpb24oZWwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIGVsLmhyZWYsXG4gICAgICAgICAgICAgICAgICAgICc8YSBocmVmPVwiJytlbC5ocmVmKydcIj4nK2VsLnRpdGxlKyc8L2E+J1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICAgICAgICB9XG5cbiAgICAgICAgJC5mbltucHNdID0gZnVuY3Rpb24ob3B0cykge1xuICAgICAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgICAgICBvcHRzID0gKHR5cGVvZihvcHRzKSAhPT0gJ29iamVjdCcgKSA/IHtsaW5rOm9wdHN9IDogb3B0cztcbiAgICAgICAgICAgIHZhciBsb2NhbE9wdHMgPSAkLmV4dGVuZCh7fSwgJFtucHNdLCBvcHRzKSxcbiAgICAgICAgICAgICAgICBqc29uO1xuICAgICAgICAgICAgZnVuY3Rpb24gc2hvd0FsYnVtKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgICRhcnJheV9mb3JfcHJvbWlzZXMgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgJGxvYWRlcl9ibG9jayxcbiAgICAgICAgICAgICAgICAgICAgJGxvYWRlcl9ibGluZGluZ19ibG9jayxcbiAgICAgICAgICAgICAgICAgICAgZ2FsbGVyeVNldE5hbWUgPSAnZ2FsbGVyeVNldE5hbWUnICsgK25ldyBEYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIG1ldGFfb3B0cyA9ICQuZXh0ZW5kKHt9LCBsb2NhbE9wdHMsICR0aGlzLmRhdGEoKSksXG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IC8oLT9cXGQrKV8oXFxkKykvZy5leGVjKG1ldGFfb3B0cy5saW5rKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXMgfHwgcmVzLmxlbmd0aCA8IDMpIHtyZXR1cm47fVxuXG4gICAgICAgICAgICAgICAgJGxvYWRlcl9ibGluZGluZ19ibG9jayA9ICQoJzxzcGFuLz4nLCB7dGV4dDogJy4uLid9KTtcbiAgICAgICAgICAgICAgICAkbG9hZGVyX2Jsb2NrID0gJCgnPGRpdi8+Jywge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAn0JfQsNCz0YDRg9C30LrQsCDRhNC+0YLQvtCz0YDQsNGE0LjQuSwg0L/QvtC20LDQu9GD0LnRgdGC0LAg0L/QvtC00L7QttC00LjRgtC1ICcsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiAndGV4dC1hbGlnbjogY2VudGVyOyBwYWRkaW5nOiAyMHB4IDIwcHg7JyxcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogJ2pxdWVyeS1lbWJlZHZrZ2FsbGVyeS1sb2FkZXItYmxvY2snXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJGxvYWRlcl9ibG9jay5hcHBlbmQoJGxvYWRlcl9ibGluZGluZ19ibG9jayk7XG4gICAgICAgICAgICAgICAgJHRoaXMuYXBwZW5kKCRsb2FkZXJfYmxvY2spO1xuICAgICAgICAgICAgICAgIHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAkbG9hZGVyX2JsaW5kaW5nX2Jsb2NrLmZhZGVPdXQoNTAwKS5mYWRlSW4oNTAwKTtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBwaG90b19zaXplcz0xIHJldHVybnMgc3BlY2lhbCBmb3JtYXRzXG4gICAgICAgICAgICAgICAgICogaHR0cHM6Ly92ay5jb20vZGV2L3Bob3RvX3NpemVzXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gJ2h0dHBzOi8vYXBpLnZrLmNvbS9tZXRob2QvcGhvdG9zLmdldD8mcGhvdG9fc2l6ZXM9MSZleHRlbmRlZD0xJmFsYnVtX2lkPScgKyByZXNbMl1cbiAgICAgICAgICAgICAgICAgICAgKyAnJm93bmVyX2lkPScgKyByZXNbMV1cbiAgICAgICAgICAgICAgICAgICAgKyAnJnJldj0nICsgbWV0YV9vcHRzLnJldlxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogVmVyc2lvbiBvZiBWSyBBUElcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICsgJyZ2PTUuNjImY2FsbGJhY2s9Pyc7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGFfb3B0cy53aWR0aCA8IDApIHtyZXR1cm47fVxuICAgICAgICAgICAgICAgIG1ldGFfb3B0cy5oZWlnaHQgPSBtZXRhX29wdHMud2lkdGggLSAobWV0YV9vcHRzLndpZHRoIC8gMiBeIDApO1xuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVzaXplKCRpbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRkaXYgPSAkaW1nLmNsb3Nlc3QoJ2RpdicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZF9oID0gJGRpdi5oZWlnaHQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRfdyA9ICRkaXYud2lkdGgoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlfaCA9ICRpbWcuaGVpZ2h0KCksXG4gICAgICAgICAgICAgICAgICAgICAgICBpX3cgPSAkaW1nLndpZHRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXggPSBkX2ggPiBkX3cgPyBkX2ggOiBkX3c7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpX2ggPiBpX3cpIHsgJGltZy53aWR0aChtYXgpOyB9IGVsc2UgeyAkaW1nLmhlaWdodChtYXgpOyB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkaW1nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldENvdW50Um93cyhjb3VudCwgd2lkdGgsIHBhcmVudFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtaW4gPSBwYXJlbnRXaWR0aCAvIHdpZHRoIF4gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPD0gbWluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2NvdW50XTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIChjb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNvdW50IC0gbWluKSA+IG1pbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBtaW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gY291bnQgLyAyIF4gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gY291bnQgLSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50IC09IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDw9IChyZXN1bHQubGVuZ3RoLTIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbaV0gPiAzICYmIHJlc3VsdFtpKzFdID4gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heCA9IChyZXN1bHRbaV0gLyAzIF4gMCkgPCAocmVzdWx0W2krMV0gLyAzIF4gMCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXSAvIDMgXiAwIDogcmVzdWx0W2kgKyAxXSAvIDMgXiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsdXNPck1pbnVzID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IC0xIDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhID0gZ2V0UmFuZG9tSW50KDEsIG1heCkgKiBwbHVzT3JNaW51cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXSArPSBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2kgKyAxXSAtPSBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZXhwYW5kaW5nKCRyb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyICRkaXZzID0gJCgnZGl2JywgJHJvdyksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbFdpZHRoID0gJGRpdnMubGVuZ3RoICogbWV0YV9vcHRzLm1hcmdpbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0hlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgJGRpdnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsV2lkdGggKz0gJCh0aGlzKS5kYXRhKCduZXdXaWR0aCcpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxXaWR0aCA9IHRvdGFsV2lkdGggXiAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYSA9ICh0b3RhbFdpZHRoID4gJHRoaXMud2lkdGgoKSkgPyAtMSA6IDE7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICggdG90YWxXaWR0aCAhPT0gJHRoaXMud2lkdGgoKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYgPSAoJHRoaXMud2lkdGgoKSAtIHRvdGFsV2lkdGggXiAwICkgLyAkZGl2cy5sZW5ndGggXiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlmZiA9IE1hdGguYWJzKGRpZmYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpZmYgPiAyKSB7IGEgKj0gZGlmZjsgfVxuICAgICAgICAgICAgICAgICAgICAgICAgJGRpdnMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdXaWR0aCA9ICQodGhpcykuZGF0YSgnbmV3V2lkdGgnKSArIGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5kYXRhKHsgbmV3V2lkdGg6IG5ld1dpZHRoIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsV2lkdGggKz0gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHRvdGFsV2lkdGggIT09ICR0aGlzLndpZHRoKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdIZWlnaHQgID0gJGRpdnMuZXEoMCkuZGF0YSgnbmV3SGVpZ2h0JykgKyBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGRpdnMuZGF0YSgnbmV3SGVpZ2h0JywgbmV3SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGEgPSAodG90YWxXaWR0aCA+ICR0aGlzLndpZHRoKCkpID8gLTEgOiAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRkaXZzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICQodGhpcykuZGF0YSgnbmV3V2lkdGgnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICQodGhpcykuZGF0YSgnbmV3SGVpZ2h0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogbWV0YV9vcHRzLm1hcmdpbiArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBtZXRhX29wdHMubWFyZ2luICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGRlZiA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRhcnJheV9mb3JfcHJvbWlzZXMucHVzaCgkZGVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkYSA9ICQoJzxhLz4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICQodGhpcykuZGF0YSgnbWF4U3JjJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbDogZ2FsbGVyeVNldE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjbGFzcyc6ICdlbWJlZHZrZ2FsbGVyeV9saW5rJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtbGlnaHRib3gnOiBnYWxsZXJ5U2V0TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICQodGhpcykuZGF0YSgndGV4dCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGltZyA9ICQoJzxpbWcvPicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiAkKHRoaXMpLmRhdGEoJ3NyYycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY2xhc3MnOiAnZW1iZWR2a2dhbGxlcnlfaW1nJ1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7IG1hcmdpbjogMCwgZGlzcGxheTogJ25vbmUnIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5sb2FkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplKCAkKHRoaXMpICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZGVmLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGRlZi5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgJGEuYXBwZW5kKCRpbWcpLmFwcGVuZFRvKCAkKHRoaXMpICk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHJvdztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZW5kZXJBbGJ1bUxpc3QoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSAmJiBkYXRhLnJlc3BvbnNlLmNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBTbGljZSBhcnJheSBieSBvcHRpb24gTElNSVRcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGFfb3B0cy5saW1pdCAmJiArbWV0YV9vcHRzLmxpbWl0ICYmIG1ldGFfb3B0cy5saW1pdCA8IGRhdGEucmVzcG9uc2UuY291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnJlc3BvbnNlLml0ZW1zLmxlbmd0aCA9IG1ldGFfb3B0cy5saW1pdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnJlc3BvbnNlLmNvdW50ID0gZGF0YS5yZXNwb25zZS5pdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBqc29uID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBnZXRDb3VudFJvd3MoZGF0YS5yZXNwb25zZS5jb3VudCwgbWV0YV9vcHRzLndpZHRoLCAgJHRoaXMud2lkdGgoKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXMgPSAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHJvdyA9ICQoJzxkaXYvPicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyW2ldOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNfaGVpZ2h0ID0gZGF0YS5yZXNwb25zZS5pdGVtc1tpdGVtXS5zaXplc1tzaXplc10uaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY193aWR0aCA9IGRhdGEucmVzcG9uc2UuaXRlbXNbaXRlbV0uc2l6ZXNbc2l6ZXNdLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3V2lkdGggPSBjX3dpZHRoICogbWV0YV9vcHRzLmhlaWdodCAvIGNfaGVpZ2h0IF4gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFNyYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyZXBSZXN1bHRzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBGaW5kaW5nIHRoZSBtYXhTcmMgdXJsIHdoaWNoIHdlIG5lZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyZXBSZXN1bHRzID0gJC5ncmVwKGRhdGEucmVzcG9uc2UuaXRlbXNbaXRlbV0uc2l6ZXMsIGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzaXplLnR5cGUgPT0gbG9jYWxPcHRzLmZ1bGxfaW1hZ2Vfc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggISBncmVwUmVzdWx0cyB8fCAhIGdyZXBSZXN1bHRzLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyZXBSZXN1bHRzID0gJC5ncmVwKGRhdGEucmVzcG9uc2UuaXRlbXNbaXRlbV0uc2l6ZXMsIGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2l6ZS50eXBlID09ICdtJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhIGdyZXBSZXN1bHRzIHx8ICEgZ3JlcFJlc3VsdHMubGVuZ3RoICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyZXBSZXN1bHRzID0gJC5ncmVwKGRhdGEucmVzcG9uc2UuaXRlbXNbaXRlbV0uc2l6ZXMsIGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpemUudHlwZSA9PSAncyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAhIGdyZXBSZXN1bHRzIHx8ICEgZ3JlcFJlc3VsdHMubGVuZ3RoICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4U3JjID0gZ3JlcFJlc3VsdHNbMF0uc3JjO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnPGRpdi8+JykuZGF0YSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdIZWlnaHQ6IG1ldGFfb3B0cy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdXaWR0aDogbmV3V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM6IGRhdGEucmVzcG9uc2UuaXRlbXNbaXRlbV0uc2l6ZXNbc2l6ZXNdLnNyYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGRhdGEucmVzcG9uc2UuaXRlbXNbaXRlbV0udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFNyYzogbWF4U3JjXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFwcGVuZFRvKCRyb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGFuZGluZygkcm93KS5hcHBlbmRUbygkdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQuZm4uc2xpbWJveCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJ2EnLCAkdGhpcykuc2xpbWJveCh7fSwgbWV0YV9vcHRzLmxpbmtfbWFwcGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCQuZm4uc3dpcGVib3gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnYS5lbWJlZHZrZ2FsbGVyeV9saW5rJywgJHRoaXMpLnN3aXBlYm94KHt9LCBtZXRhX29wdHMubGlua19tYXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICQud2hlbi5hcHBseShudWxsLCAkYXJyYXlfZm9yX3Byb21pc2VzKS5kb25lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRsb2FkZXJfYmxvY2suaGlkZSgnc2xvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR0aGlzLmZpbmQoJy5lbWJlZHZrZ2FsbGVyeV9pbWcnKS5mYWRlSW4oJ3Nsb3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHRoaXMudGV4dCgnQWxidW0gbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFqc29uKSB7XG4gICAgICAgICAgICAgICAgICAgICQuZ2V0SlNPTihxdWVyeSwgcmVuZGVyQWxidW1MaXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJGxvYWRlcl9ibG9jay5odG1sKCfQntGI0LjQsdC60LAg0LfQsNCz0YDRg9C30LrQuCDRhNC+0YLQvtCz0YDQsNGE0LjQuSA6KCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyQWxidW1MaXN0KGpzb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goc2hvd0FsYnVtKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn0pKGpRdWVyeSk7XG5cblxuJChcIiN2a1wiKS5FbWJlZFZrR2FsbGVyeSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
