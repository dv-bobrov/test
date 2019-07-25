import * as vars from './vars';

export default function () {
    let contactsMapBlock = $("#contactsMap");

    if (contactsMapBlock.length) {
        let center = contactsMapBlock.data('center').split(',');
        let zoom = contactsMapBlock.data('zoom');
        let defaultRefPoint = contactsMapBlock.data('ref-point').split(',');
        let routePoints = $('.js-route-point');
        let loader = $('.js-map-loader');

        let routeOptions = {
            // Внешний вид путевых точек.
            wayPointStartIconColor: "#00aee2",
            wayPointStartIconFillColor: "#fff",

            // Задаем собственную картинку для последней путевой точки.
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

            // Позволяет скрыть точечные маркеры путевых точек.
            // pinVisible:false,

            // Внешний вид линии маршрута.
            routeStrokeWidth: 2,
            routeStrokeColor: "#000088",
            routeActiveStrokeWidth: 4,
            routeActiveStrokeColor: "#00aee2",

            // Внешний вид линии пешеходного маршрута.
            routeActivePedestrianSegmentStrokeStyle: "solid",
            routeActivePedestrianSegmentStrokeColor: "#00aee2",

            // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
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
                routingMode: 'pedestrian'
            }
        }, routeOptions);

        let contactsMap = new ymaps.Map('contactsMap', {
            center: center,
            zoom: zoom,
            behaviors: ['default', 'scrollZoom'],
            controls: ['typeSelector'],
        }, {
            searchControlProvider: 'yandex#search'
        });

        // Добавляем мультимаршрут на карту.
        contactsMap.geoObjects.add(multiRoute);

        let disBehavior = (window.isMobile || window.isTablet) ? 'drag' : false;

        contactsMap.behaviors.disable(disBehavior);

        if (window.isMobile || window.isTablet) {
            contactsMap.events.add('click', (e) => {
                console.log('action');
            });
        }

        routePoints.on('click', (e) => {
            let el = $(e.currentTarget);
            let point = el.data('route-point').split(',');
            let referencePoints = [
                point,
                center,
            ];

            loader.addClass('_active');

            multiRoute.model.setReferencePoints(referencePoints);
            multiRoute.model.setParams({
                results: 2,
                routingMode: 'pedestrian'
            });

            // console.log(multiRoute.model.getReferencePoints());

            multiRoute.events.add('boundschange', function (e) {
                let bounds = multiRoute.getBounds();

                contactsMap.setBounds(bounds, {
                    zoomMargin: 20,
                    duration: 400
                });

                loader.removeClass('_active');
            });
        });
    }

};
