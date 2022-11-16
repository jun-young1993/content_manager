import Dialog from "@mui/material/Dialog";
import {Alert, AlertTitle, Stack} from "@mui/material";
import * as React from "react";
import CustomAlert from "@views/components/CustomAlert";
import {ipcRenderer, IpcRendererEvent} from "electron";
export interface ListenerAlert {
    title : string | JSX.Element
    severity :"default" | "error" | "success" | "warning" | "info",
    onClose ?: Function
}

function ListenerAlert(props:{channel:string}){


    const [alert, setAlert] = React.useState(<></>);
    ipcRenderer.on(`#ShowMessageAlert/reply`,(event:IpcRendererEvent,args:ListenerAlert) => {
        console.log('show alert tsx',args);
        const alertComponent = (
            <CustomAlert
                severity={args.severity}
                title={args.title}
                onClose={()=>{
                    ipcRenderer.send("#ShowMessageAlertClose");
                    setAlert(<></>)
                    
                }
                }
            />);

                setAlert(alertComponent);


            ipcRenderer.removeAllListeners("#ShowMessageAlert/reply");




    })
    return (
        <>
            {alert}
        </>
    )
}
export default function ShowAlert(){

    return (
        <>
            <ListenerAlert
                channel={"category"}
            />
        </>
    );
}