// @ts-nocheck

import {BaseController} from "./BaseController";
import {Module as Modle} from "../../../../models/Module";

import {CodeItemService} from "../../../../service/CodeItemService";
import {StorageService} from "../../../../service/StorageService";
import CodeMapper from "../../../../lib/Mapper/CodeMapper";
const codeMapper = new CodeMapper();
const codeItemService =  new CodeItemService();
const storageService = new StorageService();
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
    static _all(event, args){
        codeItemService.findByParentCodeUsingArray("media_type")
            .then((mediaTypeCodes) => {
                console.log('emdiaTypeCodes',mediaTypeCodes);
                codeItemService.findByParentCodeUsingArray("task_module_type")
                    .then((taskTypeCodes) => {
                        storageService.getUsingArray()
                            .then((storageCodes) => {
                                db.db().find({}, (err, data) => {
                                    if (data) {

                                        data.map((dataElement) => {
                                            dataElement.source_media_nm = mediaTypeCodes.data[dataElement.source_media];
                                            dataElement.target_media_nm = mediaTypeCodes.data[dataElement.target_media];
                                            dataElement.task_type_nm = taskTypeCodes.data[dataElement.task_type];
                                            dataElement.source_storage_nm = storageCodes.data[dataElement.source_storage];
                                            dataElement.target_storage_nm = storageCodes.data[dataElement.target_storage];
                                            return dataElement;
                                        })

                                        return event.autoReplay({
                                            success: true,
                                            data: data
                                        })
                                    }

                                })
                            })


                    })
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
    static _index(event, args=[{}]){
        
        db.db().find(args[0],(err,data) => {
            if(data){
                return event.autoReplay({
                    success : true,
                    data : data
                })
            }

        })
    }

    static _find(event, args=[{}]){
        codeMapper.getModuleCodeMap()
		.then((moduleCodes) => {
            db.db().findOne(args[0],(err,data) => {
                if(data){
                    data.source_media_nm = moduleCodes['media'][data.source_media]
					data.target_media_nm = moduleCodes['media'][data.target_media]
					data.source_storage_nm = moduleCodes['storage'][data.source_storage]
					data.target_storage_nm = moduleCodes['storage'][data.target_storage]
					data.task_type_nm = moduleCodes['task'][data.task_type];
                    return event.autoReplay({
                        success : true,
                        data : data
                    })
                }
    
            })
        })
        .catch((moduleCodesError) => {
            event.autoReply(moduleCodesError);
        });
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

    static _insert(event,args){

        db.db().insert(Object.assign(args[0],{
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


                return event.autoReplay( {
                    success : true,
                    data :data
                })
            }

        });
    }
    static update(event,args){

        db.db().update(args[1],{$set : args[0]},(err,data) => {
            return event.returnValue = {
                success : true,
                data : data
            };
        })
    }

    static _update(event,args){

        db.db().update(args[1],{$set : args[0]},(err,data) => {
            return event.autoReplay({
                success : true,
                data : data
            })
        })
    }

    static _first(event,args:[{}]){

        db.db().findOne(Object.assign(args[0],{
            'deleted_at' : null,
        }),(err,data) => {
            if(data){
                return event.autoReply({
                    success : true,
                    data : data
                })
            }else{
                return event.autoReply({
                    success : false
                })
            }

        })
    }

    static delete(event, args){

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


new BaseController(Module);

