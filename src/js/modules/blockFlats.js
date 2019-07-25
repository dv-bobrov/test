"use strict";

import tablesort from "tablesort";

// Блоки ЖК с квартирами ("Страницы из поиска" и "Комм. недвижимость")

export default function () {
    let blocks = $('.js-block-flats');

    blocks.each((i, el) => {
        let block = $(el);
        let table = block.find('.js-flats-table');
        let sortBtns = block.find('.js-sort-btn');

        let sorting = new tablesort(table[0], {
          descending: true
        });
    });
};
