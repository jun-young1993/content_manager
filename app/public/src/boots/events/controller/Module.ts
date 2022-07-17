import {BaseController} from "./BaseController";
import {Module as Modle} from "../../../../models/Module";
// import {User} from "@model/User";
const db = new Modle();

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
class Module {
    static all(event, args){

        db.db().find({},(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }

        })
    }
    static index(event, args){
        
        db.db().find({is_deleted : 'N'},(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }

        })
    }
    static insert(event,args){
        
        db.db().insert(Object.assign(args,{
            'is_deleted' : "N",
            'deleted_at' : null,
        }),(err,data) => {

            if(err){
                return event.returnValue = {
                    success : false,
                    data : null,
                    msg : err
                }
            }
            if(data){


                return event.returnValue = {
                    success : true,
                    data :data
                }
            }

        });
    }


    static update(event,...args){

        db.db().update(args[1],{$set : args[0]},(err,data) => {
            return event.returnValue = {
                success : true,
                data : data
            };
        })
    }

    static first(event,args){

        db.db().findOne(Object.assign(args,{
            'use_yn' : "N",
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

    static delete(event, ...args){

        if(args.length >= 1){
            db.db().remove(args[0],(err,data) => {
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

            });
        }

    }
}


new BaseController(Module);

