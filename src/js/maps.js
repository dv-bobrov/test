"use strict";

import FilterMap from "./modules/maps/filterMap";
import Contacts from "./modules/maps/contacts";
import SinglePinMap from "./modules/maps/singlePinMap";
import AddressMap from "./modules/maps/addressMap";

import MapInfra from "./modules/maps/mapInfra";
import MapPlacement from "./modules/maps/mapPlacement";


ymaps.ready(function () {
    FilterMap();
    Contacts();
    SinglePinMap();
    AddressMap();

    MapInfra();
    MapPlacement();
});
