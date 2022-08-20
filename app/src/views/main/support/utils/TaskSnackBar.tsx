import React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import {ipcRenderer, IpcRendererEvent} from "electron";

function SnackBar() {
    const { enqueueSnackbar } = useSnackbar();
    console.log('my snack bar');


    // variant: VariantType  "default" | "error" | "success" | "warning" | "info"
    ipcRenderer.on("#Utils/TaskSnackBar",(event:IpcRendererEvent,options:{variant?:VariantType, messages? : string}) => {
        console.log('electron render Utils TaskSnacbar',options);
        if(options.variant){
            enqueueSnackbar(options.messages, options);
        }else{
            enqueueSnackbar(options.messages);
        }


    })





    return (
        <React.Fragment>

        </React.Fragment>
    );
}

export default function TaskSnackBar() {
    ipcRenderer.on("1",(event:IpcRendererEvent,options:{variant?:VariantType, messages? : string}) => {
        console.log('render on 1')
    })

    return (
        <SnackbarProvider maxSnack={3}>
            <SnackBar />
        </SnackbarProvider>
    );
}
