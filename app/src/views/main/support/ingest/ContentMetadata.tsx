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
const reducer = (prevState:any, newState:any) => ({
    ...prevState,
    ...newState
})
export default function ContentMetadata(props:any){
    console.log('props.metadata',props.metadata);
    const [state, setState] = React.useReducer(reducer,{
        metadata : props.metadata,
        fields : []
    })
    // const dispatch = useDispatch()
    // const { metadata} = useSelector((state:any) => {return state.metadata})
    // console.log('[contentMetadata]metadata',metadata)
	// const { fields} = useSelector((state:any) => {return state.fields})
    // const [metadata, setMetadata] = React.useState()
    React.useEffect(()=>{
        ipcRenderer.send("@Field/_index");
        ipcRenderer.on('@Field/_index/reply',(event,result)=>{
            console.log('@Field/_index/reply',result)  
            console.log('settingField(result.data)',settingField(result.data))
            if(result.success){
                // setState({
                //     fields : settingField(result.data)
                // });
                const fields:any = {fields : settingField(result.data)};
                setState(fields);
                // dispatch({type : 'field.push', value : settingField(result.data)});
    
                ipcRenderer.removeAllListeners("@Field/_index/reply");
            }
                
                
        })
    },[])
   
    const updateFiledValue = (event: { target: { name: string; value: string; }; }) => {
        const {name , value} = event.target;
        state.metadata[name] = value;
        // setState(state);
        // dispatch({type : 'metadata.patch', value : {[name] : value} })
    }

    return(
        <>
            {state.fields.map((field:any)=>{

                let element = <TextField  onChange={updateFiledValue}/>;
                console.log('state.metadata[field.name]',state.metadata)
                if(state.metadata && state.metadata[field.name]){
                    field.defaultValue = state.metadata[field.name];
                    console.log('setting ',field);
                }
                // field.defaultValue
                return(<div>{React.cloneElement(element,field)}</div>)

            })}
        </>
    );
}