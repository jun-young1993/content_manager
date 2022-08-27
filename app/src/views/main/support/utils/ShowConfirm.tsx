import Dialog from "@mui/material/Dialog";

import * as React from "react";
import CustomAlert from "@views/components/CustomAlert";
import {ipcRenderer, IpcRendererEvent} from "electron";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
export interface ListenerAlert {
    title : string
    severity :"default" | "error" | "success" | "warning" | "info",
    onClose ?: Function
}

function ListenerAlert(){


    const [alert, setAlert] = React.useState(<></>);
    ipcRenderer.on(`#ShowMessageConfirm/reply`,(event:IpcRendererEvent,args:ListenerAlert) => {
        console.log('show alert confirm tsx',args);


        const alertComponent = (
            <CustomAlert
                severity={args.severity}
                title={args.title}
                confirm={true}
                onClose={(reason:any)=>{
                    let checked :boolean =  false;
                    if(reason == 'check'){
                        checked = true;
                    }
                    ipcRenderer.send("#ShowMessageConfirmClose",checked);
                    setAlert(<></>)
                }}
            />);
            



            ipcRenderer.removeAllListeners("ShowMessageConfirm/reply");
        setAlert(alertComponent);




    })
    return (
        <>
            {alert}
        </>
    )
}
export default function ShowConfirm(){

    return (
        <>
            <ListenerAlert
            />
        </>
    );
}