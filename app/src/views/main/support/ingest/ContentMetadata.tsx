import * as React from 'react';
import FieldSet from "@views/main/support/ingest/fields/FieldSet";
import TextField from "@mui/material/TextField";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


const reducer = (prevState:any, newState:any) => ({...prevState,...newState});

export default function ContentMetadata(props:any){
    const [state, setState] = React.useReducer(reducer, {});
    const metadataFields = ipcRenderer.sendSync("@Field/index");

    const updateInputValues = (evt : any) => {
        props.setMetadataValues({
            [evt.target.name]: evt.target.value
        })

    }
    if(metadataFields.success){
        const metaFields = metadataFields.data;

        const fields:any = [];

        metaFields.map((metaField:any) => fields.push({
            name : metaField.code,
            label : metaField.name,
            variant : "standard"
        }));




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