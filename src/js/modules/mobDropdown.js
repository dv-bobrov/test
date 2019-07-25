// Свертывание блоков с ссылками в дропдауны на моб. версии

export default function () {
    let dropdowns = $('.js-mob-dropdown');
    let tabletDropdowns = dropdowns.filter('._tablet');
    let isDropdownsInit = false;

    let dropdownsInit = (type) => {
        isDropdownsInit = true;

        dropdowns.each((i, el) => {
            let block = $(el);
            let active = block.find('.js-mob-dropdown-active');
            let activeText = block.find('.js-active-text');
            let items = block.find('.js-mob-dropdown-item');

            active.on('click', () => {
                block.toggleClass('_opened');
            });

            items.on('click', (e) => {
                setTimeout(() => {
                    block.removeClass('_opened');
                }, 100);

                let item = $(e.currentTarget);
                let text;
                items.removeClass('_current');
                item.addClass('_current');

                if (item.hasClass('js-item-text')) {
                    text = item.text();
                } else {
                    let textBlock = item.find('.js-item-text');
                    text = textBlock.length ? textBlock.text() : '';
                }

                activeText.html(text);
            });
        });
    }

    let dropdownsDestroy = () => {
        isDropdownsInit = false;

        dropdowns.each((i, el) => {
            let block = $(el);
            let active = block.find('.js-mob-dropdown-active');
            let items = block.find('.js-mob-dropdown-item');

            block.removeClass('_opened');
            active.off('click');
            items.off('click');
        });
    }


    if (tabletDropdowns.length) {
        if (window.isTablet) {
            dropdownsInit();
        }
    } else {
        if (window.isMobile) {
            dropdownsInit();
        }
    }


    $(window).on('resize', () => {
        if (tabletDropdowns.length) {

            if (window.isTablet) {
                if (!isDropdownsInit) {
                    dropdownsInit();
                }
            } else {
                if (isDropdownsInit) {
                    dropdownsDestroy();
                }
            }

        } else {
            if (window.isMobile) {
                if (!isDropdownsInit) {
                    dropdownsInit();
                }
            } else {
                if (isDropdownsInit) {
                    dropdownsDestroy();
                }
            }
        }
    });

    $(window).on('click', (e) => {
        if (isDropdownsInit) {
            if (!$(e.target).closest('.js-mob-dropdown').length) {
                dropdowns.removeClass('_opened');
            }
        }
    });
};
