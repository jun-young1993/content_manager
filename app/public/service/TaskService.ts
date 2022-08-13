
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

    index(){
        const _this = this;
        return new Promise((resolve, reject) => {
            _this.getModel('Task').find({}).sort({createdAt : -1}).exec((err, data) => {
                resolve(apiResolve(data));
            })
        })

    }
}