const path = require('path');


export class Property {
	private sourceMedia:any;
	private targetMedia:any;
	private task:any;
	private log : any;
	constructor(params:any){
		this.sourceMedia = params.sourceMedia;
		this.targetMedia = params.targetMedia;
		this.task = params.task;
		
	}
	getTaskId(){
		return this.task._id;
	}

	getContentId(){
		return this.task.content_id;
	}

	getSourceMedia(){
		return this.sourceMedia;
	}

	getSourceFullPath(){
		let fullPath = this.getSourceMedia().full_path;
		return fullPath;
	}
	
	getTargetMedia(){
		return this.targetMedia;
	}

	getTargetFullPath(){
		let fullPath = this.getTargetMedia().full_path;
		return fullPath;
	}

	getTargetDir(){
		return path.dirname(this.getTargetFullPath());
	}

	getTargetExt(){
		return path.extname(this.getTargetFullPath());
	}

	getTargetFileName(){
		return path.basename(this.getTargetFullPath());
	}

	getTargetName(){
		return path.basename(this.getTargetFileName(),this.getTargetExt())
	}
}