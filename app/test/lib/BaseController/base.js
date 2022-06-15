 const {BaseController} = require("../../../public/src/boots/events/controller/BaseController");
class User {
    test = 'hi';

    static insert(event,arg){
        console.log(event)
        console.log(arg)
    }
}
new BaseController(User);