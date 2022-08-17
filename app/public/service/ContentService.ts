
const {BaseService} = require('../service/BaseService');
import MediaInterface from "../interfaces/MediaInterface";
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";
export class ContentService extends BaseService{
    constructor(){
        super({
            models : [
                'Content',
                'Media',
                'Field'
            ]
        });
    }

   createContent(metadata){
        const _this = this;
        return new Promise((resolve,reject) => {
            _this.getModel('Content').insert(metadata,(contentError, content:null | {_id : string}) => {
                if(isEmpty(content)){
                    reject(apiReject("[ContentService][createContent] fail content insert",contentError));
                }

                resolve(apiResolve(content));
            })
        })
   }

   getContent(search:{} = {}){
        const _this = this;
        return  new Promise((resolve,reject) => {
            _this.getModel('Content').find(search).sort({createdAt: -1}).exec((err,data) => {
                if(err){
                    return reject(apiReject("[ContentService][getContent] find fail by content"))
                }
                return resolve(apiResolve(data));
            })
        })
   }
}