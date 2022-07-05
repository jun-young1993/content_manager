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
import * as _ from 'lodash'
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



const fieldValuseReducer = (state:any,action:any) : any =>{
    if(action.type == 'PUT'){
        state = action.data;
    }else if(action.type == 'PATCH'){
        state[action.key] = action.data;
    }
    console.log(state);
    return state;
};
const reducer = (prevState:any, newState:any) => (Object.assign(prevState,newState));


export default function FormDialog(props:any) {





    const [values, setValues] = React.useReducer(reducer, props.values);
    const [fields, setFields] = React.useReducer(reducer, props.fields);
    const [buttonTitle, setButtonTitle] = React.useState(props.buttonTitle);


    // const [openAlert, setOpenAlert] = React.useState(false);
    // const [openAlert, setOpenAlert] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    // const [fieldType, setFieldType] = React.useState('text_field');


    // const handleFieldTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     // setFullWidth(event.target.checked);
    //     setFieldType(
    //         event.target.value,
    //     );
    // };

    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };
    const updateValues = (evt : any) => {

        setValues({
            [evt.target.name]: evt.target.value
        })


    }
    // const handleSave = (alertDialogMethods:any) =>  {

        

    //     // setOpenAlert(true);
    //     if(props.type == "INSERT"){
    //         const exists = ipcRenderer.sendSync("@Field/first",{code:state.code});

    //         if(exists.success){


    //             alertDialogMethods.setALertOption({
    //                 severity : 'warning',
    //                 title : "알림",
    //                 text : "이미 존재하는 코드입니다.\r\n다른 필드코드로 요청해주세요.",
    //                 disableBackDrop : true
    //             })

    //             return;
    //         }
    //     }

    //     let result = {
    //         success : false
    //     }
    //     if(props.type == "PATCH"){

    //         result = ipcRenderer.sendSync("@Field/update",{
    //             type : state.type,
    //             code : state.code,
    //             name : state.name,
    //             description : state.description
    //         },{
    //             _id : state._id
    //         });
    //         if(result.success){
    //             setState({
    //                 type : state.type,
    //                 code : state.code,
    //                 name : state.name,
    //                 description : state.description
    //             });
    //         }

    //     }else{
    //         result = ipcRenderer.sendSync("@Field/insert",state);
    //     }


    //     if(result.success){
    //         alertDialogMethods.setALertOption({
    //             severity : 'success',
    //             onClose : () => {
    //                 setOpen(false);
    //                 props.grid.reload();
                    
    //             },
    //             title : "성공",
    //             text : "성공적으로 "+buttonTitle+"되었습니다."
    //         })
    //     }else{
    //         alertDialogMethods.setALertOption({
    //             severity : 'error',
    //             title : "알림",
    //             text : buttonTitle+"에 실패했습니다.",
    //             disableBackDrop : true
    //         })
    //     }
    // }
    console.log('before render state',values)
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
                    {fields.map((field:any)=>{
                        let element = <TextField />;
                        field.onChange = field.onChange ?  field.onChange : updateValues;
                        return (
                            <div>
                                {React.cloneElement(element,field)}
                            </div>
                        )
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <AlertDialog
                        button={buttonTitle}
                        onClick={()=>{
                            if(props.onSaveClick){
                                props.onSaveClick({
                                    values : values,
                                    setOpen : setOpen
                                });
                            }
                        }}
                    />
                </DialogActions>
            </Dialog>

        </div>
    );
}
