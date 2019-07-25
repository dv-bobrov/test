"use strict";

import Swiper from "swiper/dist/js/swiper.js";

export default function () {
    let root = $('.bnmap');

    if (root.length) {

        let iconsSlider = false;
        let iconsSliderContainer = $('.js-icon-blocks-slider');
        let iconsSliderOpts = {
            pagination: {
                el: iconsSliderContainer.find('.js-icon-blocks-pagination'),
            },
        };

        let clientsSlider = false;
        let clientsSliderContainer = $('.js-clients-slider');
        let clientsSliderOpts = {
            slidesPerView: 2,
            slidesPerColumn: 2,
            spaceBetween: 2,
            pagination: {
                el: clientsSliderContainer.find('.js-clients-pagination'),
            },
        };

        if (window.isMobile) {
            iconsSlider = new Swiper(iconsSliderContainer, iconsSliderOpts);
            clientsSlider = new Swiper(clientsSliderContainer, clientsSliderOpts);
        }

        $(window).on('resize', (e) => {
            if (window.isMobile) {
                if (iconsSlider && clientsSlider) {
                    iconsSlider.update();
                    clientsSlider.update();
                } else {
                    iconsSlider = new Swiper(iconsSliderContainer, iconsSliderOpts);
                    clientsSlider = new Swiper(clientsSliderContainer, iconsSliderOpts);
                }
            } else {
                if (iconsSlider && clientsSlider) {
                    iconsSlider.destroy();
                    clientsSlider.destroy();
                }
            }
        });
    }

};
