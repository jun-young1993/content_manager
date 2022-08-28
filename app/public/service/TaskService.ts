
const {BaseService} = require('../service/BaseService');
import MediaInterface from "../interfaces/MediaInterface";
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";
export class TaskService extends BaseService{
    constructor(){
        super({
            models : [
                'Task'
            ]
        });
    }

    index(search:{}){
        const _this = this;
        console.log('search',search)
        console.log('search',_this.formatIndexParams(search));
        console.log('sample : ',{createdAt : {$gt : new Date("2022-08-01T10:45:17.000Z")}})
        return new Promise((resolve, reject) => {
            _this.getModel('Task')
                .find(_this.formatIndexParams(search))
                .sort({createdAt : -1})
                .exec((err, data) => {
                    console.log('data.length',data.length);
                resolve(apiResolve(data));
            })
        })

    }
}