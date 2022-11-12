import {ipcMain, IpcMainInvokeEvent} from "electron";
import {NetworkInterfaceInfo, networkInterfaces} from "os";
import {isString} from "lodash";

const Store = require("electron-store");
const store = new Store();
function getIPAddress() : string[] | []
{
    const interfaces : NodeJS.Dict<NetworkInterfaceInfo[]> = networkInterfaces();
    const ips : string[] | [] = [];
    for (let devName in interfaces) {
        const face = interfaces[devName];

        for (let i = 0; i < face.length; i++) {
            const alias : NetworkInterfaceInfo = face[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                // @ts-ignore
                if(isString(alias.address)) ips.push(alias.address);


        }
    }
    return ips;
}
ipcMain.handle("$share/ip-info",(event:IpcMainInvokeEvent) => {
    return new Promise((resolve) => {
        resolve({
            addresses : getIPAddress(),
            port : store.get("app.share_port")
        });
    })
})