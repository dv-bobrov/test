import noUiSlider from "nouislider/distribute/nouislider.js";

export default function () {
    let numControls = $('.js-field-num:not(.ix-init)');

    let numWordsFormat = (n, textForms) => {
        n = Math.abs(n) % 100;
        let n1 = n % 10;

        if (n > 10 && n < 20) {
            return textForms[2];
        }
        if (n1 > 1 && n1 < 5) {
            return textForms[1];
        }
        if (n1 == 1) {
            return textForms[0];
        }
        return textForms[2];
    }

    let numFormat = (num, text) => {
        let value = parseFloat(num).toLocaleString( "ru-RU" );

        if (text) {
            return value + ' ' + text;
        } else {
            return value;
        }
    }

    let getNum = (num) => {
        let value = num.toString().replace(/\D/g,'');

        return value;
    }

    numControls.each((i, el) => {
        let block = $(el);
        let input = block.find('.js-input');
        let slider = block.find('.js-num-slider')[0];
        let min = block.data('min');
        let max = block.data('max');
        let step = block.data('step');
        let current = block.data('current');
        let connect = block.data('connect');
        let name = block.data('name');
        let unit = block.data('unit') || false;
        let scalePins = block.find('.js-scale-item');

        block.addClass('ix-init');

        noUiSlider.create(slider, {
            start: current,
            connect: [true, false],
            orientation: "horizontal",
            range: {
                'min': min,
                'max': max
            },
            step: step
        });

        slider.noUiSlider.on('update', () => {
            let value = slider.noUiSlider.get();
            if (unit !== 'years') {
                input.val(numFormat(value, unit));
            } else {
                input.val(numFormat(
                    value,
                    numWordsFormat(value, ['год', 'года', 'лет'])
                ));
            }

            if(connect) {
                let connected = $('.'+connect);
                let connectedSlider = connected.find('.js-num-slider')[0];
                let minPercent = connected.data('min-percent');
                let maxPercent = connected.data('max-percent');
                let currentVal = value;


                if(connectedSlider.noUiSlider) {

                    let max = Math.ceil(currentVal * (maxPercent / 100));
                    let min = Math.ceil(currentVal * (minPercent / 100));
                    let current = connectedSlider.noUiSlider.get();
                    if (current > max) {
                        connectedSlider.noUiSlider.set(max);
                    }
                    if (current < min) {
                        connectedSlider.noUiSlider.set(min);
                    }


                    connectedSlider.noUiSlider.updateOptions({
                        range: {
                            'min': min,
                            'max': max
                        }
                    });
                }

            }

            $(document).trigger('mortgage.update', [name, value]);

        });

        scalePins.on('click', (e) => {
            let $el = $(e.currentTarget);
            slider.noUiSlider.set($el.data('val'));
        });
    });

};
