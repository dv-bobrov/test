"use strict";

import tablesort from "tablesort";

export default function () {
    let tables = $('.js-sort-table');

    tablesort.extend('integer', function(item) {
        // Regular expression to test against.
        // `item` is a table value to evaluate.
        return /[0-9]+/.test(item);
    }, function(a, b) {
        return a - b;
    });

    tables.each((i, el) => {
        let table = $(el)[0];

        let sorting = new tablesort(table, {
          descending: true
        });
    });
};
