import {BaseController} from "./BaseController";
import {Code as codeModel} from "../../../../models/Code";

const codeDb = new codeModel();

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
class Code {
    static all(event, args){

        codeDb.db().find({},(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }

        })
    }
    static index(event, args){
        
        codeDb.db().find({is_deleted : 'N'},(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }

        })
    }

    static indexByUsing(event, args){
        codeDb.db().find({use_yn : 'Y'},(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }

        })
    }

    static insert(event,args){

        codeDb.db().insert(Object.assign(args,{
            'use_yn' : "Y",
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

    static update(event,...args){
        codeDb.db().update(args[1],{$set : args[0]},(err,data) => {
            return event.returnValue = data;
        })
    }
    static first(event,args){
        console.log('code first',args);
        codeDb.db().findOne(Object.assign(args,{
            'use_yn' : "Y"
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
            codeDb.db().remove(args[0],(err,data) => {
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


new BaseController(Code);

