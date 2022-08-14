import { Property } from "./Property";

const fs = require("fs");
import {TaskUpdater} from '../TaskUpdater';
import {ipcMain} from "@electron/remote";

const log = require('../../Logger');
import {sendIpc} from "../../helper/ElectronHelper"

export class FileManager extends Property{

	private params:any;
	private taskUpdater:any;
	constructor(params:any){
		super(params);
		log.channel('fs').info('[Start Fs]',params);

		this.params = params;
		const targetDir = this.getTargetDir();
		if(!fs.existsSync(targetDir)){
			fs.mkdirSync(targetDir, { recursive: true });
		}


	}

	copy(){
		const taskId = this.getTaskId();
		const targetFullPath = this.getTargetFullPath();
		const sourceFullPath = this.getSourceFullPath()
		log.channel('fs').info(`[Start Fs Copy] ${sourceFullPath} => ${targetFullPath}`);
		sendIpc("#Utils/TaskSnackBar",{
			variant : "info",
			messages : `[Fs][start]${taskId} `
		});
		this._copy(sourceFullPath,targetFullPath,taskId);
	}


	_copy(sourceFullPath:string,targetFullPath:string,taskId:string){
		fs.createReadStream(sourceFullPath)
			.on('error',(error:Error)=>{
				log.channel('fs').info('[Fs Read Stream Error]',error)
				new TaskUpdater(taskId).error();
			})
			.pipe(fs.createWriteStream(targetFullPath))
			.on('error',(error:Error)=>{
				log.channel('fs').info('[Fs Write Stream Error]',error)
				sendIpc("#Utils/TaskSnackBar",{
					variant : "error",
					messages : `[Fs]][error]${taskId} ${error}`
				});
				new TaskUpdater(taskId).error();
			})
			.on('finish',()=>{

				log.channel('fs').info(`[Fs Complete] TaskId : ${taskId}`)
				sendIpc("#Utils/TaskSnackBar",{
					variant : "success",
					messages : `[Fs][complete]${taskId}`
				});
				new TaskUpdater(taskId).complete();


			});
	}


}