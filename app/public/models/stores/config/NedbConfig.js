"use strict";
exports.__esModule = true;
exports.Custom = exports.QueryMap = void 0;
var QueryMap;
(function (QueryMap) {
    QueryMap["get"] = "find";
    QueryMap["insert"] = "insert";
    QueryMap["find"] = "findOne";
    QueryMap["update"] = "update";
})(QueryMap = exports.QueryMap || (exports.QueryMap = {}));
var Custom = /** @class */ (function () {
    function Custom() {
        this["update"] = function (query, nedb) {
            if (query === void 0) { query = {}; }
            // @ts-ignore
            // if (query.type == 'set') {
            //         const query.id =
            // }
        };
    }
    return Custom;
}());
exports.Custom = Custom;
