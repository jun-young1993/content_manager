import {BaseController} from "./BaseController";

class User {

    static insert(event,args){
        console.log(args);
    }
}


new BaseController(User);

