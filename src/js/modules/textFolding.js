export default function () {
    let $spoiler = $('.js-text-folding');

    let $innerText = $spoiler.find('.js-text-inner');
    let $readMore = $spoiler.find('.js-text-read-more');
    let $readMoreText = $readMore.find('span');
    let height = $innerText.outerHeight();
    let maxHeight = window.isMobile ? $spoiler.data('maxHeightMob') : $spoiler.data('maxHeight');

    if ((height - parseInt(maxHeight, 10)) >= 100) {
        $spoiler.addClass('_inited');

        $spoiler.addClass('_folded');
        $readMore.addClass('_folded');

        $spoiler.css('height', height + 'px');

        $readMore.show().on('click', () => {
            $spoiler.toggleClass('_folded');
            $readMore.toggleClass('_folded');

            if ($readMore.hasClass('_folded')) {
                $readMoreText.text($readMore.data('text-unfold'));
            } else {
                $readMoreText.text($readMore.data('text-fold'));
            }
            $(window).trigger('resize');
        });

        $(window).on('resize', () => {
            height = $innerText.outerHeight();
            $spoiler.css('height', height + 'px');
        });
    }
};
