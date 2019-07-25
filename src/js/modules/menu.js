export default function () {
    let menuBtn = $('.js-menu-btn');
    let menu = $('.js-menu');

    menuBtn.on('click', () => {
        menuBtn.toggleClass('_opened');
        menu.toggleClass('_opened');
        window.HEADER.toggleClass('_menu-opened');

        if (menu.hasClass('_opened')) {
            window.BODY.trigger('open-modal');
            window.BODY.trigger('search-open');
        } else {
            window.BODY.trigger('close-modal');
            window.BODY.trigger('search-close');
        }
    });
};
