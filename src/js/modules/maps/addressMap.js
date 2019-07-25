import * as vars from './vars';

export default function () {
    let mapBlock = $('#mapAddress');
    let mapRoot = $('.js-address-map');

    if (!mapBlock.length) return;

    let markerLinks = mapRoot.find('.js-map-marker-link');

    let setZoomMargin = () => {
        if (window.isDesktop) {
            return [
                {
                    top: 0,
                    left: 0,
                    width: `${((window.innerWidth - 1260) / 2) + 510}px`,
                    height: "100%"
                }, {
                    top: 0,
                    right: 0,
                    width: `${(window.innerWidth - 1260) / 2}px`,
                    height: "100%"
                }
            ];
        } else if (window.isLaptop) {
            return [];
        } else {
            return [];
        }
    };

    let setEventType = () => {
        if (window.isDesktop || window.isLaptop) {
            return 'mouseenter';
        } else {
            return 'click';
        }
    };

    let openBallonEventType = setEventType();

    $(window).on('resize', () => {
        openBallonEventType = setEventType();
    });

    let center = mapBlock.data('center').split(',');
    let zoom = mapBlock.data('zoom');
    let activeMarkerID;

    let mapAddress = new ymaps.Map('mapAddress', {
        center: center,
        zoom: zoom,
        behaviors: ['default', 'scrollZoom'],
        controls: [],
    }, {
        searchControlProvider: 'yandex#search'
    }),

    hintLayout = ymaps.templateLayoutFactory.createClass(
        `<div class="address-map__balloon">
            <span class="address-map__balloon-title">{{properties.title}}</span>
            <span class="address-map__balloon-text">{{properties.text}}</span>
        </div>`, {
    }),

    objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 60,
    });

    objectManager.objects.options.set({
        iconImageHref: vars.iconMarker,
        iconImageSize: [41, 52],
        iconImageOffset: [-20, -52],
        iconLayout: 'default#image',
        iconShape: {
            type: 'Polygon',
            coordinates: [
                [[-20,-52],[20,-52],[20,-32],[0,0],[-20,-32]]
            ]
        },
        hintLayout: hintLayout,
    });

    objectManager.objects.events.add('click', function (e) {
        onMarkerClick(e.get('objectId'));
    });

    let changeActiveMarker = (id) => {
        let marker = objectManager.objects.getById(id);

        mapAddress.panTo(marker.geometry.coordinates, {
            useMapMargin: true
        });
        objectManager.objects.setObjectOptions(activeMarkerID, {
            iconImageHref: vars.iconMarker,
        });
        activeMarkerID = id;
        objectManager.objects.setObjectOptions(id, {
            iconImageHref: vars.iconMarkerActive,
        });
    };

    let onMarkerClick = (id) => {
        markerLinks.removeClass('_active');
        markerLinks.filter(`[data-id=${id}]`).addClass('_active');
        changeActiveMarker(id);
    }

    mapAddress.geoObjects.add(objectManager);

    setZoomMargin().forEach(function (area) {
        var accessor = mapAddress.margin.addArea(area);
    });

    $.ajax({
        url: "/local/ajax/design-map-markers.php"
    }).done(function(data) {
        objectManager.add(data);
    });

    markerLinks.on('click', (e) => {
        e.preventDefault();
        let el = $(e.currentTarget);
        let id = el.data('id');

        if (!el.hasClass('_active')) {
            markerLinks.removeClass('_active');
            el.addClass('_active');

            changeActiveMarker(id);
        }
    });

};
