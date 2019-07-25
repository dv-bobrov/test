"use strict";

import Swiper from "swiper/dist/js/swiper.js";

export default function () {
    let sliders = [];

    let sliderWraps = $('.js-slider');

    sliderWraps.each((i, el) => {
        let wrap = $(el);
        let sliderContainer = wrap.find('.js-slider-container');
        let perView = wrap.data('slides') ? wrap.data('slides') : 1;
        let perViewMob = wrap.data('slides-mob') ? wrap.data('slides-mob') : 1;
        let perViewTab = wrap.data('slides-tab') ? wrap.data('slides-tab') : perView;
        let rows = wrap.data('rows') ? wrap.data('rows') : false;
        let gap = wrap.data('gap') !== undefined ? wrap.data('gap') : 30;
        let gapMob = wrap.data('gap-mob') !== undefined ? wrap.data('gap-mob') : 10;
        let gapTab = wrap.data('gap-tab') !== undefined ? wrap.data('gap-tab') : 30;

        let sliderOpts = {
            navigation: {
                nextEl: wrap.find('.js-slider-next'),
                prevEl: wrap.find('.js-slider-prev'),
            },
            spaceBetween: gap,
            slidesPerView: perView,
            slidesPerColumn: rows,
            pagination: {
                el: wrap.find('.js-pagination'),
                clickable: true
            },

            breakpoints: {
                1279: {
                    slidesPerView: perViewTab,
                    spaceBetween: gapTab,
                },
                639: {
                    slidesPerView: perViewMob,
                    spaceBetween: gapMob,
                }
            }
        };

        sliders[i] = new Swiper(sliderContainer, sliderOpts);

        $(window).on('resize', (e) => {
            sliders[i].update();
        });
    });

};
