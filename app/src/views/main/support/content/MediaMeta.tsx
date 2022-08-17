import * as React from 'react';
import Image from "@views/main/support/content/Image";
import {ipcRenderer , IpcRendererEvent} from "electron";
import {isEmpty, property} from 'lodash';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { borderBottom } from '@mui/system';

export interface MediaMetaProps {
    content_id? :string
}
function BaseField(props:{object:any,key:string}){
    return (
        <TextField
                id={props.key}
                label={props.key}
                defaultValue={props.object[props.key]}
                InputLabelProps={{
                shrink: true,
                }}
            />
    )
}


function Stream(props:{stream:any}){
    const stream = props.stream;
    const codecType = stream.codec_type;
    return (
        <>
        {
        Object.keys(stream).map((codecProperty:any) => {
            return      <TextField
            id={codecType+'-'+codecProperty}
            label={codecProperty}
            defaultValue={stream[codecProperty]}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
        })
        }
        </>
    )
    
}
function Streams(props:{streams:any}){
    const streams = props.streams;
    return streams.map((codec:any) => {
        if(codec.codec_type){
            return (
                <>
                
                <legend >{codec.codec_type}</legend>
                <>
                    <Box sx={{border : 1}} >
                        <Stream stream={codec}/>
                    </Box>
                </>
                </>
            )
        }
        
    })
}

function Video(props:any){
    const mediaInfo = props.mediaInfo;
    return (
        <>
            {Object.keys(mediaInfo).map((propertyKey:string) => {
                if(propertyKey == 'streams'){
                    const streams = mediaInfo[propertyKey];
                    return <Streams streams={streams}/>
                }
                
            })}
        </>
    );
}
export default function MediaMeta(props:MediaMetaProps) {
    const [mediaInfos, setMediaInfos] = React.useState([]);
   ipcRenderer.send("@MediaInfo/_index",props.content_id)
   ipcRenderer.on("@MediaInfo/_index/reply",(event:IpcRendererEvent,mediaInfos) => {
        setMediaInfos(mediaInfos.data);
        console.log('[mediaInfos.data]',mediaInfos.data)
        ipcRenderer.removeAllListeners("@MediaInfo/_index/reply");
   })
    return(
        <Box
        component="form"
        sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
        {mediaInfos.map((mediaInfo:any,index:number) => {
            
            // if(Array.isArray)
           
            return (      
                <Video mediaInfo={mediaInfo}/>
                // {Object.keys(mediaInfo).map((property:any) =>  (<TextField
                //         id={property[0]}
                //         label="Number"
                //         defaultValue={property[1]}
                //         InputLabelProps={{
                //         shrink: true,
                //         }}
                //     />)
                //   )}
            )
        })}
        </Box>
    )
}