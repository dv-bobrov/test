export default function () {
    let spoilers = $('.js-spoiler');

    spoilers.each((i, el) => {
        let $el = $(el);
        let head = $el.find('.js-spoiler-head');
        let content = $el.find('.js-spoiler-content');
        let inner = $el.find('.js-spoiler-inner');

        content.slideUp();
        inner.addClass('_hidden');

        head.on('click', () => {
            $el.toggleClass('_unfolded _folded');

            // Если раскрываем
            if ($el.hasClass('_unfolded')) {
                content.slideDown(300);
                setTimeout(() => {
                    inner.removeClass('_hidden');
                }, 200);

            // Если сворачиваем
            } else {
                inner.addClass('_hidden');
                setTimeout(() => {
                    content.slideUp(300);
                }, 100);
            }
        });
    });
};
