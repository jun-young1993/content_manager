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




}
