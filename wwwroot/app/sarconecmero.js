var snm;
(function (snm) {
    class AppConstants {
        static get CORE_MODULE_NAME() {
            return "snm";
        }
        static get APP_MODULE_NAME() {
            return this.CORE_MODULE_NAME + ".app";
        }
        static get COMPONENTS_MODULE_NAME() {
            return this.CORE_MODULE_NAME + ".components";
        }
        static get PAGES_MODULE_NAME() {
            return this.CORE_MODULE_NAME + ".pages";
        }
        static get SERVICES_MODULE_NAME() {
            return this.CORE_MODULE_NAME + ".services";
        }
        static get MAPS_MODULE_NAME() {
            return this.CORE_MODULE_NAME + ".maps";
        }
        static get OPS_MODULE_NAME() {
            return this.CORE_MODULE_NAME + ".ops";
        }
        static get PERS_MODULE_NAME() {
            return this.CORE_MODULE_NAME + ".pers";
        }
        static get CHRONO_MODULE_NAME() {
            return this.CORE_MODULE_NAME + ".chrono";
        }
    }
    snm.AppConstants = AppConstants;
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/angular/angular-route.d.ts" />
var snm;
(function (snm) {
    var components;
    (function (components) {
        class Controller {
            constructor($route) {
                this.$route = $route;
                this.currentNavItem = this._getNavItem($route.current.name);
            }
            _getNavItem(routeName) {
                if (!routeName) {
                    //Default is 'home'
                    return "home";
                }
                switch (routeName) {
                    case "home":
                        return "home";
                    case "sites":
                    case "site-details":
                    case "site-edit":
                        return "sites";
                    default:
                        return "home";
                }
            }
        }
        // component
        angular.module("snm.components.navMenu", []).component("navMenu", {
            templateUrl: '/app/components/nav-menu/nav-menu.component.html',
            controller: Controller,
            controllerAs: "vm"
        });
    })(components = snm.components || (snm.components = {}));
})(snm || (snm = {}));
/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="nav-menu/nav-menu.component.ts" />
var snm;
(function (snm) {
    var components;
    (function (components) {
        angular.module(snm.AppConstants.COMPONENTS_MODULE_NAME, [
            "snm.components.navMenu"
        ]);
    })(components = snm.components || (snm.components = {}));
})(snm || (snm = {}));
/// <reference path="../../typings/angular/angular.d.ts" />
var snm;
(function (snm) {
    var services;
    (function (services) {
        var settings;
        (function (settings) {
            class UserSettings {
                constructor() {
                    if (UserSettings.defaultSettings) {
                        this._opsReferentialId = UserSettings.defaultSettings.opsReferentialId;
                        this._startZoom = UserSettings.defaultSettings.startZoom;
                        this._homeLocation = UserSettings.defaultSettings.homeLocation;
                    }
                }
                static fetchSettings($http) {
                    return $http.get("api/settings/default")
                        .then((result) => {
                        UserSettings.defaultSettings = result.data;
                        return result.data;
                    });
                }
                /**
                 * The Id of the Referential to use when displaying Sites or Operations.
                 */
                get opsReferentialId() {
                    return this._opsReferentialId;
                }
                set opsReferentialId(value) {
                    this._opsReferentialId = value;
                }
                /**
                 * The starting zoom level of the map.
                 */
                get startZoom() {
                    return this._startZoom;
                }
                set startZoom(value) {
                    this._startZoom = value;
                }
                /**
                 * The starting center of the map, in EPSG:2154.
                 */
                get homeLocation() {
                    return this._homeLocation;
                }
                set homeLocation(value) {
                    this._homeLocation = value;
                }
            }
            settings.UserSettings = UserSettings;
            angular.module("snm.services.settings", [])
                .factory("userSettings", () => new UserSettings());
        })(settings = services.settings || (services.settings = {}));
    })(services = snm.services || (snm.services = {}));
})(snm || (snm = {}));
var adnw;
(function (adnw) {
    var common;
    (function (common) {
        class EventBlock {
            constructor() {
                this._map = new Map();
            }
            on(event, callback) {
                if (!event) {
                    throw new Error("Event cannot be empty.");
                }
                if (!callback) {
                    throw new Error("Callback cannot be null.");
                }
                let set;
                if (!this._map.has(event)) {
                    set = new Set();
                    this._map.set(event, set);
                }
                else {
                    set = this._map.get(event);
                }
                set.add(callback);
            }
            un(event, callback) {
                if (!event) {
                    throw new Error("Event cannot be empty.");
                }
                if (!callback) {
                    throw new Error("Callback cannot be null.");
                }
                if (this._map.has(event)) {
                    let set = this._map.get(event);
                    set.delete(callback);
                }
            }
            dispatch(event, oldValue, newValue) {
                if (!event) {
                    throw new Error("Event cannot be empty.");
                }
                if (!this._map.has(event)) {
                    return;
                }
                let set = this._map.get(event);
                set.forEach((cb) => {
                    cb(oldValue, newValue);
                });
            }
        }
        common.EventBlock = EventBlock;
    })(common = adnw.common || (adnw.common = {}));
})(adnw || (adnw = {}));
/// <reference path="../../../../typings/openlayers/openlayers.d.ts" />
/// <reference path="../../../../typings/proj4/proj4.d.ts" />
/// <reference path="../../../common/event-block.ts" />
/// <reference path="./map.ts" />
var snm;
(function (snm) {
    var maps;
    (function (maps) {
        var components;
        (function (components) {
            class ViewManager {
                constructor(map, olMap, eventBlock) {
                    if (!map) {
                        throw new Error("Map cannot be null.");
                    }
                    if (!olMap) {
                        throw new Error("OlMap cannot be null.");
                    }
                    if (!eventBlock) {
                        throw new Error("EventBlock cannot be null.");
                    }
                    this._map = map;
                    this._olMap = olMap;
                    this._eventBlock = eventBlock;
                    olMap.on("change:view", (ev) => {
                        //Unregister from previous view
                        let oldView = ev.oldValue;
                        this._unregisterFromViewEvents(oldView);
                        //Register to new one
                        let view = ev.target.get(ev.key);
                        this._registerToViewEvents(view);
                    });
                    this._setupView(olMap.getView());
                }
                get center() {
                    return this._center;
                }
                set center(value) {
                    this._center = value;
                    this._olMap.getView().setCenter(value);
                }
                get scale() {
                    return this._scale;
                }
                get zoom() {
                    return this._zoom;
                }
                set zoom(value) {
                    this._zoom = value;
                    this._olMap.getView().setZoom(value);
                }
                flyTo(coordinates, done) {
                    let view = this._olMap.getView();
                    let duration = 2000;
                    let zoom = view.getZoom();
                    let parts = 2;
                    let called = false;
                    let callback = (complete) => {
                        --parts;
                        if (called) {
                            return;
                        }
                        if (parts === 0 || !complete) {
                            called = true;
                            if (done) {
                                done(complete);
                            }
                        }
                    };
                    view.animate({
                        center: coordinates,
                        duration: duration
                    }, callback);
                    view.animate({
                        zoom: zoom - 1,
                        duration: duration / 2
                    }, {
                        zoom: zoom,
                        duration: duration / 2
                    }, callback);
                }
                _computeScale(resolution, proj) {
                    let dpi = 25.4 / 0.28;
                    let scale = resolution * proj.getMetersPerUnit() * 39.37 * dpi;
                    return scale;
                }
                _registerToViewEvents(view) {
                    this._resolutionChangeKey = view.on("change:resolution", (ev) => {
                        let view = ev.target;
                        let proj = view.getProjection();
                        let newRes = ev.target.get(ev.key);
                        let oldScale = this._scale;
                        this._scale = this._computeScale(newRes, proj);
                        this._eventBlock.dispatch("change:scale", oldScale, this._scale);
                        let oldZoom;
                        this._zoom = view.getZoom();
                        this._eventBlock.dispatch("change:zoom", oldZoom, this._zoom);
                    });
                    this._centerChangeKey = view.on("change:center", (ev) => {
                        let oldCenter = this._center;
                        let newCenter = ev.target.get(ev.key);
                        this._center = newCenter;
                        this._eventBlock.dispatch("change:center", oldCenter, newCenter);
                    });
                }
                _unregisterFromViewEvents(view) {
                    if (this._resolutionChangeKey) {
                        view.unByKey(this._resolutionChangeKey);
                    }
                    if (this._centerChangeKey) {
                        view.unByKey(this._centerChangeKey);
                    }
                }
                _setupView(view) {
                    this._registerToViewEvents(view);
                    this._center = view.getCenter();
                    this._scale = this._computeScale(view.getResolution(), view.getProjection());
                    this._zoom = view.getZoom();
                }
            }
            components.ViewManager = ViewManager;
        })(components = maps.components || (maps.components = {}));
    })(maps = snm.maps || (snm.maps = {}));
})(snm || (snm = {}));
/// <reference path="../../../../../typings/openlayers/openlayers.d.ts" />
/// <reference path="../map.ts" />
var snm;
(function (snm) {
    var maps;
    (function (maps) {
        var components;
        (function (components) {
            class CursorPosition extends ol.interaction.Pointer {
                constructor(map) {
                    if (!map) {
                        throw new Error("Map cannot be null.");
                    }
                    super({
                        handleMoveEvent: (ev) => {
                            this._map.cursor = this._map.convertFromProj(ev.coordinate);
                            return true;
                        }
                    });
                    this._map = map;
                }
            }
            components.CursorPosition = CursorPosition;
        })(components = maps.components || (maps.components = {}));
    })(maps = snm.maps || (snm.maps = {}));
})(snm || (snm = {}));
/// <reference path="../../../../../typings/openlayers/openlayers.d.ts" />
var snm;
(function (snm) {
    var maps;
    (function (maps) {
        var components;
        (function (components) {
            class LocationPicker extends ol.interaction.Interaction {
                constructor() {
                    let resolve;
                    let reject;
                    super({
                        handleEvent: (ev) => {
                            switch (ev.type) {
                                case "pointerup":
                                    resolve(ev.coordinate);
                                    break;
                                case "keydown":
                                    let keyEvent = ev.originalEvent;
                                    let key = keyEvent.key;
                                    if (key === "Escape") {
                                        reject("Cancelled");
                                    }
                                    break;
                            }
                            return true;
                        }
                    });
                    this._promise = new Promise((res, rej) => {
                        resolve = res;
                        reject = rej;
                    });
                    this._resolve = resolve;
                    this._reject = reject;
                }
                get promise() {
                    return this._promise;
                }
                handleEvent(ev) {
                    this._resolve(ev.coordinate);
                    return true;
                }
            }
            components.LocationPicker = LocationPicker;
        })(components = maps.components || (maps.components = {}));
    })(maps = snm.maps || (snm.maps = {}));
})(snm || (snm = {}));
/// <reference path="../../../../typings/openlayers/openlayers.d.ts" />
/// <reference path="../../../../typings/proj4/proj4.d.ts" />
/// <reference path="../../../common/event-block.ts" />
/// <reference path="./view-manager.ts" />
/// <reference path="./interactions/cursor-position.ts" />
/// <reference path="./interactions/location-picker.ts" />
/// <reference path="../../../services/user-settings.ts" />
var snm;
(function (snm) {
    var maps;
    (function (maps) {
        var components;
        (function (components) {
            class Map {
                constructor(elementId, userSettings) {
                    this.userSettings = userSettings;
                    this._PROJ = "EPSG:3857";
                    this._DATA_PROJ = "EPSG:2154";
                    Map.loadProjections();
                    this._map = this._createMap(elementId);
                    this._eventBlock = new adnw.common.EventBlock();
                    this._viewManager = new snm.maps.components.ViewManager(this, this._map, this._eventBlock);
                }
                static loadProjections() {
                    proj4.defs("EPSG:2154", "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
                }
                get center() {
                    return this._viewManager.center;
                }
                set center(value) {
                    this._viewManager.center = value;
                }
                get scale() {
                    return this._viewManager.scale;
                }
                get zoom() {
                    return this._viewManager.zoom;
                }
                set zoom(value) {
                    this._viewManager.zoom = value;
                }
                /**
                 * Current cursor position, in EPSG:2154.
                 */
                get cursor() {
                    return this._cursor;
                }
                set cursor(value) {
                    let oldValue = this._cursor;
                    this._cursor = value;
                    this._eventBlock.dispatch("change:cursorPosition", oldValue, value);
                }
                /**
                 * Convert from DATA_PROJ (EPSG:2154) to PROJ (EPSG:3857).
                 * @param coordinates The coordinates to convert.
                 */
                convertToProj(coordinates) {
                    return proj4(this._DATA_PROJ, this._PROJ, coordinates);
                }
                /**
                 * Convert from PROJ (EPSG:3857) to DATA_PROJ (EPSG:2154).
                 * @param coordinates The coordinates to convert.
                 */
                convertFromProj(coordinates) {
                    return proj4(this._PROJ, this._DATA_PROJ, coordinates);
                }
                flyTo(coordinates, done) {
                    this._viewManager.flyTo(coordinates, done);
                }
                pickLocation() {
                    let picker = new components.LocationPicker();
                    this._map.addInteraction(picker);
                    picker.promise.then(() => {
                        this._map.removeInteraction(picker);
                    }, () => {
                        this._map.removeInteraction(picker);
                    });
                    return picker.promise;
                }
                addLayer(layer) {
                    if (!layer) {
                        return;
                    }
                    this._map.addLayer(layer);
                }
                removeLayer(layer) {
                    if (!layer) {
                        return;
                    }
                    this._map.removeLayer(layer);
                }
                on(event, callback) {
                    if (!event) {
                        throw new Error("Event cannot be empty.");
                    }
                    if (!callback) {
                        throw new Error("Callback cannot be null.");
                    }
                    this._eventBlock.on(event, callback);
                }
                un(event, callback) {
                    if (!event) {
                        throw new Error("Event cannot be empty.");
                    }
                    if (!callback) {
                        throw new Error("Callback cannot be null.");
                    }
                    this._eventBlock.un(event, callback);
                }
                _createMap(elementId) {
                    let center;
                    //Check if a current location is defined
                    if (this.userSettings.currentLocation) {
                        //Already in target projection
                        center = this.userSettings.currentLocation;
                    }
                    //Check if home location can be used
                    if (!center && this.userSettings.homeLocation) {
                        center = this.convertToProj(this.userSettings.homeLocation);
                    }
                    let zoom;
                    //Check if a current zoom is defined
                    if (this.userSettings.currentZoom) {
                        zoom = this.userSettings.currentZoom;
                    }
                    //Check if start zoom can be used
                    if (typeof zoom !== "number" && typeof this.userSettings.startZoom === "number") {
                        zoom = this.userSettings.startZoom;
                    }
                    let view = new ol.View({
                        projection: this._PROJ,
                        center: center ? center : [0, 0],
                        zoom: typeof zoom === "number" ? zoom : 1
                    });
                    let layers = [
                        new ol.layer.Tile({
                            source: new ol.source.OSM()
                        })
                    ];
                    let map = new ol.Map({
                        target: elementId,
                        loadTilesWhileAnimating: true,
                        view: view,
                        layers: layers,
                        interactions: ol.interaction.defaults().extend([new snm.maps.components.CursorPosition(this)])
                    });
                    setTimeout(() => {
                        map.updateSize();
                    });
                    return map;
                }
            }
            components.Map = Map;
        })(components = maps.components || (maps.components = {}));
    })(maps = snm.maps || (snm.maps = {}));
})(snm || (snm = {}));
/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../services/user-settings.ts" />
/// <reference path="../map/map.ts" />
var snm;
(function (snm) {
    var maps;
    (function (maps) {
        var components;
        (function (components) {
            class Controller {
                constructor($scope, userSettings) {
                    this.$scope = $scope;
                    this.userSettings = userSettings;
                    this._showScale = true;
                }
                get showScale() {
                    return this._showScale;
                }
                set showScale(value) {
                    this._showScale = value;
                }
                get map() {
                    return this._map;
                }
                set map(value) {
                    this._map = value;
                    if (value) {
                        this._registerToMapEvents(value);
                    }
                }
                flyToHome() {
                    let home = this._map.convertToProj(this.userSettings.homeLocation);
                    this._map.flyTo(home, () => {
                        this.$scope.$apply();
                    });
                }
                toggleScale() {
                    this._showScale = !this._showScale;
                }
                _registerToMapEvents(map) {
                    if (!map) {
                        throw new Error("Map cannot be null.");
                    }
                    map.on("change:scale", () => {
                        this._onChange();
                    });
                    map.on("change:zoom", (oldValue, newValue) => {
                        if (this.userSettings) {
                            this.userSettings.currentZoom = newValue;
                        }
                        this._onChange();
                    });
                    map.on("change:cursorPosition", () => {
                        this._onChange();
                    });
                    map.on("change:center", (oldValue, newValue) => {
                        if (this.userSettings) {
                            this.userSettings.currentLocation = newValue;
                        }
                        this._onChange();
                    });
                }
                _onChange(oldValue, newValue) {
                    if (!this.$scope) {
                        return;
                    }
                    this.$scope.$applyAsync();
                }
            }
            Controller.$inject = ["$scope", "userSettings"];
            // component
            angular.module("snm.maps.components.map-toolbar", [
                "snm.services.settings"
            ]).component("mapToolbar", {
                templateUrl: "/app/maps/components/map-toolbar/map-toolbar.component.html",
                controller: Controller,
                controllerAs: "vm",
                bindings: {
                    map: "<",
                    showHome: "="
                }
            });
        })(components = maps.components || (maps.components = {}));
    })(maps = snm.maps || (snm.maps = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../services/dal/definitions.ts" />
/// <reference path="../services/dal/definitions.ts" />
/// <reference path="../services/dal/definitions.ts" />
/// <reference path="../chrono/definitions.ts" />
/// <reference path="../pers/definitions.ts" />
/// <reference path="./definitions.ts" />
/// <reference path="./definitions.ts" />
var snm;
(function (snm) {
    var ops;
    (function (ops) {
        var details;
        (function (details) {
            class SiteArcheo {
                clone() {
                    let site = new SiteArcheo();
                    site.updateFrom(this);
                    return site;
                }
                updateFrom(other) {
                    if (!other) {
                        return;
                    }
                    this.id = other.id;
                    this.reference = other.reference;
                    this.codeCommune = other.codeCommune;
                    this.commune = other.commune;
                    this.departement = other.departement;
                    this.x = other.x;
                    this.y = other.y;
                    this.localisation = other.localisation;
                    this.debutOccupationId = other.debutOccupationId;
                    this.finOccupationId = other.finOccupationId;
                    this.operations = _.cloneDeep(other.operations);
                    this.identifications = _.cloneDeep(other.identifications);
                }
                isEquivalent(other) {
                    if (!other) {
                        return false;
                    }
                    let result = true;
                    result = result && this.id === other.id;
                    result = result && this.reference === other.reference;
                    result = result && this.codeCommune === other.codeCommune;
                    result = result && this.commune === other.commune;
                    result = result && this.departement === other.departement;
                    result = result && this.x === other.x;
                    result = result && this.y === other.y;
                    result = result && this.localisation === other.localisation;
                    result = result && this.debutOccupationId === other.debutOccupationId;
                    result = result && this.finOccupationId === other.finOccupationId;
                    result = result && _.isEqual(this.operations, other.operations);
                    result = result && _.isEqual(this.identifications, other.identifications);
                    return result;
                }
            }
            details.SiteArcheo = SiteArcheo;
        })(details = ops.details || (ops.details = {}));
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/openlayers/openlayers.d.ts" />
/// <reference path="../../services/user-settings.ts" />
/// <reference path="../../ops/definitions-summary.ts" />
/// <reference path="../../ops/definitions-details.ts" />
var snm;
(function (snm) {
    var maps;
    (function (maps) {
        var services;
        (function (services) {
            class Service {
                getSiteSummaryStyle(site) {
                    if (!site) {
                        throw new Error("Site cannot be null.");
                    }
                    let canvas = this._getSiteSummaryCanvas(site);
                    return this._getStyle(canvas);
                }
                getSiteDetailsStyle(site) {
                    if (!site) {
                        throw new Error("Site cannot be null.");
                    }
                    let canvas = this._getSiteSummaryCanvas(site);
                    return this._getStyle(canvas);
                }
                getOperationDetailsStyle(operation) {
                    if (!operation) {
                        throw new Error("Operation cannot be null.");
                    }
                    let canvas;
                    return this._getStyle(canvas);
                }
                _getStyle(canvas, anchorInfo) {
                    if (!canvas) {
                        throw new Error("Canvas cannot be null.");
                    }
                    let options = {
                        img: canvas,
                        imgSize: [canvas.width, canvas.height]
                    };
                    if (anchorInfo) {
                        options.anchor = anchorInfo.anchor;
                        if (anchorInfo.anchorOrigin) {
                            options.anchorOrigin = anchorInfo.anchorOrigin;
                        }
                        if (anchorInfo.anchorXUnits) {
                            options.anchorXUnits = anchorInfo.anchorXUnits;
                        }
                        if (anchorInfo.anchorYUnits) {
                            options.anchorYUnits = anchorInfo.anchorYUnits;
                        }
                    }
                    let style = new ol.style.Style({
                        image: new ol.style.Icon(options)
                    });
                    return style;
                }
                _getSiteSummaryCanvas(site) {
                    let content = site.identifications[0].reference;
                    let width = this._getWidth(content);
                    let height = 20;
                    let background = "#000";
                    let foreground = "#fff";
                    let font = "Verdana 12px";
                    let canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;
                    let ctx = canvas.getContext("2d");
                    ctx.fillStyle = background;
                    ctx.strokeStyle = foreground;
                    ctx.lineWidth = 2;
                    ctx.rect(0.5, 0.5, width - 2, height - 2);
                    ctx.fill();
                    ctx.stroke();
                    ctx.font = font;
                    ctx.fillStyle = foreground;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(content, ~~(width / 2), ~~(height / 2));
                    return canvas;
                }
                _getWidth(content) {
                    let width;
                    switch (content.length) {
                        case 1:
                            width = 18;
                            break;
                        case 2:
                            width = 22;
                            break;
                        case 3:
                            width = 27;
                            break;
                        default:
                            width = 32;
                    }
                    return width;
                }
            }
            angular.module("snm.maps.services.iconService", [])
                .factory("iconService", () => new Service());
        })(services = maps.services || (maps.services = {}));
    })(maps = snm.maps || (snm.maps = {}));
})(snm || (snm = {}));
/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="./components/map-toolbar/map-toolbar.component.ts" />
/// <reference path="./services/icon-service.ts" />
var snm;
(function (snm) {
    var maps;
    (function (maps) {
        angular.module(snm.AppConstants.MAPS_MODULE_NAME, [
            "snm.maps.components.map-toolbar",
            "snm.maps.services.iconService"
        ]);
    })(maps = snm.maps || (snm.maps = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
var snm;
(function (snm) {
    var pages;
    (function (pages) {
        // controller
        class Controller {
            constructor() {
            }
        }
        // component
        angular.module("snm.pages.layoutPage", [
            "ngRoute",
            "snm.components.navMenu"]).component("layoutPage", {
            templateUrl: '/app/pages/layout/layout.page.html',
            controller: Controller,
            controllerAs: "vm"
        });
    })(pages = snm.pages || (snm.pages = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
var snm;
(function (snm) {
    var pages;
    (function (pages) {
        // controller
        class Controller {
            constructor() {
            }
        }
        // component
        angular.module("snm.pages.mainPage", [
            "ngRoute"]).component("mainPage", {
            templateUrl: '/app/pages/main/main.page.html',
            controller: Controller,
            controllerAs: "vm"
        });
    })(pages = snm.pages || (snm.pages = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../ops/definitions-summary.ts" />
/// <reference path="../../maps/components/map/map.ts" />
/// <reference path="../../maps/components/map-toolbar/map-toolbar.component.ts" />
/// <reference path="../../maps/services/icon-service.ts" />
var snm;
(function (snm) {
    var pages;
    (function (pages) {
        // controller
        class Controller {
            constructor($scope, $log, $http, $location, userSettings, iconService) {
                this.$scope = $scope;
                this.$log = $log;
                this.$http = $http;
                this.$location = $location;
                this.userSettings = userSettings;
                this.iconService = iconService;
                this._getSitesData();
            }
            get map() {
                return this._map;
            }
            $postLink() {
                setTimeout(() => this._setupMap());
            }
            onSelectSite(siteId) {
                this.$location.path("/sites/" + siteId);
            }
            _setupMap() {
                this._map = new snm.maps.components.Map("map", this.userSettings);
                this._siteSource = new ol.source.Vector();
                let siteLayer = new ol.layer.Vector({
                    renderOrder: null,
                    source: this._siteSource
                });
                this._map.addLayer(siteLayer);
            }
            _getSitesData() {
                this.$http.get("api/ops/sites/summary")
                    .then((result) => {
                    let map = new Map();
                    let commune;
                    //Clear site source if it exists
                    if (this._siteSource) {
                        this._siteSource.clear();
                    }
                    result.data.forEach((site) => {
                        //Try to add site to map
                        this._addSiteToMap(site);
                        //Check if CodeCommune is known
                        commune = map.get(site.codeCommune);
                        if (!commune) {
                            //Create a new Commune
                            commune = {
                                code: site.codeCommune,
                                nom: site.commune ? site.commune : "Commune non renseignée",
                                departement: site.departement,
                                sites: []
                            };
                            //Add it to the map
                            map.set(commune.code, commune);
                        }
                        //Add Site to commune
                        site.identifications.forEach((id) => {
                            if (id.referentielId === this.userSettings.opsReferentialId) {
                                site.reference = id.reference;
                            }
                        });
                        commune.sites.push(site);
                    });
                    this.communes = [];
                    map.forEach((c) => {
                        this.communes.push(c);
                    });
                });
            }
            _addSiteToMap(site) {
                if (!this._siteSource || !site) {
                    return;
                }
                if (typeof site.x !== "number" || typeof site.y !== "number") {
                    //Cannot display site without coordinates
                    return;
                }
                let coordinates = [site.x, site.y];
                coordinates = this._map.convertToProj(coordinates);
                let siteFeature = new ol.Feature({
                    geometry: new ol.geom.Point(coordinates)
                });
                siteFeature.setStyle(this.iconService.getSiteSummaryStyle(site));
                this._siteSource.addFeature(siteFeature);
            }
        }
        Controller.$inject = ["$scope", "$log", "$http", "$location", "userSettings", "iconService"];
        // component
        angular.module("snm.pages.sitesPage", [
            "ngRoute",
            "snm.maps.components.map-toolbar",
            "snm.maps.services.iconService",
            "snm.ops.components.siteArcheoList"]).component("sitesPage", {
            templateUrl: '/app/pages/sites/sites.page.html',
            controller: Controller,
            controllerAs: "vm"
        });
    })(pages = snm.pages || (snm.pages = {}));
})(snm || (snm = {}));
/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../../common/event-block.ts" />
/// <reference path="../../definitions-details.ts" />
var snm;
(function (snm) {
    var ops;
    (function (ops) {
        var components;
        (function (components) {
            // controller
            class Controller {
                constructor($scope, $log, userSettings) {
                    this.$scope = $scope;
                    this.$log = $log;
                    this.userSettings = userSettings;
                }
                centerOnLocation() {
                    this.eventBlock.dispatch("center", null, [this.site.x, this.site.y]);
                }
                pickLocation() {
                    this.eventBlock.dispatch("pickLocation");
                }
            }
            Controller.$inject = ["$scope", "$log", "userSettings"];
            // component
            angular.module("snm.ops.components.siteLocalisation", ["ngRoute"])
                .component("siteLocalisation", {
                templateUrl: '/app/ops/components/site-localisation/site-localisation.component.html',
                controller: Controller,
                controllerAs: "vm",
                bindings: {
                    site: "<",
                    allowEdition: "=",
                    eventBlock: "<"
                }
            });
        })(components = ops.components || (ops.components = {}));
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));
/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../../../typings/angular-material/angular-material.d.ts" />
/// <reference path="../../../common/event-block.ts" />
/// <reference path="../../definitions-details.ts" />
/// <reference path="../../../services/user-settings.ts" />
/// <reference path="../../../maps/services/icon-service.ts" />
var snm;
(function (snm) {
    var ops;
    (function (ops) {
        var components;
        (function (components) {
            // controller
            class Controller {
                constructor($scope, $log, $mdToast, userSettings, iconService) {
                    this.$scope = $scope;
                    this.$log = $log;
                    this.$mdToast = $mdToast;
                    this.userSettings = userSettings;
                    this.iconService = iconService;
                }
                get site() {
                    return this._site;
                }
                set site(value) {
                    this._site = value;
                    this._addSiteToMap();
                    if (this._map) {
                        this._map.center = this._map.convertToProj([this._site.x, this._site.y]);
                    }
                }
                get map() {
                    return this._map;
                }
                $postLink() {
                    setTimeout(() => this._setupMap());
                    if (this.eventBlock) {
                        this.eventBlock.on("center", this._onCenter.bind(this));
                        this.eventBlock.on("pickLocation", this._onPickLocation.bind(this));
                        this.eventBlock.on("refreshLocation", this._onRefreshLocation.bind(this));
                    }
                }
                _setupMap() {
                    this._map = new snm.maps.components.Map("map", this.userSettings);
                    this._siteSource = new ol.source.Vector();
                    let siteLayer = new ol.layer.Vector({
                        renderOrder: null,
                        source: this._siteSource
                    });
                    this._map.addLayer(siteLayer);
                    this._addSiteToMap();
                    if (this._site) {
                        this._map.center = this._map.convertToProj([this._site.x, this._site.y]);
                    }
                }
                _addSiteToMap() {
                    if (!this._siteSource || !this._site) {
                        return;
                    }
                    let coordinates = [this._site.x, this._site.y];
                    coordinates = this._map.convertToProj(coordinates);
                    if (!this._siteFeature) {
                        this._siteFeature = new ol.Feature({
                            geometry: new ol.geom.Point(coordinates)
                        });
                        this._siteFeature.setStyle(this.iconService.getSiteDetailsStyle(this._site));
                        this._siteSource.addFeature(this._siteFeature);
                    }
                    else {
                        this._siteFeature.setGeometry(new ol.geom.Point(coordinates));
                    }
                }
                _onCenter(oldValue, newValue) {
                    if (newValue) {
                        this._map.flyTo(this._map.convertToProj(newValue));
                    }
                }
                _onPickLocation(oldValue, newValue) {
                    //Show toast
                    this.$mdToast.show({
                        hideDelay: 0,
                        position: "top right",
                        template: "<md-toast><div class='md-toast-content'>Cliquer pour désigner l'emplacement</div></md-toast>",
                        parent: "#map"
                    });
                    //Create a dispose function to remove the toast
                    let dispose = () => {
                        this.$mdToast.hide();
                    };
                    //Start interaction
                    this._map.pickLocation().then((value) => {
                        let coordinates = this._map.convertFromProj(value);
                        this.onPick({ coordinates: coordinates });
                        dispose();
                    }, (reason) => {
                        this.$log.debug(reason);
                        dispose();
                    });
                }
                _onRefreshLocation(oldValue, newValue) {
                    this._addSiteToMap();
                }
            }
            Controller.$inject = ["$scope", "$log", "$mdToast", "userSettings", "iconService"];
            // component
            angular.module("snm.ops.components.siteOpsMap", [
                "ngRoute",
                "ngMaterial"])
                .component("siteOpsMap", {
                templateUrl: '/app/ops/components/site-ops-map/site-ops-map.component.html',
                controller: Controller,
                controllerAs: "vm",
                bindings: {
                    site: "<",
                    eventBlock: "<",
                    onPick: "&"
                }
            });
        })(components = ops.components || (ops.components = {}));
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../common/event-block.ts" />
/// <reference path="../../ops/definitions-details.ts" />
/// <reference path="../../ops/components/site-localisation/site-localisation.component.ts" />
/// <reference path="../../ops/components/site-ops-map/site-ops-map.component.ts" />
var snm;
(function (snm) {
    var pages;
    (function (pages) {
        // controller
        class Controller {
            constructor($scope, $log, $http, $location, userSettings, $routeParams) {
                this.$scope = $scope;
                this.$log = $log;
                this.$http = $http;
                this.$location = $location;
                this.userSettings = userSettings;
                this.$routeParams = $routeParams;
                let id = $routeParams.siteId;
                $http.get("api/ops/sites/" + id)
                    .then((result) => {
                    this.site = result.data;
                });
                this._eventBlock = new adnw.common.EventBlock();
            }
            get eventBlock() {
                return this._eventBlock;
            }
            edit() {
                this.$location.path("/sites/edit/" + this.site.id);
            }
        }
        Controller.$inject = ["$scope", "$log", "$http", "$location", "userSettings", "$routeParams"];
        // component
        angular.module("snm.pages.siteDetailsPage", [
            "ngRoute",
            "snm.ops.components.siteLocalisation",
            "snm.ops.components.siteOpsMap"
        ])
            .component("siteDetailsPage", {
            templateUrl: '/app/pages/site-details/site-details.page.html',
            controller: Controller,
            controllerAs: "vm"
        });
    })(pages = snm.pages || (snm.pages = {}));
})(snm || (snm = {}));
/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../../typings/angular-material/angular-material.d.ts" />
var snm;
(function (snm) {
    var services;
    (function (services) {
        class Service {
            constructor($mdToast) {
                this.$mdToast = $mdToast;
            }
            showSimpleMsg(elementId, msg, hideDelay) {
                let options = {
                    position: "bottom right",
                    template: "<md-toast><div class='md-toast-content'><span>" + msg + "</span></div></md-toast>",
                    parent: elementId
                };
                if (typeof hideDelay === "number") {
                    options.hideDelay = hideDelay;
                }
                this.$mdToast.show(options);
            }
            showSuccessfulSaveMsg(elementId, msg, hideDelay) {
                let options = {
                    position: "bottom right",
                    template: "<md-toast><div class='md-toast-content'><md-icon md-svg-src='assets/img/ic_done_24px.svg' class='s24 md-primary toast-icon' aria-label='Done'></md-icon><span>" + msg + "</span></div></md-toast>",
                    parent: elementId
                };
                if (typeof hideDelay === "number") {
                    options.hideDelay = hideDelay;
                }
                this.$mdToast.show(options);
            }
            showErrorSaveMsg(elementId, msg, hideDelay) {
                let options = {
                    position: "bottom right",
                    template: "<md-toast><div class='md-toast-content'><md-icon md-svg-src='assets/img/ic_report_problem_24px.svg' class='s24 md-warn toast-icon' aria-label='Error'></md-icon><span>" + msg + "</span></div></md-toast>",
                    parent: elementId
                };
                if (typeof hideDelay === "number") {
                    options.hideDelay = hideDelay;
                }
                this.$mdToast.show(options);
            }
            hide() {
                this.$mdToast.hide();
            }
        }
        Service.$inject = ["$mdToast"];
        angular.module("snm.services.toastService", [])
            .factory("toastService", ["$mdToast", ($mdToast) => new Service($mdToast)]);
    })(services = snm.services || (snm.services = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../../typings/angular-material/angular-material.d.ts" />
/// <reference path="../../common/event-block.ts" />
/// <reference path="../../services/toast-service.ts" />
/// <reference path="../../ops/definitions-details.ts" />
/// <reference path="../../ops/components/site-localisation/site-localisation.component.ts" />
/// <reference path="../../ops/components/site-ops-map/site-ops-map.component.ts" />
var snm;
(function (snm) {
    var pages;
    (function (pages) {
        // controller
        class Controller {
            constructor($scope, $log, $http, $location, $routeParams, $mdDialog, userSettings, toastService) {
                this.$scope = $scope;
                this.$log = $log;
                this.$http = $http;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$mdDialog = $mdDialog;
                this.userSettings = userSettings;
                this.toastService = toastService;
                this._toastTarget = "#content";
                let id = $routeParams.siteId;
                this._routeChangeHandle = $scope.$on("$locationChangeStart", (event, newUrl, oldUrl) => {
                    this._onRouteChange(event, newUrl, oldUrl);
                });
                $http.get("api/ops/sites/" + id)
                    .then((result) => {
                    this._processSite(result.data);
                });
                this._eventBlock = new adnw.common.EventBlock();
            }
            get eventBlock() {
                return this._eventBlock;
            }
            save() {
                this.toastService.showSimpleMsg(this._toastTarget, "Sauvegarde en cours...", 0);
                this.$http.post("api/ops/sites/" + this.site.id, this.site)
                    .then((result) => {
                    if (result.data.messages) {
                        //Error message
                        this.toastService.showErrorSaveMsg(this._toastTarget, result.data.messages);
                    }
                    else {
                        this.toastService.showSuccessfulSaveMsg(this._toastTarget, "Données enregistrées");
                        this._processSite(result.data);
                    }
                }, (reason) => {
                    this.toastService.showErrorSaveMsg(this._toastTarget, reason);
                });
            }
            cancel() {
                let id = this.site.id;
                this.site = null;
                this.$location.path("/sites/" + id);
            }
            onPickLocation(coordinates) {
                let x = ~~coordinates[0];
                let y = ~~coordinates[1];
                //Get commune containing the coordinates
                this.$http.get("api/ops/common/commune/coords?x=" + x + "&y=" + y)
                    .then((result) => {
                    let commune = result.data;
                    this.site.x = x;
                    this.site.y = y;
                    this._refreshSiteLocation();
                    if (commune) {
                        this.site.codeCommune = commune.code;
                        this.site.commune = commune.nom;
                        this.site.departement = commune.departement;
                    }
                });
            }
            _onRouteChange(event, newUrl, oldUrl) {
                if (!this.site)
                    return;
                let isDirty = !this.site.isEquivalent(this._originalSite);
                //Navigate to newUrl if the form isn't dirty
                if (!isDirty)
                    return;
                this._showConfirm().then(() => {
                    //Stop listening for location changes
                    this._routeChangeHandle();
                    //Go to the requested page
                    this.$location.path(newUrl);
                }, () => {
                });
                //Prevent navigation by default since we'll handle it once the user selects a dialog option
                event.preventDefault();
            }
            _processSite(data) {
                this.site = new snm.ops.details.SiteArcheo();
                this.site.updateFrom(data);
                this._originalSite = this.site.clone();
                this._refreshSiteLocation();
            }
            _refreshSiteLocation() {
                this._eventBlock.dispatch("refreshLocation", null, null);
            }
            _showConfirm() {
                let confirm = this.$mdDialog.confirm()
                    .title("Vous avez des données non sauvegardées.")
                    .textContent("Si vous quittez la page, vous perdrez toutes vos modifications.")
                    .ok("Quitter")
                    .cancel("Rester");
                return this.$mdDialog.show(confirm);
            }
        }
        Controller.$inject = ["$scope", "$log", "$http", "$location", "$routeParams", "$mdDialog",
            "userSettings", "toastService"];
        // component
        angular.module("snm.pages.siteEditPage", [
            "ngRoute",
            "snm.services.toastService",
            "snm.ops.components.siteLocalisation",
            "snm.ops.components.siteOpsMap"
        ])
            .component("siteEditPage", {
            templateUrl: '/app/pages/site-edit/site-edit.page.html',
            controller: Controller,
            controllerAs: "vm"
        });
    })(pages = snm.pages || (snm.pages = {}));
})(snm || (snm = {}));
/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="layout/layout.page.ts" />
/// <reference path="main/main.page.ts" />
/// <reference path="sites/sites.page.ts" />
/// <reference path="site-details/site-details.page.ts" />
/// <reference path="site-edit/site-edit.page.ts" />
var snm;
(function (snm) {
    var pages;
    (function (pages) {
        angular.module(snm.AppConstants.PAGES_MODULE_NAME, [
            "snm.pages.layoutPage",
            "snm.pages.mainPage",
            "snm.pages.sitesPage",
            "snm.pages.siteDetailsPage",
            "snm.pages.siteEditPage"
        ]);
    })(pages = snm.pages || (snm.pages = {}));
})(snm || (snm = {}));
/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="./user-settings.ts" />
/// <reference path="./toast-service.ts" />
var snm;
(function (snm) {
    var services;
    (function (services) {
        angular.module(snm.AppConstants.SERVICES_MODULE_NAME, [
            "snm.services.dal.dbContext",
            "snm.services.settings",
            "snm.services.toastService"
        ]);
    })(services = snm.services || (snm.services = {}));
})(snm || (snm = {}));
/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../definitions-summary.ts" />
var snm;
(function (snm) {
    var ops;
    (function (ops) {
        var components;
        (function (components) {
            class SiteArcheoListController {
                constructor($scope) {
                    this.$scope = $scope;
                }
                selectSite(siteId) {
                    this.onSelect(siteId);
                }
            }
            SiteArcheoListController.$inject = ["$scope"];
            // component
            angular.module("snm.ops.components.siteArcheoList", [])
                .component("siteArcheoList", {
                templateUrl: '/app/ops/components/site-archeo-list/site-archeo-list.component.html',
                controller: SiteArcheoListController,
                bindings: {
                    communes: "<",
                    onSelect: "&"
                }
            });
        })(components = ops.components || (ops.components = {}));
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="./definitions.ts" />
var snm;
(function (snm) {
    var services;
    (function (services) {
        var dal;
        (function (dal) {
            class EntitySet {
                constructor(dbContext, options) {
                    this._isRunning = false;
                    this._map = new Map();
                    if (!dbContext) {
                        throw new Error("DbContext cannot be null.");
                    }
                    this._dbContext = dbContext;
                    this._validateOptions(options);
                    this.$http = options.$http;
                    this._parsingFunc = options.parseEntity;
                    this._getAllUrl = options.getAllUrl;
                    this.refresh();
                }
                get isRunning() {
                    return this._isRunning;
                }
                getAll() {
                    let result = [];
                    this._map.forEach((o) => { result.push(o); });
                    return result;
                }
                getByKey(key) {
                    return this._map.get(key);
                }
                refresh() {
                    if (this._promise) {
                        //If a Promise is already in flight, return it
                        return this._promise;
                    }
                    this._isRunning = true;
                    let resolveFunc;
                    let rejectFunc;
                    this._promise = new Promise((resolve, reject) => {
                        resolveFunc = resolve;
                        rejectFunc = reject;
                    });
                    this.$http.get(this._getAllUrl)
                        .then((response) => {
                        this._parseArray(response.data);
                        resolveFunc();
                    }, (reason) => rejectFunc(reason))
                        .finally(() => {
                        this._isRunning = false;
                        this._promise = null;
                    });
                    return this._promise;
                }
                _parseArray(array) {
                    array.map((o) => {
                        let entity = this._parsingFunc(this._dbContext, o);
                        this._map.set(entity.getKey(), entity);
                    });
                }
                _validateOptions(options) {
                    if (!options) {
                        throw new Error("Options cannot be null.");
                    }
                    if (!options.$http) {
                        throw new Error("$http cannot be null.");
                    }
                    if (!options.parseEntity) {
                        throw new Error("ParseEntity cannot be null.");
                    }
                    if (!options.getAllUrl) {
                        throw new Error("GetAll URL cannot be empty.");
                    }
                }
            }
            dal.EntitySet = EntitySet;
        })(dal = services.dal || (services.dal = {}));
    })(services = snm.services || (snm.services = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="./definitions.ts" />
/// <reference path="./entity-set.ts" />
var snm;
(function (snm) {
    var services;
    (function (services) {
        var dal;
        (function (dal) {
            class DbContext {
                constructor($http) {
                    this.$http = $http;
                    this._repositories = new Map();
                }
                getRepository(type) {
                    if (!type) {
                        throw new Error("Type cannot be null.");
                    }
                    if (!DbContext._factories.has(type)) {
                        throw new Error("Unknown factory '" + type + "'");
                    }
                    if (this._repositories.has(type)) {
                        //Repository has already been instantiated. Return it.
                        return this._repositories.get(type);
                    }
                    else {
                        //No existing repository. Create a new one.
                        let factory = DbContext._factories.get(type);
                        let result = factory(this, this.$http);
                        //Add new instance to repositories map
                        this._repositories.set(type, result);
                        return result;
                    }
                }
                static addRepository(type, factory) {
                    if (!type) {
                        throw new Error("Type cannot be empty.");
                    }
                    if (!factory) {
                        throw new Error("Factory cannot be null.");
                    }
                    DbContext._factories.set(type, factory);
                }
            }
            DbContext.$inject = ["$http"];
            DbContext._factories = new Map();
            dal.DbContext = DbContext;
            angular.module("snm.services.dal.dbContext", [])
                .factory("dbContext", ["$http", ($http) => new DbContext($http)]);
        })(dal = services.dal || (services.dal = {}));
    })(services = snm.services || (snm.services = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="./definitions.ts" />
/// <reference path="./db-context.ts" />
/// <reference path="./entity-set.ts" />
var snm;
(function (snm) {
    var services;
    (function (services) {
        var dal;
        (function (dal) {
            class EntityBase {
                constructor(dbContext) {
                    if (!dbContext) {
                        throw new Error("DbContext cannot be null.");
                    }
                    this._dbContext = dbContext;
                }
            }
            dal.EntityBase = EntityBase;
        })(dal = services.dal || (services.dal = {}));
    })(services = snm.services || (snm.services = {}));
})(snm || (snm = {}));
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />
var snm;
(function (snm) {
    var ops;
    (function (ops) {
        class Departement extends snm.services.dal.EntityBase {
            //endregion
            constructor(dbContext, data) {
                super(dbContext);
                if (data) {
                    this._numero = data.numero;
                    this._nom = data.nom;
                }
            }
            get numero() {
                return this._numero;
            }
            set numero(value) {
                this._numero = value;
            }
            get nom() {
                return this._nom;
            }
            set nom(value) {
                this._nom = value;
            }
            getKey() {
                return this._numero;
            }
        }
        ops.Departement = Departement;
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/departement.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />
var snm;
(function (snm) {
    var ops;
    (function (ops) {
        var dal;
        (function (dal) {
            class DepartementSet extends snm.services.dal.EntitySet {
                constructor(dbContext, $http) {
                    super(dbContext, {
                        $http: $http,
                        parseEntity: (dbContext, data) => {
                            return new ops.Departement(dbContext, data);
                        },
                        getAllUrl: "api/ops/common/departement"
                    });
                    this.refresh();
                }
            }
            dal.DepartementSet = DepartementSet;
        })(dal = ops.dal || (ops.dal = {}));
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />
var snm;
(function (snm) {
    var ops;
    (function (ops) {
        class Commune extends snm.services.dal.EntityBase {
            //endregion
            constructor(dbContext, data) {
                super(dbContext);
                if (data) {
                    this._code = data.code;
                    this._nom = data.nom;
                    this._x = data.x;
                    this._y = data.y;
                    this._departementId = data.departementId;
                    this._codeRegion = data.codeRegion;
                }
            }
            get code() {
                return this._code;
            }
            set code(value) {
                this._code = value;
            }
            get nom() {
                return this._nom;
            }
            set nom(value) {
                this._nom = value;
            }
            get x() {
                return this._x;
            }
            set x(value) {
                this._x = value;
            }
            get y() {
                return this._y;
            }
            set y(value) {
                this._y = value;
            }
            get departementId() {
                return this._departementId;
            }
            set departementId(value) {
                this._departementId = value;
            }
            get departement() {
                return this._dbContext.getRepository("Departement").getByKey(this._departementId);
            }
            get codeRegion() {
                return this._codeRegion;
            }
            set codeRegion(value) {
                this._codeRegion = value;
            }
            getKey() {
                return this._code;
            }
        }
        ops.Commune = Commune;
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/commune.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />
var snm;
(function (snm) {
    var ops;
    (function (ops) {
        var dal;
        (function (dal) {
            class CommuneSet extends snm.services.dal.EntitySet {
                constructor(dbContext, $http) {
                    super(dbContext, {
                        $http: $http,
                        parseEntity: (dbContext, data) => {
                            return new ops.Commune(dbContext, data);
                        },
                        getAllUrl: "api/ops/common/commune"
                    });
                    this.refresh();
                }
            }
            dal.CommuneSet = CommuneSet;
        })(dal = ops.dal || (ops.dal = {}));
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/commune.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />
var snm;
(function (snm) {
    var ops;
    (function (ops) {
        var dal;
        (function (dal) {
            class SiteArcheoSet extends snm.services.dal.EntitySet {
                constructor(dbContext, $http) {
                    super(dbContext, {
                        $http: $http,
                        parseEntity: (dbContext, data) => {
                            return new ops.SiteArcheo(dbContext, data);
                        },
                        getAllUrl: "api/ops/sites/summary"
                    });
                    this.refresh();
                }
            }
            dal.SiteArcheoSet = SiteArcheoSet;
        })(dal = ops.dal || (ops.dal = {}));
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/commune.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />
var snm;
(function (snm) {
    var ops;
    (function (ops) {
        var dal;
        (function (dal) {
            class OperationArcheoSet extends snm.services.dal.EntitySet {
                constructor(dbContext, $http) {
                    super(dbContext, {
                        $http: $http,
                        parseEntity: (dbContext, data) => {
                            return new ops.OperationArcheo(dbContext, data);
                        },
                        getAllUrl: "api/ops/operations"
                    });
                    this.refresh();
                }
                getBySiteId(siteId) {
                    if (typeof siteId !== "number") {
                        throw new Error("SiteId must be a number.");
                    }
                    let result = [];
                    this._map.forEach((op) => {
                        if (op.siteId === siteId) {
                            result.push(op);
                        }
                    });
                    return result;
                }
            }
            dal.OperationArcheoSet = OperationArcheoSet;
        })(dal = ops.dal || (ops.dal = {}));
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));
/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="./components/site-archeo-list/site-archeo-list.component.ts" />
/// <reference path="./components/site-localisation/site-localisation.component.ts" />
/// <reference path="./components/site-ops-map/site-ops-map.component.ts" />
/// <reference path="../services/dal/db-context.ts" />
/// <reference path="./dal/departement-set.ts" />
/// <reference path="./dal/commune-set.ts" />
/// <reference path="./dal/site-archeo-set.ts" />
/// <reference path="./dal/operation-archeo-set.ts" />
var snm;
(function (snm) {
    var ops;
    (function (ops) {
        var DbContext = snm.services.dal.DbContext;
        angular.module(snm.AppConstants.OPS_MODULE_NAME, [
            "snm.services.dal.dbContext",
            "snm.ops.components.siteArcheoList",
            "snm.ops.components.siteLocalisation",
        ]).run(["dbContext", (dbContext) => {
                DbContext.addRepository("Departement", (dbContext, $http) => new snm.ops.dal.DepartementSet(dbContext, $http));
                DbContext.addRepository("Commune", (dbContext, $http) => new snm.ops.dal.CommuneSet(dbContext, $http));
                DbContext.addRepository("SiteArcheo", (dbContext, $http) => new snm.ops.dal.SiteArcheoSet(dbContext, $http));
                DbContext.addRepository("OperationArcheo", (dbContext, $http) => new snm.ops.dal.OperationArcheoSet(dbContext, $http));
            }]);
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));
/// <reference path="../../pers/definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />
var snm;
(function (snm) {
    var chrono;
    (function (chrono) {
        class PhaseChronologique extends snm.services.dal.EntityBase {
            //endregion
            constructor(dbContext, data) {
                super(dbContext);
                if (data) {
                    this._id = data.id;
                    this._code = data.code;
                    this._nom = data.nom;
                    this._debut = data.debut;
                    this._fin = data.fin;
                }
            }
            get id() {
                return this._id;
            }
            set id(value) {
                this._id = value;
            }
            get code() {
                return this._code;
            }
            set code(value) {
                this._code = value;
            }
            get nom() {
                return this._nom;
            }
            set nom(value) {
                this._nom = value;
            }
            get debut() {
                return this._debut;
            }
            set debut(value) {
                this._debut = value;
            }
            get fin() {
                return this._fin;
            }
            set fin(value) {
                this._fin = value;
            }
            getKey() {
                return this._id;
            }
        }
        chrono.PhaseChronologique = PhaseChronologique;
    })(chrono = snm.chrono || (snm.chrono = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/phase-chronologique.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />
var snm;
(function (snm) {
    var chrono;
    (function (chrono) {
        var dal;
        (function (dal) {
            class PhaseChronologiqueSet extends snm.services.dal.EntitySet {
                constructor(dbContext, $http) {
                    super(dbContext, {
                        $http: $http,
                        parseEntity: (dbContext, data) => {
                            return new chrono.PhaseChronologique(dbContext, data);
                        },
                        getAllUrl: "api/chrono/phase"
                    });
                    this.refresh();
                }
            }
            dal.PhaseChronologiqueSet = PhaseChronologiqueSet;
        })(dal = chrono.dal || (chrono.dal = {}));
    })(chrono = snm.chrono || (snm.chrono = {}));
})(snm || (snm = {}));
/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../definitions.ts" />
/// <reference path="../../../services/dal/db-context.ts" />
/// <reference path="../../dal/phase-chronologique-set.ts" />
var snm;
(function (snm) {
    var chrono;
    (function (chrono) {
        var components;
        (function (components) {
            class PhasesChronologiquesController {
                constructor($scope, dbContext) {
                    this.$scope = $scope;
                    this.dbContext = dbContext;
                    let repoPhaseChrono = dbContext.getRepository("PhaseChronologique");
                    repoPhaseChrono.refresh().then(() => {
                        this.phases = repoPhaseChrono.getAll();
                        this.$scope.$applyAsync();
                    });
                }
                get phases() {
                    return this._phases;
                }
                set phases(value) {
                    this._phases = value;
                }
                get debut() {
                    return this._debut;
                }
                set debut(value) {
                    this._debut = value;
                }
                get fin() {
                    return this._fin;
                }
                set fin(value) {
                    this._fin = value;
                }
            }
            PhasesChronologiquesController.$inject = ["$scope", "dbContext"];
            // component
            angular.module("snm.chrono.components.phases-chronologiques", []).component("phasesChrono", {
                templateUrl: '/app/chrono/components/phases-chronologiques/phases-chronologiques.component.html',
                controller: PhasesChronologiquesController,
                controllerAs: "vm",
                bindings: {
                    debut: "<",
                    fin: "<"
                }
            });
        })(components = chrono.components || (chrono.components = {}));
    })(chrono = snm.chrono || (snm.chrono = {}));
})(snm || (snm = {}));
/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="../services/dal/db-context.ts" />
/// <reference path="./dal/phase-chronologique-set.ts" />
/// <reference path="./components/phases-chronologiques/phases-chronologiques.component.ts" />
var snm;
(function (snm) {
    var chrono;
    (function (chrono) {
        var DbContext = snm.services.dal.DbContext;
        angular.module(snm.AppConstants.CHRONO_MODULE_NAME, [
            "snm.services.dal.dbContext",
            "snm.chrono.components.phases-chronologiques"
        ]).run(["dbContext", (dbContext) => {
                DbContext.addRepository("PhaseChronologique", (dbContext, $http) => new snm.chrono.dal.PhaseChronologiqueSet(dbContext, $http));
            }]);
    })(chrono = snm.chrono || (snm.chrono = {}));
})(snm || (snm = {}));
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />
var snm;
(function (snm) {
    var pers;
    (function (pers) {
        class Personne extends snm.services.dal.EntityBase {
            //endregion
            constructor(dbContext, data) {
                super(dbContext);
                if (data) {
                    this._id = data.id;
                    this._prenom = data.prenom;
                    this._autresPrenoms = data.autresPrenoms;
                    this._nom = data.nom;
                    this._suffixe = data.suffixe;
                    this._nomComplet = data.nomComplet;
                    this._organismeId = data.organismeId;
                }
            }
            get id() {
                return this._id;
            }
            set id(value) {
                this._id = value;
            }
            get prenom() {
                return this._prenom;
            }
            set prenom(value) {
                this._prenom = value;
            }
            get autresPrenoms() {
                return this._autresPrenoms;
            }
            set autresPrenoms(value) {
                this._autresPrenoms = value;
            }
            get nom() {
                return this._nom;
            }
            set nom(value) {
                this._nom = value;
            }
            get suffixe() {
                return this._suffixe;
            }
            set suffixe(value) {
                this._suffixe = value;
            }
            get nomComplet() {
                return this._nomComplet;
            }
            set nomComplet(value) {
                this._nomComplet = value;
            }
            get organismeId() {
                return this._organismeId;
            }
            set organismeId(value) {
                this._organismeId = value;
            }
            get organisme() {
                return this._dbContext.getRepository("Organisme").getByKey(this._organismeId);
            }
            getKey() {
                return this._id;
            }
        }
        pers.Personne = Personne;
    })(pers = snm.pers || (snm.pers = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/personne.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />
var snm;
(function (snm) {
    var pers;
    (function (pers) {
        var dal;
        (function (dal) {
            class PersonneSet extends snm.services.dal.EntitySet {
                constructor(dbContext, $http) {
                    super(dbContext, {
                        $http: $http,
                        parseEntity: (dbContext, data) => {
                            return new pers.Personne(dbContext, data);
                        },
                        getAllUrl: "api/pers/personne"
                    });
                    this.refresh();
                }
            }
            dal.PersonneSet = PersonneSet;
        })(dal = pers.dal || (pers.dal = {}));
    })(pers = snm.pers || (snm.pers = {}));
})(snm || (snm = {}));
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />
var snm;
(function (snm) {
    var pers;
    (function (pers) {
        class Organisme extends snm.services.dal.EntityBase {
            //endregion
            constructor(dbContext, data) {
                super(dbContext);
                if (data) {
                    this._id = data.id;
                    this._nom = data.nom;
                    this._abreviation = data.abreviation;
                }
            }
            get id() {
                return this._id;
            }
            set id(value) {
                this._id = value;
            }
            get nom() {
                return this._nom;
            }
            set nom(value) {
                this._nom = value;
            }
            get abreviation() {
                return this._abreviation;
            }
            set abreviation(value) {
                this._abreviation = value;
            }
            getKey() {
                return this._id;
            }
        }
        pers.Organisme = Organisme;
    })(pers = snm.pers || (snm.pers = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../models/organisme.ts" />
/// <reference path="../definitions.ts" />
/// <reference path="../../services/dal/entity-set.ts" />
var snm;
(function (snm) {
    var pers;
    (function (pers) {
        var dal;
        (function (dal) {
            class OrganismeSet extends snm.services.dal.EntitySet {
                constructor(dbContext, $http) {
                    super(dbContext, {
                        $http: $http,
                        parseEntity: (dbContext, data) => {
                            return new pers.Organisme(dbContext, data);
                        },
                        getAllUrl: "api/pers/organisme"
                    });
                    this.refresh();
                }
            }
            dal.OrganismeSet = OrganismeSet;
        })(dal = pers.dal || (pers.dal = {}));
    })(pers = snm.pers || (snm.pers = {}));
})(snm || (snm = {}));
/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../definitions.ts" />
var snm;
(function (snm) {
    var pers;
    (function (pers) {
        var components;
        (function (components) {
            class PersonneController {
                constructor($scope) {
                    this.$scope = $scope;
                }
                get personne() {
                    return this._personne;
                }
                set personne(value) {
                    this._personne = value;
                }
            }
            PersonneController.$inject = ["$scope"];
            // component
            angular.module("snm.pers.components.personne", []).component("personne", {
                templateUrl: '/app/pers/components/personne/personne.component.html',
                controller: PersonneController,
                controllerAs: "vm",
                bindings: {
                    personne: "<"
                }
            });
        })(components = pers.components || (pers.components = {}));
    })(pers = snm.pers || (snm.pers = {}));
})(snm || (snm = {}));
/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="../services/dal/db-context.ts" />
/// <reference path="./dal/personne-set.ts" />
/// <reference path="./dal/organisme-set.ts" />
/// <reference path="./components/personne/personne.component.ts" />
var snm;
(function (snm) {
    var pers;
    (function (pers) {
        var DbContext = snm.services.dal.DbContext;
        angular.module(snm.AppConstants.PERS_MODULE_NAME, [
            "snm.services.dal.dbContext",
            "snm.pers.components.personne"
        ]).run(["dbContext", (dbContext) => {
                DbContext.addRepository("Personne", (dbContext, $http) => new snm.pers.dal.PersonneSet(dbContext, $http));
                DbContext.addRepository("Organisme", (dbContext, $http) => new snm.pers.dal.OrganismeSet(dbContext, $http));
            }]);
    })(pers = snm.pers || (snm.pers = {}));
})(snm || (snm = {}));
/// <reference path="../typings/angular/angular.d.ts" />
/// <reference path="../typings/angular/angular-route.d.ts" />
/// <reference path="../typings/angular-material/angular-material.d.ts" />
/// <reference path="components/components.ts" />
/// <reference path="maps/maps.ts" />
/// <reference path="pages/pages.ts" />
/// <reference path="services/services.ts" />
/// <reference path="ops/ops.ts" />
/// <reference path="chrono/chrono.ts" />
/// <reference path="pers/pers.ts" />
/// <reference path="services/user-settings.ts" />
class Bootstrap {
    static initialize() {
        angular.module(snm.AppConstants.CORE_MODULE_NAME, [
            snm.AppConstants.COMPONENTS_MODULE_NAME,
            snm.AppConstants.MAPS_MODULE_NAME,
            snm.AppConstants.PAGES_MODULE_NAME,
            snm.AppConstants.SERVICES_MODULE_NAME,
            snm.AppConstants.CHRONO_MODULE_NAME,
            snm.AppConstants.OPS_MODULE_NAME,
            snm.AppConstants.PERS_MODULE_NAME,
            "ngRoute",
            "ngMaterial",
            "ngMessages"
        ])
            .config(Bootstrap._configureRoutes)
            .config(function ($mdThemingProvider) {
            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('docs-dark', 'default')
                .primaryPalette('yellow')
                .dark();
        });
        angular.element(document).ready(() => {
            let initInjector = angular.injector(["ng"]);
            let $http = initInjector.get("$http");
            snm.services.settings.UserSettings.fetchSettings($http)
                .then(() => {
                angular.bootstrap(document, [snm.AppConstants.CORE_MODULE_NAME]);
            });
        });
    }
    static _configureRoutes($routeProvider) {
        $routeProvider
            .when("/", {
            name: "home",
            template: "<main-page></main-page>"
        })
            .when('/sites', {
            name: "sites",
            template: "<sites-page flex layout='column'></sites-page>"
        })
            .when('/sites/:siteId', {
            name: "site-details",
            template: "<site-details-page flex layout='column'></site-details-page>"
        })
            .when('/sites/edit/:siteId', {
            name: "site-edit",
            template: "<site-edit-page flex layout='column'></site-edit-page>"
        })
            .otherwise("/");
    }
}
Bootstrap.initialize();
/// <reference path="../definitions.ts" />
/// <reference path="../../chrono/definitions.ts" />
/// <reference path="../../pers/definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />
var snm;
(function (snm) {
    var ops;
    (function (ops) {
        class OperationArcheo extends snm.services.dal.EntityBase {
            //endregion
            constructor(dbContext, data) {
                super(dbContext);
                if (data) {
                    this._id = data.id;
                    this._siteId = data.siteId;
                    this._codeCommune = data.codeCommune;
                    this._x = data.x;
                    this._y = data.y;
                    this._localisation = data.localisation;
                    this._responsableId = data.responsableId;
                    this._organismeId = data.organismeId;
                    this._debutTravaux = data.debutTravaux;
                    this._finTravaux = data.finTravaux;
                    this._debutOccupationId = data.debutOccupationId;
                    this._finOccupationId = data.finOccupationId;
                    this._planId = data.planId;
                    this._identifications = data.identifications;
                }
            }
            get id() {
                return this._id;
            }
            set id(value) {
                this._id = value;
            }
            get siteId() {
                return this._siteId;
            }
            set siteId(value) {
                this._siteId = value;
            }
            get site() {
                return this._dbContext.getRepository("SiteArcheo").getByKey(this._siteId);
            }
            get codeCommune() {
                return this._codeCommune;
            }
            set codeCommune(value) {
                this._codeCommune = value;
            }
            get commune() {
                return this._dbContext.getRepository("Commune").getByKey(this._codeCommune);
            }
            get x() {
                return this._x;
            }
            set x(value) {
                this._x = value;
            }
            get y() {
                return this._y;
            }
            set y(value) {
                this._y = value;
            }
            get localisation() {
                return this._localisation;
            }
            set localisation(value) {
                this._localisation = value;
            }
            get responsableId() {
                return this._responsableId;
            }
            set responsableId(value) {
                this._responsableId = value;
            }
            get responsable() {
                return this._dbContext.getRepository("Personne").getByKey(this._responsableId);
            }
            get organismeId() {
                return this._organismeId;
            }
            set organismeId(value) {
                this._organismeId = value;
            }
            get organisme() {
                return this._dbContext.getRepository("Organisme").getByKey(this._organismeId);
            }
            get debutTravaux() {
                return this._debutTravaux;
            }
            set debutTravaux(value) {
                this._debutTravaux = value;
            }
            get finTravaux() {
                return this._finTravaux;
            }
            set finTravaux(value) {
                this._finTravaux = value;
            }
            get debutOccupationId() {
                return this._debutOccupationId;
            }
            set debutOccupationId(value) {
                this._debutOccupationId = value;
            }
            get debutOccupation() {
                return this._dbContext.getRepository("PhaseChronologique")
                    .getByKey(this._debutOccupationId);
            }
            get finOccupationId() {
                return this._finOccupationId;
            }
            set finOccupationId(value) {
                this._finOccupationId = value;
            }
            get finOccupation() {
                return this._dbContext.getRepository("PhaseChronologique")
                    .getByKey(this._finOccupationId);
            }
            get planId() {
                return this._planId;
            }
            set planId(value) {
                this._planId = value;
            }
            get identifications() {
                return this._identifications;
            }
            getKey() {
                return this._id;
            }
        }
        ops.OperationArcheo = OperationArcheo;
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));
/// <reference path="../definitions.ts" />
/// <reference path="../../chrono/definitions.ts" />
/// <reference path="../../services/dal/entity-base.ts" />
/// <reference path="../../services/dal/db-context.ts" />
var snm;
(function (snm) {
    var ops;
    (function (ops) {
        class SiteArcheo extends snm.services.dal.EntityBase {
            //endregion
            constructor(dbContext, data) {
                super(dbContext);
                if (data) {
                    this._id = data.id;
                    this._codeCommune = data.codeCommune;
                    this._x = data.x;
                    this._y = data.y;
                    this._localisation = data.localisation;
                    this._debutOccupationId = data.debutOccupationId;
                    this._finOccupationId = data.finOccupationId;
                    this._planId = data.planId;
                    this._identifications = data.identifications;
                }
            }
            get id() {
                return this._id;
            }
            set id(value) {
                this._id = value;
            }
            get codeCommune() {
                return this._codeCommune;
            }
            set codeCommune(value) {
                this._codeCommune = value;
            }
            get commune() {
                return this._dbContext.getRepository("Commune").getByKey(this._codeCommune);
            }
            get x() {
                return this._x;
            }
            set x(value) {
                this._x = value;
            }
            get y() {
                return this._y;
            }
            set y(value) {
                this._y = value;
            }
            get localisation() {
                return this._localisation;
            }
            set localisation(value) {
                this._localisation = value;
            }
            get operations() {
                let repo = this._dbContext.getRepository("OperationArcheo");
                return repo.getBySiteId(this._id);
            }
            get debutOccupationId() {
                return this._debutOccupationId;
            }
            set debutOccupationId(value) {
                this._debutOccupationId = value;
            }
            get debutOccupation() {
                return this._dbContext.getRepository("PhaseChronologique")
                    .getByKey(this._debutOccupationId);
            }
            get finOccupationId() {
                return this._finOccupationId;
            }
            set finOccupationId(value) {
                this._finOccupationId = value;
            }
            get finOccupation() {
                return this._dbContext.getRepository("PhaseChronologique")
                    .getByKey(this._finOccupationId);
            }
            get planId() {
                return this._planId;
            }
            set planId(value) {
                this._planId = value;
            }
            get identifications() {
                return this._identifications;
            }
            getKey() {
                return this._id;
            }
        }
        ops.SiteArcheo = SiteArcheo;
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));

//# sourceMappingURL=sarconecmero.js.map
