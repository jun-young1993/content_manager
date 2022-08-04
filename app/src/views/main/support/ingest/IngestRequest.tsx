import CustomAlert from "@views/components/CustomAlert";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
import Button from '@mui/material/Button';
import {uniqueId} from "lodash";
import * as React from "react";
import FieldSet from "./fields/FieldSet";

export default function IngestRequest(props:any) {
    const baseAlert = ((<CustomAlert open={false} />));
    const [insert, setInsert] = React.useState(false);
    const [task, setTask] = React.useState([]);
    const ingest = () => {
        if(insert === true){
            return;
        }
        


        const metadata = props.metadata;
        const files = props.files;
        const contentInsert = ipcRenderer.sendSync("@Content/insert",metadata);
        console.log('metadata',metadata)
        console.log('contentInsert',contentInsert);
        
        
        if(contentInsert.success){
            if(contentInsert.data){
                    console.log('contentInsert',contentInsert.data)
                    const rootRules = ipcRenderer.sendSync("@WorkFlowRule/getFirstRules",contentInsert.data.workflow_id)
                    console.log('rootRules',rootRules);
                    console.log('contentInsert2',contentInsert);
                    //    콘텐츠 성공
                    const taskList:any = [];

                    files.map((file:any) => {
                        console.log('media insert',file);
                        // const insertData = {
                        //     content_id : contentInsert.data._id,
                        //     type : 'out',
                        //     path : file,
                        //     is_media : true
                        // };
                        // const mediaInsert = ipcRenderer.sendSync("@Media/insert",insertData);
                        if(rootRules.success){
                            rootRules.data.map((rule:any) => {
                                const insertTaskData = {
                                    content_id : contentInsert.data._id,
                                    workflow_id : rule.workflow_id,
                                    module_id : rule.module_id,
                                    rule_id : rule._id,
                                    source : file,
                                    target : null,
                                    status : 'queue',
                                    priority : 0
                                };
                                const insertTask = ipcRenderer.sendSync("@Task/insert",insertTaskData);
                                taskList.push(insertTask.data);
                                

                                console.log('insertCount',taskList.length);
                                console.log('files.length * rootRules',files.length * rootRules.data.length)
                                if((taskList.length) == (files.length * rootRules.data.length)){
                                    console.log('[start workflow]')

                                    setInsert(true);
                                    console.log('[start workflow] set Insert')
                                    setTask(taskList);
                                    console.log('[start workflow] set TaskList')
                                    ipcRenderer.sendSync("@WorkFlow/ingest");
                                    console.log('[start workflow] set Ingetst')
                                }

                            })
                        }

                        // if(mediaInsert.success){
                        //     medias.push(mediaInsert.data);
                        // }

                    })



                    // let tmp = 0;
                    // if(medias.length === files.length) {
                    //    성공!
                    //    콘텐츠 창 리로드 해주기
                    //    작업 흐름 만들기

                    // medias.map((media:any) => {

                    //     tmp =  tmp + 1;
                    // })

                    // }

                    // if(tmp == medias.length){



                    // }

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