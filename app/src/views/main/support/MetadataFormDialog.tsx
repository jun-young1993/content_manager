import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton, MenuItem, Alert, AlertTitle, AlertColor} from "@mui/material";
import AlertDialog from "@views/components/AlertDialog"

import electron from "electron";
const ipcRenderer = electron.ipcRenderer;
const fieldTypes = [
    {
        value: 'text_field',
        label: '텍스트필드',
    },
    {
        value: 'code_combo',
        label: '코드 콤보',
    }
];

export default function MetadataFormDialog(props:any) {

    const [buttonTitle, setButtonTitle] = React.useState(props.buttonTitle);


    // const [openAlert, setOpenAlert] = React.useState(false);
    // const [openAlert, setOpenAlert] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    const [fieldType, setFieldType] = React.useState('text_field');
    const [fieldCode, setFieldCode] = React.useState('');
    const [fieldName, setFieldName] = React.useState('');
    const [fieldDescription, setFieldDescription] = React.useState('');

    const handleFieldTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setFullWidth(event.target.checked);
        setFieldType(
            event.target.value,
        );
    };

    const updateInputValues = (evt : any) => {
        if(evt.target.id == 'code'){
            setFieldCode(evt.target.value);
        }else if(evt.target.id == 'name'){
            setFieldName(evt.target.value);
        }else if(evt.target.id == 'description'){
            setFieldDescription(evt.target.value);
        };

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const handleSave = (alertDialogMethods:any) =>  {

        

        // setOpenAlert(true);
        const exists = ipcRenderer.sendSync("@Field/first",{code:fieldCode});

        if(exists.success){
            
                
            alertDialogMethods.setALertOption({
                severity : 'warning',
                title : "알림",
                text : "이미 존재하는 코드입니다.\r\n다른 필드코드로 요청해주세요.",
                disableBackDrop : true
            })
        
            return;
        }

        const insert = ipcRenderer.sendSync("@Field/insert",{
            code : fieldCode,
            name : fieldName,
            description : fieldDescription
        });

        if(insert.success){
            alertDialogMethods.setALertOption({
                severity : 'success',
                onClose : () => {
                    setOpen(false);
                    props.grid.reload();
                    
                },
                title : "성공",
                text : "성공적으로 등록되었습니다."
            })
        }else{
            alertDialogMethods.setALertOption({
                severity : 'error',
                title : "알림",
                text : "등록에 실패했습니다.",
                disableBackDrop : true
            })
        }
    }

    return (
        <div>
            <Button variant="text" onClick={handleClickOpen}>
                {buttonTitle}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{buttonTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* To subscribe to this website, please enter your email address here. We
                        will send updates occasionally. */}
                    </DialogContentText>
                    <div>
                        <TextField
                            id="field_type"
                            select
                            label="필드 타입"
                            value={fieldType}
                            onChange={handleFieldTypeChange}
                            helperText="Please select your field type"
                            variant="standard"
                        >
                            {fieldTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <TextField id="code" label="필드코드" variant="standard" onChange={updateInputValues} value={fieldCode}/>
                    </div>
                    <div>
                        <TextField id="name" label="필드명" variant="standard" onChange={updateInputValues} value={fieldName}/>
                    </div>
                    <div>
                        <TextField id="description" label="설명" variant="standard" onChange={updateInputValues} value={fieldDescription}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <AlertDialog
                        button="저장"
                        onClick={handleSave}
                    />
                </DialogActions>
            </Dialog>

        </div>
    );
}
