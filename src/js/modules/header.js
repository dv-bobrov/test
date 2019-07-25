export default function () {
    let didScroll;
    let lastScrollTop = 0;
    let delta = 0;
    let navbarHeight = window.HEADER.outerHeight();
    let offset = 50;

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 100);

    let hasScrolled = () => {
        let st = $(window).scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight + offset){
            // Scroll Down
            window.HEADER.removeClass('_sticky').addClass('_hidden');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                window.HEADER.removeClass('_hidden').addClass('_sticky');
            }
        }

        lastScrollTop = st;
    }
};
