// @ts-nocheck

import {BaseController} from "./BaseController";
import {Field as FieldModel} from "../../../../models/Field";
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
    static _index(event, args){
        console.log('_index field',args);
        db.db().find({use_yn : "Y"},(err,data) => {

            if(data){
                event.autoReplay({
                    success : true,
                    data : data
                })
            }

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
    static insert(event,...args){

        db.db().insert(Object.assign(args[0],{
            'use_yn' : "Y",
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

