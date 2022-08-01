var _a = require('../../../../lib/helper/ElectronHelper'), onIpc = _a.onIpc, getElectronModule = _a.getElectronModule, getBrowserWindow = _a.getBrowserWindow;
onIpc('download-request', function (event, mediaId) {
    console.log('download-request', mediaId);
    getElectronModule('dialog').showSaveDialog(getBrowserWindow, {})
        .then(function (resolve) {
    })["catch"](function (reject) {
    });
});
