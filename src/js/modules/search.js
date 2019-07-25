export default function () {
    let searchOpenBtn = $('.js-search-open');
    let search = $('.js-search');

    let searchOpen = () => {
        window.HEADER.addClass('_search-opened');
        search.addClass('_opened');
    };

    let searchClose = () => {
        window.HEADER.removeClass('_search-opened');
        search.removeClass('_opened');
    }

    searchOpenBtn.on('click', () => {
        searchOpen();
    });

    window.BODY.on('search-open', () => {
        searchOpen();
    });

    $(window).on('click', (e) => {
        if (!$(e.target).closest('.header').length && window.HEADER.hasClass('_search-opened')) {
            searchClose();
        }
    });

    window.BODY.on('search-close', () => {
        searchClose();
    });
};
