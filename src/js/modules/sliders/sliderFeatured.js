"use strict";

import Swiper from "swiper/dist/js/swiper.js";

export default function () {
    let slider = false;

    let sliderContainer = $('.js-featured');

    let slideEffect = window.isMobile ? "slide" : "fade";

    let sliderOpts = {
        simulateTouch: false,
        effect: slideEffect,
        fadeEffect: {
            crossFade: true
        },
        // loop: true,
        navigation: {
            nextEl: sliderContainer.find('.js-slider-next'),
            prevEl: sliderContainer.find('.js-slider-prev'),
        },
        pagination: {
            el: sliderContainer.find('.js-num'),
            type: 'fraction',
            clickable: true
        },

        breakpoints: {
            639: {
                spaceBetween: 10,
                simulateTouch: true,
            }
        }
    };

    slider = new Swiper(sliderContainer, sliderOpts);
    // slider.on('init',)
};
