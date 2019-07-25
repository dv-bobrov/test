import * as vars from './vars';

export default function () {
    let mapInfraBlock = $('#mapInfra');
    let pinLayoutString = '<div class="map-infra__marker">' +
        '<div class="map-infra__marker-icon">' +
        '<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24">' +
        '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-complex-infra-{{ properties.type }}"></use>' +
        '</svg>' +
        '</div>' +
        '</div>';

    // Адаптивные параметры

    let setZoomMargin = () => {
        if (window.isDesktop) {
            let horMargins = ((window.innerWidth - 1260) / 2) + 185 + 50;
            return [80, horMargins];
        } else if (window.isLaptop) {
            let horMargins = [
                ((window.innerWidth - 1140) / 2) + (185 + 30),
                ((window.innerWidth - 1140) / 2) + (320 + 20 + 30),
            ];
            return [50, horMargins[1], 30, horMargins[0]];
        } else {
            return 80;
        }
    }

    let setEventType = () => {
        if (window.isDesktop || window.isLaptop) {
            return 'mouseenter';
        } else {
            return 'click';
        }
    }

    let openBallonEventType = setEventType();
    let clustererZoomMargin = setZoomMargin();

    $(window).on('resize', () => {
        openBallonEventType = setEventType();
        clustererZoomMargin = setZoomMargin();
    });

    if (mapInfraBlock.length) {
        let filters = $('.js-map-filter');
        let center = mapInfraBlock.data('center').split(',');
        let zoom = mapInfraBlock.data('zoom');

        if(!$('#ix-js-data').length) {
            return false;
        }
        let jsData = JSON.parse($('#ix-js-data').text());

        let mapInfra = new ymaps.Map('mapInfra', {
                center: jsData.main.center,
                zoom: zoom,
                behaviors: ['default', 'scrollZoom'],
                controls: [],
            }, {
                searchControlProvider: 'yandex#search'
            }),

            ballonLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="map-infra__balloon">' +
                '<span class="map-infra__balloon-title">{{properties.title}}</span>' +
                '<span class="map-infra__balloon-text">{{properties.text}}</span>' +
                pinLayoutString +
                '</div>', {
                }),

            objectManager = new ymaps.ObjectManager({
                clusterize: true,
                gridSize: 60,
                zoomMargin: clustererZoomMargin,
            });

        let layoutPin = ymaps.templateLayoutFactory.createClass(
            pinLayoutString
        );

        objectManager.objects.options.set({
            iconLayout: layoutPin,
            iconShape: {
                type: 'Polygon',
                coordinates: [
                    [[-25,-68],[26,-68],[26,-40],[0,0],[-25,-40]]
                ]
            },
            balloonLayout: ballonLayout,
        });

        objectManager.clusters.options.set({
            preset: 'islands#nightClusterIcons',
        });

        objectManager.objects.events.add(openBallonEventType, function (e) {
            var objectId = e.get('objectId');
            objectManager.objects.balloon.open(objectId);
        });

        mapInfra.events.add('mouseenter', function (e) {
            if(e.get('target') === mapInfra) {
                objectManager.objects.balloon.close();
            }
        });

        let mainPlacemark = new ymaps.Placemark(jsData.main.center, {
            "title": jsData.main.title,
            "text": jsData.main.text
        }, {
            iconImageHref: vars.iconMarker,
            iconImageSize: [53, 68],
            iconImageOffset: [-26, -68],
            iconLayout: 'default#image',
        });

        mapInfra.geoObjects.add(mainPlacemark);

        mapInfra.geoObjects.add(objectManager);


        objectManager.add(jsData.all);

        filters.on('click', (e) => {
            let el = $(e.currentTarget);
            let type = el.data('type');

            if (!el.hasClass('_active')) {
                filters.removeClass('_active');
                el.addClass('_active');
                objectManager.setFilter('properties.type == "' + type + '"');

                mapInfra.setBounds(objectManager.getBounds(), {
                    zoomMargin: clustererZoomMargin,
                    duration: 400
                });
            } else {
                el.removeClass('_active');
                objectManager.setFilter();
            }

            var zoom = mapInfra.getZoom();
            if(zoom > 20) {
                mapInfra.setZoom(15);
            } else if(zoom < 5) {
                mapInfra.setZoom(11);
            }

        });

    }

};
