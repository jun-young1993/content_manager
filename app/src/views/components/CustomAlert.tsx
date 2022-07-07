import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Modal,Alert, Box, AlertColor, Stack, AlertTitle} from "@mui/material";
import {useEffect} from "react";

export default function CustomAlert(props:any) {
    let propsOpen = true;
    if(props.open || props.open === false){
        propsOpen = props.open;
    }
    const [open, setOpen] = React.useState(propsOpen);

    let propsDisableBackDrop = true;
    if(props.disableBackDrop || props.disableBackDrop === false){
        propsDisableBackDrop = props.disableBackDrop;
    }
    const [disableBackDrop,setDisableBackDrop] = React.useState(propsDisableBackDrop);

    let propsSeverity:AlertColor = 'info';
    if(props.serverity){
        propsSeverity = props.serverity;
    }
    const [severity, setSeverity] = React.useState(propsSeverity);

    let propsTitle = '';
    if(props.title){
        propsTitle = props.title;
    }
    const [title, setTitle] = React.useState(propsTitle);

    
    const baseAlert = <Alert></Alert>;



    const [alertOption, setALertOption] = React.useState({
        severity : undefined,
        onClose : () => {

        },
        title : "",
        text : "",
        disableBackDrop : false
    });



    const handleClickOpen = () => {
        setOpen(true);
        if(props.onClick){
            props.onClick({
                setALertOption : setALertOption
            });


        }
    };

    const handleClose = (event:any,reason:any) => {
        if(!disableBackDrop){
            if(reason == "backdropClick"){
                return;
            }
        }else{
            setDisableBackDrop(false);
        }
        
        setOpen(false);

    };

    // @ts-ignore
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity={severity}
                        >
                            <AlertTitle>{title}</AlertTitle>
                        </Alert>
                    </Stack>

            </Dialog>
        </>
    );
}
