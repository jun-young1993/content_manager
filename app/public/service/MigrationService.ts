import {BaseService} from "./BaseService";
import {isEmpty} from "lodash";
import { channel } from "../lib/Logger";
export class MigrationService extends BaseService {
    migModel:string;
    constructor(model:string){


        super({
            models : [
                model
            ]
        });
        this.migModel = model;
    }

    findOrInsert(insertData:any){
        const _this = this;
        _this.getModel(_this.migModel).findOne({_id : insertData._id},(err,data) => {
            channel('full').info(`[MIGRATION BEFORE INSERT DATA] ${_this.migModel}`,insertData);
            if(isEmpty(data)){
                _this.getModel(_this.migModel).insert(insertData,(insertErr,insertData) => {
                    channel('full').info('[MIGRATION AFTER INSERT DATA]',insertData);
                })
            }
        })

    }

}