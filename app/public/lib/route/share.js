"use strict";
exports.__esModule = true;
var os_1 = require("os");
var electron_1 = require("electron");
var lodash_1 = require("lodash");
var configs_1 = require("../../config/configs");
var Store = require("electron-store");
var IngestService_1 = require("../../service/IngestService");
var ElectronHelper_1 = require("../helper/ElectronHelper");
var router = require('express').Router();
var QRCode = require("qrcode");
var formidable = require('formidable').formidable;
var fs = require("fs");
// const path = require("path");
var path = require("path");
function getIPAddress() {
    var interfaces = (0, os_1.networkInterfaces)();
    var ips = [];
    for (var devName in interfaces) {
        // @ts-ignore
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
    var targetPath = path.resolve(electron_1.app.getPath("temp"), configs_1.LAN_SHARE_TMP_FILE);
    var form = formidable({
        // uploadDir  : "C:/Users/jun/Downloads/downloadTest",
        uploadDir: targetPath,
        keepExtensions: true,
        multiples: true,
        maxFileSize: 100 * 1024 * 1024 * 1024
    })
        .on("progress", function (bytesReceived, bytesExpected) {
        // const temp = bytesReceived * 100 / bytesExpected;
        // const progress = Math.floor(temp);
        // console.log('progress',progress);
    })
        .on("fileBegin", function (webkitRelativePath, file) {
        // console.log('fileBeegin',webkitRelativePath, file);
    })
        .on("file", function (name, file) {
        console.log('file done', name, file);
        new IngestService_1.IngestService().outIngestByFiles([file.filepath])
            .then(function (result) {
            (0, ElectronHelper_1.sendIpc)("#ShowMessageAlert/reply", {
                severity: "success",
                title: "\uC791\uC5C5\uC694\uCCAD\uC5D0 \uC131\uACF5\uD588\uC2B5\uB2C8\uB2E4."
            });
        })["catch"](function (exception) {
            (0, ElectronHelper_1.sendIpc)("#ShowMessageAlert/reply", {
                severity: "error",
                title: "\uC791\uC5C5\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.\n\t\t\t\t\t".concat(exception, "}")
            });
        });
    });
    fs.mkdir(targetPath, { recursive: true }, function (error) {
        if (error) {
            console.error(error);
            res.sendStatus(400);
        }
        else {
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
        }
    });
});
module.exports = router;
