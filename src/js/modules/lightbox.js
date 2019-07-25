import Swiper from "swiper/dist/js/swiper.js";

// Дизайн/ремонт под ключ: лайтбоксы

export default function () {

    let lightboxSliderContAll = $('.ix-lightbox-popup');
    let lightboxCards = $('.js-lightbox-link');

    lightboxSliderContAll.each(function(){
        let lightbox = $(this);
        let slider = false;

        let lightboxSliderCont = lightbox.find('.js-lightbox-slider-container');
        let lightboxSlider = lightbox.find('.js-lightbox-slider');

        let currentNum = lightbox.find('.js-lightbox-slider-current');
        let totalNum = lightbox.find('.js-lightbox-slider-total');
        let lightboxSliderText = lightbox.find('.js-lightbox-text');

        let setText = () => {
            let currentSlide = $(slider.slides[slider.activeIndex]);
            let slideText = currentSlide.find('.js-slide-text').text();
            lightboxSliderText.text(slideText);
        };

        let sliderOpts = {
            simulateTouch: false,
            loop: true,
            navigation: {
                nextEl: lightboxSlider.find('.js-slider-next'),
                prevEl: lightboxSlider.find('.js-slider-prev'),
            },
            pagination: {
                el: lightboxSlider.find('.js-pagination'),
                clickable: true
            },
            observer: true,
            observeParents: true,

            on: {
            }
        };

        slider = new Swiper(lightboxSliderCont, sliderOpts);

        slider.on('update', () => {
            totalNum.html(slider.slides.length - 2);
            currentNum.html(slider.realIndex);

            lightboxSliderText.addClass('_hidden');
            lightboxSliderText.on('transitionend', () => {
                setText();
                lightboxSliderText.off('transitionend');
                lightboxSliderText.removeClass('_hidden');
            });
        });

        slider.on('slideChange', () => {
            currentNum.text(slider.realIndex + 1);

            lightboxSliderText.addClass('_hidden');
            lightboxSliderText.on('transitionend', () => {
                setText();
                lightboxSliderText.off('transitionend');
                lightboxSliderText.removeClass('_hidden');
            });
        });


        lightboxCards.on('click', (e) => {
            let el = $(e.currentTarget);
            let date = el.find('.js-lightbox-date').text();
            e.preventDefault();

            setTimeout(() => {
                slider.update();
                slider.pagination.render();
                slider.pagination.update();
            }, 100);
        });
    });




};
