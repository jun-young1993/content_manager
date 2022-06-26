import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Alert, AlertColor, Stack} from "@mui/material";
import {useEffect} from "react";

export default function AlertDialog(props:any) {
    const [open, setOpen] = React.useState(false);

    const [type,setType] = React.useState(undefined);

    const [text, setText] = React.useState('');
    const [title, setTitle] = React.useState('');

    const [onClose, setOnClose] = React.useState(undefined);


    const baseAlert = <Alert severity='info'></Alert>;
    const [alert,setAlert] = React.useState(baseAlert);
    useEffect(() => {
        const changeAlert = <Alert severity={type}>{text}</Alert>;
        setAlert(changeAlert);
    },[type])


    const handleClickOpen = () => {
        setOpen(true);
        if(props.onClick){
            props.onClick({
                setType : setType,
                setText : setText,
                setOnClose : setOnClose
            });


        }
    };

    const handleClose = () => {
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
                {/*<DialogTitle id="alert-dialog-title">*/}
                    {/*{title}*/}
                {/*</DialogTitle>*/}
                {/*<DialogContent>*/}
                {/*    <DialogContentText id="alert-dialog-description">*/}
                <Stack sx={{ width: '100%' }} spacing={2}>
                    {alert}
                </Stack>
                {/*    </DialogContentText>*/}
                {/*</DialogContent>*/}
                {/*<DialogActions>*/}
                    {/*<Button onClick={handleClose}>확인</Button>*/}
                {/*</DialogActions>*/}
            </Dialog>
        </div>
    );
}
