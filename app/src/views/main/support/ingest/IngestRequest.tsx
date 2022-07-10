const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
import Button from '@mui/material/Button';
import {uniqueId} from "lodash";

export default function IngestRequest(props:any) {
    const ingest = () => {

        console.log('props insert request',props)


        const metadata = props.metadata;
        const files = props.files;
        const contentInsert = ipcRenderer.sendSync("@Content/insert",metadata);

        if(contentInsert.success){
            console.log('contentInsert',contentInsert);
            //    콘텐츠 성공
            const successCheck = [];
            files.map((file:any) => {
                console.log('media insert',file);
                const mediaInsert = ipcRenderer.sendSync("@Media/insert",{
                    content_id : contentInsert.data._id,
                    type : 'original',
                    path : file,
                    online : true
                });

                if(mediaInsert.success){
                    successCheck.push(true);
                }

            })

            if(successCheck.length === files.length) {
                //    성공!
            }
        }
    }
    ingest();
    // props.handleFinish(ingest);
    return (

    <div></div>
    )
}