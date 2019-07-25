import objectFitImages from 'object-fit-images';

export default function () {
    // let getScrollBarWidth = () => {
    //     let div = document.createElement('div');
    //     div.style.overflowY = 'scroll';
    //     div.style.width = '50px';
    //     div.style.height = '50px';
    //
    //     div.style.visibility = 'hidden';
    //
    //     document.body.appendChild(div);
    //     let scrollWidth = div.offsetWidth - div.clientWidth;
    //     document.body.removeChild(div);
    //
    //     return scrollWidth;
    // };

    // window.scrollWidth = getScrollBarWidth();
    window.scrollWidth = window.innerWidth - $(window).width();

    let hideWindowScroll = () => {
        // if (window.scrollWidth) {
            window.BODY.css({
                "padding-right": window.scrollWidth + "px",
                "overflow": "hidden"
            });

            window.HEADER.css({
                "padding-right": window.scrollWidth + "px"
            });
        // }
    }

    let showWindowScroll = () => {
        // if (window.scrollWidth) {
            window.BODY.css({
                "padding-right": "",
                "overflow": ""
            });

            window.HEADER.css({
                "padding-right": ""
            });
        // }
    }

    window.BODY.on('open-modal', () => {
        hideWindowScroll();
    });

    window.BODY.on('close-modal', () => {
        setTimeout(() => {
            showWindowScroll();
        }, 300);
    });


    let breakpoints = {
        "mobile": 639,
        "tablet": [640, 1179],
        "laptop": [1180, 1279],
        "desktop": 1280
    }

    window.isMobile = window.matchMedia(`(max-width: ${breakpoints.mobile}px)`).matches;
    window.isTablet = window.matchMedia(`(max-width: ${breakpoints.tablet[1]}px)`).matches;
    window.isDesktop = window.matchMedia(`(min-width: ${breakpoints.desktop}px)`).matches;
    window.isLaptop = window.matchMedia(`(min-width: ${breakpoints.laptop[0]}px) and (max-width: ${breakpoints.laptop[1]}px)`).matches;

    $(window).on('resize', () => {
        window.scrollWidth = window.innerWidth - $(window).width();
        window.isMobile = window.matchMedia(`(max-width: ${breakpoints.mobile}px)`).matches;
        window.isTablet = window.matchMedia(`(max-width: ${breakpoints.tablet[1]}px)`).matches;
        window.isDesktop = window.matchMedia(`(min-width: ${breakpoints.desktop}px)`).matches;
        window.isLaptop = window.matchMedia(`(min-width: ${breakpoints.laptop[0]}px) and (max-width: ${breakpoints.laptop[1]}px)`).matches;
    });

    objectFitImages(null, {watchMQ: true});
};
