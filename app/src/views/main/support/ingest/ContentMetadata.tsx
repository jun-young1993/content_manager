import * as React from 'react';
import FieldSet from "@views/main/support/ingest/fields/FieldSet";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


const reducer = (prevState:any, newState:any) => ({...prevState,...newState});

export default function ContentMetadata(){
    const [state, setState] = React.useReducer(reducer, {});
    const metadataFields = ipcRenderer.sendSync("@Field/index");
    console.log(metadataFields);
    if(metadataFields.success){
        const fields = metadataFields.data;
        if(fields.length == 0){
        //     필드항목이 없습니다.
            return(
                <div>필드항목이 없습니다.</div>
            );
        }else{
            console.log('fields',fields);
            return(
                <FieldSet
                    fields={fields}
                ></FieldSet>
                );

        }
    }
    return(
        <div>ContentMetadat</div>
    );
}