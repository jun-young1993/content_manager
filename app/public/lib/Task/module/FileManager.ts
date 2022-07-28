const fs = require("fs");
const {TaskUpdater} = require('../TaskUpdater');
const log = require('../../Logger');
export class FileManager {
	
	private params:any;
	private taskUpdater:any;
	constructor(params:any){
		log.channel('fs').info('[Start Fs]',params);
		this.params = params;
		
		
	}

	copy(){
		log.channel('fs').info(`[Start Fs Copy] ${this.params.sourceMedia.full_path} => ${this.params.targetMedia.full_path}`);
		fs.createReadStream(this.params.sourceMedia.full_path)
			.on('error',(error:Error)=>{
				log.channel('fs').info('[Fs Read Stream Error]',error)
			})
			.pipe(fs.createWriteStream(this.params.targetMedia.full_path))
			.on('error',(error:Error)=>{
				log.channel('fs').info('[Fs Write Stream Error]',error)
			})
			.on('finish',()=>{
				
				log.channel('fs').info(`[Fs Complete] TaskId : ${this.params.task._id}`)
				
				new TaskUpdater(this.params.task._id).complete();
				
				
			});
	}


}