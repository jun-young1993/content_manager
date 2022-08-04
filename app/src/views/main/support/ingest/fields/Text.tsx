import {TextField} from "@mui/material";
import {ChangeEvent} from "react";

export default function Text(props:any){
    const option = props.option;
    return(<TextField
                name={option.code}
                label={option.name}
                onChange={(evt:ChangeEvent)=>{
                    if(option.updateValue){
                        option.updateValue(evt,option);
                    }
                }}
                variant="standard"
            />
    );
}