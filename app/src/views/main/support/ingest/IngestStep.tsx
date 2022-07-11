import * as React from 'react';
import ContentMetadata from "@views/main/support/ingest/ContentMetadata";
import Contents from "@views/main/support/ingest/contents/Contents";
import IngestRequest from "@views/main/support/ingest/IngestRequest";
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
    React.useEffect(()=>{
        console.log('activeStep',activeStep);
    },[activeStep])
    if(props.activeStep == 0){
        step = <ContentMetadata
            setMetadataValues={setMetadataValues}
        ></ContentMetadata>;
    }else if(props.activeStep == 1){
        step = <Contents setFiles={setFiles}></Contents>;
    }else if(props.activeStep == 2){
        console.log('content insert');




        // console.log(metadataValues);
        // console.log(files);
        const metadata = metadataValues;
        // Object.assign(metadata,{id : uniqid()});
        
        
        step = <IngestRequest metadata={metadata} files={files}/>;
        // step = <div></div>
    }else{
        step = <div></div>;
    }
    return (
        step
    );
}