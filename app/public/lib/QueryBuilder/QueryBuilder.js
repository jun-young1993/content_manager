"use strict";
exports.__esModule = true;
exports.QueryBuilder = exports.QUERY_TYPE = void 0;
var QUERY_TYPE;
(function (QUERY_TYPE) {
    QUERY_TYPE["GET"] = "get";
})(QUERY_TYPE = exports.QUERY_TYPE || (exports.QUERY_TYPE = {}));
var QueryBuilder = /** @class */ (function () {
    function QueryBuilder() {
        this.wheres = [];
        this.queryType = '';
    }
    // protected db = null;
    QueryBuilder.prototype.query = function () {
        return this;
    };
    QueryBuilder.prototype.where = function (column, where) {
        var whereSet = {
            column: column,
            where: where
        };
        this.wheres.push(whereSet);
        return this;
    };
    QueryBuilder.prototype.get = function () {
        this.queryType = QUERY_TYPE.GET;
        this.querySetting();
    };
    QueryBuilder.prototype.querySetting = function () {
        var wheres = this.wheres;
        if (this.queryType == QUERY_TYPE.GET) {
            wheres.forEach(function (value, index) {
                console.log(value);
                console.log(index);
            });
        }
    };
    QueryBuilder.prototype.toSql = function () {
        console.log(this.wheres);
        console.log(this.queryType);
    };
    return QueryBuilder;
}());
exports.QueryBuilder = QueryBuilder;
