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
    static all(event:any, args:any){

        codeDb.db().find({},(err:any,data:any) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }

        })
    }
    static index(event:any, args:any){
        
        codeDb.db().find({is_deleted : 'N'},(err:any,data:any) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }

        })
    }

    static indexByUsing(event:any, args:any){
        codeDb.db().find({use_yn : 'Y'},(err:any,data:any) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }

        })
    }

    static insert(event:any,args:any){

        codeDb.db().insert(Object.assign(args,{
            'use_yn' : "Y",
            'is_deleted' : "N",
            'deleted_at' : null,
        }),(err:any,data:any) => {


            if(data){


                return event.returnValue = {
                    success : true,
                    data :data
                }
            }

        });
    }

    static update(event:any,...args:any){
        codeDb.db().update(args[1],{$set : args[0]},(err:any,data:any) => {
            return event.returnValue = data;
        })
    }
    static first(event:any,args:any){
        console.log('code first',args);
        codeDb.db().findOne(Object.assign(args,{
            'use_yn' : "Y"
        }),(err:any,data:any) => {
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

    static delete(event:any, ...args:any){

        if(args.length >= 1){
            codeDb.db().remove(args[0],(err:any,data:any) => {
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

