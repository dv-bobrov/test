export default function () {
    let selects = $('.js-field-select');

    selects.each((i, el) => {
        let block = $(el);

        block.addClass('select-hidden');
        block.wrap('<div class="field-select__wrap"></div>');
        block.after('<div class="field-select__select"></div>');

        let $styledSelect = block.next('.field-select__select');

        let $list = $('<div />', {
            'class': 'field-select__options'
        }).insertAfter($styledSelect);


        let makeOptionList = function(){

            let selectedOption = block.children('option:selected').eq(0);
            if(!selectedOption.length) {
                selectedOption = block.children('option').eq(0);
            }

            $styledSelect.text(selectedOption.text());
            $styledSelect.attr('title', selectedOption.text());

            let optionsCount = block.children('option').length;
            for (let i = 0; i < optionsCount; i++) {
                $('<div />', {
                    text: block.children('option').eq(i).text(),
                    rel: block.children('option').eq(i).val(),
                }).addClass('field-select__option js-field-select-option'+(block.children('option').eq(i).prop('disabled')?' js-field-select-option-disabled':'')).appendTo($list);
            }
            let $listItems = $list.children('.field-select__option');
            $listItems.click(function(e) {
                let valText = $(this).text();
                let value = $(this).attr('rel');

                if(!value.length) {
                    value = '';
                }

                e.stopPropagation();

                if($(this).hasClass('js-field-select-option-disabled')) {
                    return false;
                }

                $styledSelect.text(valText).removeClass('_active');
                $styledSelect.attr('title', valText);
                block.val(value);
                $list.hide();

                block.change();
            });
        };

        makeOptionList();



        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('.field-select__select._active').not(this).each(function(){
                $(this).removeClass('_active').next('.field-select__options').hide();
            });
            $(this).toggleClass('_active').next('.field-select__options').toggle();
        });



        $(document).click(function() {
            $styledSelect.removeClass('_active');
            $list.hide();
        });

        // Селект на странице отписки
        if (block.hasClass('js-unsubscribe-select')) {
            const hiddenTextarea = $('.js-unsubscribe-hidden-area');
            hiddenTextarea.slideUp();

            block.on('change', function(evt) {
                if (evt.currentTarget.value === 'Другое') {
                    hiddenTextarea.slideDown();
                } else {
                    hiddenTextarea.slideUp();
                }
            });
        }

        $(document).on('update:select', function(){
            $list.empty();
            makeOptionList();
        });

    });

};
