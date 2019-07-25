"use strict";

// Блоки меню с прокруткой влево-вправо на планшетной версии

export default function () {
    let scrollMenus = $('.js-tablet-scroll-menu');

    let scrollMenusInit = () => {
        scrollMenus.each((i, el) => {
            let items = $(el).find('.js-tablet-scroll-menu-item');
            let current = items.filter('._current');
            let offLeft = parseInt(current.offset().left);
            let extraOff = (window.innerWidth / 2) - ($(current).width() / 2);

            if (offLeft > (extraOff)) {
                $(el).scrollLeft(offLeft - extraOff);
            }
        });
    }

    if (window.isTablet) {
        scrollMenusInit();
    }

    $(window).on('resize', (e) => {
        if (window.isTablet) {
            setTimeout(() => {
                scrollMenusInit();
            }, 100);
        }
    });

};
