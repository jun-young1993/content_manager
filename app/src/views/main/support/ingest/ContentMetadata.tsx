import * as React from 'react';
import FieldSet from "@views/main/support/ingest/fields/FieldSet";
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


const reducer = (prevState:any, newState:any) => ({...prevState,...newState});

export default function ContentMetadata(props:any){
    const [state, setState] = React.useReducer(reducer, {});
    const metadataFields = ipcRenderer.sendSync("@Field/index");
    const metadata = props.metadata;

    const updateInputValues = (evt : any) => {
        if(props.setMetadataValues){
            props.setMetadataValues({
                [evt.target.name]: evt.target.value
            })
        }


    }
    if(metadataFields.success){
        const metaFields = metadataFields.data;

        const fields:any = [];

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

            if(metadata){
                if(metadata[metaField.code]){
                    fieldSet['defaultValue'] = metadata[metaField.code];
                }
            }
            fields.push(fieldSet)
        });




        if(fields.length == 0){
        //     필드항목이 없습니다.
            return(
                <div>필드항목이 없습니다.</div>
            );
        }else{


            return(
                <>
                    {fields.map((field:any)=>{
                        // let children = null;
                        // if(field.children){
                        //     children = field.children;
                        //     delete field.children;
                        // }
                        let element = <TextField onChange={updateInputValues} />;




                        // field.onChange = field.onChange ?  field.onChange : updateValues;
                        // field.value = newValues[field.name];

                        return(<div>{React.cloneElement(element,field)}</div>)

                    })}
                </>

                );

        }
    }
    return(
        <div>ContentMetadat</div>
    );
}