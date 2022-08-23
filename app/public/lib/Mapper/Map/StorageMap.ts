
import { StorageService } from "../../../service/StorageService";
const storageService = new StorageService();
export class StorageMap{
	constructor(){

	}
	codeMap(){
		return new Promise((resolve, reject) => {
			storageService.getUsingArray()
			.then((storageArray:any) => {
				resolve(storageArray['data']);
			})
		})
		
	}
}