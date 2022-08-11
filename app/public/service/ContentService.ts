
const {BaseService} = require('../service/BaseService');
import MediaInterface from "../interfaces/MediaInterface";
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";
export class ContentService extends BaseService{
    constructor(){
        super({
            models : [
                'Content',
                'Media'
            ]
        });
    }

   createContent(metadata){
        const _this = this;
        return new Promise((resolve,reject) => {
            _this.getModel('Content').insert(metadata,(contentError, content:null | {_id : string}) => {
                if(isEmpty(content)){
                    reject(apiReject("[ContentService][createContent] fail content insert"));
                }

                resolve(apiResolve(content));
            })
        })
   }
}