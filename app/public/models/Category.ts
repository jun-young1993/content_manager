import {BaseModel} from './BaseModel'

export class Category extends BaseModel{


    constructor() {
        super({
            table :'category'
        });
    }

}