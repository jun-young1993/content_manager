import * as React from "react";
import {
    Circle,
    DoNotDisturb,
    Help,
    Image,
    MusicNote,
    PlaylistAdd,
    QuestionMarkRounded,
    QuestionMarkTwoTone,
    Sell,
    SmartDisplay,
    Upload,
    Share
} from '@mui/icons-material';
import {isEmpty} from "lodash";

const IconMap:{[key : string] : any} = {
    "video" : <SmartDisplay />,
    "image" : <Image />,
    "music" : <MusicNote /> ,
    "tag" : <Sell />,
    "circle" : <Circle />,
    "help" : <Help />,
    "questionMarkRounded" : <QuestionMarkRounded />,
    "questionMarkTwoTone" : <QuestionMarkTwoTone />,
    "listplus" : <PlaylistAdd />,
    "upload" : <Upload />,
    "share" : <Share />
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