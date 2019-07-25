"use strict";

import Swiper from "swiper/dist/js/swiper.js";

// Попап с планировкой квартиры

export default function () {
    /* Отключаем пока одна планировка
    let flatsList = $('.js-flats-list');
    let wrap = $('.js-flat-slider-wrap');
    let sliderContainer = $('.js-flat-slider');
    let slider = false;

    let sliderOpts = {
        navigation: {
            nextEl: wrap.find('.js-slider-next'),
            prevEl: wrap.find('.js-slider-prev'),
        },
        spaceBetween: 0,
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: wrap.find('.js-flat-pagination'),
            clickable: true
        },
    };

    slider = new Swiper(sliderContainer, sliderOpts);

    flatsList.on('click', 'tr', (e) => {
        slider.update();
        slider.pagination.render();
        slider.pagination.update();
    });
    */
};
