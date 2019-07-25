"use strict";

import Common from "./modules/common";
import Menu from "./modules/menu";
import Header from "./modules/header";
import Search from "./modules/search";
import Sitemap from "./modules/sitemap";
import MobDropdown from "./modules/mobDropdown";
import Filter from "./modules/filter";
import ScrollMenu from "./modules/scrollMenu";
// import FilterMap from "./modules/filterMap";

import BlockFlats from "./modules/blockFlats";
import Cards from "./modules/cards";
// import PageTiles from "./modules/pageTiles";
import FieldNum from "./modules/fieldNum";
import FieldSelect from "./modules/fieldSelect";
import FileInput from "./modules/fileInput";
import Favorite from "./modules/favorite";
import Popup from "./modules/popup";
import CookieAlert from "./modules/cookieAlert";
import Tabs from "./modules/tabs";
import TimeRange from "./modules/timeRange";
import Spoiler from "./modules/spoiler";

import SliderIntro from "./modules/sliders/sliderIntro";
import SliderFeatured from "./modules/sliders/sliderFeatured";
import SliderLand from "./modules/sliders/sliderLand";
import SliderDefault from "./modules/sliders/sliderDefault";
import SliderThumbs from "./modules/sliders/sliderThumbs";

import FlatModal from "./modules/flatModal";
import Lightbox from "./modules/lightbox";

import Placement from "./modules/placement";
import SortTables from "./modules/sortTables";
import Diary from "./modules/diary";
import Layouts from "./modules/layouts";

import TextFolding from "./modules/textFolding";

import BnMap from "./modules/bnmap";

$(document).ready(function () {
    window.BODY = $('body').eq(0);
    window.HEADER = $('.header').eq(0);

    Common();
    Menu();
    Header();
    Search();
    Sitemap();
    MobDropdown();
    Filter();
    ScrollMenu();
    // FilterMap();

    SliderIntro();
    SliderFeatured();
    SliderLand();
    SliderDefault();
    SliderThumbs();

    BlockFlats();
    Cards();
    // PageTiles();
    FieldNum();
    $(document).on('update.sliders', function(){
        FieldNum();
    });

    FieldSelect();
    FileInput();
    Favorite();
    Popup();
    CookieAlert();
    Tabs();
    TimeRange();
    Spoiler();

    FlatModal();
    Lightbox();

    Placement();
    SortTables();
    Diary();
    Layouts();
    TextFolding();
    BnMap();
});
