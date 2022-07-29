import { Property } from "./Property";

const fs = require("fs");
const {TaskUpdater} = require('../TaskUpdater');
const log = require('../../Logger');
export class FileManager extends Property{
	
	private params:any;
	private taskUpdater:any;
	constructor(params:any){
		super(params);
		log.channel('fs').info('[Start Fs]',params);
		this.params = params;
		
		
	}

	copy(){
		const taskId = this.getTaskId();
		const targetFullPath = this.getTargetFullPath();
		const sourceFullPath = this.getSourceFullPath()
		log.channel('fs').info(`[Start Fs Copy] ${sourceFullPath} => ${targetFullPath}`);
		fs.createReadStream(sourceFullPath)
			.on('error',(error:Error)=>{
				log.channel('fs').info('[Fs Read Stream Error]',error)
			})
			.pipe(fs.createWriteStream(targetFullPath))
			.on('error',(error:Error)=>{
				log.channel('fs').info('[Fs Write Stream Error]',error)
			})
			.on('finish',()=>{
				
				log.channel('fs').info(`[Fs Complete] TaskId : ${this.params.task._id}`)
				
				new TaskUpdater(taskId).complete();
				
				
			});
	}


}