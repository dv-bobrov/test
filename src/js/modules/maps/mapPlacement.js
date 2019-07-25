import * as vars from './vars';

export default function () {
    let mapBlock = $('#mapPlacement');

    if (mapBlock.length) {
        let center = mapBlock.data('center').split(',');
        let zoom = mapBlock.data('zoom');
        let defaultRefPoint = mapBlock.data('ref-point').split(',');
        let routePoints = $('.js-route-point');
        let toggles = $('.js-placement-toggle');
        let searchField = $('.js-search-route-field');
        let searchBtn = $('.js-search-route-btn');

        let routeOptions = {
            wayPointStartIconColor: "#00aee2",
            wayPointStartIconFillColor: "#fff",

            wayPointFinishIconImageHref: vars.iconMarkerHouse,
            wayPointFinishIconImageSize: [41, 52],
            wayPointFinishIconImageOffset: [-20, -52],
            wayPointFinishIconLayout: 'default#image',

            wayPointStartIconImageHref: vars.iconMarkerActive,
            wayPointStartIconImageSize: [41, 52],
            wayPointStartIconImageOffset: [-20, -52],
            wayPointStartIconLayout: 'default#image',

            pinIconFillColor: "#00aee2",
            pinActiveIconFillColor: "#00aee2",

            routeStrokeWidth: 2,
            routeStrokeColor: "#000088",
            routeActiveStrokeWidth: 4,
            routeActiveStrokeColor: "#00aee2",

            routeActivePedestrianSegmentStrokeStyle: "solid",
            routeActivePedestrianSegmentStrokeColor: "#00aee2",

            boundsAutoApply: true,
            zoomMargin: 50
        }

        let multiRoute = new ymaps.multiRouter.MultiRoute({
            // Описание опорных точек мультимаршрута.
            referencePoints: [
                defaultRefPoint,
                center,
            ],
            // Параметры маршрутизации.
            params: {
                // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
                results: 2,
                routingMode: toggles.filter('._active').data('type')
            }
        }, routeOptions);

        let mapPlacement = new ymaps.Map('mapPlacement', {
            center: center,
            zoom: zoom,
            autoFitToViewport: 'always',
            behaviors: ['default', 'scrollZoom'],
            controls: ['fullscreenControl'],
        }, {
            searchControlProvider: 'yandex#search'
        });

        // Добавляем мультимаршрут на карту.
        if(defaultRefPoint) {
            mapPlacement.geoObjects.add(multiRoute);
        }

        routePoints.on('click', (e) => {
            let el = $(e.currentTarget);
            let point = el.data('route-point').split(',');
            let referencePoints = [
                point,
                center,
            ];

            // loader.addClass('_active');
            routePoints.removeClass('_active');
            el.addClass('_active');

            multiRoute.model.setReferencePoints(referencePoints);
            // multiRoute.model.setParams({
            //     results: 2,
            //     routingMode: 'pedestrian'
            // });

            // console.log(multiRoute.model.getReferencePoints());
        });

        multiRoute.events.add('boundschange', function (e) {
            let bounds = multiRoute.getBounds();

            mapPlacement.setBounds(bounds, {
                checkZoomRange: true,
                callback: function(err) {
                    if(mapPlacement.getZoom() > 15) mapPlacement.setZoom(15);
                },
                zoomMargin: 30,
                duration: 400
            });

            // loader.removeClass('_active');
        });

        toggles.on('click', (e) => {
            let el = $(e.currentTarget);
            let type = el.data('type');
            
            if (type == 'auto') {
              let referencePoints = [
                  '',
                  center,
              ];
              multiRoute.model.setReferencePoints(referencePoints);
            }

            multiRoute.model.setParams({
                routingMode: type
            }, true);
        });

        searchBtn.on('click', () => {
            let value = searchField.val();

            if (value !== '') {
                let point = 'Москва, ' + value;

                let referencePoints = [
                    point,
                    center,
                ];

                multiRoute.model.setReferencePoints(referencePoints);
            } else {
                searchField.focus();
            }

            return false;
        });


    }

};
