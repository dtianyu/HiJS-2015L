/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
    InitPropertyCarousel();
    InitOffCanvasNavigation();
    InitChosen();
    InitEzmark();
    InitPriceSlider();
    InitImageSlider();
    InitAccordion();
    InitTabs();
    InitPalette();

    $('.carousel-next').on('click',function(){
        $(this).parent().find('.caroufredsel_wrapper').carousel('next');
    });

});

function InitPalette() {
    if ($.cookie('palette') == 'true') {
        $('.palette').addClass('open');
    }

    $('.palette .toggle a').on({
        click: function(e) {
            e.preventDefault();
            var palette = $(this).closest('.palette');

            if (palette.hasClass('open')) {
                palette.animate({'left': '-195'}, 500, function() {
                    palette.removeClass('open');
                });
                $.cookie('palette', false)
            } else {
                palette.animate({'left': '0'}, 500, function() {
                    palette.addClass('open');
                    $.cookie('palette', true);
                });
            }
        }
    });

    if ($.cookie('color-variant')) {
        var link = $('.palette').find('a.'+ $.cookie('color-variant'));
        var file = link.attr('href');
        var klass = link.attr('class');

        $('#color-variant').attr('href', file);
        $('body').addClass(klass);
    }

    if ($.cookie('pattern')) {
        $('body').addClass($.cookie('pattern'));
    }

    if ($.cookie('header')) {
        $('body').addClass($.cookie('header'));
    }

    $('.palette a').on({
        click: function(e) {
            e.preventDefault();

            // Colors
            if ($(this).closest('div').hasClass('colors')) {
                var file = $(this).attr('href');
                var klass = $(this).attr('class');
                $('#color-variant').attr('href', file);

                if (!$('body').hasClass(klass)) {
                    $('body').removeClass($.cookie('color-variant'));
                    $('body').addClass(klass);
                }
                $.cookie('color-variant', klass)
            }
            // Patterns
            else if ($(this).closest('div').hasClass('patterns')) {
                var klass = $(this).attr('class');

                if (!$('body').hasClass(klass)) {
                    $('body').removeClass($.cookie('pattern'));
                    $('body').addClass(klass);
                    $.cookie('pattern', klass);
                }
            }
            // Headers
            else if ($(this).closest('div').hasClass('headers')) {
                var klass = $(this).attr('class');

                if (!$('body').hasClass(klass)) {
                    $('body').removeClass($.cookie('header'));
                    $('body').addClass(klass);
                    $.cookie('header', klass);
                }
            }
        }
    });
    $('.palette .reset').on({
        click: function() {
            $('body').removeClass($.cookie('color-variant'));
            $('#color-variant').attr('href', null);
            $.removeCookie('color-variant');

            $('body').removeClass($.cookie('pattern'));
            $.removeCookie('pattern');

            $('body').removeClass($.cookie('header'));
            $.removeCookie('header');
        }
    })
}

function InitPropertyCarousel() {
    $('.carousel.property .content li img').on({
        click: function(e) {
            var src = $(this).attr('src');
            var img = $(this).closest('.carousel.property').find('.preview img');
            img.attr('src', src);
            $('.carousel.property .content li').each(function() {
                $(this).removeClass('active');
            });
            $(this).closest('li').addClass('active');
        }
    })
}

function InitTabs() {
    $('.tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
}

function InitImageSlider() {
    $('.iosSlider').iosSlider({
        desktopClickDrag: true,
        snapToChildren: true,
        infiniteSlider: true,
        navSlideSelector: '.slider .navigation li',
        onSlideComplete: function(args) {
            if(!args.slideChanged) return false;

            $(args.sliderObject).find('.slider-info').attr('style', '');

            $(args.currentSlideObject).find('.slider-info').animate({
                left: '15px',
                opacity: '.9'
            }, 'easeOutQuint');
        },
        onSliderLoaded: function(args) {
            $(args.sliderObject).find('.slider-info').attr('style', '');

            $(args.currentSlideObject).find('.slider-info').animate({
                left: '15px',
                opacity: '.9'
            }, 'easeOutQuint');
        },
        onSlideChange: function(args) {
            $('.slider .navigation li').removeClass('active');
            $('.slider .navigation li:eq(' + (args.currentSlideNumber - 1) + ')').addClass('active');
        },
        autoSlide: true,
        scrollbar: true,
        scrollbarContainer: '.sliderContainer .scrollbarContainer',
        scrollbarMargin: '0',
        scrollbarBorderRadius: '0',
        keyboardControls: true
    });
}

function InitAccordion() {
    $('.accordion').on('show', function (e) {
        $(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
    });

    $('.accordion').on('hide', function (e) {
        $(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
    });
}

function InitPriceSlider() {
    jQuery('.price-value .from').text(100);
    jQuery('.price-value .from').currency({ region: 'EUR', thousands: ' ', decimal: ',', decimals: 0 });

    jQuery('.price-value .to').text(1000000);
    jQuery('.price-value .to').currency({ region: 'EUR', thousands: ' ', decimal: ',', decimals: 0 });

    $('.property-filter .price-slider').slider({
        range: true,
        min: 100,
        max: 1000000,
        values: [100, 1000000],
        slide: function(event, ui) {
            jQuery('.property-filter .price-from input').attr('value', ui.values[0]);
            jQuery('.property-filter .price-to input').attr('value', ui.values[1]);

            jQuery('.price-value .from').text(ui.values[0]);
            jQuery('.price-value .from').currency({ region: 'EUR', thousands: ' ', decimal: ',', decimals: 0 });

            jQuery('.price-value .to').text(ui.values[1]);
            jQuery('.price-value .to').currency({ region: 'EUR', thousands: ' ', decimal: ',', decimals: 0 });
        }
    });
}

function InitEzmark() {
    $('input[type="checkbox"]').ezMark();
    $('input[type="radio"]').ezMark();
}

function InitChosen() {
    $('select').chosen({
        disable_search_threshold: 10
    });
}

function InitOffCanvasNavigation() {
    $('#btn-nav').on({
        click: function() {
            $('body').toggleClass('nav-open');
        }
    })
}

function InitCarousel() {
    $('#main .carousel .content ul').carouFredSel({
        scroll: {
            items: 1
        },
        auto: false,
        next: {
            button: '#main .carousel-next',
            key: 'right'
        },
        prev: {
            button: '#main .carousel-prev',
            key: 'left'
        }
    });

    $('.carousel-wrapper .content ul').carouFredSel({
        scroll: {
            items: 1
        },
        auto: false,
        next: {
            button: '.carousel-wrapper .carousel-next',
            key: 'right'
        },
        prev: {
            button: '.carousel-wrapper .carousel-prev',
            key: 'left'
        }
    });

}


function initMap() {
// <div id="mapContainer" class="container" style="height: 300px;"></div>
    var map = new AMap.Map('mapContainer', {
//resizeEnable: true,
//rotateEnable: true,
//dragEnable: true,
//zoomEnable: true,
//设置可缩放的级别
//zooms: [3,18],
//传入2D视图，设置中心点和缩放级别
        view: new AMap.View2D({
            center: new AMap.LngLat(121.397428, 30.90923),
            zoom: 12
        })
    });
    map.plugin(["AMap.ToolBar"], function () {
        //加载工具条
        var tool = new AMap.ToolBar();
        map.addControl(tool);
    });
    map.plugin(["AMap.MapType"], function () {
        //地图类型切换
        var type = new AMap.MapType({
            defaultType: 0 //使用2D地图
        });
        map.addControl(type);
    });
}
