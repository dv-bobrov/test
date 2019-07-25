export default function () {
    let popupBtns = $('.js-popup-btn');
    let popupWrap = $('.js-popup-wrap');
    let popupBlocks = $('.js-popup');
    let closeBtns = $('.js-popup-close');
    let allPopups = $('.ix-all-popups');

    popupBtns.on('click', (e) => {
        let $el = $(e.currentTarget);
        let id = $el.data('popup');

        popupOpen(id);
    });

    window.popupOpen = (id) => {
        let popup = popupBlocks.filter('[data-popup=' + id + ']');

        if(!popup.length) {
            popupBlocks = $('.js-popup');
            popup = popupBlocks.filter('[data-popup=' + id + ']');
        }
        if(!popup.length) {
            return;
        }

        if(!allPopups.find('[data-popup=' + id + ']').length) {
            allPopups.append(popup);
        }

        popupWrap.addClass('_opened');
        popup.show();

        setTimeout(() => {
            popup.addClass('_opened');
        }, 50);

        window.BODY.addClass('_popup-opened');
        window.BODY.trigger('open-modal');
    };

    window.popupClose = () => {
        let popup = popupBlocks.filter('._opened');
        popupWrap.removeClass('_opened');
        popup.removeClass('_opened');

        setTimeout(() => {
            popup.hide();
        }, 200);

        window.BODY.removeClass('_popup-opened');
        window.BODY.trigger('close-modal');
    }

    closeBtns.on('click', () => {
        popupClose();
    });

    $(window).on('click', (e) => {
        if (window.BODY.hasClass('_popup-opened') &&
            !$(e.target).closest('.js-popup').length &&
            !$(e.target).closest('.js-popup-btn').length) {
            popupClose();
        }
    });

    // window.BODY.on('search-close', () => {
    //     searchClose();
    // });
};
