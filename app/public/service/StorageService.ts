import {BaseService} from "./BaseService";
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";

export class StorageService extends BaseService {

    constructor(){
        super({
            models : [
                'Storage'
            ]
        });

    }

    getUsingArray(){
        return new Promise((resolve, reject) => {
                this.getModel('Storage').find({},(err,storage) => {
                    if(isEmpty(storage)){
                        reject(apiReject("[StorageService][getUsingArray] not found storage"))
                    }
                const storageArray:[] = [];
                    storage.map((storageElement:{code : string , name : string}) => {
                    storageArray[storageElement.code] = storageElement.name;
                })
                resolve(apiResolve(storageArray));
            })
        })

    }



}