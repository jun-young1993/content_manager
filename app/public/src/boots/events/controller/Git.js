"use strict";
exports.__esModule = true;
var BaseController_1 = require("./BaseController");
var request = require("request");
var GIT_HUB_API = "https://api.github.com";
var GIT_HUB_HEADER = { "user-agent": "node.js", "Authorization": "Bearer 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" };
var GIT_HUB_OWNNER = "jun-young1993";
var GIT_HUB_REPO = "content_manager";
var Git = /** @class */ (function () {
    function Git() {
    }
    Git.$release = function (event, args) {
        return new Promise(function (resolve, reject) {
            var options = {
                'method': 'GET',
                'url': "".concat(GIT_HUB_API, "/repos/").concat(GIT_HUB_OWNNER, "/").concat(GIT_HUB_REPO, "/releases").concat((args.length === 0) ? "" : "/".concat(args[0])),
                'headers': GIT_HUB_HEADER
            };
            request(options, function (error, response) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(response.body);
                }
                ;
            });
        });
    };
    return Git;
}());
new BaseController_1.BaseController(Git);
