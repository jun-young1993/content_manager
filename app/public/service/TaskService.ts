
const {BaseService} = require('../service/BaseService');
import MediaInterface from "../interfaces/MediaInterface";
import {isEmpty} from "lodash";
import { apiReject, apiResolve , apiCountResolve} from "../lib/helper/ApiHelper";
export class TaskService extends BaseService{
    constructor(){
        super({
            models : [
                'Task'
            ]
        });
    }

    index(search:{},page : {size : number, page : number}){
        const _this = this;
        console.log('search',search)
        console.log('page',page)
    
        // console.log('search',_this.formatIndexParams(search));
        // console.log('sample : ',{createdAt : {$gt : new Date("2022-08-01T10:45:17.000Z")}})
        return new Promise((resolve, reject) => {
            const tasks = _this.getModel('Task').find(search);
            console.log('tasks',tasks);
            _this.pagenation(tasks,page)
            .then((result) => {
                result.model
                .sort({createdAt : -1})
                .exec((err, data) => {
                    console.log('data',data);
                    console.log('data.length',data.length);
                    resolve(apiCountResolve(data,result.count));
                })
                
            })
        })

    }

    find(taskId:string){
        const _this = this;
        return new Promise((resolve, reject) => {
            _this.getModel('Task').find({_id : taskId},(error , task) => {
                resolve(task);
            })
        })
    }


    create(data){
        const _this = this;
        return new Promise((resolve, reject) => {
            _this.getModel('Task').insert(data,(error , task) => {
                resolve(task);
            })
        })
    }
}