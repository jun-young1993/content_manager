const fs = require("fs");
const {TaskUpdater} = require('../TaskUpdater');

export class FileManager {
	
	private params:any;
	private taskUpdater:any;
	constructor(params:any){
		console.log('fileManager module ',params.task)
		this.params = params;
		
		
	}

	copy(){
		fs.createReadStream(this.params.sourceMedia.full_path)
			.on('error',(error:Error)=>{
				console.log('read stream error',error)
			})
			.pipe(fs.createWriteStream(this.params.targetMedia.full_path))
			.on('error',(error:Error)=>{
				console.log('write stream error',error)
			})
			.on('finish',()=>{
				
				
				console.log('stream finish');
				new TaskUpdater(this.params.task._id).complete();
				
				
			});
	}


}