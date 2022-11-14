"use strict";
exports.__esModule = true;
// @ts-nocheck
var _a = require('../../../../lib/helper/ElectronHelper'), getElectronModule = _a.getElectronModule, getBrowserWindow = _a.getBrowserWindow, getPath = _a.getPath, getApp = _a.getApp;
var electron_1 = require("electron");
var ElectronHelper_1 = require("../../../../lib/helper/ElectronHelper");
var IngestService_1 = require("../../../../service/IngestService");
var log = require("../../../../lib/Logger");
electron_1.ipcMain.handle("$ingest", function (event) {
    return new Promise(function (resolve) {
        var dialog = getElectronModule('dialog');
        dialog.showOpenDialog(getBrowserWindow(), {
            properties: ['openFile', 'multiSelections']
        })
            .then(function (result) {
            if (!result.canceled && result.filePaths) {
                log.channel('ingest').info("[Ingest][Request][SelectedFiles]");
                log.channel('ingest').info(result.filePaths);
                var files = result.filePaths;
                new IngestService_1.IngestService().outIngestByFiles(files)
                    .then(function (result) {
                    resolve(result);
                    (0, ElectronHelper_1.sendIpc)("#ShowMessageAlert/reply", {
                        severity: "success",
                        title: "\uC791\uC5C5\uC694\uCCAD\uC5D0 \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4."
                    });
                })["catch"](function (exception) {
                    (0, ElectronHelper_1.sendIpc)("#ShowMessageAlert/reply", {
                        severity: "error",
                        title: "\uC791\uC5C5\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.\n\t\t\t\t\t\t\t".concat(exception, "}")
                    });
                });
            }
        })["catch"](function (dialogException) {
            log.channel('ingest').info("[Ingest][Request][DialogException]");
            log.channel('ingest').info(dialogException);
        });
    });
});
