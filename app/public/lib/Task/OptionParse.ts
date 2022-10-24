const {CodeItemService} = require("../../service/CodeItemService");
const codeItemService = new CodeItemService();
import { apiReject, apiResolve, convertArrayToKeyValue } from '../helper/ApiHelper';
const path = require("path");
export type AllowExtentionType = {[index : string] :string[]};



export class OptionParse{
	constructor(){

	}

	
	/**
	 * 콘텐츠 타입별 허용 확장자 
	 *
	 * @returns {Promise<AllowExtentionType>}
	 * @memberof OptionParse
	 */
	allowExtentions() : Promise<AllowExtentionType>
	 {
		return new Promise((resolve) => {
			codeItemService.findByParentCode(`content_type`)
			.then((result) => {
				
					const contentTypes = convertArrayToKeyValue(result.data,{
						key : undefined,
						value : 'code'
					})
					const allowExtenions:any = [];
					const allowExtentionParentCodeMap:any = {};
					contentTypes.map((ingestType) => {
						const allowExtentionCode = `${ingestType}_allow_extention`;
						allowExtentionParentCodeMap[allowExtentionCode] = ingestType;
						allowExtenions.push(codeItemService.findByParentCode(allowExtentionCode));
					})
					
					Promise.all(allowExtenions)
					.then((resolves) => {
						
						const allowExtention: AllowExtentionType = {};
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
		})
	
	}
	getContentTypeByFiles(files : string[]) : Promise<AllowExtentionType>
	{
		const _this = this;
		return new Promise((resolve) => {
			_this.allowExtentions().then((result:AllowExtentionType) => {
				const ingestTypeByFiles : AllowExtentionType = {};
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
}
