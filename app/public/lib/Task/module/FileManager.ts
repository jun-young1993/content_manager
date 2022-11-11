import { Property } from "./Property";

const fs = require("fs");
import {TaskUpdater} from '../TaskUpdater';
import {ipcMain} from "@electron/remote";

const log = require('../../Logger');
import {sendIpc} from "../../helper/ElectronHelper"

export class FileManager extends Property{

	private params:any;
	private taskUpdater:any;
	private sourceState : {size :  number} = {size : 0};
	constructor(params:any){
		super(params);
		log.channel('fs').info('[Start Fs]',params);

		this.params = params;
		const targetDir = this.getTargetDir();
		if(!fs.existsSync(targetDir)){
			fs.mkdirSync(targetDir, { recursive: true });
		}
		
		const _this = this;
		this.taskUpdater = new TaskUpdater(_this.getTaskId());
		const sourceFullPath = this.getSourceFullPath()
		
		if(!fs.statSync(sourceFullPath)){
			sendIpc("#Utils/TaskSnackBar",{
				variant : "error",
				messages : `[Fs]][error] not found source file`
			});
			_this.taskUpdater.error();
		}else{
			this.sourceState = fs.statSync(sourceFullPath)
		}
	}

	copy(){
		const taskId = this.getTaskId();
		const targetFullPath = this.getTargetFullPath();
		const sourceFullPath = this.getSourceFullPath()
		log.channel('fs').info(`[Start Fs Copy] ${sourceFullPath} => ${targetFullPath}`);
		sendIpc("#Utils/TaskSnackBar",{
			variant : "info",
			messages : `[Fs][Copy][start]${taskId} `
		});
		this._copy(sourceFullPath,targetFullPath,taskId);
	}


	_copy(sourceFullPath:string,targetFullPath:string,taskId:string){
		let readed = 0;
		
		const sourceSize = this.sourceState.size;
		const _this = this;
		fs.createReadStream(sourceFullPath)
			.on('error',(error:Error)=>{
				log.channel('fs').info('[Fs Read Stream Error]',error)
				sendIpc("#Utils/TaskSnackBar",{
					variant : "error",
					messages : `[Fs]][Copy][error]${taskId} ${error}`
				});
				_this.taskUpdater.error();
			})
			.on('data',(data:any) => {
				readed += data.length;
				
				_this.taskUpdater.progress((readed/sourceSize * 100).toFixed(2))
			})
			.pipe(fs.createWriteStream(targetFullPath))
			.on('error',(error:Error)=>{
				log.channel('fs').info('[Fs Write Stream Error]',error)
				sendIpc("#Utils/TaskSnackBar",{
					variant : "error",
					messages : `[Fs]][Copy][error]${taskId} ${error}`
				});
				_this.taskUpdater.error();
			})
			.on('finish',()=>{

				log.channel('fs').info(`[Fs Complete] TaskId : ${taskId}`)
				sendIpc("#Utils/TaskSnackBar",{
					variant : "success",
					messages : `[Fs][Copy][complete]${taskId}`
				});
				_this.taskUpdater.complete();


			});
	}

	delete(){
		const _this = this;
		const taskId = this.getTaskId();
		
		const sourceFullPath = this.getSourceFullPath()
		log.channel('fs').info(`[Start Fs Unlink] ${sourceFullPath}`);
		sendIpc("#Utils/TaskSnackBar",{
			variant : "info",
			messages : `[Fs][Unlink][start]${taskId} `
		});
		fs.unlink(sourceFullPath,(error) => {
			if(error){
				sendIpc("#Utils/TaskSnackBar",{
					variant : "error",
					messages : `[Fs][Unlink][error]${taskId} ${error}`
				});
				_this.taskUpdater.error();
				log.channel('fs').info('[Fs Unlink Exception]',error);
				return false;
			}

			log.channel('fs').info(`[Fs Unlink Complete] TaskId : ${taskId}`)
			sendIpc("#Utils/TaskSnackBar",{
				variant : "success",
				messages : `[Fs][Unlink][complete]${taskId}`
			});
			_this.taskUpdater.complete();
		})
	}


}