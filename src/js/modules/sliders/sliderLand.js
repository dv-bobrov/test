"use strict";

import Swiper from "swiper/dist/js/swiper.js";

export default function () {
    let slider = false;

    let sliderWrap = $('.js-slider-land-wrap');
    let sliderContainer = $('.js-slider-land');

    let sliderOpts = {
        simulateTouch: false,
        loop: true,
        navigation: {
            nextEl: sliderWrap.find('.js-slider-next'),
            prevEl: sliderWrap.find('.js-slider-prev'),
        },
        pagination: {
            el: sliderWrap.find('.js-pagination'),
            clickable: true
        },
        on: {
        }
    };

    slider = new Swiper(sliderContainer, sliderOpts);
};
