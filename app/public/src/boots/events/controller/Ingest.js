"use strict";
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var ContentService_1 = require("../../../../service/ContentService");
var contentService = new ContentService_1.ContentService();
var Ingest = /** @class */ (function () {
    function Ingest() {
    }
    Ingest._ingest = function (event, args) {
        var metadata = args.metadata, files = args.files;
        contentService.createContent(metadata)
            .then(function (content) {
            console.log('content', content);
            event.autoReplay(content);
        })["catch"](function (contentInsertError) {
            console.log('contentInsertError', contentInsertError);
        });
    };
    return Ingest;
}());
new BaseController_1.BaseController(Ingest);
