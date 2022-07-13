"use strict";
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var TaskManager = require("@task/TaskManager").TaskManager;
var WorkFlow = /** @class */ (function () {
    function WorkFlow() {
    }
    WorkFlow.ingest = function (event, args) {
        new TaskManager()
            .initialize()
            .then(function (taskParse) {
            console.log('taskParse');
            console.log(taskParse);
            return event.returnValue = {
                success: true,
                data: null
            };
        })["catch"](function (error) {
            console.log('error');
            console.log(error);
            return event.returnValue = {
                success: false,
                data: null
            };
        });
    };
    return WorkFlow;
}());
new BaseController_1.BaseController(WorkFlow);
