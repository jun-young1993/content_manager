import {ipcMain} from "electron";
interface Property {
    controller : any;

}

export class BaseController implements Property{
    controller;

    constructor(controller:any){
        console.log('baseCOntroller this');



        this.controller = controller;

        this.ipcOn();


    }

    ipcOn(){
        const allMethods = this.getMethods();
        const _this = this;
        console.log(allMethods);
        for(let index = 0; index < allMethods.length; index++){
            const methodName = allMethods[index];
            console.log(methodName);
            const channel = _this.makeChannel(methodName);

            // ipcMain.on(channel,(event,args) =>{
            //     _this.controller[methodName](event,args);
            // });
            ipcMain.on(channel,_this.controller[methodName]);



        }
    }

    makeChannel(methodName){
        const channel = '@'+this.controller.name+'/'+methodName;

        return channel;
    }

    getMethods(){

        const controller = this.controller;
        // const methods = [];

        // const ownPropertyNames = Object.getOwnPropertyNames(controller.prototype);
        const ownPropertyNames = Object.getOwnPropertyNames(controller);

        // for(let name in ownPropertyNames){
        //
        //     if(ownPropertyNames[name] != 'constructor'){
        //         methods.push(ownPropertyNames[name]);
        //     }
        // }
        const methods = ownPropertyNames.filter(prop => typeof controller[prop] === "function");

        return methods;

    }


    getAllMethods = () => {
        let props = []
        let obj = this.controller;
        do {
            const l = Object.getOwnPropertyNames(obj)
                .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
                .sort()
                .filter((p, i, arr) =>
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