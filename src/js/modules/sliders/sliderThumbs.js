"use strict";

import Swiper from "swiper/dist/js/swiper.js";

export default function () {
    let sliders = [];
    let thumbsSliders = [];

    let destroySliders = () => {
        thumbsSliders.forEach((el, i) => {
            el.destroy();

            if (i === thumbsSliders.length - 1) {
                thumbsSliders = [];
            }
        });

        sliders.forEach((el, i) => {
            el.destroy();

            if (i === sliders.length - 1) {
                sliders = [];
            }
        });
    };

    let sliderInit = (root, i) => {
        let sliderContainer = root.find('.js-slider-container');
        let thumbsContainer = root.find('.js-slider-thumbs-row');
        let thumbs = root.find('.js-slider-thumb');

        thumbsSliders[i] = new Swiper(thumbsContainer, {
            spaceBetween: 20,
            slidesPerView: 6,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            breakpoints: {
                1179: {
                    slidesPerView: 8
                }
            }
        });

        sliders[i] = new Swiper(sliderContainer, {
            navigation: {
                nextEl: root.find('.js-slider-next'),
                prevEl: root.find('.js-slider-prev'),
            },
            spaceBetween: 0,
            slidesPerView: 1,
            thumbs: {
                swiper: thumbsSliders[i]
            },
            on: {
                transitionStart: () => {
                    let index = sliders[i].activeIndex;

                    thumbs.removeClass('_active');
                    thumbs.eq(index).addClass('_active');
                    thumbsSliders[i].slideTo(sliders[i].activeIndex);
                }
            }
        });

        thumbs.on('click', (e) => {
            let el = $(e.currentTarget);
            let index = el.index();

            thumbs.removeClass('_active');
            el.addClass('_active');

            sliders[i].slideTo(index);
        });
    };

    let sliderWraps = $('.js-slider-thumbs');

    if (!sliderWraps.length) return;

    sliderWraps.each((i, el) => {

        if (!window.isMobile) {
            sliderInit($(el), i)
        }
    });

    $(window).on('resize', (e) => {
        if (window.isMobile) {
            if (sliders.length) {
                destroySliders();
            }
        } else {
            if (sliders.length) {
                sliders.forEach((el) => {
                    el.update();
                });
                thumbsSliders.forEach((el) => {
                    el.update();
                });
            } else {
                sliderWraps.each((i, el) => {
                    sliderInit($(el), i)
                });
            }
        }
    });
};
