import * as React from "react";
import {
    Image, SmartDisplay, Sell, Circle, Help, QuestionMarkRounded
    ,QuestionMarkTwoTone, PlaylistAdd, DoNotDisturb
} from '@mui/icons-material';
import {isEmpty} from "lodash";

const IconMap:{[key : string] : any} = {
    "video" : <SmartDisplay />,
    "image" : <Image />,
    "tag" : <Sell />,
    "circle" : <Circle />,
    "help" : <Help />,
    "questionMarkRounded" : <QuestionMarkRounded />,
    "questionMarkTwoTone" : <QuestionMarkTwoTone />,
    "listplus" : <PlaylistAdd />
}
export default function Icons(props:{type : string}|any){
    let Icon = IconMap[props.type.toLowerCase()];
    if(isEmpty(Icon)){
        Icon = <DoNotDisturb />
    }
    return (
        <>
            {React.cloneElement(Icon,props)}
        </>
    )
}