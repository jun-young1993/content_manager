import {BaseController} from "./BaseController";
import {User as UserModel} from "../../../../../public/models/User";
// import {User} from "@model/User";
const userDb = new UserModel();

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
class User {
    static index(event, args){
        userDb.get().then(resolve => {
            return event.returnValue = {
                success : true,
                data : resolve
            }
        })
    }
    static insert(event,args){
        userDb.insert(args).then((resolve) => {
            console.log(resolve);

            return event.returnValue = {
                success : true,
                data : resolve
            }
        });
    }
}


new BaseController(User);

