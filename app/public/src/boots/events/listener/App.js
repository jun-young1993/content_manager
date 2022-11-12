"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var os_1 = require("os");
var lodash_1 = require("lodash");
var Store = require("electron-store");
var store = new Store();
function getIPAddress() {
    var interfaces = (0, os_1.networkInterfaces)();
    var ips = [];
    for (var devName in interfaces) {
        var face = interfaces[devName];
        for (var i = 0; i < face.length; i++) {
            var alias = face[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                // @ts-ignore
                if ((0, lodash_1.isString)(alias.address))
                    ips.push(alias.address);
        }
    }
    return ips;
}
electron_1.ipcMain.handle("$share/ip-info", function (event) {
    return new Promise(function (resolve) {
        resolve({
            addresses: getIPAddress(),
            port: store.get("app.share_port")
        });
    });
});
