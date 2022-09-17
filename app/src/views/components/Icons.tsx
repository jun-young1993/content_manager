import * as React from "react";
import {Image, SmartDisplay} from '@mui/icons-material';
const IconMap:{[key : string] : any} = {
    "video" : <SmartDisplay />,
    "image" : <Image />
}
export default function Icons(props:{type : string}|any){
    const Icon = IconMap[props.type];

    return (
        <>
            {React.cloneElement(Icon,props)}
        </>
    )
}