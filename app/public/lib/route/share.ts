import {NetworkInterfaceInfo, networkInterfaces} from "os";
import {isString} from "lodash";

const Store = require("electron-store");


const router = require('express').Router();
const QRCode = require("qrcode");

const {formidable} = require('formidable');
const fs = require("fs");
const path = require("path");


function getIPAddress() : string[] | []
{
	const interfaces : NodeJS.Dict<NetworkInterfaceInfo[]> = networkInterfaces();
	const ips : string[] | [] = [];
	for (let devName in interfaces) {
		const face = interfaces[devName];

		for (let i = 0; i < face.length; i++) {
			const alias : NetworkInterfaceInfo = face[i];
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
				// @ts-ignore
				if(isString(alias.address)) ips.push(alias.address);


		}
	}
	return ips;
}
// router.use(require('express').static(path.resolve(__dirname,"views/public")));
router.use(require('express').static(path.resolve(__dirname,"share")));
// router.get('/',(req:any, res:any, next:any) => {
// 	res.sendFile(path.resolve(__dirname,"/views/public/share.html"));
// })
router.get('/info',(req:any, res:any, next:any) => {
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

		const store = new Store();
		const info = {
			"addresses": getIPAddress(),
			"port": store.get("app.network_port"),
		};
	
		res.json(info);
});

router.get("/qr-code/:ip/:port",(req:any, res:any) => {
	const {ip, port} = req.params;


	console.log("=>(share.ts:76) ", `http://${ip}:${port}`);
	QRCode.toDataURL(`http://${ip}:${port}/share`, (err, url) => {
		const data = url.replace(/.*,/, "");
		// @ts-ignore
		const img = new Buffer.from(data, "base64");

		res.writeHead(200, {
			"Content-Type": "image/png",
			"Content-Length": img.length
		});

		res.end(img);
	});
})

router.post('/', (req:any, res:any, next:any) => {

	const form = formidable({ 
		// uploadDir  : "C:/Users/jun/Downloads/downloadTest",
		uploadDir : "C:/Users/jun/Downloads/downloadTest",
		keepExtensions : true,
		multiples: true,
		maxFileSize : 100*1024*1024*1024 
	})
	.on("progress",(bytesReceived, bytesExpected) => {
		const temp = bytesReceived * 100 / bytesExpected;
		const progress = Math.floor(temp);
		console.log('progress',progress);
	})
	.on("fileBegin",(webkitRelativePath, file) => {
		console.log('fileBeegin',webkitRelativePath, file);
	})
	.on("file",(name, file) => {
		console.log('file done',name , file);
	});

	form.parse(req, (error , fields, files) => {
		if(error != null) {
			console.error("form error", error);
			res.sendStatus(400);
		    } else {
			// logDebug("files", files);
			console.log("file uploads done");
			res.sendStatus(200);
		}
	})
});



module.exports = router;