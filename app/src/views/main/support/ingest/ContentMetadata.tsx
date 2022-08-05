import * as React from 'react';
import FieldSet from "@views/main/support/ingest/fields/FieldSet";
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const defaultField = () => {
    const workflowes = ipcRenderer.sendSync("@WorkFlow/all");
    const categorys = ipcRenderer.sendSync("@Category/index",{parent_id : 'folder'});
    const defaultFields = [{
        required : true,
        // helperText:"required field",
        select: true,
        fullWidth: true,
        name : 'workflow_id',
        label : '워크플로우',
        variant : "standard",
        color:"secondary",
        focused : true,
        // defaultValue:workflowes.data[0]._id,
        children : (workflowes.data.map((code: any) => {
            return (<MenuItem key={code._id} value={code._id}>{code.name}</MenuItem>)
        }))
    },{
        required : true,
        // helperText:"required field",
        select: true,
        fullWidth: true,
        name : 'category',
        label : '카테고리',
        variant : "standard",
        color:"secondary",
        focused : true,
        // defaultValue:workflowes.data[0]._id,
        children : (categorys.data.map((code: any) => {
            return (<MenuItem key={code._id} value={code._id}>{code.name}</MenuItem>)
        }))
    }];

    return defaultFields;
}

const settingField = (metaFields:[]) => {
    const fields:any = [...defaultField()]
	metaFields.map((metaField:any) => {
	    const fieldSet:any = {
		fullWidth : true,
		name : metaField.code,
		label : metaField.name,
		variant : "standard"
	    };
	    if(metaField.type == 'code') {
            const codeResult = ipcRenderer.sendSync("@CodeItem/indexByParentCode", metaField.code);
            let codes = [];
            if (codeResult.success) {
                if (codeResult.data) {
                codes = codeResult.data;
                console.log('codes', codes)
                }
            }
        
            const codeFieldSet = {
                select: true,
                fullWidth: true,
                children : (codes.map((code: any) => {
                return (<MenuItem key={code.code} value={code.code}>{code.name}</MenuItem>)
                }))
            }
        
        
            Object.assign(fieldSet,codeFieldSet);
	    }
    
        fields.push(fieldSet)
	});
    return fields;
}

export default function ContentMetadata(props:any){

    const dispatch = useDispatch()
	const { metadata } = useSelector((state:any) => {return state.metadata})
	const { fields} = useSelector((state:any) => {return state.fields})
	ipcRenderer.on('@Field/_index/reply',(event,result)=>{
		console.log('@Field/_index/reply',result)  
        console.log('settingField(result.data)',settingField(result.data))
		if(result.success){
            
			dispatch({type : 'field.push', value : settingField(result.data)});
		}
			
			
	})

    return(
        <>
            {fields.map((field:any)=>{

                let element = <TextField  />;


                return(<div>{React.cloneElement(element,field)}</div>)

            })}
        </>
    );
}