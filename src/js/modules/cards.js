import ListLoader from "./listLoader";

export default function () {
    let cardsWraps = $('.js-cards-wrap');

    cardsWraps.each((i, el) => {
        let wrap = $(el);

        wrap.on('click','.js-show-more-btn', function(){
            $(document).trigger('page:load', [wrap, $(this).data("url"), true]);
            return false;
        });
    });

    $(document).on('page:load', function(e, wrap, url, append){
        ListLoader(wrap, url, append);
    });
};
