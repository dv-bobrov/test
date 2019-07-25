"use strict";

import Swiper from "swiper/dist/js/swiper.js";

// ЖК: Дневник стройки

export default function () {


    let diaryCards = $('.js-diary-card');
    let diarySliderAll = $('.js-diary-slider');

    diarySliderAll.each(function(){
        let slider = false;
        let diarySlider = $(this);
        let diarySliderCont = diarySlider.find('.js-diary-slider-container');
        let diarySliderTitle = diarySlider.find('.js-diary-slider-title');
        let currentNum = diarySlider.find('.js-diary-slider-current');
        let totalNum = diarySlider.find('.js-diary-slider-total');
        let slideName = diarySlider.find('.ix-slide-name');

        let sliderOpts = {
            simulateTouch: false,
            loop: true,
            navigation: {
                nextEl: diarySlider.find('.js-slider-next'),
                prevEl: diarySlider.find('.js-slider-prev'),
            },
            pagination: {
                el: diarySlider.find('.js-pagination'),
                clickable: true
            },
            observer: true,
            observeParents: true,

            on: {
            }
        };

        slider = new Swiper(diarySliderCont, sliderOpts);

        slider.on('update', () => {
            totalNum.html(slider.slides.length - 2);
            currentNum.html(slider.activeIndex);
        });

        slider.on('slideChange', () => {
            let currentIndex = slider.activeIndex;
            let maxSlides = slider.slides.length - 2;
            if(!currentIndex) {
                currentIndex = maxSlides;
            } else if(currentIndex > maxSlides) {
                currentIndex = 1;
            }
            slideName.html($(slider.slides[currentIndex]).find('img').attr('title'));

            currentNum.html(currentIndex);
        });

        diaryCards.on('click', (e) => {

            setTimeout(() => {
                slider.update();
                slider.pagination.render();
                slider.pagination.update();
            }, 100);
        });


    });






};
