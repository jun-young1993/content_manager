import {BaseService} from "./BaseService";
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";

export class CategoryService extends BaseService {

    constructor(){
        super({
            models : [
                'Category'
            ]
        });

    }

    create(mediaInfo:any,contentId:string){
        const _this = this;
        return new Promise((resolve, reject) => {
            mediaInfo['content_id'] = contentId;
            _this.getModel('MediaInfo').insert(mediaInfo,(err,data) => {
                return resolve(apiResolve(data));
            })
        })
    }

    /**
     * 카테고리 조회
     * 
     * @param contentId 
     */
    index(){
        const _this = this;
        return new Promise((resolve, reject) => {
            
            _this.getModel('Category').find({},(err,data) => {
                return resolve(apiResolve(data));
            })
        })
    }



}
