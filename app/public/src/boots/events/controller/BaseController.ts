// @ts-nocheck

import {ipcMain} from "electron";
import {method} from "lodash";
interface Property {
    controller : any;

}

export class BaseController implements Property{
    public controller:any;

    constructor(controller:any){
        



        this.controller = controller;

        this.ipcOn();


    }

    ipcOn(){
        const allMethods:any = this.getMethods();
        const _this:any = this;
        
        for(let index = 0; index < allMethods.length; index++){
            const methodName:any = allMethods[index];
            
            const channel:any = _this.makeChannel(methodName);

            // ipcMain.on(channel,(event,args) =>{
            //     _this.controller[methodName](event,args);
            // });
            // console.log('start method',methodName);
            if(_this.isAsyncMethod(methodName)){
                //async method
                ipcMain.on(channel,(event,...args)=>{
                    console.log('[baseController]',args);
                    event.autoReplay = (result) => {
                        return event.reply(channel+'/reply',result);
                    }
                    event.autoReply = (result) => {
                        return event.reply(channel+'/reply',result);
                    }

                    _this.controller[methodName](event,args);


                })
            }else{
                // sync method
                ipcMain.on(channel,_this.controller[methodName]);
            }




        }
    }

    isAsyncMethod(methodName:string){
        return methodName.charAt(0) === '_';
    }

    makeChannel(methodName:any){
        const channel:any = '@'+this.controller.name+'/'+methodName;

        return channel;
    }

    getMethods(){

        const controller:any = this.controller;
        // const methods = [];

        // const ownPropertyNames = Object.getOwnPropertyNames(controller.prototype);
        const ownPropertyNames:any = Object.getOwnPropertyNames(controller);

        // for(let name in ownPropertyNames){
        //
        //     if(ownPropertyNames[name] != 'constructor'){
        //         methods.push(ownPropertyNames[name]);
        //     }
        // }
        const methods:any = ownPropertyNames.filter(prop => typeof controller[prop] === "function");

        return methods;

    }


    getAllMethods = () => {
        let props:any = []
        let obj:any = this.controller;
        do {
            const l:any = Object.getOwnPropertyNames(obj)
                .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
                .sort()
                .filter((p:any, i:any, arr:any) =>
                    typeof obj[p] === 'function' &&  //only the methods
                    p !== 'constructor' &&           //not the constructor
                    (i == 0 || p !== arr[i - 1]) &&  //not overriding in this prototype
                    props.indexOf(p) === -1          //not overridden in a child
                )
            props = props.concat(l)
        }
        while (
            (obj = Object.getPrototypeOf(obj)) &&   //walk-up the prototype chain
            Object.getPrototypeOf(obj)              //not the the Object prototype methods (hasOwnProperty, etc...)
            )

        return props
    }


}