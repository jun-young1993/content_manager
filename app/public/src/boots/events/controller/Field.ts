// @ts-nocheck

import {BaseController} from "./BaseController";
import {Field as FieldModel} from "../../../../models/Field";
import { isEmpty } from "lodash";
// import {User} from "@model/User";
const db = new FieldModel();

class Field {
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
        db.db().find(args[0]).sort({order : 1}).exec((err, data) => {
            event.autoReplay({
                success : true,
                data : data
            })
        })
    }
    static _index(event, args=[{}]){
        console.log('_index field',args);
        db.db().find(Object.assign({is_use : true},args[0]),(err,data) => {

            if(data){
                event.autoReplay({
                    success : true,
                    data : data
                })
            }

        })
    }

    static _update(event , args){
        
        db.db().update(args[1],{$set : args[0]},(err,data) => {
            
                event.autoReplay({
                    success : true,
                    data : data
                })
            
        })
    }
    static index(event, args){
        db.db().find({use_yn : 'Y'},(err,data) => {
            if(data){
                return event.returnValue = {
                    success : true,
                    data : data
                }
            }

        })
    }
    static _delete(event , args){
        db.db().remove(args[0],(error , remove) => {
            event.autoReplay({
                success : true,
                data : remove
            })
        })
    }
    static _insert(event, args){

        db.db().findOne({code : args[0].code,content_type : args[0],content_type})
        .exec((error, code) => {
            if(isEmpty(code)){
                db.db().findOne({content_type : args[0].content_type})
                .sort({createdAt : -1})
                .exec((error , data) => {
                    const sort:number = data.order + 1;
                    // db.db().insert({...args[0],{is_use:true, is_search:true,order : count+1}},(error , data) => {
                    //         event.autoReplay({
                    //             success : true,
                    //             data : code
                    //         })
                    //     })
                    // })
                    db.db().insert({...args[0],...{is_use:true, is_search:true,order :sort}},(error, data) => {
                            event.autoReplay({
                                success : true,
                                data : {...args[0],...{is_use:true, is_search:true,order : sort}}
                            })
                    })
                })


            }else{
                event.autoReplay({
                    success : false,
                    data : null,
                    msg : "중복된 필드코드 입니다."
                })
            }
        })
    }
    static insert(event,...args){

        db.db().insert(Object.assign(args[0],{
            'is_use' : true,
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


new BaseController(Field);

