import * as React from 'react';
import ContentMetadata from "@views/main/support/ingest/ContentMetadata";
import Contents from "@views/main/support/ingest/contents/Contents";
interface Props {
    activeStep: number;
}
export default function IngestStep(props:Props) {
    const [activeStep, setActiveStep] = React.useState(props.activeStep);
    let step = null;

    if(props.activeStep == 0){
        step = <ContentMetadata></ContentMetadata>;
    }else if(props.activeStep == 1){
        step = <Contents></Contents>;
    }else if(props.activeStep == 2){
        step = <div>bye</div>;
    }else{
        step = <div></div>;
    }
    return (
        step
    );
}