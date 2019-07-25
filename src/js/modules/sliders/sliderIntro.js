"use strict";

import Swiper from "swiper/dist/js/swiper.js";

export default function () {
    let slider = false;

    let sliderContainer = $('.js-slider-intro');
    let delay = 5000;

    let sliderOpts = {
        simulateTouch: false,
        autoplay: {
            delay: delay,
            disableOnInteraction: false
        },
        loop: true,
        navigation: {
            nextEl: '.js-slider-next',
            prevEl: '.js-slider-prev',
        },
        pagination: {
            el: sliderContainer.find('.js-pagination'),
            clickable: true
        },
        on: {
            init: () => {
                $('.js-slider-next').find('svg').css({
                    "animation-duration": delay + 50 + "ms"
                });
            },
            slideChange: () => {
                $('.js-slider-next').removeClass('_animated');
                setTimeout(() => {
                    $('.js-slider-next').addClass('_animated');
                }, 100);
            }
        }
    };

    slider = new Swiper(sliderContainer, sliderOpts);

    sliderContainer.hover(function() {
        slider.autoplay.stop();
        sliderContainer.addClass('_paused');
    }, function() {
        slider.autoplay.start();
        sliderContainer.removeClass('_paused');
    });
};
