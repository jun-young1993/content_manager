"use strict";
exports.__esModule = true;
var _a = require('../../../../lib/helper/ElectronHelper'), onIpc = _a.onIpc, sendIpc = _a.sendIpc;
var electron_1 = require("electron");
var log = require("../../../../lib/Logger");
var TaskManager_1 = require("../../../../lib/Task/TaskManager");
onIpc("#start-workflow", function (event, options) {
    log.channel("start-workflow").info("[START-WORKFLOW]");
    log.channel("start-workflow").info(options);
    new TaskManager_1.TaskManager()
        .startWorkflow(options)
        .then(function (task) {
        log.channel('ingest').info("[START-WORKFLOW]");
        log.channel('ingest').info(task);
        new TaskManager_1.TaskManager()
            .initialize()
            .then(function (taskParse) {
            log.channel('ingest').info("[Ingest] success Task : ".concat(taskParse.data));
            sendIpc("#ShowMessageAlert/reply", {
                severity: "success",
                title: "작업이 성공적으로 요청되었습니다."
            });
            electron_1.ipcRenderer.removeAllListeners("#start-workflow");
            // resolve(taskParse);
        })["catch"](function (exception) {
            log.channel('ingest').info("[Ingest][Exception] : ".concat(exception));
            sendIpc("#ShowMessageAlert/reply", {
                severity: "success",
                title: "\uC791\uC5C5 \uC0DD\uC131\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4. ".concat(exception)
            });
            electron_1.ipcRenderer.removeAllListeners("#start-workflow");
        });
    })["catch"](function (taskException) {
        log.channel('ingest').info("[START-WORKFLOW][EXCEPTION] ".concat(taskException));
        sendIpc("#ShowMessageAlert/reply", {
            severity: "error",
            title: "\uC791\uC5C5\uC694\uCCAD\uC774 \uC2E4\uD328\uD558\uC600\uC2B5\uB2C8\uB2E4. ".concat(taskException)
        });
        electron_1.ipcRenderer.removeAllListeners("#start-workflow");
    });
});
