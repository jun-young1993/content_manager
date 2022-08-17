import {BaseService} from "./BaseService";
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";

export class MediaInfoService extends BaseService {

    constructor(){
        super({
            models : [
                'MediaInfo'
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
     * 미디어 인포 정보 조회
     * 
     * @param contentId 
     */
    index(contentId:string){
        const _this = this;
        return new Promise((resolve, reject) => {
            
            _this.getModel('MediaInfo').find({content_id : contentId},(err,data) => {
                return resolve(apiResolve(data));
            })
        })
    }



}
