// @ts-nocheck

import {BaseController} from "./BaseController";
import {Content as Model} from "../../../../models/Content";
import {ContentService} from "../../../../service/ContentService";
import {FieldService} from "../../../../service/FieldService";
import {isEmpty} from "lodash";

const db = new Model();
const contentService = new ContentService();
const fieldService = new FieldService();
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
    static _index(event, args){
        let searchText = null;
        if(!isEmpty(args[0].searchText)){
            searchText = args[0].searchText;
        }

        let category = null;
        if(!isEmpty(args[0].category)){
            category = args[0].category;
        }
        let defaultSearch:{} = {};
            fieldService.getSearchFields()
                .then((searchFields) => {
                    console.log('searchFields',searchFields);

                    let fieldSearch : [{string:{$regex : RegExp}}] = [];
                    if(!isEmpty(searchText)){
                        searchFields.data.forEach((field: {code : string}) => {
                            console.log({[field.code] : {$regex : new RegExp(searchText)}})
                            fieldSearch.push({[field.code] : {$regex : new RegExp(searchText)}});
                        })

                        if(!isEmpty(fieldSearch)){
                            defaultSearch['$or'] = fieldSearch;
                        }
                    }

                    if(!isEmpty(category)){
                        defaultSearch['category'] = category;
                    }

                    console.log('defaultSearch',defaultSearch);
                    contentService.getContent(defaultSearch)
                        .then((data) => {
                            event.autoReplay(data);
                        })
                })



        // db.db()
        // .find(Object.assign(args[0]),(err,data) => {
        //     if(data){
        //         event.autoReplay({
        //             success : true,
        //             data : data
        //         })
        //     }
        //
        // })
    }
    static index(event, args){

        db.db().find(Object.assign(args)).sort({createdAt : -1}).exec((err,data) => {
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

