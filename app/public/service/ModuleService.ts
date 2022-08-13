
const {BaseService} = require('../service/BaseService');
import MediaInterface from "../interfaces/MediaInterface";
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";
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
}