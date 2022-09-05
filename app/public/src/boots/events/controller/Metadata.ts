// @ts-nocheck
// @ts-nocheck

import {BaseController} from "./BaseController";
import {Metadata as MetadataModel} from "../../../../models/Metadata";
// import {User} from "@model/User";
const metadataDb = new MetadataModel();

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
class Metadata {
    static index(event, args){
        
        metadataDb.db().find({},(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }

        })
    }
    static insert(event,args){

        metadataDb.db().insert(Object.assign(args,{
        }),(err,data) => {


            if(data){


                return event.returnValue = {
                    success : true,
                    data :data
                }
            }

        });
    }

    static update(event,args){
        metadataDb.db().update(args,(err,data) => {
            return event.returnValue = {
                success : true,
                data : data
            };
        })
    }

    static _update(event, args){
        metadataDb.db().update(args[1],{$set : args[0]},(error,data) => {
            return event.autoReply(data);
        })
    }
}


new BaseController(Metadata);

