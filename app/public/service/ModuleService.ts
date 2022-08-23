
const {BaseService} = require('../service/BaseService');
import MediaInterface from "../interfaces/MediaInterface";
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";


import { CodeItemService } from "./CodeItemService";
import { StorageService } from "./StorageService";
const codeItemService =  new CodeItemService();
const storageService = new StorageService();


export class ModuleService extends BaseService{
    constructor(){
        super({
            models : [
                'Module'
            ]
        });
    }

    index(){
        const _this = this;
        return new Promise((resolve, reject) => {
            _this.getModel('Module').find({}).exec((err, data) => {
                resolve(apiResolve(data));
            })
        })

    }


    /**
     * 김준영 실수
     * @returns 
     */
    getModuleCodes(){

        return new Promise((resolve,reject) => {
            codeItemService.findByParentCodeUsingArray("media_type")
            .then((mediaTypeCodes) => {
                console.log('emdiaTypeCodes',mediaTypeCodes);
                codeItemService.findByParentCodeUsingArray("task_module_type")
                    .then((taskTypeCodes) => {
                        storageService.getUsingArray()
                            .then((storageCodes) => {
    
                                return resolve({
                                    'media_type' : mediaTypeCodes,
                                    'task_module_type' : taskTypeCodes,
                                    'storage' : storageCodes
                                })
    
                            })
    
    
                        })
                })
        })
      
    }
}