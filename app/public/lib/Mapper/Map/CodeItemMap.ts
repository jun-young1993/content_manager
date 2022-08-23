
import { CodeItemService } from "../../../service/CodeItemService";
const codeItemService = new CodeItemService();
export class CodeItemMap{
	constructor(){

	}
	codeItemMapByParentCode(parentCode:string){
		return new Promise((resolve,reject) => {
			codeItemService
			.findByParentCodeUsingArray(parentCode)	
			.then((codeArray:any) => {
				resolve(codeArray['data']);
			})
		})
		
	}
}