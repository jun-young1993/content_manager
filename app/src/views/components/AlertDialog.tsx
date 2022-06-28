import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Modal,Alert, Box, AlertColor, Stack, AlertTitle} from "@mui/material";
import {useEffect} from "react";

export default function AlertDialog(props:any) {
    const [open, setOpen] = React.useState(false);





    
    const baseAlert = <Alert severity='info'></Alert>;
    const [alert,setAlert] = React.useState(baseAlert);
    const [disableBackDrop,setDisableBackDrop] = React.useState(false);
    const [alertOption, setALertOption] = React.useState({
        severity : undefined,
        onClose : () => {

        },
        title : "",
        text : "",
        disableBackDrop : false
    });
    useEffect(() => {
        if(alertOption.disableBackDrop){
            setDisableBackDrop(alertOption.disableBackDrop);
        } 
        const changeAlert = 
        <Alert severity={alertOption.severity}
                onClose={alertOption.onClose}
                >
            <AlertTitle>{alertOption.title}</AlertTitle>
            {alertOption.text}
        </Alert>;
        setAlert(changeAlert);
    },[alertOption])


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
        <div>
            <Button onClick={handleClickOpen}>{props.button}</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                // aria-labelledby="alert-dialog-title"
                // aria-describedby="alert-dialog-description"
            >
                 {/* <Box sx={style}> */}
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {alert}
                    </Stack>
                 {/* </Box> */}
                {/*<DialogTitle id="alert-dialog-title">*/}
                    {/*{title}*/}
                {/*</DialogTitle>*/}
                {/*<DialogContent>*/}
                {/*    <DialogContentText id="alert-dialog-description">*/}
         
                {/*    </DialogContentText>*/}
                {/*</DialogContent>*/}
                {/*<DialogActions>*/}
                    {/*<Button onClick={handleClose}>확인</Button>*/}
                {/*</DialogActions>*/}
            </Dialog>
        </div>
    );
}
