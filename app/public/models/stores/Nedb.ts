// @ts-ignore
// import DataStore from "nedb";

const DataStore:any = require("nedb");
import {QueryMap,Custom} from "./config/NedbConfig";
// const Datastore = require('nedb-promises')

// const DataStore = require('nedb-proxises');

export class Nedb{
    readonly path : string;
    readonly database : typeof DataStore;

    constructor(path : string) {
        this.path = path;
        const database:any = new DataStore({
            filename : this.path,
            timestampData : true
        });
        database.loadDatabase();
        this.database = database;
        this.querySetting()
    }

    public db(){
        return this.database;
    }

    private nePromise(method:string,query:object = {}){
        return new Promise((promiseResolve,promiseReject) => {

                this.db()[method](query,(err:any,resolve:any) => {
                    if(err){
                        return promiseReject(err);
                    }
                    return promiseResolve(resolve)
                })


        })

    }
    private querySetting(){

        for(let method in QueryMap){
            // @ts-ignore
            const nedbMethod:any = QueryMap[method];

            // @ts-ignore
            this[method] = (query: object = {}) => {
                // @ts-ignore
                if(Custom[method]){
                    // @ts-ignore
                    return Custom[method](query,this.db());
                }else {
                    return this.nePromise(nedbMethod, query);
                }
            }

        }

    }

}