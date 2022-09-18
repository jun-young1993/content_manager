
const {BaseService} = require('../service/BaseService');
import MediaInterface from "../interfaces/MediaInterface";
import {isEmpty} from "lodash";
import { apiReject, apiResolve, apiCountResolve } from "../lib/helper/ApiHelper";
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

   createContent(metadata:any){
        const _this = this;
        return new Promise((resolve,reject) => {
            _this.getModel('Content').insert(metadata,(contentError:any, content:null | {_id : string}) => {
                if(isEmpty(content)){
                    reject(apiReject("[ContentService][createContent] fail content insert"));
                }

                resolve(apiResolve(content));
            })
        })
   }

   getContent(search:{} = {}, page:{size:number,page:number}){
        const _this = this;
        return  new Promise((resolve,reject) => {

                // const size:number = page.size;
                // let currentPage:number = page.page * size;
                // console.log('currentPge',currentPage);
            // _this.getModel('Content').count(search,(error,count:number) => {
                const contents = _this.getModel('Content').find(search);
                _this.pagenation(contents,page)
                    .then((result:any) => {
                        result.model
                            .sort({createdAt : -1})
                            .exec((err:any,data:any) => {
                                resolve(apiCountResolve(data,result.count));
                            })
                    })
                    // .skip(currentPage).limit(size).sort({createdAt: -1}).exec((err,data) => {
                    // if(err){
                    //     return reject(apiReject("[ContentService][getContent] find fail by content"))
                    // }
                    // return resolve(apiResolve(data));
                })
            // })

        // })
   }

   getCount(search:{} = {}){
       const _this = this;
       return  new Promise((resolve,reject) => {
            _this.getModel('Content').count(search,(error:any,count:number) => {
                return resolve(apiResolve(count));
            });
       })
   }

   update(contentId:string, metadata : any){
       const _this = this;
       return  new Promise((resolve,reject) => {
           _this.getModel('Content').update({_id : contentId},{$set : metadata},(error,update) => {
               return resolve(apiResolve(update));
           });
       })
   }


}