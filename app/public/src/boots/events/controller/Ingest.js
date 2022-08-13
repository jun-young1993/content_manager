"use strict";
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var ContentService_1 = require("../../../../service/ContentService");
var IngestService_1 = require("../../../../service/IngestService");
var log = require('../../../../lib/Logger');
var contentService = new ContentService_1.ContentService();
var ingestService = new IngestService_1.IngestService();
var Ingest = /** @class */ (function () {
    function Ingest() {
    }
    Ingest._ingest = function (event, args) {
        var _a = args[0], metadata = _a.metadata, files = _a.files;
        log.channel('ingest').log("[_ingest][create content]");
        contentService.createContent(metadata)
            .then(function (content) {
            var contentId = content.data._id;
            ingestService.outIngestByContentId(contentId, files[0])
                .then(function (ingestTask) {
                log.channel('ingest').log("[_ingest][ingestTask] ", ingestTask);
                event.autoReply(ingestTask);
            })["catch"](function (ingestTaskError) {
                log.channel('ingest').log("[_ingest][ingestTask][Catch]", ingestTaskError);
                event.autoReply(ingestTaskError);
            });
        })["catch"](function (contentInsertError) {
            log.channel('ingest').log("[_ingest][create content][Catch]", contentInsertError);
        });
    };
    return Ingest;
}());
new BaseController_1.BaseController(Ingest);
