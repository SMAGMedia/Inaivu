(function ($) {
    'use strict';

     // Soft scroll
    var softScroll = function (target, event) {
        event.preventDefault();
        var targetNavElem = $(target).attr('href');
        if (targetNavElem[0] !== '#') {
            window.open(targetNavElem);
            return false;
        }

        var targetScrollPos = $(targetNavElem).offset().top - $('header .mp-nav').height() + 40;

        if (window.pageYOffset > targetScrollPos) {
            $('html, body').animate({
                scrollTop: targetScrollPos - 60
            }, 1000);
        } else {
            $('html, body').animate({
                scrollTop: targetScrollPos + 60
            }, 1000);
        }

        $('html, body').animate({
            scrollTop: targetScrollPos
        }, 600);
    };

    $(window).load(function () {

        // index02
        $('#slider3').revolution({
            sliderType: 'standard',
            sliderLayout: 'auto',
            autoHeight: 'on',
            delay: 9000,
            navigation: {
                keyboardNavigation: 'on',
                keyboard_direction: 'horizontal',
                mouseScrollNavigation: 'off',
                onHoverStop: 'on',
                touch: {
                    touchenabled: 'on',
                    swipe_treshold: 75,
                    swipe_min_touches: 1,
                    drag_block_vertical: false,
                    swipe_direction: 'horizontal'
                },
                arrows: {
                    style: 'hades',
                    enable: true,
                    hide_onmobile: true,
                    hide_onleave: true,
                    tmp: '',
                    left: {
                        h_align: 'left',
                        v_align: 'center',
                        h_offset: 10,
                        v_offset: 0
                    },
                    right: {
                        h_align: 'right',
                        v_align: 'center',
                        h_offset: 10,
                        v_offset: 0
                    }
                },
                bullets: {
                    style: '',
                    enable: true,
                    hide_onmobile: true,
                    hide_onleave: true,
                    hide_delay: 200,
                    hide_delay_mobile: 1200,
                    hide_under: 0,
                    hide_over: 9999,
                    direction: 'horizontal',
                    h_align: 'center',
                    v_align: 'bottom',
                    space: 7,
                    h_offset: 4,
                    v_offset: 40,
                    tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>'
                }
            },

            lazyType: 'smart',
            disableProgressBar: 'on',
            responsiveLevels: [4096, 1024, 778, 480],
            gridwidth: [1140, 800, 780, 480],
            gridheight: [600, 600, 980, 700]
        });
        
        /* Sticky Header */
        $('.sticky-header').sticky({topSpacing: 0});

        /* Preloader */
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });

    });

    $(document).ready(function () {

        /* Soft Scroll */
        (function () {
            $('.nav a, .menu-item a').click(function (e) {
                softScroll(this, e);

                window.setTimeout(function () {
                    classie.remove(document.body, 'show-menu');
                }, 500);
                return false;
            });
        })();

         /* Progress Tracker */
        (function () {
            $('body').progressTracker({

                // Allows for navigating between content sections
                linking: true,

                // "constant" = always visiable
                // "hover" = shows on mouse hover
                tooltip: 'hover',

                // The number specified is added to the default value at which the tracker changes to the next section.
                positiveTolerance: 0,

                // The number specified is subtracted from the default value at which the tracker changes to the next section.
                negativeTolerance: 60,

                // Only displays the progress tracker when the user is between the top of the first section and the bottom of the last;
                // It is only shown when the tracker sections are in view.
                // Specify false if you want the tracker to always show.
                displayWhenActive: false,

                // Specify the value (in pixels) that you wish the progress tracker to be hidden when it is below that.
                disableBelow: 0,

                // Specifies what the plugin takes into account when deciding when to switch to the next section.
                // "tracker" or "viewport"
                tracking: 'viewport'

            });

            // Register custom scrollTop
            $('.progress-tracker ul li a.pt-circle').off('click').on('click', function (e) {
                softScroll(this, e);
            });

        })();

        /* Off-Canvas Menu */
        (function () {

            var bodyEl = document.body,
                content = document.querySelector('.content-wrap'),
                openbtn = document.getElementById('open-button'),
                closebtn = document.getElementById('close-button');

            function init() {
                initEvents();
            }

            function initEvents() {
                openbtn.addEventListener('click', toggleMenu);
                if (closebtn) {
                    closebtn.addEventListener('click', toggleMenu);
                }

                // close the menu element if the target it´s not the menu element or one of its descendants..
                content.addEventListener('click', function (ev) {
                    var target = ev.target;
                    if (classie.hasClass(bodyEl, 'show-menu') && target !== openbtn) {
                        toggleMenu();
                    }
                });
            }

            function toggleMenu() {
                $( bodyEl ).toggleClass( 'show-menu' );
            }

            init();
        })();

        /* Back to top */
        (function () {
            $('#back-top').hide();

            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('#back-top').fadeIn();
                } else {
                    $('#back-top').fadeOut();
                }
            });

            $('#back-top a').click(function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 600);
                return false;
            });
        })();
        
        /* Circle Progress */
        (function () {
            function animateElements() {
                $('.progressbar').each(function () {
                    var elementPos = $(this).offset().top;
                    var topOfWindow = $(window).scrollTop();
                    var percent = $(this).find('.circle').attr('data-percent');
                    var percentage = parseInt(percent, 10) / parseInt(100, 10);
                    var animate = $(this).data('animate');
                    if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                        $(this).data('animate', true);
                        $(this).find('.circle').circleProgress({
                            startAngle: -Math.PI / 2,
                            value: percent / 100,
                            thickness: 3,
                            fill: {color: '#E84855'}
                        }).on('circle-animation-progress', function (event, progress, stepValue) {
                            $(this).find('div').text((stepValue * 100).toFixed(1) + '%');
                        }).stop();
                    }
                });
            }

            // Show animated elements
            animateElements();
            $(window).scroll(animateElements);
        })();

        /* Stellar Parallax */
        (function () {
            var stellarActivated = false;

            function react_to_window() {
                if ($(window).width() <= 1024) {
                    if (stellarActivated == true) {
                        $(window).data('plugin_stellar').destroy();
                        stellarActivated = false;
                    }
                } else {
                    if (stellarActivated == false) {

                        $.stellar({
                            horizontalScrolling: false,
                            responsive: true,
                            horizontalOffset: 0,
                            verticalOffset: 0,
                            scrollProperty: 'scroll',
                            parallaxBackgrounds: true
                        });

                        $(window).data('plugin_stellar').init();
                        stellarActivated = true;
                    }
                }
            }

            $(window).resize(function () {
                react_to_window();
            });

            react_to_window()

        })();

    });

    /* Google Analytics */
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {(i[r].q = i[r].q || []).push(arguments)};
        i[r].l = 1 * new Date();
        a = s.createElement(o);
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-79946601-1', 'auto');
    ga('send', 'pageview');

})(jQuery);
