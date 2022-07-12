const fs = require("fs");
const {Storage} = require("@models/storage");
// const {TaskParse} = require("@task/TaskParse");
export class FileManager {
	private readStream;
	private writeStream;

	// 작업 파싱
	private sourceStoragePath;
	private targetStoragePath;
	constructor(task){
		
		Storage.db().findOne({code : task.target_storage},(err,data) => {
			console.log('data',data);
			console.log('err',err)
		})

		this.readStream = fs.createReadStream(task.source_storage);
		// this.writeStream = fs.createWriteStream()


	}

	copy(task){
		
	}


}