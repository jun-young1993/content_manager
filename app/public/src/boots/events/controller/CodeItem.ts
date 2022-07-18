import {BaseController} from "./BaseController";
import {CodeItem as codeItemModel} from "../../../../models/CodeItem";

const codeItemDb = new codeItemModel();

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
class CodeItem {
    static index(event, args){
        
        codeItemDb.db().find({is_deleted : 'N'},(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }
        })
    }

    static indexByParentCode(event, parentCode){

        codeItemDb.db().find({use_yn : 'Y',
                                parent_code : parentCode},(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }
        })
    }

    static findByParentCode(event, ...codes){

        codeItemDb.db().findOne({use_yn : 'Y',
                                parent_code : codes[0],
                                code : codes[1]
                            },(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }
            return event.returnValue = {
                success : false,
                data : null
            }
        })
    }

    static insert(event,args){

        codeItemDb.db().insert(Object.assign(args,{
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
        codeItemDb.db().update(args,(err,data) => {
            return event.returnValue = data;
        })
    }
    static delete(event, ...args){

        if(args.length >= 1){
            codeItemDb.db().remove(args[0],(err,data) => {
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


new BaseController(CodeItem);

