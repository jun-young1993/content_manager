// const http = require('http');

// const FileShare = require("../../../public/lib/FileShare/FileShare");
import FileShare from "../../../public/lib/FileShare/FileShare";

new FileShare({
	progressCallback : (progress, fileName)=> {
		console.log(progress, fileName);
	},
	errorCallback : (url , error) => {
		console.log('error',url, error)
	}
})
.createServer();

// const server = http.createServer(FileShare);
// server.listen(11103);
// server.on('listening',()=>{
//     console.log("listenr");
// })