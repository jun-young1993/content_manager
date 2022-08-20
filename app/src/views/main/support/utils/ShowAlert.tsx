import Dialog from "@mui/material/Dialog";
import {Alert, AlertTitle, Stack} from "@mui/material";
import * as React from "react";
import CustomAlert from "@views/components/CustomAlert";
import {ipcRenderer, IpcRendererEvent} from "electron";
export interface ListenerAlert {
    title : string
    severity :"default" | "error" | "success" | "warning" | "info"
}

function ListenerAlert(props:{channel:string}){


    const [alert, setAlert] = React.useState(<></>);
    ipcRenderer.on(`#ShowAlert/reply`,(event:IpcRendererEvent,args:ListenerAlert) => {

        const alertComponent = (
            <CustomAlert
                severity={args.severity}
                title={args.title}
                onClose={()=>{
                    setAlert(<></>)
                }
                }
            />);
        setAlert(alertComponent);
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