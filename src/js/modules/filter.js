import noUiSlider from "nouislider/distribute/nouislider.js";

export default function () {
    let filter = $('.js-filter');
    let rangeControls = $('.js-filter-range');
    let hidden = $('.js-filter-hidden');
    let hiddenContent = hidden.find('.js-filter-content');
    let expandBtn = $('.js-filter-expand');
    let expandBtnText = expandBtn.find('span');
    let expandTextOpen = expandBtn.data('text-open');
    let expandTextClose = expandBtn.data('text-close');
    let dropBtn = $('.js-filter-drop-btn');
    let dropHidden = $('.js-filter-drop-hidden');
    let dropContent = $('.js-filter-drop-content');

    let mobDropBtn = $('.js-filter-mob-drop-btn');
    let mobDropHidden = $('.js-filter-mob-drop-hidden');
    let mobDropContent = $('.js-filter-mob-drop-content');

    let clear = $('.js-filter-clear');
    let checkboxes = $('.js-filter-checkbox');
    let selects = $('.js-filter-select-wrap');

    let resultBtn = $('.js-filter-btn');
    let resultBtnTextDefault;
    let resultBtnTextShow;

    if (resultBtn.length) {
        resultBtnTextDefault = resultBtn.data('text-default');
        resultBtnTextShow = [
            resultBtn.data('text-show').split(', ').slice(0, 1),
            resultBtn.data('text-show').split(', ').slice(1, 4)
        ]
    }

    let numFormat = (num) => {
        let value = parseInt(num).toLocaleString( "ru-RU" );
        return value;
    }

    let getNum = (num) => {
        let value = num.toString().replace(/\s/g, '');
        return value;
    }

    let declineFormat = (num, text) => {
        return text[(num % 10 === 1 && num % 100 !== 11) ? 0 : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? 1 : 2]
    }

    // Инпуты с диапазонами (от и до)
    rangeControls.each((i, el) => {
        let block = $(el);
        let inputs = block.find('.js-input');
        let inputFrom = block.find('.js-input-from');
        let inputTo = block.find('.js-input-to');
        let slider = block.find('.js-range-slider')[0];
        let min = block.data('min');
        let max = block.data('max');
        let step = block.data('step');
        let current = block.data('current');

        noUiSlider.create(slider, {
            start: [current[0], current[1]],
            connect: [false, true, false],
            orientation: "horizontal",
            range: {
                'min': min,
                'max': max
            },
            step: step
        });

        slider.noUiSlider.on('update', () => {
            let value = slider.noUiSlider.get();

            inputFrom.val(numFormat(value[0]));
            inputTo.val(numFormat(value[1]));

            $('body').trigger('filter:update_slider', [inputFrom, inputTo]);
        });

        inputs.on('click focus', (e) => {
            let $el = $(e.currentTarget);
            let value = $el.val();
        });

		inputs.on("keyup", (e) => {
            let $el = $(e.currentTarget);
            let type = $el.hasClass('js-input-from') ? 'from' : 'to';

			// When user select text in the document, also abort.
			let selection = window.getSelection().toString();
			if (selection !== '') {
				return;
			}

			// When the arrow keys are pressed, abort.
			if ($.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
				return;
			}

			// Get the value.
			let value = $el.val();
			value = value.replace(/[\D\s\._\-]+/g, "");
			value = value ? parseInt( value, 10 ) : 0;

			$el.val(() => {
				return (value === 0) ? "" : value.toLocaleString( "ru-RU" );
			});
		} );

        inputs.on('change blur', (e) => {
            let $el = $(e.currentTarget);
            let value = getNum($el.val());

            $el.val(() => {
                if (value < min) {
                    return numFormat(min);
                } else if (value > max) {
                    return numFormat(max);
                } else {
                    return numFormat(value);
                }
            });
        });

        inputFrom.on('change', (e) => {
            let $el = $(e.currentTarget);
            let value = getNum($el.val());

            current[0] = value;

            slider.noUiSlider.set([value, slider.noUiSlider.get()[1]]);
        });

        inputTo.on('change', (e) => {
            let $el = $(e.currentTarget);
            let value = getNum($el.val());

            current[1] = value;

            slider.noUiSlider.set([slider.noUiSlider.get()[0], value]);
        });

        $('body').on('filter:clear', (e) => {
            slider.noUiSlider.set([current[0], current[1]]);
        });
    });

    checkboxes.each((i, el) => {
        let block = $(el);
        let inputs = block.find('input[type=checkbox]');

        $('body').on('filter:clear', (e) => {
            inputs.map((i, el) => {
                el.checked = false;
            });
        });

        inputs.map((i, el) => {
            $(el).on('change', () => {
                $('body').trigger('filter:update_checkbox', [$(el)]);
            });
        });
    });

    // Селекты
    selects.each((i, el) => {
        let block = $(el);
        let select = block.find('select');

        $('body').on('filter:clear', (e) => {
            let options = block.find('.js-field-select-option');
            options.eq(0).click();
        });

        select.on('change', () => {
            $('body').trigger('filter:update_select', [select]);
        });
    });

    // Раскрытие свернутой части фильтра
    expandBtn.on('click', (e) => {
        expandBtn.toggleClass('_opened');

        if (expandBtn.hasClass('_opened')) {
            hidden.slideDown(400);
            setTimeout(() => {
                hiddenContent.removeClass('_hidden');
            }, 200);
            expandBtnText.html(expandTextClose);
        } else {
            hiddenContent.addClass('_hidden');
            hidden.slideUp();
            expandBtnText.html(expandTextOpen);
        }
    });

    // Раскрытие дропдауна "Параметры квартиры"
    dropBtn.on('click', (e) => {
        dropBtn.toggleClass('_opened');

        if (dropBtn.hasClass('_opened')) {
            dropHidden.slideDown(400);
            setTimeout(() => {
                dropContent.removeClass('_hidden');
            }, 200);
        } else {
            dropContent.addClass('_hidden');

            setTimeout(() => {
                dropHidden.slideUp()
            }, 100);;
        }
    });

    // Мобильный дропдаун для фильтра на стр. Новостройки
    mobDropBtn.on('click', (e) => {
        mobDropBtn.toggleClass('_opened');

        if (mobDropBtn.hasClass('_opened')) {
            mobDropHidden.slideDown(400);
            setTimeout(() => {
                mobDropContent.removeClass('_hidden');
            }, 200);
        } else {
            mobDropContent.addClass('_hidden');

            setTimeout(() => {
                mobDropHidden.slideUp()
            }, 100);;
        }
    });

    $('body').on('filter:update', (e, count) => {
        clear.removeClass('_hidden');

        if (resultBtnTextShow) {
            let btnText = resultBtnTextShow[0] + ' ' + count + ' ' + declineFormat(count, resultBtnTextShow[1]);
            resultBtn.html(btnText);
        }
    });

    clear.on('click', (e) => {
        $('body').trigger('filter:clear');
        clear.addClass('_hidden');
        if (resultBtnTextDefault) {
            resultBtn.html(resultBtnTextDefault);
        }
    });
};
