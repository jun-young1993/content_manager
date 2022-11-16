import {ipcMain, IpcMainInvokeEvent, app} from "electron";
import {NetworkInterfaceInfo, networkInterfaces} from "os";
import {isString} from "lodash";
import Git from "../controller/Git";

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
            port : store.get("app.network_port")
        });
    })
})


ipcMain.handle("$app-info",(event:IpcMainInvokeEvent) => {
    return new Promise((resolve) => {
        Git.$release(null,["/latest"])
        .then((latest:any) => {
            const latestVersion = JSON.parse(latest).tag_name;
            let isLatest : boolean = true;
            if(latestVersion !== `v${app.getVersion()}`){
                isLatest = false;
            }
            resolve({
                latest_version : latestVersion,
                app_version : app.getVersion(),
                is_latest : isLatest,
                port : store.get("app.network_port")
            })
        })
        
        
    })
})