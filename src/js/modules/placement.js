// Переключение типа маршрута на стр. ЖК: Расположение

export default function () {
    let toggles = $('.js-placement-toggle');
    let tabs = $('.js-placement-tab');
    let timeout = 0;

    toggles.on('click', (e) => {
        let block = $(e.currentTarget);

        if (!block.hasClass('_active')) {
            toggles.removeClass('_active');
            tabs.removeClass('_active');

            tabs.eq(block.index()).addClass('_active');
            block.addClass('_active');

            clearTimeout(timeout);
            timeout = setTimeout(function(){
                tabs.eq(block.index()).find('.js-route-point:first').click();
            }, 200);


        }
    });
};
