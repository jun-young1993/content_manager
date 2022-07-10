import CustomAlert from "@views/components/CustomAlert";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
import Button from '@mui/material/Button';
import {uniqueId} from "lodash";
import * as React from "react";

export default function IngestRequest(props:any) {
    const baseAlert = ((<CustomAlert open={false} />));
    const [alert, setALert] = React.useState(baseAlert)
    const ingest = () => {

        console.log('props insert request',props)


        const metadata = props.metadata;
        const files = props.files;
        const contentInsert = ipcRenderer.sendSync("@Content/insert",metadata);

        if(contentInsert.success){
            console.log('contentInsert',contentInsert);
            //    콘텐츠 성공
            const medias = [];
            files.map((file:any) => {
                console.log('media insert',file);
                const insertData = {
                    content_id : contentInsert.data._id,
                    type : 'original',
                    path : file,
                    online : true
                };
                const mediaInsert = ipcRenderer.sendSync("@Media/insert",insertData);

                if(mediaInsert.success){
                    medias.push(insertData);
                }

            })

            if(medias.length === files.length) {
                //    성공!
            //    콘텐츠 창 리로드 해주기
            //    작업 흐름 만들기
            }
        }
    }
    ingest();
    // props.handleFinish(ingest);
    return (

    <div> </div>
    )
}