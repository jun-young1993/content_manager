"use strict";
exports.__esModule = true;
var os_1 = require("os");
var lodash_1 = require("lodash");
var Store = require("electron-store");
var router = require('express').Router();
var QRCode = require("qrcode");
var formidable = require('formidable').formidable;
var fs = require("fs");
var path = require("path");
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
// router.use(require('express').static(path.resolve(__dirname,"views/public")));
router.use(require('express').static(path.resolve(__dirname, "share")));
// router.get('/',(req:any, res:any, next:any) => {
// 	res.sendFile(path.resolve(__dirname,"/views/public/share.html"));
// })
router.get('/info', function (req, res, next) {
    // if (disable.info) {
    // 	res.sendStatus(404);
    // 	return;
    //     }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Just in case
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // Just in case
    res.setHeader('Access-Control-Allow-Credentials', "true"); // Just in case
    //     const addressesPromise = getAddressesWQRCodes(publicPath, port);
    /** @type {Promise<[FolderContent, string]>} */
    //     let rootContentPromise;
    //     if(disable.fileDownload) {
    // 	rootContentPromise = Promise.resolve([null, null]);
    //     } else if(req.query.md5 != null && liveCache.contentOutputMD5 === req.query.md5) {
    // 	// NOTE(baris): In browser cache hit case. Browser will not update.
    // 	rootContentPromise = Promise.resolve([null, liveCache.contentOutputMD5]);
    //     } else {
    // 	rootContentPromise = liveCache.prepContentOutput();
    //     }
    //     Promise.all([
    // 	addressesPromise,
    // 	rootContentPromise
    //     ]).then(([addresses, [rootContent, rootContentMD5]]) => {
    // 	/** @type {ServerInfoResult} */
    // 	const info = {
    // 	    "addresses": addresses,
    // 	    "port": port,
    // 	    "allowDeletion": allowDeletion,
    // 	    "multiUpload": multiUpload,
    // 	    "folderUpload": folderUpload,
    // 	    "rootContent": rootContent,
    // 	    "rootContentMD5": rootContentMD5
    // 	};
    // 	res.json(info);
    //     })
    var store = new Store();
    var info = {
        "addresses": getIPAddress(),
        "port": store.get("app.network_port")
    };
    res.json(info);
});
router.get("/qr-code/:ip/:port", function (req, res) {
    var _a = req.params, ip = _a.ip, port = _a.port;
    console.log("=>(share.ts:76) ", "http://".concat(ip, ":").concat(port));
    QRCode.toDataURL("http://".concat(ip, ":").concat(port, "/share"), function (err, url) {
        var data = url.replace(/.*,/, "");
        // @ts-ignore
        var img = new Buffer.from(data, "base64");
        res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": img.length
        });
        res.end(img);
    });
});
router.post('/', function (req, res, next) {
    var form = formidable({
        // uploadDir  : "C:/Users/jun/Downloads/downloadTest",
        uploadDir: "C:/Users/jun/Downloads/downloadTest",
        keepExtensions: true,
        multiples: true,
        maxFileSize: 100 * 1024 * 1024 * 1024
    })
        .on("progress", function (bytesReceived, bytesExpected) {
        var temp = bytesReceived * 100 / bytesExpected;
        var progress = Math.floor(temp);
        console.log('progress', progress);
    })
        .on("fileBegin", function (webkitRelativePath, file) {
        console.log('fileBeegin', webkitRelativePath, file);
    })
        .on("file", function (name, file) {
        console.log('file done', name, file);
    });
    form.parse(req, function (error, fields, files) {
        if (error != null) {
            console.error("form error", error);
            res.sendStatus(400);
        }
        else {
            // logDebug("files", files);
            console.log("file uploads done");
            res.sendStatus(200);
        }
    });
});
module.exports = router;
