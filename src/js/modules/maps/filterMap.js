import * as vars from './vars';

export default function () {
    let filterMapBlock = $("#filterMap");
    let mapUrl = filterMapBlock.data('url') || "/local/ajax/filterMapMarkers.php";

    if (filterMapBlock.length) {
        let wrap = $('.js-filter-map-wrap');
        let mapPopup = $('.js-map-popup');
        let mapPopupClose = $('.js-map-popup-close');
        let mapOpenFilter = $('.js-map-open-filter');
        let mapCloseFilter = $('.js-map-close-filter');

        let center = filterMapBlock.data('center').split(',');
        let zoom = filterMapBlock.data('zoom');
        var activeMarkerID;
        var points;

        var filterMap = new ymaps.Map('filterMap', {
                center: center,
                zoom: zoom,
                behaviors: ['default', 'scrollZoom'],
                controls: [],
            }, {
                searchControlProvider: 'yandex#search'
            }),

            objectManager = new ymaps.ObjectManager({
                // Чтобы метки начали кластеризоваться, выставляем опцию.
                clusterize: true,
                // ObjectManager принимает те же опции, что и кластеризатор.
                gridSize: 32,
                // clusterDisableClickZoom: true
            });

        // Чтобы задать опции одиночным объектам и кластерам,
        // обратимся к дочерним коллекциям ObjectManager.
        objectManager.objects.options.set({
            iconImageHref: vars.iconMarker,
            iconImageSize: [41, 52],
            iconImageOffset: [-20, -52],
            iconLayout: 'default#image',
        });

        objectManager.objects.events.add('click', function (e) {
            if (mapPopup.length) {
                onMarkerClick(e.get('objectId'));
            }
        });

        let onMarkerClick = (id) => {
            let delay, sliderHtml = '';
            let marker = objectManager.objects.getById(id);
            let slider = $('.swiper-wrapper');
            if (activeMarkerID !== id) {

                mapPopup.addClass('_opened');
                filterMapBlock.addClass('_popup-opened');

                mapPopup.find('.map-popup__title').html(marker.info.name);
                mapPopup.find('.map-popup__price').html(marker.info.price);
                mapPopup.find('.ix-detail').attr('href', marker.info.url);
                mapPopup.find('.ix-address').html(marker.info.address);
                mapPopup.find('.ix-add-to-fav').data('id', marker.info.id).attr('data-id', marker.info.id);

                if(!marker.info.slider) {
                    slider.hide();
                } else {

                    for(let i = 0;  i < marker.info.slider.length; i++) {
                        sliderHtml += '<div class="swiper-slide"><img src="'+marker.info.slider[i]+'" alt=""></div>';
                    }
                    slider.html(sliderHtml);
                    slider.show();
                    $(window).trigger('resize');

                }

                $(document).trigger('update_favorite');

            }

            delay = 0;

            if (!window.isMobile) {
                panToMarker(id);
                setTimeout(() => {
                }, delay);
            }


            objectManager.objects.setObjectOptions(activeMarkerID, {
                iconImageHref: vars.iconMarker,
            });

            activeMarkerID = id;

            objectManager.objects.setObjectOptions(id, {
                iconImageHref: vars.iconMarkerActive,
            });
        }

        let panToMarker = (id) => {
            let marker = objectManager.objects.getById(id);
            // filterMap.container.fitToViewport();

            filterMap.panTo(marker.geometry.coordinates, {
                checkZoomRange: true
            }).then(() => {
                // filterMap.setZoom(12, {
                //     duration: 500,
                //     // delay: 100
                // });
            }, (err) => {
            });
        };



        let showVisiblePoints = function(e) {

            let visiblePoints = [];
            let bounds = filterMap.getBounds();
            let block = $('.filter-map__items');
            block.empty();
            objectManager.objects.each(function (object) {
                let objectState = objectManager.getObjectState(object.id);
                if (objectState.isShown) {

                    if (object.geometry.coordinates[0] >= bounds[0][0]) {
                        if (object.geometry.coordinates[0] <= bounds[1][0]) {
                            if (object.geometry.coordinates[1] >= bounds[0][1]) {
                                if (object.geometry.coordinates[1] <= bounds[1][1]) {
                                    visiblePoints.push(object);
                                }
                            }
                        }
                    }
                }
            });

            if(visiblePoints.length) {
                for(let i = 0; i < visiblePoints.length; i++) {
                    let html = $($('#ix-left-map-template').html());
                    html.data('id', visiblePoints[i].info.id);
                    html.find('img').attr('src', visiblePoints[i].info.picture);
                    html.find('.map-card__name').text(visiblePoints[i].info.name);
                    html.find('.map-card__cost').text(visiblePoints[i].info.price);
                    block.append(html);
                }
            }

        };

        let reloadData = function(filter) {

            filter = filter || {};

            $.ajax({
                data: {
                    filter: filter
                },
                url: mapUrl
            }).done(function(data) {
                points = data;
                objectManager.removeAll();
                objectManager.add(data);
                setTimeout(function () {
                    showVisiblePoints();
                }, 100)
            });

        };



        objectManager.clusters.options.set({
            preset: 'islands#nightClusterIcons'
        });
        filterMap.geoObjects.add(objectManager);

        reloadData();

        $(document).on('click','.js-map-card',  (e) => {
            let el = $(e.currentTarget);
            onMarkerClick(el.data('id'));
            wrap.removeClass('_filter-opened');
        });

        mapPopupClose.on('click', (e) => {
            mapPopup.removeClass('_opened');
            filterMapBlock.removeClass('_popup-opened');

            setTimeout(() => {
                filterMap.container.fitToViewport();
            }, 300);
        });

        mapOpenFilter.on('click', (e) => {
            wrap.addClass('_filter-opened');
        });

        mapCloseFilter.on('click', (e) => {
            wrap.removeClass('_filter-opened');
        });

        filterMap.events.add(['boundschange','datachange','objecttypeschange'], showVisiblePoints);

        $('#set_filter').on('filter.updated', function(){

            reloadData($(this).data('filter'));
        });

    }
};
