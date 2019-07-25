// Таблица на стр. ЖК: Планировки

export default function () {
    let tables = $('.js-layouts-table');
    let layoutsTabsWrap = $('.js-layouts-tabs');

    tables.each((i, el) => {
        let wrap = $(el);
        let flatsOutput = wrap.find('.js-flats-tbody');
        let showMore = wrap.find('.js-show-more');
        let showMoreBtn = wrap.find('.js-show-more-btn');
        let type = showMore.data('type');

        showMoreBtn.on('click', () => {
            showMore.addClass('_loading');

            setTimeout(() => {
                // Передаем данные
                // TODO: заменить URL
                let req = $.ajax({
                    url: `data/${type}.html`,
                    type: 'get',
                    dataType: 'html'
                });

                // Пришел ответ
                req.done(function (data) {  /* , textStatus, jqXHR */
                    if (data) {
                        flatsOutput.append(data);
                        layoutsTabsWrap.css({ "height": wrap.outerHeight() });

                        setTimeout(() => {
                            flatsOutput.find('.js-loaded-card').removeClass('_hidden');
                        }, 100);
                    }

                });

                // Запрос не удался
                req.fail(function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                });

                // В любом случае
                req.always(function () {
                    showMore.removeClass('_loading');
                });
            }, 1000);
        });
    });
};
