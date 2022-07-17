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
var baseService = /** @class */ (function () {
    function baseService(property) {
        var _this = this;
        this.model = [];
        // const {Field} = require('../../../public/models/Field')
        property.models.forEach(function (model) {
            _this.model[model] = require('../../../public/models/' + model);
        });
    }
    baseService.prototype.getModel = function (modelName) {
        return new this.model[modelName][modelName]().db();
    };
    return baseService;
}());
var mediaService = /** @class */ (function (_super) {
    __extends(mediaService, _super);
    function mediaService() {
        return _super.call(this, {
            models: [
                'Content',
                'Media'
            ]
        }) || this;
    }
    mediaService.prototype.findOriginalByContentId = function (contentId) {
        this.getModel('Media').findOne({ content_id: contentId, type: 'original' }, function (err, media) {
            return {
                success: true,
                data: media
            };
        });
    };
    mediaService.prototype.findOutByContentId = function (contentId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getModel('Media').findOne({ content_id: contentId, type: 'out' }, function (err, media) {
                resolve({
                    success: true,
                    data: media
                });
            });
        });
    };
    return mediaService;
}(baseService));
var media = new mediaService();
console.log(require('../../../public/models/' + 'Content'));
console.log(media.findOutByContentId('qVci79SkN042Wqrn').then(function (resolve) { return console.log(resolve); }));
