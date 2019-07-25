"use strict";

export default function () {
    let alertBlock = document.getElementById('js-cookie-alert');
    let alertBtn = document.getElementById('js-cookie-alert-btn');
    let expireTime = 86400 * 365;

    let setCookie = (name, value, options) => {
        options = options || {};

        let expires = options.expires;

        if (typeof expires == "number" && expires) {
            let d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        let updatedCookie = name + "=" + value;

        for (let propName in options) {
            updatedCookie += "; " + propName;
            let propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    let getCookie = (name) => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    if (navigator.cookieEnabled === true) {

        if (!getCookie('visited')) {
            alertBlock.classList.remove('_hidden');

            alertBtn.onclick = function() {
                setCookie("visited", true, {
                    expires: expireTime,
                    path:'/'
                });
                alertBlock.classList.add('_hidden');
                setTimeout(() => {
                    alertBlock.remove();
                }, 400);
            }
        } else {
            alertBlock.remove();
        }

    }
};
