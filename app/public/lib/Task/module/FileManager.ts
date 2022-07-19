const fs = require("fs");


export class FileManager {
	
	private params:any;

	constructor(params:any){
		console.log('[start FileManager]');
		this.params = params;


	}

	copy(){
		fs.createReadStream(this.params.source)
			.on('error',(error:Error)=>{
				console.log('read stream error',error)
			})
			.pipe(fs.createWriteStream(this.params.target))
			.on('error',(error:Error)=>{
				console.log('write stream error',error)
			})
			.on('finish',()=>{
				console.log('stream finish');
			});
	}


}