import {BaseModel} from './BaseModel'

export class Task extends BaseModel{


    constructor() {
        super({
            table :'task'
        });
    }

}