import {Nedb} from "./stores/Nedb";
import {promises} from "dns";
import {QueryBuilder} from "../lib/QueryBuilder/QueryBuilder";
import { app, BrowserWindow } from 'electron';
const {directory} = require('../config/database')
const path = require('path');
import {isEmpty} from 'lodash';
export enum STORE_TYPE {
    NEDB = "nedb"
}
interface Property {
    store? : STORE_TYPE,
    table : string
}

declare var _MODELS: any;


export class BaseModel implements Property{
    store : STORE_TYPE = STORE_TYPE.NEDB
    table : string = '';
    database : any
    constructor(property: Property) {

        Object.assign(this,property);
        this.setDb()
        // super.db = this.db();
    }

    private setDb(){
        if(this.isNedb()){
            
            // const path = '/Users/junyoungkim/Desktop/junyoung/app/source/electron/db/'+this.table+'.db';
            
            // const path = app.getPath("downloads")+'/db/'+this.table+'.db';
            const dbpath = path.resolve(directory,`${this.table}.db`);

            try{

                    if(isEmpty(_MODELS[this.table])){
                        const database = new Nedb(dbpath);
                        _MODELS[this.table] = database;

                        this.database = database;
                    };

            }catch(e){

                    Object.defineProperty(global, '_MODELS', {
                        enumerable: false,
                        configurable: false,
                        writable: true,
                        value: {}
                    });

                    const database = new Nedb(dbpath);
                    _MODELS[this.table] = database;

                    this.database = database;
            }







        }
    }

    protected isNedb(){
        if(this.store == STORE_TYPE.NEDB){
            return true;
        }
        return false;
    }

    public db(){
        // this.database.database.loadDatabase();
        // return this.database.database;
        return _MODELS[this.table].database;
    }





    // private query(method:string,query:object = {}){
    //     return this.db()[method](query);
    // }
    //
    // public get(query : object = {})
    // {
    //     return this.query('get',query);
    // }
    //
    // public insert(query : object = {})
    // {
    //     return this.query('insert',query);
    // }
    //
    // public find(query : object = {})
    // {
    //     return this.query('find',query);
    // }
    //
    // public update(query : object = {}, query2 : object = {})
    // {
    //     return this.query('update',query);
    // }
    //
    // public delete(query : object = {}, query2 : object = {}){
    //     return this.query('delete',query);
    // }
}