
const {BaseService} = require('../service/BaseService');
import {apiResolve} from "../lib/helper/ApiHelper";

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
            _this.getModel('Field').find({is_search : true},(err, data) => {
                resolve(apiResolve(data));
            })
        })

    }
}