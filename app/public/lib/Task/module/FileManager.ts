const fs = require("fs");


export class FileManager {
	private readStream;
	private writeStream;
	private params;

	constructor(params){
		
		this.params = params;


	}

	copy(){
		fs.createReadStream(this.params.source).pipe(fs.createWriteStream(this.params.target));
	}


}