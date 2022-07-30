// @ts-nocheck

import {BaseController} from "./BaseController";
import {Content as Model} from "../../../../models/Content";

const db = new Model();

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
class Content {
    static index(event, args){

        db.db().find(Object.assign(args,{is_deleted : 'N'}),(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }

        })
    }
    static insert(event,args){
        console.log('content insert db');
        db.db().insert(Object.assign(args,{
            'is_deleted' : "N",
            'deleted_at' : null,
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
        db.db().update(args,(err,data) => {
            return event.returnValue = {
                success : true,
                data : data
            };
        })
    }
}


new BaseController(Content);

