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
import { cloneDeep } from 'lodash'
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



    const [fields, setFields] = React.useState(props.fields);
    const [buttonTitle, setButtonTitle] = React.useState(props.buttonTitle);

    
    const [changeFields, setChangeFields] = React.useState(props.changeFields);
    
    if(changeFields){
        const tmpFields = cloneDeep(fields);
        changeFields.forEach((changeField:any,fieldIndex:number) => {
            
            
            fields.forEach((field:any,index:number)=>{
                
                if(changeField.name == field.name){
                    
                    console.log('splice 0',changeField)
                    tmpFields.splice(index+1,0,changeField);
                    console.log('splice 1',tmpFields)
                    tmpFields.splice(index,1)
                    console.log('tmpFields',tmpFields);

                }
            })
            
            console.log(changeFields.length);
            if(fieldIndex == changeFields.length-1){
                console.log('last set fields',tmpFields);

                setFields(tmpFields);
                setChangeFields([]);
            }
        })
        
    }

    const refs:any = {};
    fields.map((field:any) => {
        if(field){
            let defaultValue = values[field.name];
            if(field.defaultvalue){
                defaultValue = field.defaultvalue;
                console.log('defaultValue',defaultValue);
            }
            refs[field.name] = React.useRef(defaultValue)
        }
    });
    console.log('renderer');
    // React.useEffect(()=>{
    //     console.log('effect values', values);
    //     setNewValues(values);
    // },[values]);
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
 
    
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
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
                        if(field === null){
                            return null;
                        }
                        
                        // let children = null;
                        // if(field.children){
                        //     children = field.children;
                        //     delete field.children;
                        // }
                        let fieldValue = values[field.name];
                        if(field.defaultValue){
                            fieldValue = field.defaultValue;
                        }
                        
                        let element = <TextField inputRef={refs[field.name]} defaultValue={fieldValue} />;

                        if(field.onChangeValue){
                            field.onChange = (evt:any) => {
                                field.onChangeValue(evt,{
                                    ref : refs[field.name],
                                    refs : refs,
                                    setChangeFields : setChangeFields,
                                    setValues : setValues
                                })
                            }
                        }
                        // field.onChange = field.onChange ?  field.onChange : updateValues;
                        // field.value = newValues[field.name];

                        return(<div>{React.cloneElement(element,field)}</div>)
                    
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>취소</Button>
                    <Button 
                        onClick={()=>{
                            if(props.onSaveClick){
                                const newValues:any = {};
                                
                                console.log('refs',refs);
                                Object.keys(refs).forEach((name) => {
                                    newValues[name] = refs[name].current.value
                                });
                                
                                    
                                props.onSaveClick({
                                    oldValues : values,
                                    values : newValues,
                                    setOpen : setOpen,
                                });
                            }
                        }}
                    >
                        {buttonTitle}
                        </Button>
                    {/* <AlertDialog
                        button={buttonTitle}
                        onClick={()=>{
                            if(props.onSaveClick){
                                props.onSaveClick({
                                    values : values,
                                    setOpen : setOpen
                                });
                            }
                        }}
                    /> */}
                </DialogActions>
            </Dialog>

        </div>
    );
}
