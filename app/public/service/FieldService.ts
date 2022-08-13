
const {BaseService} = require('../service/BaseService');
import MediaInterface from "../interfaces/MediaInterface";
import {isEmpty} from "lodash";
import { apiReject, apiResolve } from "../lib/helper/ApiHelper";
export class FieldService extends BaseService{
    constructor(){
        super({
            models : [
                'Field'
            ]
        });
    }

    getSearchFields(){
        const _this = this;
        return new Promise((resolve, reject) => {
            _this.getModel('Field').find({search_yn : "Y"},(err, data) => {
                resolve(apiResolve(data));
            })
        })

    }
}