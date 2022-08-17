// @ts-nocheck

import {BaseController} from "./BaseController";
import {Media as Model} from "../../../../models/Media";
import { MediaInfoService } from "../../../../service/MediaInfoService";
const mediaInfoService = new MediaInfoService();
// import {User} from "@model/User";
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
class MediaInfo {
    static _index(event,args){
        mediaInfoService.index(args[0])
        .then((resolve) => {
            return event.autoReply(resolve)
        })
        
    }
    static index(event, args){

        new Model().db().find(args,(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }

        })
    }
    static insert(event,args){

        new Model().db().insert(Object.assign(args,{
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
        new Model().db().update(args,(err,data) => {
            return event.returnValue = {
                success : true,
                data : data
            };
        })
    }
}


new BaseController(MediaInfo);

