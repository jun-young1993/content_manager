import Mapper from "./Mapper";


export default class CodeMapper extends Mapper{
	constructor(){
		super({
			maps : [
				'StorageMap',
				'CodeItemMap'
			]
		})
	}

	getModuleCodeMap(){
		const _this = this;
		
		return new Promise((resolve, reject) => {
			Promise.all([
				_this.getMap('StorageMap').codeMap(),
				_this.getMap("CodeItemMap").codeItemMapByParentCode('media_type'),
				_this.getMap("CodeItemMap").codeItemMapByParentCode('task_module_type'),
			])
			.then((resolves) => {
				resolve({
					'storage' : resolves[0],
					'media' : resolves[1],
					'task' : resolves[2],
				})
			});
		})
	
		
	}
	

}