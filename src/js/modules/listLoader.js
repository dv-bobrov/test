let lock = false;

export default function (wrap, url, append) {

    let listBlock = wrap.find('.ix-list-block');
    let navBlock = wrap.find('.ix-nav-block');

    if (lock) {
        return false;
    }
    lock = true;
    navBlock.find('.js-show-more').addClass('_loading');

    if (!window.history.state) {
        window.history.replaceState({
            module: "skv",
            url: window.location.href
        }, document.title, window.location.href);
    }

    if(!append) {

        if (url.indexOf('PAGEN') > -1) {
            url = url.replace(/&?PAGEN_1=\d+/g, '');
        }

        window.history.pushState({
            module: "skv",
            url: url
        }, document.title, url);
    }

    if(url.indexOf('?') > 0) {
        url += '&'
    } else {
        url += '?'
    }

    let req = $.ajax({
        url: url + 'ajax=Y',
        type: 'get',
        dataType: 'html'
    });

    let scrollTo = function(wrap, force) {
        force = force || false;
        let scrollPosition = Math.max(wrap.offset().top-100,0);
        if(force || ((scrollPosition < $(document).scrollTop()) || (scrollPosition + 400 > ($(document).scrollTop() + $(window).height())))) {
            $('html, body').animate({
                scrollTop: scrollPosition
            }, 1000);
        }
    };


    // Пришел ответ
    req.done(function (response) {  /* , textStatus, jqXHR */
        if (response) {
            if (!append) {
                wrap.html(response);
                scrollTo(wrap);
            } else {
                let
                    _html = $(response),
                    products = _html.find('.ix-list-item'),
                    pageNav = _html.find('.js-show-more');
                listBlock.append(products);
                navBlock.empty().append(pageNav);

            }

            setTimeout(() => {
                wrap.find('.js-loaded-card').removeClass('_hidden');
            }, 100);
        }
        lock = false;
    });

    // Запрос не удался
    req.fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    });

    // В любом случае
    req.always(function () {
        lock = false;
        wrap.find('._loading').removeClass('_loading');
    });




};
