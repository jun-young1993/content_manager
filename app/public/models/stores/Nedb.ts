import * as DataStore from "nedb";

import {QueryMap} from "./config/NedbConfig";
// const Datastore = require('nedb-promises')

// const DataStore = require('nedb-proxises');

export class Nedb{
    readonly path : string;
    readonly database : typeof DataStore;

    constructor(path : string) {
        this.path = path;
        const database = new DataStore(this.path);
        database.loadDatabase();
        this.database = database;
        this.querySetting()
    }

    public db(){
        return this.database;
    }

    private nePromise(method:string,query:object = {}){
        return new Promise((promiseResolve,promiseReject) => {
            this.db()[method](query,(err,resolve) => {
                if(err){
                    return promiseReject(err);
                }
              return promiseResolve(resolve)
            })
        })

    }
    private querySetting(){

        for(let method in QueryMap){
            const nedbMethod = QueryMap[method];
            this[method] = (query:object = {}) => {
                return this.nePromise(nedbMethod,query);
            }
        }

    }

}