import {Nedb} from "./stores/Nedb";
import {promises} from "dns";

export enum STORE_TYPE {
    NEDB = "nedb"
}
interface Property {
    store? : STORE_TYPE,
    table : string
}
export class BaseModel implements Property{
    store : STORE_TYPE = STORE_TYPE.NEDB
    table : string;
    database : any
    constructor(property: Property) {
        Object.assign(this,property);
        this.setDb()
    }

    private setDb(){
        if(this.isNedb()){
            const path = '/Users/junyoungkim/Desktop/junyoung/app/source/electron/db/'+this.table+'.db';
            const database = new Nedb(path);
            this.database = database;
        }
    }

    private getTable(){

    }

    private isNedb(){
        if(this.store == STORE_TYPE.NEDB){
            return true;
        }
        return false;
    }

    private db(){
        return this.database;
    }

    private query(method:string,query:object = {}){
        return this.db()[method](query);
    }

    public get(query : object = {})
    {
        return this.query('get',query);
    }

    public insert(query : object = {})
    {
        return this.query('insert',query);
    }
}