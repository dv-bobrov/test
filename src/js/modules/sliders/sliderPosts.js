"use strict";

import Swiper from "swiper/dist/js/swiper.js";

export default function () {
    let slider = false;

    let sliderContainer = $('.js-slider-posts');

    if (sliderContainer.length) {
        let sliderOpts = {
            navigation: {
                nextEl: sliderContainer.find('.js-slider-next'),
                prevEl: sliderContainer.find('.js-slider-prev'),
            },
            spaceBetween: 30,
            slidesPerView: 3
        };

        slider = new Swiper(sliderContainer, sliderOpts);

        $(window).on('resize', (e) => {
            slider.update();
        });
    }
};
