import noUiSlider from "nouislider/distribute/nouislider.js";
import wNumb from "wnumb/wNumb.js";

// Выбор диапазона времени (попап "Обратный звонок")

export default function () {
    let blocks = $('.js-time-range');

    blocks.each((i, el) => {
        let block = $(el);
        let input = block.find('.js-input');
        let slider = block.find('.js-range-slider')[0];
        let min = block.data('min');
        let max = block.data('max');
        let step = block.data('step');
        let current = block.data('current').split(',');

        let formatMinutes = (val) => {
            let num = parseFloat(val).toFixed(2).split('.');
            let minutes = (num[1] / 10 * 0.6) + '0';
            return num[0] + ':' + minutes;
        }

        noUiSlider.create(slider, {
            start: current,
            connect: [false, true, false],
            orientation: "horizontal",
            range: {
                'min': min,
                'max': max
            },
            step: step,
            tooltips: [wNumb({
        		decimals: 2,
                edit: function(value) {
                    return formatMinutes(value);
                },
        	}), wNumb({
        		decimals: 2,
                edit: function(value) {
                    return formatMinutes(value);
                },
        	})]
        });

        slider.noUiSlider.on('update', () => {
            let value = slider.noUiSlider.get();
            let start = formatMinutes(value[0]);
            let end = formatMinutes(value[1]);

            input.val(start + ' - ' + end);

            let differ = value[1] - value[0];

            if (differ <= 1) {
                if (differ == 0) {
                    block.addClass('_same-values');
                } else {
                    block.addClass('_close-values');
                    block.removeClass('_same-values');
                }
            } else {
                block.removeClass('_close-values _same-values');
            }
        });
    });
};
