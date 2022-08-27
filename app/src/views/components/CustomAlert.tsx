import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Modal,Alert, Box, AlertColor, Stack, AlertTitle} from "@mui/material";
import {useEffect} from "react";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

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
    if(props.severity){
        propsSeverity = props.severity;
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

    const actions = [
        {
            title : "취소",
            onClick : () => {

            }
        }
    ];

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
            console.log('custom alert',1)
            if(reason == "backdropClick"){
                console.log('custom alert',2)
                return;
            }
            console.log('custom alert',3)
        }else{
            console.log('custom alert',4)
            setDisableBackDrop(false);
            
        }
        console.log('custom alert',5)
        setOpen(false);

        if(props.onClose){
            props.onClose(reason);
        }
        

    };


    let confirm = (<></>);
    if(props.confirm === true){
        confirm = (
            <>
                <br/>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                >
                    <IconButton aria-label="fingerprint" color="success" onClick={()=>{
                        handleClose(null,'check');
                    }}>
                        <CheckIcon />
                    </IconButton>
                    <IconButton aria-label="fingerprint" color="secondary" onClick={()=>{
                        handleClose(null,'cancel');
                    }}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </>
        );
    }


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
                            <AlertTitle>
                                {title}
                                {confirm}
                            </AlertTitle>
                        </Alert>
                    </Stack>

            </Dialog>
        </>
    );
}
