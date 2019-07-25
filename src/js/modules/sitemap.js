export default function () {
    let sitemapSections = $('.js-sitemap-sect');
    let isSitemapInit = false;

    let sitemapInit = () => {
        isSitemapInit = true;
        sitemapSections.each((i, el) => {
            let block = $(el);
            let title = block.find('.js-sitemap-title');
            let list = block.find('.js-sitemap-list');

            if (window.isMobile) {
                list.slideUp();
                title.on('click', (evt) => {
                    evt.preventDefault();
                    list.slideToggle();
                    title.toggleClass('_opened');
                });
            }
        });
    }

    let sitemapDestroy = () => {
        isSitemapInit = false;
        sitemapSections.each((i, el) => {
            let block = $(el);
            let title = block.find('.js-sitemap-title');
            let list = block.find('.js-sitemap-list');
            list.slideDown();
            title.removeClass('_opened');
            title.off('click');
        });
    }

    if (window.isMobile) {
        sitemapInit();
    }

    $(window).on('resize', () => {
        if (window.isMobile) {
            if (!isSitemapInit) {
                sitemapInit();
            }
        } else {
            if (isSitemapInit) {
                sitemapDestroy();
            }
        }
    });
};
