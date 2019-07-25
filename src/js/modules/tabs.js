export default function () {
    let tabsBlocks = $('.js-tabs-block');

    tabsBlocks.each((i, el) => {
        let block = $(el);
        let links = block.find('.js-tab-link');
        let wrap = block.find('.js-tabs-wrap');
        let tabs = block.find('.js-tab');

        let fitHeight = (el) => {
            wrap.css({ "height": el.outerHeight() });
        }

        block.addClass('_activated');
        tabs.eq(0).addClass('_active');
        fitHeight(tabs.eq(0));

        links.on('click', (e) => {
            let el = $(e.currentTarget);
            let newTab = tabs.filter(el.attr('href'));
            links.removeClass('_current');
            el.addClass('_current');

            tabs.filter('._active').removeClass('_active');
            newTab.addClass('_active');
            fitHeight(newTab);

            return false;
        });

        $(window).on('resize', (e) => {
            fitHeight(tabs.filter('._active'));
        });
    });
};
