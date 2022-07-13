import CustomAlert from "@views/components/CustomAlert";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
import Button from '@mui/material/Button';
import {uniqueId} from "lodash";
import * as React from "react";

export default function IngestRequest(props:any) {
    const baseAlert = ((<CustomAlert open={false} />));
    const [insert, setInsert] = React.useState(false);
    const [task, setTask] = React.useState([]);
    const ingest = () => {
        if(insert === true){
            console.log('insert true');
            return;
        }
        console.log('props insert request',props)


        const metadata = props.metadata;
        const files = props.files;
        const contentInsert = ipcRenderer.sendSync("@Content/insert",metadata);

        if(contentInsert.success){
            console.log('contentInsert',contentInsert);
            //    콘텐츠 성공
            const medias:any = [];
            files.map((file:any) => {
                console.log('media insert',file);
                const insertData = {
                    content_id : contentInsert.data._id,
                    type : 'out',
                    path : file,
                    is_media : true
                };
                const mediaInsert = ipcRenderer.sendSync("@Media/insert",insertData);

                if(mediaInsert.success){
                    medias.push(mediaInsert.data);
                }

            })
            const taskList:any = [];
            if(medias.length === files.length) {
                //    성공!
            //    콘텐츠 창 리로드 해주기
            //    작업 흐름 만들기
                medias.map((media:any) => {
                    const insertTaskData = {
                        source_media_id : media._id,
                        source_storage : null,
                        target_storage : 'online',
                        target_media_id : null,
                        status : 'queue',
                        type : 'fs',
                        priority : 0
                    };
                    const insertTask = ipcRenderer.sendSync("@Task/insert",insertTaskData);
                    taskList.push(insertTask.data);
                })
                
            }

            if(taskList.length == medias.length){
                setInsert(true);
                setTask(taskList);

                ipcRenderer.sendSync("@WorkFlow/ingest");
            }
            
        }
    }
    ingest();
    // props.handleFinish(ingest);
    return (

    <div> 
        {task.map((data:any)=><div>{data.source_media}</div>)}
    </div>
    )
}