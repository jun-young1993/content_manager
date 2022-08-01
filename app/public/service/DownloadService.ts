
const {BaseService} = require('../service/BaseService');

export class DownloadService extends BaseService{
	constructor(){
		super({
			models : [
				'Media',
				'Content'
			]
		});
	}

	downloadByMediaId(){
		
	}

}