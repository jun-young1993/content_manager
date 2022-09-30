import {BaseService} from "./BaseService";
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";

export class CodeItemService extends BaseService {

    constructor(){
        super({
            models : [
                'CodeItem'
            ]
        });

    }

    findByParentCode(parentCode:string){
        return new Promise((resolve, reject) => {
            this.getModel('CodeItem').find({parent_code : parentCode}).sort({order : 1}).exec((err:any,codes:any) => {
                if(isEmpty(codes)){
                    reject(apiReject('[CodeItemService][findByParentCode] not found codes'))
                }
                    resolve(apiResolve(codes));

            })
        })

    }

    findByParentCodeUsingArray(parentCode:string){
        return new Promise((resolve, reject) => {
            this.findByParentCode(parentCode).then((codes:any) => {
                let codeArray:any = [];
                codes.data.map((code:any) => {
                    codeArray[code.code] = code.name;
                })
                resolve(apiResolve(codeArray));
            })
        })

    }


    
}