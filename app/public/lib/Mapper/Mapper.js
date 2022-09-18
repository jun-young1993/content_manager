"use strict";
exports.__esModule = true;
var Mapper = /** @class */ (function () {
    function Mapper(property) {
        var _this = this;
        this.map = {};
        property.maps.forEach(function (map) {
            var mapClass = require("./Map/".concat(map))[map];
            _this.map[map] = new mapClass();
        });
    }
    Mapper.prototype.getMap = function (mapClassName) {
        return this.map[mapClassName];
    };
    return Mapper;
}());
exports["default"] = Mapper;
