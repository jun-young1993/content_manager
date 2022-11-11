// @ts-nocheck

import {BaseController} from "./BaseController";
import {Storage as StorageModel} from "../../../../models/Storage";
import { apiReject, apiResolve } from "../../../../lib/helper/ApiHelper";
// import {User} from "@model/User";
const db = new StorageModel();

// ipcMain.on('asynchronous-message', (event, arg) => {
//     console.log(arg) // prints "ping"
//     event.reply('asynchronous-reply', 'pong')
// })
//
// ipcMain.on('synchronous-message', (event, arg) => {
//     console.log(arg) // prints "ping"
//     event.returnValue = 'pong'
// })

// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//     console.log(arg) // prints "pong"
// })
// ipcRenderer.send('asynchronous-message', 'ping')
class Storage {
    static _all(event, args){

        db.db().find({},(err,data) => {
            if(data){
                return event.autoReplay({
                    success : true,
                    data : data
                })
            }

        })
    }

    static all(event, args){

        db.db().find({},(err,data) => {
            if(data){
                return event.returnValue = {
                    success: true,
                    data: data
                }
            }

        })
    }
    static _index(event, args){
        
        db.db().find({is_deleted : 'N'},(err,data) => {
            if(data){
                return event.autoReplay({
                    success : true,
                    data : data
                })
            }

        })
    }

    /**
     * 
     * @param event 
     * @param args 
     * @returns 
     */
    static $index(event,args){
        return new Promise((resolve,reject) => {
            db.db().find({is_deleted : 'N'},(err,data) => {
                if(data){
                    return resolve(apiResolve(data))
                }

                return reject(apiReject(err));
    
            })  
        })
    }

    static _insert(event,args){

        db.db().insert(Object.assign(args[0],{
            'use_yn' : "Y",
            'is_deleted' : "N",
            'deleted_at' : null,
        }),(err,data) => {

            if(err){
                return event.autoReplay({
                    success : false,
                    data : null,
                    msg : err
                })
            }
            if(data){


                return event.autoReplay({
                    success : true,
                    data :data
                })
            }

        });
    }


    static _update(event,args){
        console.log(args);
        db.db().update(args[1],{$set : args[0]},(err,data) => {
            if(data){
                return event.autoReplay({
                    success : true,
                    data : data
                })
            }else{
                console.log(err)
                return event.autoReplay({
                    success : false,
                    data : data,
                    msg : err
                })
            }

        })
    }

    static first(event,args){

        db.db().findOne(Object.assign(args,{
            'use_yn' : "Y",
            'deleted_at' : null,
        }),(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }else{
                return event.returnValue = {
                    success : false
                }
            }

        })
    }

    static _delete(event, args){

        if(args.length >= 1){
            db.db().remove(args[0],(err,data) => {
                if(data){
                    return event.autoReplay({
                        success : true,
                        data : data
                    })
                }else{
                    return event.autoReplay({
                        success : false
                    })
                }

            });
        }

    }
}


new BaseController(Storage);

