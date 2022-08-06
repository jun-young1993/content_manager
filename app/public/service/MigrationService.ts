import {BaseService} from "./BaseService";
import {isEmpty} from "lodash";

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

            if(isEmpty(data)){
                _this.getModel(_this.migModel).insert(insertData,(insertErr,insertData) => {
                    console.log('insertdata',insertData);
                })
            }
        })

    }

}