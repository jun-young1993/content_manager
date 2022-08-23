"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Mapper_1 = require("./Mapper");
var CodeMapper = /** @class */ (function (_super) {
    __extends(CodeMapper, _super);
    function CodeMapper() {
        return _super.call(this, {
            maps: [
                'StorageMap',
                'CodeItemMap'
            ]
        }) || this;
    }
    CodeMapper.prototype.getModuleCodeMap = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Promise.all([
                _this.getMap('StorageMap').codeMap(),
                _this.getMap("CodeItemMap").codeItemMapByParentCode('media_type'),
                _this.getMap("CodeItemMap").codeItemMapByParentCode('task_module_type'),
            ])
                .then(function (resolves) {
                resolve({
                    'storage': resolves[0],
                    'media': resolves[1],
                    'task': resolves[2]
                });
            });
        });
    };
    return CodeMapper;
}(Mapper_1["default"]));
exports["default"] = CodeMapper;
