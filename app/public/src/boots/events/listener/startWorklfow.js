"use strict";
exports.__esModule = true;
var _a = require('../../../../lib/helper/ElectronHelper'), onIpc = _a.onIpc, sendIpc = _a.sendIpc;
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
            // resolve(taskParse);
        })["catch"](function (exception) {
            log.channel('ingest').info("[Ingest][Exception] : ".concat(exception));
            sendIpc("#ShowMessageAlert/reply", {
                severity: "success",
                title: "작업이 성공적으로 요청되었습니다."
            });
        });
    })["catch"](function (taskException) {
        log.channel('ingest').info("[START-WORKFLOW][EXCEPTION] ".concat(taskException));
        sendIpc("#ShowMessageAlert/reply", {
            severity: "error",
            title: "작업요청이 실패하였습니다."
        });
    });
});
