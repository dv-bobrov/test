import * as vars from './vars';

export default function () {
    let mapBlock = $("#singlePinMap");

    if (mapBlock.length) {
        let center = mapBlock.data('center').split(',');
        let zoom = mapBlock.data('zoom');

        let singlePinMap = new ymaps.Map('singlePinMap', {
            center: center,
            zoom: zoom,
            behaviors: ['default', 'scrollZoom'],
            controls: ['typeSelector', 'fullscreenControl'],
        }, {
            searchControlProvider: 'yandex#search'
        });

        let mainPlacemark = new ymaps.Placemark(center, false, {
            iconImageHref: vars.iconMarker,
            iconImageSize: [41, 52],
            iconImageOffset: [-20, -52],
            iconLayout: 'default#image',
        });

        singlePinMap.geoObjects.add(mainPlacemark);
    }

};
