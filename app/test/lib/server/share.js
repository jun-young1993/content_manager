"use strict";
// const http = require('http');
exports.__esModule = true;
// const FileShare = require("../../../public/lib/FileShare/FileShare");
var FileShare_1 = require("../../../public/lib/FileShare/FileShare");
new FileShare_1["default"]({
    progressCallback: function (progress, fileName) {
        console.log(progress, fileName);
    },
    errorCallback: function (url, error) {
        console.log('error', url, error);
    }
})
    .createServer();
// const server = http.createServer(FileShare);
// server.listen(11103);
// server.on('listening',()=>{
//     console.log("listenr");
// })
