import * as React from 'react';
import ContentMetadata from "@views/main/support/ingest/ContentMetadata";
import Contents from "@views/main/support/ingest/contents/Contents";
import IngestRequest from "@views/main/support/ingest/IngestRequest";
import IngestInfo from "@views/main/support/ingest/IngestInfo";
const electron = window.require('electron');

const ipcRenderer = electron.ipcRenderer;
interface Props {
    activeStep: number;
    handleFinish : any;
}
const metadataValuesReducer = (prevState:any, newState:any) => ({...prevState,...newState});
export default function IngestStep(props:Props) {
    const [activeStep, setActiveStep] = React.useState(props.activeStep);

    const [refs, setRefs] = React.useState({});
    const [files,  setFiles] = React.useState([]);
    let step = null;

    const [fields, setFields] = React.useState([]);

    const [metadataValues, setMetadataValues] = React.useReducer(metadataValuesReducer, {});
    
    if(props.activeStep == 0){
        step = <ContentMetadata
            setMetadataValues={setMetadataValues}
        ></ContentMetadata>;
    }else if(props.activeStep == 1){
        step = <Contents setFiles={setFiles}></Contents>;
    }else if(props.activeStep == 2){
        console.log('content insert');
        const metadata = metadataValues;
        step = <IngestRequest metadata={metadata} files={files}/>;
        


        // console.log(metadataValues);
        // console.log(files);
        
        // Object.assign(metadata,{id : uniqid()});
        
        
        
        // step = <div></div>
    }
    return (
        step
    );
}