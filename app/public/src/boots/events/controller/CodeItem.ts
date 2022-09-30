// @ts-nocheck

import {BaseController} from "./BaseController";
import {CodeItem as codeItemModel} from "../../../../models/CodeItem";
import { CodeItemService } from "../../../../service/CodeItemService";

const codeItemDb = new codeItemModel();
const codeItemService = new CodeItemService();
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
    static index(event:any, args:any){
        
        codeItemDb.db().find({is_deleted : 'N'},(err:any,data:any) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }
        })
    }

    static _indexByParentCode(event, args){
        codeItemService.findByParentCode(args[0])
        .then((result) => {
            return event.autoReplay( {
                success : true,
                data : result
            })
        })
        return;
        codeItemDb.db().find({use_yn : 'Y',
                                parent_code : args[0]},(err,data) => {
            if(data){
                return event.autoReplay( {
                    success : true,
                    data : data
                })
            }else{
                return event.autoReplay( {
                    success : false,
                    data : data
                })
            }
        })
    }
    static indexByParentCode(event, args){

        codeItemDb.db().find({use_yn : 'Y',
            parent_code : args},(err,data) => {
            if(data){
                return event.returnValue = {
                    success: true,
                    data: data
                }
            }else{
                return event.returnValue = {
                    success: false,
                    data: data
                }
            }
        })
    }

    static _findByParentCode(event, codes){
        console.log('codes',codes);
        codeItemDb.db().findOne({use_yn : 'Y',
                                parent_code : codes[0],
                                code : codes[1]
                            },(err,data) => {
            if(data){
                return event.autoReply({
                    success : true,
                    data : data
                })
            }
            return event.autoReply({
                success : false,
                data : null
            })
        })
    }

    static _insert(event,args){

        codeItemDb.db().insert(Object.assign(args[0],{
            'use_yn' : "Y",
            'is_deleted' : "N",
            'deleted_at' : null,
        }),(err,data) => {


            if(data){


                return event.autoReplay({
                    success : true,
                    data :data
                })
            }else{
                return event.autoReplay({
                    success : false,
                    data :data
                })
            }

        });
    }

    static _update(event,args){
        console.log('code item update args',args);
        codeItemDb.db().update(args[1],{$set : args[0]},(err,data) => {

            if(data){
                return event.autoReplay({
                    success : true
                });
            }else{
                return event.autoReplay({
                    success : false
                });
            }

        })
    }
    static _delete(event, args){

        if(args.length >= 1){
            codeItemDb.db().remove(args[0],(err,data) => {
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


new BaseController(CodeItem);

