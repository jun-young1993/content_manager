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
            this.getModel('CodeItem').find({parent_code : parentCode},(err,codes) => {
                if(isEmpty(codes)){
                    reject(apiReject('[CodeItemService][findByParentCode] not found codes'))
                }
                    resolve(apiResolve(codes));

            })
        })

    }

    findByParentCodeUsingArray(parentCode:string){
        return new Promise((resolve, reject) => {
            this.findByParentCode(parentCode).then((codes:{data:[]}) => {
                let codeArray:[] = [];
                codes.data.map((code:{code:string,name:string}) => {
                    codeArray[code.code] = code.name;
                })
                resolve(apiResolve(codeArray));
            })
        })

    }



}