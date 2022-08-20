import React from "react";
import electron,{IpcRendererEvent} from "electron";
const ipcRenderer = electron.ipcRenderer;
export interface MediaMetaProps{
    content_id : string
}
const getMediaInfos = (contentId:string) => {
    ipcRenderer.send("@MediaInfo/_index",contentId);
}
export default function MediaMeta(props:MediaMetaProps) {
    // getMediaInfos(props.content_id)
    const [rows, setRows] = React.useState([]);
    console.log('mediaInfo');
    // ipcRenderer.send("@MediaInfo/_index",props.content_id);
    // ipcRenderer.on("@MediaInfo/_index/reply",(event:IpcRendererEvent,mediaInfos)=>{
    //     setRows(mediaInfos.data);
    //     ipcRenderer.removeAllListeners("@MediaInfo/_index/reply");
    // })

    return (
        <div>
            {rows.map((row)=>{
                console.log('mediaInfo',row);
            })}
        </div>
    )
}