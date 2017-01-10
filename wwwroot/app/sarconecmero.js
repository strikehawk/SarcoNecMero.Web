var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var snm;
(function (snm) {
    var AppConstants = (function () {
        function AppConstants() {
        }
        Object.defineProperty(AppConstants, "CORE_MODULE_NAME", {
            get: function () {
                return "snm";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConstants, "APP_MODULE_NAME", {
            get: function () {
                return this.CORE_MODULE_NAME + ".app";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConstants, "COMPONENTS_MODULE_NAME", {
            get: function () {
                return this.CORE_MODULE_NAME + ".components";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConstants, "PAGES_MODULE_NAME", {
            get: function () {
                return this.CORE_MODULE_NAME + ".pages";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConstants, "SERVICES_MODULE_NAME", {
            get: function () {
                return this.CORE_MODULE_NAME + ".services";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConstants, "MAPS_MODULE_NAME", {
            get: function () {
                return this.CORE_MODULE_NAME + ".maps";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConstants, "OPS_MODULE_NAME", {
            get: function () {
                return this.CORE_MODULE_NAME + ".ops";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConstants, "PERS_MODULE_NAME", {
            get: function () {
                return this.CORE_MODULE_NAME + ".pers";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConstants, "CHRONO_MODULE_NAME", {
            get: function () {
                return this.CORE_MODULE_NAME + ".chrono";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AppConstants, "SARCOS_MODULE_NAME", {
            get: function () {
                return this.CORE_MODULE_NAME + ".sarcos";
            },
            enumerable: true,
            configurable: true
        });
        return AppConstants;
    }());
    snm.AppConstants = AppConstants;
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/angular/angular-route.d.ts" />
var snm;
(function (snm) {
    var components;
    (function (components) {
        var Controller = (function () {
            function Controller($route) {
                this.$route = $route;
                this.currentNavItem = this._getNavItem($route.current.name);
            }
            Controller.prototype._getNavItem = function (routeName) {
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
            };
            return Controller;
        }());
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
            var UserSettings = (function () {
                function UserSettings() {
                    if (UserSettings.defaultSettings) {
                        this._opsReferentialId = UserSettings.defaultSettings.opsReferentialId;
                        this._startZoom = UserSettings.defaultSettings.startZoom;
                        this._homeLocation = UserSettings.defaultSettings.homeLocation;
                        this._illustrationStorageRootUrl = UserSettings.defaultSettings.illustrationStorageRootUrl;
                    }
                }
                UserSettings.fetchSettings = function ($http) {
                    return $http.get("api/settings/default")
                        .then(function (result) {
                        UserSettings.defaultSettings = result.data;
                        return result.data;
                    });
                };
                Object.defineProperty(UserSettings.prototype, "opsReferentialId", {
                    /**
                     * The Id of the Referential to use when displaying Sites or Operations.
                     */
                    get: function () {
                        return this._opsReferentialId;
                    },
                    set: function (value) {
                        this._opsReferentialId = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UserSettings.prototype, "startZoom", {
                    /**
                     * The starting zoom level of the map.
                     */
                    get: function () {
                        return this._startZoom;
                    },
                    set: function (value) {
                        this._startZoom = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UserSettings.prototype, "homeLocation", {
                    /**
                     * The starting center of the map, in EPSG:2154.
                     */
                    get: function () {
                        return this._homeLocation;
                    },
                    set: function (value) {
                        this._homeLocation = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UserSettings.prototype, "illustrationStorageRootUrl", {
                    /**
                     * The root URL of the illustration storage container.
                     */
                    get: function () {
                        return this._illustrationStorageRootUrl;
                    },
                    set: function (value) {
                        this._illustrationStorageRootUrl = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return UserSettings;
            }());
            settings.UserSettings = UserSettings;
            angular.module("snm.services.settings", [])
                .factory("userSettings", function () { return new UserSettings(); });
        })(settings = services.settings || (services.settings = {}));
    })(services = snm.services || (snm.services = {}));
})(snm || (snm = {}));
var adnw;
(function (adnw) {
    var common;
    (function (common) {
        var EventBlock = (function () {
            function EventBlock() {
                this._map = new Map();
            }
            EventBlock.prototype.on = function (event, callback) {
                if (!event) {
                    throw new Error("Event cannot be empty.");
                }
                if (!callback) {
                    throw new Error("Callback cannot be null.");
                }
                var set;
                if (!this._map.has(event)) {
                    set = new Set();
                    this._map.set(event, set);
                }
                else {
                    set = this._map.get(event);
                }
                set.add(callback);
            };
            EventBlock.prototype.un = function (event, callback) {
                if (!event) {
                    throw new Error("Event cannot be empty.");
                }
                if (!callback) {
                    throw new Error("Callback cannot be null.");
                }
                if (this._map.has(event)) {
                    var set = this._map.get(event);
                    set.delete(callback);
                }
            };
            EventBlock.prototype.dispatch = function (event, oldValue, newValue) {
                if (!event) {
                    throw new Error("Event cannot be empty.");
                }
                if (!this._map.has(event)) {
                    return;
                }
                var set = this._map.get(event);
                set.forEach(function (cb) {
                    cb(oldValue, newValue);
                });
            };
            return EventBlock;
        }());
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
            var ViewManager = (function () {
                function ViewManager(map, olMap, eventBlock) {
                    var _this = this;
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
                    olMap.on("change:view", function (ev) {
                        //Unregister from previous view
                        var oldView = ev.oldValue;
                        _this._unregisterFromViewEvents(oldView);
                        //Register to new one
                        var view = ev.target.get(ev.key);
                        _this._registerToViewEvents(view);
                    });
                    this._setupView(olMap.getView());
                }
                Object.defineProperty(ViewManager.prototype, "center", {
                    get: function () {
                        return this._center;
                    },
                    set: function (value) {
                        this._center = value;
                        this._olMap.getView().setCenter(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewManager.prototype, "scale", {
                    get: function () {
                        return this._scale;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewManager.prototype, "zoom", {
                    get: function () {
                        return this._zoom;
                    },
                    set: function (value) {
                        this._zoom = value;
                        this._olMap.getView().setZoom(value);
                    },
                    enumerable: true,
                    configurable: true
                });
                ViewManager.prototype.flyTo = function (coordinates, done) {
                    var view = this._olMap.getView();
                    var duration = 2000;
                    var zoom = view.getZoom();
                    var parts = 2;
                    var called = false;
                    var callback = function (complete) {
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
                };
                ViewManager.prototype._computeScale = function (resolution, proj) {
                    var dpi = 25.4 / 0.28;
                    var scale = resolution * proj.getMetersPerUnit() * 39.37 * dpi;
                    return scale;
                };
                ViewManager.prototype._registerToViewEvents = function (view) {
                    var _this = this;
                    this._resolutionChangeKey = view.on("change:resolution", function (ev) {
                        var view = ev.target;
                        var proj = view.getProjection();
                        var newRes = ev.target.get(ev.key);
                        var oldScale = _this._scale;
                        _this._scale = _this._computeScale(newRes, proj);
                        _this._eventBlock.dispatch("change:scale", oldScale, _this._scale);
                        var oldZoom;
                        _this._zoom = view.getZoom();
                        _this._eventBlock.dispatch("change:zoom", oldZoom, _this._zoom);
                    });
                    this._centerChangeKey = view.on("change:center", function (ev) {
                        var oldCenter = _this._center;
                        var newCenter = ev.target.get(ev.key);
                        _this._center = newCenter;
                        _this._eventBlock.dispatch("change:center", oldCenter, newCenter);
                    });
                };
                ViewManager.prototype._unregisterFromViewEvents = function (view) {
                    if (this._resolutionChangeKey) {
                        view.unByKey(this._resolutionChangeKey);
                    }
                    if (this._centerChangeKey) {
                        view.unByKey(this._centerChangeKey);
                    }
                };
                ViewManager.prototype._setupView = function (view) {
                    this._registerToViewEvents(view);
                    this._center = view.getCenter();
                    this._scale = this._computeScale(view.getResolution(), view.getProjection());
                    this._zoom = view.getZoom();
                };
                return ViewManager;
            }());
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
            var CursorPosition = (function (_super) {
                __extends(CursorPosition, _super);
                function CursorPosition(map) {
                    var _this = this;
                    if (!map) {
                        throw new Error("Map cannot be null.");
                    }
                    _super.call(this, {
                        handleMoveEvent: function (ev) {
                            _this._map.cursor = _this._map.convertFromProj(ev.coordinate);
                            return true;
                        }
                    });
                    this._map = map;
                }
                return CursorPosition;
            }(ol.interaction.Pointer));
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
            var LocationPicker = (function (_super) {
                __extends(LocationPicker, _super);
                function LocationPicker() {
                    var resolve;
                    var reject;
                    _super.call(this, {
                        handleEvent: function (ev) {
                            switch (ev.type) {
                                case "pointerup":
                                    resolve(ev.coordinate);
                                    break;
                                case "keydown":
                                    var keyEvent = ev.originalEvent;
                                    var key = keyEvent.key;
                                    if (key === "Escape") {
                                        reject("Cancelled");
                                    }
                                    break;
                            }
                            return true;
                        }
                    });
                    this._promise = new Promise(function (res, rej) {
                        resolve = res;
                        reject = rej;
                    });
                    this._resolve = resolve;
                    this._reject = reject;
                }
                Object.defineProperty(LocationPicker.prototype, "promise", {
                    get: function () {
                        return this._promise;
                    },
                    enumerable: true,
                    configurable: true
                });
                LocationPicker.prototype.handleEvent = function (ev) {
                    this._resolve(ev.coordinate);
                    return true;
                };
                return LocationPicker;
            }(ol.interaction.Interaction));
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
            var Map = (function () {
                function Map(elementId, userSettings) {
                    this.userSettings = userSettings;
                    this._PROJ = "EPSG:3857";
                    this._DATA_PROJ = "EPSG:2154";
                    Map.loadProjections();
                    this._map = this._createMap(elementId);
                    this._eventBlock = new adnw.common.EventBlock();
                    this._viewManager = new snm.maps.components.ViewManager(this, this._map, this._eventBlock);
                }
                Map.loadProjections = function () {
                    proj4.defs("EPSG:2154", "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
                };
                Object.defineProperty(Map.prototype, "center", {
                    get: function () {
                        return this._viewManager.center;
                    },
                    set: function (value) {
                        this._viewManager.center = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Map.prototype, "scale", {
                    get: function () {
                        return this._viewManager.scale;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Map.prototype, "zoom", {
                    get: function () {
                        return this._viewManager.zoom;
                    },
                    set: function (value) {
                        this._viewManager.zoom = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Map.prototype, "cursor", {
                    /**
                     * Current cursor position, in EPSG:2154.
                     */
                    get: function () {
                        return this._cursor;
                    },
                    set: function (value) {
                        var oldValue = this._cursor;
                        this._cursor = value;
                        this._eventBlock.dispatch("change:cursorPosition", oldValue, value);
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Convert from DATA_PROJ (EPSG:2154) to PROJ (EPSG:3857).
                 * @param coordinates The coordinates to convert.
                 */
                Map.prototype.convertToProj = function (coordinates) {
                    return proj4(this._DATA_PROJ, this._PROJ, coordinates);
                };
                /**
                 * Convert from PROJ (EPSG:3857) to DATA_PROJ (EPSG:2154).
                 * @param coordinates The coordinates to convert.
                 */
                Map.prototype.convertFromProj = function (coordinates) {
                    return proj4(this._PROJ, this._DATA_PROJ, coordinates);
                };
                Map.prototype.flyTo = function (coordinates, done) {
                    this._viewManager.flyTo(coordinates, done);
                };
                Map.prototype.pickLocation = function () {
                    var _this = this;
                    var picker = new components.LocationPicker();
                    this._map.addInteraction(picker);
                    picker.promise.then(function () {
                        _this._map.removeInteraction(picker);
                    }, function () {
                        _this._map.removeInteraction(picker);
                    });
                    return picker.promise;
                };
                Map.prototype.addLayer = function (layer) {
                    if (!layer) {
                        return;
                    }
                    this._map.addLayer(layer);
                };
                Map.prototype.removeLayer = function (layer) {
                    if (!layer) {
                        return;
                    }
                    this._map.removeLayer(layer);
                };
                Map.prototype.on = function (event, callback) {
                    if (!event) {
                        throw new Error("Event cannot be empty.");
                    }
                    if (!callback) {
                        throw new Error("Callback cannot be null.");
                    }
                    this._eventBlock.on(event, callback);
                };
                Map.prototype.un = function (event, callback) {
                    if (!event) {
                        throw new Error("Event cannot be empty.");
                    }
                    if (!callback) {
                        throw new Error("Callback cannot be null.");
                    }
                    this._eventBlock.un(event, callback);
                };
                Map.prototype._createMap = function (elementId) {
                    var center;
                    //Check if a current location is defined
                    if (this.userSettings.currentLocation) {
                        //Already in target projection
                        center = this.userSettings.currentLocation;
                    }
                    //Check if home location can be used
                    if (!center && this.userSettings.homeLocation) {
                        center = this.convertToProj(this.userSettings.homeLocation);
                    }
                    var zoom;
                    //Check if a current zoom is defined
                    if (this.userSettings.currentZoom) {
                        zoom = this.userSettings.currentZoom;
                    }
                    //Check if start zoom can be used
                    if (typeof zoom !== "number" && typeof this.userSettings.startZoom === "number") {
                        zoom = this.userSettings.startZoom;
                    }
                    var view = new ol.View({
                        projection: this._PROJ,
                        center: center ? center : [0, 0],
                        zoom: typeof zoom === "number" ? zoom : 1
                    });
                    var layers = [
                        new ol.layer.Tile({
                            source: new ol.source.OSM()
                        })
                    ];
                    var map = new ol.Map({
                        target: elementId,
                        loadTilesWhileAnimating: true,
                        view: view,
                        layers: layers,
                        interactions: ol.interaction.defaults().extend([new snm.maps.components.CursorPosition(this)])
                    });
                    setTimeout(function () {
                        map.updateSize();
                    });
                    return map;
                };
                return Map;
            }());
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
            var Controller = (function () {
                function Controller($scope, userSettings) {
                    this.$scope = $scope;
                    this.userSettings = userSettings;
                    this._showScale = true;
                }
                Object.defineProperty(Controller.prototype, "showScale", {
                    get: function () {
                        return this._showScale;
                    },
                    set: function (value) {
                        this._showScale = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Controller.prototype, "map", {
                    get: function () {
                        return this._map;
                    },
                    set: function (value) {
                        this._map = value;
                        if (value) {
                            this._registerToMapEvents(value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Controller.prototype.flyToHome = function () {
                    var _this = this;
                    var home = this._map.convertToProj(this.userSettings.homeLocation);
                    this._map.flyTo(home, function () {
                        _this.$scope.$apply();
                    });
                };
                Controller.prototype.toggleScale = function () {
                    this._showScale = !this._showScale;
                };
                Controller.prototype._registerToMapEvents = function (map) {
                    var _this = this;
                    if (!map) {
                        throw new Error("Map cannot be null.");
                    }
                    map.on("change:scale", function () {
                        _this._onChange();
                    });
                    map.on("change:zoom", function (oldValue, newValue) {
                        if (_this.userSettings) {
                            _this.userSettings.currentZoom = newValue;
                        }
                        _this._onChange();
                    });
                    map.on("change:cursorPosition", function () {
                        _this._onChange();
                    });
                    map.on("change:center", function (oldValue, newValue) {
                        if (_this.userSettings) {
                            _this.userSettings.currentLocation = newValue;
                        }
                        _this._onChange();
                    });
                };
                Controller.prototype._onChange = function (oldValue, newValue) {
                    if (!this.$scope) {
                        return;
                    }
                    this.$scope.$applyAsync();
                };
                Controller.$inject = ["$scope", "userSettings"];
                return Controller;
            }());
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
            var SiteArcheo = (function () {
                function SiteArcheo() {
                }
                SiteArcheo.prototype.clone = function () {
                    var site = new SiteArcheo();
                    site.updateFrom(this);
                    return site;
                };
                SiteArcheo.prototype.updateFrom = function (other) {
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
                };
                SiteArcheo.prototype.isEquivalent = function (other) {
                    if (!other) {
                        return false;
                    }
                    var result = true;
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
                };
                return SiteArcheo;
            }());
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
            var Service = (function () {
                function Service() {
                }
                Service.prototype.getSiteSummaryStyle = function (site) {
                    if (!site) {
                        throw new Error("Site cannot be null.");
                    }
                    var canvas = this._getSiteSummaryCanvas(site);
                    return this._getStyle(canvas);
                };
                Service.prototype.getSiteDetailsStyle = function (site) {
                    if (!site) {
                        throw new Error("Site cannot be null.");
                    }
                    var canvas = this._getSiteSummaryCanvas(site);
                    return this._getStyle(canvas);
                };
                Service.prototype.getOperationDetailsStyle = function (operation) {
                    if (!operation) {
                        throw new Error("Operation cannot be null.");
                    }
                    var canvas;
                    return this._getStyle(canvas);
                };
                Service.prototype._getStyle = function (canvas, anchorInfo) {
                    if (!canvas) {
                        throw new Error("Canvas cannot be null.");
                    }
                    var options = {
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
                    var style = new ol.style.Style({
                        image: new ol.style.Icon(options)
                    });
                    return style;
                };
                Service.prototype._getSiteSummaryCanvas = function (site) {
                    var content = site.identifications[0].reference;
                    var width = this._getWidth(content);
                    var height = 20;
                    var background = "#000";
                    var foreground = "#fff";
                    var font = "Verdana 12px";
                    var canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;
                    var ctx = canvas.getContext("2d");
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
                };
                Service.prototype._getWidth = function (content) {
                    var width;
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
                };
                return Service;
            }());
            angular.module("snm.maps.services.iconService", [])
                .factory("iconService", function () { return new Service(); });
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
        var Controller = (function () {
            function Controller() {
            }
            return Controller;
        }());
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
        var Controller = (function () {
            function Controller() {
            }
            return Controller;
        }());
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
        var Controller = (function () {
            function Controller($scope, $log, $http, $location, userSettings, iconService) {
                this.$scope = $scope;
                this.$log = $log;
                this.$http = $http;
                this.$location = $location;
                this.userSettings = userSettings;
                this.iconService = iconService;
                this._getSitesData();
            }
            Object.defineProperty(Controller.prototype, "map", {
                get: function () {
                    return this._map;
                },
                enumerable: true,
                configurable: true
            });
            Controller.prototype.$postLink = function () {
                var _this = this;
                setTimeout(function () { return _this._setupMap(); });
            };
            Controller.prototype.onSelectSite = function (siteId) {
                this.$location.path("/sites/" + siteId);
            };
            Controller.prototype.onCenterOnSite = function (x, y) {
                if (!this._map) {
                    return;
                }
                var coordinates = this._map.convertToProj([x, y]);
                this._map.flyTo(coordinates);
            };
            Controller.prototype._setupMap = function () {
                this._map = new snm.maps.components.Map("map", this.userSettings);
                this._siteSource = new ol.source.Vector();
                var siteLayer = new ol.layer.Vector({
                    renderOrder: null,
                    source: this._siteSource
                });
                this._map.addLayer(siteLayer);
            };
            Controller.prototype._getSitesData = function () {
                var _this = this;
                this.$http.get("api/ops/sites/summary")
                    .then(function (result) {
                    var map = new Map();
                    var commune;
                    //Clear site source if it exists
                    if (_this._siteSource) {
                        _this._siteSource.clear();
                    }
                    result.data.forEach(function (site) {
                        //Try to add site to map
                        _this._addSiteToMap(site);
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
                        site.identifications.forEach(function (id) {
                            if (id.referentielId === _this.userSettings.opsReferentialId) {
                                site.reference = id.reference;
                            }
                        });
                        commune.sites.push(site);
                    });
                    _this.communes = [];
                    map.forEach(function (c) {
                        _this.communes.push(c);
                    });
                });
            };
            Controller.prototype._addSiteToMap = function (site) {
                if (!this._siteSource || !site) {
                    return;
                }
                if (typeof site.x !== "number" || typeof site.y !== "number") {
                    //Cannot display site without coordinates
                    return;
                }
                var coordinates = [site.x, site.y];
                coordinates = this._map.convertToProj(coordinates);
                var siteFeature = new ol.Feature({
                    geometry: new ol.geom.Point(coordinates)
                });
                siteFeature.setStyle(this.iconService.getSiteSummaryStyle(site));
                this._siteSource.addFeature(siteFeature);
            };
            Controller.$inject = ["$scope", "$log", "$http", "$location", "userSettings", "iconService"];
            return Controller;
        }());
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
            var Controller = (function () {
                function Controller($scope, $log, userSettings) {
                    this.$scope = $scope;
                    this.$log = $log;
                    this.userSettings = userSettings;
                }
                Controller.prototype.centerOnLocation = function () {
                    this.eventBlock.dispatch("center", null, [this.site.x, this.site.y]);
                };
                Controller.prototype.pickLocation = function () {
                    this.eventBlock.dispatch("pickLocation");
                };
                Controller.$inject = ["$scope", "$log", "userSettings"];
                return Controller;
            }());
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
            var Controller = (function () {
                function Controller($scope, $log, $mdToast, userSettings, iconService) {
                    this.$scope = $scope;
                    this.$log = $log;
                    this.$mdToast = $mdToast;
                    this.userSettings = userSettings;
                    this.iconService = iconService;
                }
                Object.defineProperty(Controller.prototype, "site", {
                    get: function () {
                        return this._site;
                    },
                    set: function (value) {
                        this._site = value;
                        this._addSiteToMap();
                        this._centerOnSite();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Controller.prototype, "map", {
                    get: function () {
                        return this._map;
                    },
                    enumerable: true,
                    configurable: true
                });
                Controller.prototype.$postLink = function () {
                    var _this = this;
                    setTimeout(function () { return _this._setupMap(); });
                    if (this.eventBlock) {
                        this.eventBlock.on("center", this._onCenter.bind(this));
                        this.eventBlock.on("pickLocation", this._onPickLocation.bind(this));
                        this.eventBlock.on("refreshLocation", this._onRefreshLocation.bind(this));
                    }
                };
                Controller.prototype._setupMap = function () {
                    this._map = new snm.maps.components.Map("map", this.userSettings);
                    this._siteSource = new ol.source.Vector();
                    var siteLayer = new ol.layer.Vector({
                        renderOrder: null,
                        source: this._siteSource
                    });
                    this._map.addLayer(siteLayer);
                    this._addSiteToMap();
                    this._centerOnSite();
                };
                Controller.prototype._addSiteToMap = function () {
                    if (!this._siteSource || !this._site) {
                        return;
                    }
                    var coordinates = [this._site.x, this._site.y];
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
                };
                Controller.prototype._centerOnSite = function () {
                    if (this._site && typeof this._site.x === "number" && typeof this._site.y === "number") {
                        this._map.center = this._map.convertToProj([this._site.x, this._site.y]);
                    }
                };
                Controller.prototype._onCenter = function (oldValue, newValue) {
                    if (newValue) {
                        this._map.flyTo(this._map.convertToProj(newValue));
                    }
                };
                Controller.prototype._onPickLocation = function (oldValue, newValue) {
                    var _this = this;
                    //Show toast
                    this.$mdToast.show({
                        hideDelay: 0,
                        position: "top right",
                        template: "<md-toast><div class='md-toast-content'>Cliquer pour désigner l'emplacement</div></md-toast>",
                        parent: "#map"
                    });
                    //Create a dispose function to remove the toast
                    var dispose = function () {
                        _this.$mdToast.hide();
                    };
                    //Start interaction
                    this._map.pickLocation().then(function (value) {
                        var coordinates = _this._map.convertFromProj(value);
                        _this.onPick({ coordinates: coordinates });
                        dispose();
                    }, function (reason) {
                        _this.$log.debug(reason);
                        dispose();
                    });
                };
                Controller.prototype._onRefreshLocation = function (oldValue, newValue) {
                    this._addSiteToMap();
                };
                Controller.$inject = ["$scope", "$log", "$mdToast", "userSettings", "iconService"];
                return Controller;
            }());
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
/// <reference path="../../../../typings/angular/angular.d.ts" />
/// <reference path="../../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../../../typings/angular-material/angular-material.d.ts" />
/// <reference path="../../definitions-summary.ts" />
/// <reference path="../../../services/user-settings.ts" />
var snm;
(function (snm) {
    var sarcos;
    (function (sarcos) {
        var components;
        (function (components) {
            // controller
            var Controller = (function () {
                function Controller($scope, $log, $http, $mdToast, userSettings) {
                    this.$scope = $scope;
                    this.$log = $log;
                    this.$http = $http;
                    this.$mdToast = $mdToast;
                    this.userSettings = userSettings;
                }
                Object.defineProperty(Controller.prototype, "siteId", {
                    get: function () {
                        return this._siteId;
                    },
                    set: function (value) {
                        this._siteId = value;
                        if (typeof value === "number") {
                            this._getSitesData(value);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Controller.prototype, "illustrations", {
                    get: function () {
                        return this._illustrations;
                    },
                    set: function (value) {
                        this._illustrations = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Controller.prototype._getSitesData = function (siteId) {
                    var _this = this;
                    this.$http.get("api/sarcos/" + siteId + "/panneaux/illus/summary")
                        .then(function (result) {
                        result.data.forEach(function (ips) {
                            if (ips.chemin) {
                                ips.label = ips.chemin;
                                ips.chemin = _this.userSettings.illustrationStorageRootUrl +
                                    "/sarcos/" + siteId + "/" + ips.chemin;
                            }
                        });
                        _this.illustrations = result.data;
                    });
                };
                Controller.$inject = ["$scope", "$log", "$http", "$mdToast", "userSettings"];
                return Controller;
            }());
            // component
            angular.module("snm.sarcos.components.panneauxSiteList", [
                "ngRoute",
                "ngMaterial"])
                .component("panneauxSiteList", {
                templateUrl: '/app/sarcos/components/panneaux-site-list/panneaux-site-list.component.html',
                controller: Controller,
                controllerAs: "vm",
                bindings: {
                    siteId: "<"
                }
            });
        })(components = sarcos.components || (sarcos.components = {}));
    })(sarcos = snm.sarcos || (snm.sarcos = {}));
})(snm || (snm = {}));
/// <reference path="../../../typings/angular/angular.d.ts" />
/// <reference path="../../../typings/angular/angular-route.d.ts" />
/// <reference path="../../common/event-block.ts" />
/// <reference path="../../ops/definitions-details.ts" />
/// <reference path="../../ops/components/site-localisation/site-localisation.component.ts" />
/// <reference path="../../ops/components/site-ops-map/site-ops-map.component.ts" />
/// <reference path="../../sarcos/components/panneaux-site-list/panneaux-site-list.component.ts" />
var snm;
(function (snm) {
    var pages;
    (function (pages) {
        // controller
        var Controller = (function () {
            function Controller($scope, $log, $http, $location, userSettings, $routeParams) {
                var _this = this;
                this.$scope = $scope;
                this.$log = $log;
                this.$http = $http;
                this.$location = $location;
                this.userSettings = userSettings;
                this.$routeParams = $routeParams;
                var id = $routeParams.siteId;
                $http.get("api/ops/sites/" + id)
                    .then(function (result) {
                    _this.site = result.data;
                });
                this._eventBlock = new adnw.common.EventBlock();
            }
            Object.defineProperty(Controller.prototype, "eventBlock", {
                get: function () {
                    return this._eventBlock;
                },
                enumerable: true,
                configurable: true
            });
            Controller.prototype.edit = function () {
                this.$location.path("/sites/edit/" + this.site.id);
            };
            Controller.$inject = ["$scope", "$log", "$http", "$location", "userSettings", "$routeParams"];
            return Controller;
        }());
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
        var Service = (function () {
            function Service($mdToast) {
                this.$mdToast = $mdToast;
            }
            Service.prototype.showSimpleMsg = function (elementId, msg, hideDelay) {
                var options = {
                    position: "bottom right",
                    template: "<md-toast><div class='md-toast-content'><span>" + msg + "</span></div></md-toast>",
                    parent: elementId
                };
                if (typeof hideDelay === "number") {
                    options.hideDelay = hideDelay;
                }
                this.$mdToast.show(options);
            };
            Service.prototype.showSuccessfulSaveMsg = function (elementId, msg, hideDelay) {
                var options = {
                    position: "bottom right",
                    template: "<md-toast><div class='md-toast-content'><md-icon md-svg-src='assets/img/ic_done_24px.svg' class='s24 md-primary toast-icon' aria-label='Done'></md-icon><span>" + msg + "</span></div></md-toast>",
                    parent: elementId
                };
                if (typeof hideDelay === "number") {
                    options.hideDelay = hideDelay;
                }
                this.$mdToast.show(options);
            };
            Service.prototype.showErrorSaveMsg = function (elementId, msg, hideDelay) {
                var options = {
                    position: "bottom right",
                    template: "<md-toast><div class='md-toast-content'><md-icon md-svg-src='assets/img/ic_report_problem_24px.svg' class='s24 md-warn toast-icon' aria-label='Error'></md-icon><span>" + msg + "</span></div></md-toast>",
                    parent: elementId
                };
                if (typeof hideDelay === "number") {
                    options.hideDelay = hideDelay;
                }
                this.$mdToast.show(options);
            };
            Service.prototype.hide = function () {
                this.$mdToast.hide();
            };
            Service.$inject = ["$mdToast"];
            return Service;
        }());
        angular.module("snm.services.toastService", [])
            .factory("toastService", ["$mdToast", function ($mdToast) { return new Service($mdToast); }]);
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
        var Controller = (function () {
            function Controller($scope, $log, $http, $location, $routeParams, $mdDialog, userSettings, toastService) {
                var _this = this;
                this.$scope = $scope;
                this.$log = $log;
                this.$http = $http;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.$mdDialog = $mdDialog;
                this.userSettings = userSettings;
                this.toastService = toastService;
                this._toastTarget = "#content";
                var id = $routeParams.siteId;
                this._routeChangeHandle = $scope.$on("$locationChangeStart", function (event, newUrl, oldUrl) {
                    _this._onRouteChange(event, newUrl, oldUrl);
                });
                $http.get("api/ops/sites/" + id)
                    .then(function (result) {
                    _this._processSite(result.data);
                });
                this._eventBlock = new adnw.common.EventBlock();
            }
            Object.defineProperty(Controller.prototype, "eventBlock", {
                get: function () {
                    return this._eventBlock;
                },
                enumerable: true,
                configurable: true
            });
            Controller.prototype.save = function () {
                var _this = this;
                this.toastService.showSimpleMsg(this._toastTarget, "Sauvegarde en cours...", 0);
                this.$http.post("api/ops/sites/" + this.site.id, this.site)
                    .then(function (result) {
                    if (result.data.messages) {
                        //Error message
                        _this.toastService.showErrorSaveMsg(_this._toastTarget, result.data.messages);
                    }
                    else {
                        _this.toastService.showSuccessfulSaveMsg(_this._toastTarget, "Données enregistrées");
                        _this._processSite(result.data);
                    }
                }, function (reason) {
                    _this.toastService.showErrorSaveMsg(_this._toastTarget, reason);
                });
            };
            Controller.prototype.cancel = function () {
                var id = this.site.id;
                this.site = null;
                this.$location.path("/sites/" + id);
            };
            Controller.prototype.onPickLocation = function (coordinates) {
                var _this = this;
                var x = ~~coordinates[0];
                var y = ~~coordinates[1];
                //Get commune containing the coordinates
                this.$http.get("api/ops/common/commune/coords?x=" + x + "&y=" + y)
                    .then(function (result) {
                    var commune = result.data;
                    _this.site.x = x;
                    _this.site.y = y;
                    _this._refreshSiteLocation();
                    if (commune) {
                        _this.site.codeCommune = commune.code;
                        _this.site.commune = commune.nom;
                        _this.site.departement = commune.departement;
                    }
                });
            };
            Controller.prototype._onRouteChange = function (event, newUrl, oldUrl) {
                var _this = this;
                if (!this.site)
                    return;
                var isDirty = !this.site.isEquivalent(this._originalSite);
                //Navigate to newUrl if the form isn't dirty
                if (!isDirty)
                    return;
                this._showConfirm().then(function () {
                    //Stop listening for location changes
                    _this._routeChangeHandle();
                    //Go to the requested page
                    _this.$location.path(newUrl);
                }, function () {
                });
                //Prevent navigation by default since we'll handle it once the user selects a dialog option
                event.preventDefault();
            };
            Controller.prototype._processSite = function (data) {
                this.site = new snm.ops.details.SiteArcheo();
                this.site.updateFrom(data);
                this._originalSite = this.site.clone();
                this._refreshSiteLocation();
            };
            Controller.prototype._refreshSiteLocation = function () {
                this._eventBlock.dispatch("refreshLocation", null, null);
            };
            Controller.prototype._showConfirm = function () {
                var confirm = this.$mdDialog.confirm()
                    .title("Vous avez des données non sauvegardées.")
                    .textContent("Si vous quittez la page, vous perdrez toutes vos modifications.")
                    .ok("Quitter")
                    .cancel("Rester");
                return this.$mdDialog.show(confirm);
            };
            Controller.$inject = ["$scope", "$log", "$http", "$location", "$routeParams", "$mdDialog",
                "userSettings", "toastService"];
            return Controller;
        }());
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
            var Controller = (function () {
                function Controller($scope) {
                    this.$scope = $scope;
                }
                Controller.prototype.selectSite = function (siteId) {
                    this.onSelect(siteId);
                };
                Controller.prototype.centerOnSite = function (x, y) {
                    this.onCenter(x, y);
                };
                Controller.$inject = ["$scope"];
                return Controller;
            }());
            // component
            angular.module("snm.ops.components.siteArcheoList", [])
                .component("siteArcheoList", {
                templateUrl: '/app/ops/components/site-archeo-list/site-archeo-list.component.html',
                controller: Controller,
                controllerAs: "vm",
                bindings: {
                    communes: "<",
                    onSelect: "&",
                    onCenter: "&"
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
            var EntitySet = (function () {
                function EntitySet(dbContext, options) {
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
                Object.defineProperty(EntitySet.prototype, "isRunning", {
                    get: function () {
                        return this._isRunning;
                    },
                    enumerable: true,
                    configurable: true
                });
                EntitySet.prototype.getAll = function () {
                    var result = [];
                    this._map.forEach(function (o) { result.push(o); });
                    return result;
                };
                EntitySet.prototype.getByKey = function (key) {
                    return this._map.get(key);
                };
                EntitySet.prototype.refresh = function () {
                    var _this = this;
                    if (this._promise) {
                        //If a Promise is already in flight, return it
                        return this._promise;
                    }
                    this._isRunning = true;
                    var resolveFunc;
                    var rejectFunc;
                    this._promise = new Promise(function (resolve, reject) {
                        resolveFunc = resolve;
                        rejectFunc = reject;
                    });
                    this.$http.get(this._getAllUrl)
                        .then(function (response) {
                        _this._parseArray(response.data);
                        resolveFunc();
                    }, function (reason) { return rejectFunc(reason); })
                        .finally(function () {
                        _this._isRunning = false;
                        _this._promise = null;
                    });
                    return this._promise;
                };
                EntitySet.prototype._parseArray = function (array) {
                    var _this = this;
                    array.map(function (o) {
                        var entity = _this._parsingFunc(_this._dbContext, o);
                        _this._map.set(entity.getKey(), entity);
                    });
                };
                EntitySet.prototype._validateOptions = function (options) {
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
                };
                return EntitySet;
            }());
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
            var DbContext = (function () {
                function DbContext($http) {
                    this.$http = $http;
                    this._repositories = new Map();
                }
                DbContext.prototype.getRepository = function (type) {
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
                        var factory = DbContext._factories.get(type);
                        var result = factory(this, this.$http);
                        //Add new instance to repositories map
                        this._repositories.set(type, result);
                        return result;
                    }
                };
                DbContext.addRepository = function (type, factory) {
                    if (!type) {
                        throw new Error("Type cannot be empty.");
                    }
                    if (!factory) {
                        throw new Error("Factory cannot be null.");
                    }
                    DbContext._factories.set(type, factory);
                };
                DbContext.$inject = ["$http"];
                DbContext._factories = new Map();
                return DbContext;
            }());
            dal.DbContext = DbContext;
            angular.module("snm.services.dal.dbContext", [])
                .factory("dbContext", ["$http", function ($http) { return new DbContext($http); }]);
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
            var EntityBase = (function () {
                function EntityBase(dbContext) {
                    if (!dbContext) {
                        throw new Error("DbContext cannot be null.");
                    }
                    this._dbContext = dbContext;
                }
                return EntityBase;
            }());
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
        var Departement = (function (_super) {
            __extends(Departement, _super);
            //endregion
            function Departement(dbContext, data) {
                _super.call(this, dbContext);
                if (data) {
                    this._numero = data.numero;
                    this._nom = data.nom;
                }
            }
            Object.defineProperty(Departement.prototype, "numero", {
                get: function () {
                    return this._numero;
                },
                set: function (value) {
                    this._numero = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Departement.prototype, "nom", {
                get: function () {
                    return this._nom;
                },
                set: function (value) {
                    this._nom = value;
                },
                enumerable: true,
                configurable: true
            });
            Departement.prototype.getKey = function () {
                return this._numero;
            };
            return Departement;
        }(snm.services.dal.EntityBase));
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
            var DepartementSet = (function (_super) {
                __extends(DepartementSet, _super);
                function DepartementSet(dbContext, $http) {
                    _super.call(this, dbContext, {
                        $http: $http,
                        parseEntity: function (dbContext, data) {
                            return new ops.Departement(dbContext, data);
                        },
                        getAllUrl: "api/ops/common/departement"
                    });
                    this.refresh();
                }
                return DepartementSet;
            }(snm.services.dal.EntitySet));
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
        var Commune = (function (_super) {
            __extends(Commune, _super);
            //endregion
            function Commune(dbContext, data) {
                _super.call(this, dbContext);
                if (data) {
                    this._code = data.code;
                    this._nom = data.nom;
                    this._x = data.x;
                    this._y = data.y;
                    this._departementId = data.departementId;
                    this._codeRegion = data.codeRegion;
                }
            }
            Object.defineProperty(Commune.prototype, "code", {
                get: function () {
                    return this._code;
                },
                set: function (value) {
                    this._code = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Commune.prototype, "nom", {
                get: function () {
                    return this._nom;
                },
                set: function (value) {
                    this._nom = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Commune.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (value) {
                    this._x = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Commune.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (value) {
                    this._y = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Commune.prototype, "departementId", {
                get: function () {
                    return this._departementId;
                },
                set: function (value) {
                    this._departementId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Commune.prototype, "departement", {
                get: function () {
                    return this._dbContext.getRepository("Departement").getByKey(this._departementId);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Commune.prototype, "codeRegion", {
                get: function () {
                    return this._codeRegion;
                },
                set: function (value) {
                    this._codeRegion = value;
                },
                enumerable: true,
                configurable: true
            });
            Commune.prototype.getKey = function () {
                return this._code;
            };
            return Commune;
        }(snm.services.dal.EntityBase));
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
            var CommuneSet = (function (_super) {
                __extends(CommuneSet, _super);
                function CommuneSet(dbContext, $http) {
                    _super.call(this, dbContext, {
                        $http: $http,
                        parseEntity: function (dbContext, data) {
                            return new ops.Commune(dbContext, data);
                        },
                        getAllUrl: "api/ops/common/commune"
                    });
                    this.refresh();
                }
                return CommuneSet;
            }(snm.services.dal.EntitySet));
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
            var SiteArcheoSet = (function (_super) {
                __extends(SiteArcheoSet, _super);
                function SiteArcheoSet(dbContext, $http) {
                    _super.call(this, dbContext, {
                        $http: $http,
                        parseEntity: function (dbContext, data) {
                            return new ops.SiteArcheo(dbContext, data);
                        },
                        getAllUrl: "api/ops/sites/summary"
                    });
                    this.refresh();
                }
                return SiteArcheoSet;
            }(snm.services.dal.EntitySet));
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
            var OperationArcheoSet = (function (_super) {
                __extends(OperationArcheoSet, _super);
                function OperationArcheoSet(dbContext, $http) {
                    _super.call(this, dbContext, {
                        $http: $http,
                        parseEntity: function (dbContext, data) {
                            return new ops.OperationArcheo(dbContext, data);
                        },
                        getAllUrl: "api/ops/operations"
                    });
                    this.refresh();
                }
                OperationArcheoSet.prototype.getBySiteId = function (siteId) {
                    if (typeof siteId !== "number") {
                        throw new Error("SiteId must be a number.");
                    }
                    var result = [];
                    this._map.forEach(function (op) {
                        if (op.siteId === siteId) {
                            result.push(op);
                        }
                    });
                    return result;
                };
                return OperationArcheoSet;
            }(snm.services.dal.EntitySet));
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
        ]).run(["dbContext", function (dbContext) {
                DbContext.addRepository("Departement", function (dbContext, $http) {
                    return new snm.ops.dal.DepartementSet(dbContext, $http);
                });
                DbContext.addRepository("Commune", function (dbContext, $http) {
                    return new snm.ops.dal.CommuneSet(dbContext, $http);
                });
                DbContext.addRepository("SiteArcheo", function (dbContext, $http) {
                    return new snm.ops.dal.SiteArcheoSet(dbContext, $http);
                });
                DbContext.addRepository("OperationArcheo", function (dbContext, $http) {
                    return new snm.ops.dal.OperationArcheoSet(dbContext, $http);
                });
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
        var PhaseChronologique = (function (_super) {
            __extends(PhaseChronologique, _super);
            //endregion
            function PhaseChronologique(dbContext, data) {
                _super.call(this, dbContext);
                if (data) {
                    this._id = data.id;
                    this._code = data.code;
                    this._nom = data.nom;
                    this._debut = data.debut;
                    this._fin = data.fin;
                }
            }
            Object.defineProperty(PhaseChronologique.prototype, "id", {
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    this._id = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PhaseChronologique.prototype, "code", {
                get: function () {
                    return this._code;
                },
                set: function (value) {
                    this._code = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PhaseChronologique.prototype, "nom", {
                get: function () {
                    return this._nom;
                },
                set: function (value) {
                    this._nom = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PhaseChronologique.prototype, "debut", {
                get: function () {
                    return this._debut;
                },
                set: function (value) {
                    this._debut = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PhaseChronologique.prototype, "fin", {
                get: function () {
                    return this._fin;
                },
                set: function (value) {
                    this._fin = value;
                },
                enumerable: true,
                configurable: true
            });
            PhaseChronologique.prototype.getKey = function () {
                return this._id;
            };
            return PhaseChronologique;
        }(snm.services.dal.EntityBase));
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
            var PhaseChronologiqueSet = (function (_super) {
                __extends(PhaseChronologiqueSet, _super);
                function PhaseChronologiqueSet(dbContext, $http) {
                    _super.call(this, dbContext, {
                        $http: $http,
                        parseEntity: function (dbContext, data) {
                            return new chrono.PhaseChronologique(dbContext, data);
                        },
                        getAllUrl: "api/chrono/phase"
                    });
                    this.refresh();
                }
                return PhaseChronologiqueSet;
            }(snm.services.dal.EntitySet));
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
            var PhasesChronologiquesController = (function () {
                function PhasesChronologiquesController($scope, dbContext) {
                    var _this = this;
                    this.$scope = $scope;
                    this.dbContext = dbContext;
                    var repoPhaseChrono = dbContext.getRepository("PhaseChronologique");
                    repoPhaseChrono.refresh().then(function () {
                        _this.phases = repoPhaseChrono.getAll();
                        _this.$scope.$applyAsync();
                    });
                }
                Object.defineProperty(PhasesChronologiquesController.prototype, "phases", {
                    get: function () {
                        return this._phases;
                    },
                    set: function (value) {
                        this._phases = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PhasesChronologiquesController.prototype, "debut", {
                    get: function () {
                        return this._debut;
                    },
                    set: function (value) {
                        this._debut = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(PhasesChronologiquesController.prototype, "fin", {
                    get: function () {
                        return this._fin;
                    },
                    set: function (value) {
                        this._fin = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                PhasesChronologiquesController.$inject = ["$scope", "dbContext"];
                return PhasesChronologiquesController;
            }());
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
        ]).run(["dbContext", function (dbContext) {
                DbContext.addRepository("PhaseChronologique", function (dbContext, $http) {
                    return new snm.chrono.dal.PhaseChronologiqueSet(dbContext, $http);
                });
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
        var Personne = (function (_super) {
            __extends(Personne, _super);
            //endregion
            function Personne(dbContext, data) {
                _super.call(this, dbContext);
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
            Object.defineProperty(Personne.prototype, "id", {
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    this._id = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Personne.prototype, "prenom", {
                get: function () {
                    return this._prenom;
                },
                set: function (value) {
                    this._prenom = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Personne.prototype, "autresPrenoms", {
                get: function () {
                    return this._autresPrenoms;
                },
                set: function (value) {
                    this._autresPrenoms = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Personne.prototype, "nom", {
                get: function () {
                    return this._nom;
                },
                set: function (value) {
                    this._nom = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Personne.prototype, "suffixe", {
                get: function () {
                    return this._suffixe;
                },
                set: function (value) {
                    this._suffixe = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Personne.prototype, "nomComplet", {
                get: function () {
                    return this._nomComplet;
                },
                set: function (value) {
                    this._nomComplet = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Personne.prototype, "organismeId", {
                get: function () {
                    return this._organismeId;
                },
                set: function (value) {
                    this._organismeId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Personne.prototype, "organisme", {
                get: function () {
                    return this._dbContext.getRepository("Organisme").getByKey(this._organismeId);
                },
                enumerable: true,
                configurable: true
            });
            Personne.prototype.getKey = function () {
                return this._id;
            };
            return Personne;
        }(snm.services.dal.EntityBase));
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
            var PersonneSet = (function (_super) {
                __extends(PersonneSet, _super);
                function PersonneSet(dbContext, $http) {
                    _super.call(this, dbContext, {
                        $http: $http,
                        parseEntity: function (dbContext, data) {
                            return new pers.Personne(dbContext, data);
                        },
                        getAllUrl: "api/pers/personne"
                    });
                    this.refresh();
                }
                return PersonneSet;
            }(snm.services.dal.EntitySet));
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
        var Organisme = (function (_super) {
            __extends(Organisme, _super);
            //endregion
            function Organisme(dbContext, data) {
                _super.call(this, dbContext);
                if (data) {
                    this._id = data.id;
                    this._nom = data.nom;
                    this._abreviation = data.abreviation;
                }
            }
            Object.defineProperty(Organisme.prototype, "id", {
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    this._id = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Organisme.prototype, "nom", {
                get: function () {
                    return this._nom;
                },
                set: function (value) {
                    this._nom = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Organisme.prototype, "abreviation", {
                get: function () {
                    return this._abreviation;
                },
                set: function (value) {
                    this._abreviation = value;
                },
                enumerable: true,
                configurable: true
            });
            Organisme.prototype.getKey = function () {
                return this._id;
            };
            return Organisme;
        }(snm.services.dal.EntityBase));
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
            var OrganismeSet = (function (_super) {
                __extends(OrganismeSet, _super);
                function OrganismeSet(dbContext, $http) {
                    _super.call(this, dbContext, {
                        $http: $http,
                        parseEntity: function (dbContext, data) {
                            return new pers.Organisme(dbContext, data);
                        },
                        getAllUrl: "api/pers/organisme"
                    });
                    this.refresh();
                }
                return OrganismeSet;
            }(snm.services.dal.EntitySet));
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
            var PersonneController = (function () {
                function PersonneController($scope) {
                    this.$scope = $scope;
                }
                Object.defineProperty(PersonneController.prototype, "personne", {
                    get: function () {
                        return this._personne;
                    },
                    set: function (value) {
                        this._personne = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                PersonneController.$inject = ["$scope"];
                return PersonneController;
            }());
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
        ]).run(["dbContext", function (dbContext) {
                DbContext.addRepository("Personne", function (dbContext, $http) {
                    return new snm.pers.dal.PersonneSet(dbContext, $http);
                });
                DbContext.addRepository("Organisme", function (dbContext, $http) {
                    return new snm.pers.dal.OrganismeSet(dbContext, $http);
                });
            }]);
    })(pers = snm.pers || (snm.pers = {}));
})(snm || (snm = {}));
/// <reference path="../../typings/angular/angular.d.ts" />
/// <reference path="../app-constants.ts" />
/// <reference path="./components/panneaux-site-list/panneaux-site-list.component.ts" />
var snm;
(function (snm) {
    var sarcos;
    (function (sarcos) {
        angular.module(snm.AppConstants.SARCOS_MODULE_NAME, [
            "snm.sarcos.components.panneauxSiteList"
        ]);
    })(sarcos = snm.sarcos || (snm.sarcos = {}));
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
/// <reference path="sarcos/sarcos.ts" />
/// <reference path="services/user-settings.ts" />
var Bootstrap = (function () {
    function Bootstrap() {
    }
    Bootstrap.initialize = function () {
        angular.module(snm.AppConstants.CORE_MODULE_NAME, [
            snm.AppConstants.COMPONENTS_MODULE_NAME,
            snm.AppConstants.MAPS_MODULE_NAME,
            snm.AppConstants.PAGES_MODULE_NAME,
            snm.AppConstants.SERVICES_MODULE_NAME,
            snm.AppConstants.CHRONO_MODULE_NAME,
            snm.AppConstants.OPS_MODULE_NAME,
            snm.AppConstants.PERS_MODULE_NAME,
            snm.AppConstants.SARCOS_MODULE_NAME,
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
        angular.element(document).ready(function () {
            var initInjector = angular.injector(["ng"]);
            var $http = initInjector.get("$http");
            snm.services.settings.UserSettings.fetchSettings($http)
                .then(function () {
                angular.bootstrap(document, [snm.AppConstants.CORE_MODULE_NAME]);
            });
        });
    };
    Bootstrap._configureRoutes = function ($routeProvider) {
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
    };
    return Bootstrap;
}());
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
        var OperationArcheo = (function (_super) {
            __extends(OperationArcheo, _super);
            //endregion
            function OperationArcheo(dbContext, data) {
                _super.call(this, dbContext);
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
            Object.defineProperty(OperationArcheo.prototype, "id", {
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    this._id = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "siteId", {
                get: function () {
                    return this._siteId;
                },
                set: function (value) {
                    this._siteId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "site", {
                get: function () {
                    return this._dbContext.getRepository("SiteArcheo").getByKey(this._siteId);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "codeCommune", {
                get: function () {
                    return this._codeCommune;
                },
                set: function (value) {
                    this._codeCommune = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "commune", {
                get: function () {
                    return this._dbContext.getRepository("Commune").getByKey(this._codeCommune);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (value) {
                    this._x = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (value) {
                    this._y = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "localisation", {
                get: function () {
                    return this._localisation;
                },
                set: function (value) {
                    this._localisation = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "responsableId", {
                get: function () {
                    return this._responsableId;
                },
                set: function (value) {
                    this._responsableId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "responsable", {
                get: function () {
                    return this._dbContext.getRepository("Personne").getByKey(this._responsableId);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "organismeId", {
                get: function () {
                    return this._organismeId;
                },
                set: function (value) {
                    this._organismeId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "organisme", {
                get: function () {
                    return this._dbContext.getRepository("Organisme").getByKey(this._organismeId);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "debutTravaux", {
                get: function () {
                    return this._debutTravaux;
                },
                set: function (value) {
                    this._debutTravaux = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "finTravaux", {
                get: function () {
                    return this._finTravaux;
                },
                set: function (value) {
                    this._finTravaux = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "debutOccupationId", {
                get: function () {
                    return this._debutOccupationId;
                },
                set: function (value) {
                    this._debutOccupationId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "debutOccupation", {
                get: function () {
                    return this._dbContext.getRepository("PhaseChronologique")
                        .getByKey(this._debutOccupationId);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "finOccupationId", {
                get: function () {
                    return this._finOccupationId;
                },
                set: function (value) {
                    this._finOccupationId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "finOccupation", {
                get: function () {
                    return this._dbContext.getRepository("PhaseChronologique")
                        .getByKey(this._finOccupationId);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "planId", {
                get: function () {
                    return this._planId;
                },
                set: function (value) {
                    this._planId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(OperationArcheo.prototype, "identifications", {
                get: function () {
                    return this._identifications;
                },
                enumerable: true,
                configurable: true
            });
            OperationArcheo.prototype.getKey = function () {
                return this._id;
            };
            return OperationArcheo;
        }(snm.services.dal.EntityBase));
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
        var SiteArcheo = (function (_super) {
            __extends(SiteArcheo, _super);
            //endregion
            function SiteArcheo(dbContext, data) {
                _super.call(this, dbContext);
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
            Object.defineProperty(SiteArcheo.prototype, "id", {
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    this._id = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SiteArcheo.prototype, "codeCommune", {
                get: function () {
                    return this._codeCommune;
                },
                set: function (value) {
                    this._codeCommune = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SiteArcheo.prototype, "commune", {
                get: function () {
                    return this._dbContext.getRepository("Commune").getByKey(this._codeCommune);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SiteArcheo.prototype, "x", {
                get: function () {
                    return this._x;
                },
                set: function (value) {
                    this._x = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SiteArcheo.prototype, "y", {
                get: function () {
                    return this._y;
                },
                set: function (value) {
                    this._y = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SiteArcheo.prototype, "localisation", {
                get: function () {
                    return this._localisation;
                },
                set: function (value) {
                    this._localisation = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SiteArcheo.prototype, "operations", {
                get: function () {
                    var repo = this._dbContext.getRepository("OperationArcheo");
                    return repo.getBySiteId(this._id);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SiteArcheo.prototype, "debutOccupationId", {
                get: function () {
                    return this._debutOccupationId;
                },
                set: function (value) {
                    this._debutOccupationId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SiteArcheo.prototype, "debutOccupation", {
                get: function () {
                    return this._dbContext.getRepository("PhaseChronologique")
                        .getByKey(this._debutOccupationId);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SiteArcheo.prototype, "finOccupationId", {
                get: function () {
                    return this._finOccupationId;
                },
                set: function (value) {
                    this._finOccupationId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SiteArcheo.prototype, "finOccupation", {
                get: function () {
                    return this._dbContext.getRepository("PhaseChronologique")
                        .getByKey(this._finOccupationId);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SiteArcheo.prototype, "planId", {
                get: function () {
                    return this._planId;
                },
                set: function (value) {
                    this._planId = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SiteArcheo.prototype, "identifications", {
                get: function () {
                    return this._identifications;
                },
                enumerable: true,
                configurable: true
            });
            SiteArcheo.prototype.getKey = function () {
                return this._id;
            };
            return SiteArcheo;
        }(snm.services.dal.EntityBase));
        ops.SiteArcheo = SiteArcheo;
    })(ops = snm.ops || (snm.ops = {}));
})(snm || (snm = {}));

//# sourceMappingURL=sarconecmero.js.map
