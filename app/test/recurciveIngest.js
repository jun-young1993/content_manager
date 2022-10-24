const {CodeItemService} = require("../public/service/CodeItemService");
const {convertArrayToKeyValue} = require("../public/lib/helper/ApiHelper");
const codeItemService = new CodeItemService();
const path = require("path");
const files = [
	"D:\\test1.mxf",
	"D:\\test2.mov",
	"D:\\test3.png",
	"D:\\test4.jpg",
	"D:\\test5.mp4",
	"D:\\test6.mp3",
	"D:\\test7.jpeg",
];

// console.log(codeItemService);
function allowExtentions(){
	return new Promise((resolve) => {
		codeItemService.findByParentCode(`content_type`)
		.then((result) => {
			
				const contentTypes = convertArrayToKeyValue(result.data,{
					key : undefined,
					value : 'code'
				})
				const allowExtenions = [];
				const allowExtentionParentCodeMap = {};
				contentTypes.map((ingestType) => {
					const allowExtentionCode = `${ingestType}_allow_extention`;
					allowExtentionParentCodeMap[allowExtentionCode] = ingestType;
					allowExtenions.push(codeItemService.findByParentCode(allowExtentionCode));
				})
				
				Promise.all(allowExtenions)
				.then((resolves) => {
					
					const allowExtention = {};
					resolves.map((result) => {
						if(result.success === true){
							result.data.map((allowExtentionCodeItem) => {
								const ingestType = allowExtentionParentCodeMap[allowExtentionCodeItem.parent_code];
								if(allowExtention[ingestType] === undefined){
									allowExtention[ingestType] = [allowExtentionCodeItem.code];
								}else{
									allowExtention[ingestType].push(allowExtentionCodeItem.code)
								}
								
							})
						}
					})
					
					resolve(allowExtention);
					
					
				})
			
			
		})
		.catch((reject) => {
			console.log(reject);
		})
	})

}
function getIngestTypeByFiles(files){

	return new Promise((resolve) => {
		allowExtentions().then((result) => {
			const ingestTypeByFiles = {};
			const extentionByMap = {};
			for(let ingestType in result){
				
				for(let extentionIndex = 0; extentionIndex < result[ingestType].length ; extentionIndex++){
					extentionByMap[`.${result[ingestType][extentionIndex]}`] = ingestType;
				}
			}
			
			for(let fileIndex = 0; fileIndex < files.length; fileIndex++){
				const fileName = files[fileIndex];
				const extentionName = path.extname(fileName);
				let ingestTypeByExtname = extentionByMap[extentionName];
				if(ingestTypeByExtname === undefined){
					ingestTypeByExtname = 'other';
				}
				
				if(ingestTypeByFiles[ingestTypeByExtname] === undefined){
					ingestTypeByFiles[ingestTypeByExtname] = [fileName];
				}else{
					ingestTypeByFiles[ingestTypeByExtname].push(fileName);
				}
				
			}
			resolve(ingestTypeByFiles);
		})
	})
	
}

function ingest(file, ingestType){
	return new Promise((resolve) => {
		
		resolve([file,ingestType]);
	})
}
function recurciveIngest(files,index=0){
	

		const file = files[index];
		
		ingest(file.file,file.ingest_type)
		.then((result) => {
			console.log(result);	
			if((files.length - 1) > index){
					
				recurciveIngest(files,index+1)
				
			}else{
				
				return "ok";
				
			}
			
		})

	
}
getIngestTypeByFiles(files)
.then((result) => {
	console.log(result);
	const fileMap = [];
	for(ingestType in result){
		for(let fileIndex = 0; fileIndex < result[ingestType].length; fileIndex++){
			fileMap.push({
				ingest_type : ingestType,
				file : result[ingestType][fileIndex]
			})
		}
	}
	
	recurciveIngest(fileMap);
	
	recurciveIngest(result);
});