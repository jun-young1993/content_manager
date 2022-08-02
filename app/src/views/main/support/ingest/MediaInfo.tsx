import * as React from 'react';
import { GridToolbarContainer, DataGrid, GridRowsProp, GridColDef,GridRowParams,GridCallbackDetails } from '@mui/x-data-grid';
import MetadataFormDialog from "@views/main/support/metadata/MetadataFormDialog";
import FormDialog from "@views/components/FormDialog";
import {
    Button,
    Stack,
    FormControlLabel,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    TextField, 
    Box,
    Tooltip ,
    IconButton
} from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import AlertDialog from "@views/components/AlertDialog";
import CustomAlert from "@views/components/CustomAlert";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import electron from "electron";
const ipcRenderer = electron.ipcRenderer;
import {isEmpty} from 'lodash';


// const rows: GridRowsProp = [
//     { id: 1, col1: 'Hello', col2: 'World' },
//     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//     { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];

const getRows =(contentId:any,mediaMap:any,storageMap:any)=> {
    console.log('media info content-id',contentId);
    const medias = ipcRenderer.sendSync("@Media/index",{content_id : contentId});
    console.log('medias',medias);
    if(medias.success){
        return medias.data.map((media : any) => {
            media.storage_name = storageMap[media.storage];
            media.type_name = mediaMap[media.type];
            media.id = media._id;
            return media;
        });

    }

}

const columns: GridColDef[] = [
    { field: 'type_name', headerName: '미디어 타입', width: 150 },
    { field: 'storage_name', headerName: '스토리지', width: 150 },
    { field: 'path', headerName: '경로', width: 300 },
    { field: 'is_media', headerName: '사용가능', width: 70 },
];


const reducer = (prevState:any, newState:any) => ({
    ...prevState,
    ...newState
})
export default function MediaInfo(props : any) {
    
    const metadata = props.metadata;
    
    const storageMap:any = [];
    const mediaCodeMap:any = [];
    const storage = ipcRenderer.sendSync("@Storage/all");
    storage.data.map((storage:any) => {
        storageMap[storage.code] = storage.name
    })
    const mediaCodes = ipcRenderer.sendSync("@CodeItem/indexByParentCode","MEDIA_TYPE");
    mediaCodes.data.map((media:any) => {
        mediaCodeMap[media.code] = media.name;
    })

    
    const [rows,setRows] = React.useState(getRows(metadata._id,mediaCodeMap,storageMap));
    const [selectedId, setSelectedId] = React.useState(null);

    const baseAlert = ((<CustomAlert open={false} />));
    const [alert, setALert] = React.useState(baseAlert)
    
    
    
    const handleDownloadButton = (event:any) => {
        if(isEmpty(selectedId)){
            setALert((<CustomAlert serverity="warning" title="미디어 항목을 선택후 다운로드 요청해주세요." />));
            return;    
        }
        ipcRenderer.send('download-request',selectedId)
        ipcRenderer.on('download-request-reply',(event, result) => {
            console.log('download-request-reply result',result)
            setALert((<CustomAlert serverity="success" title="다운로드작업이 요청되었습니다." />));
        })
        
    }
    
    
    return (
        <div style={{ height: '70vh', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                hideFooter={true}
                editMode="row"
                onRowClick={(params: any, event: any, details: GridCallbackDetails)=>{
                     console.log('params',params)
                     console.log('details',details);
                     setSelectedId(params.id);
                     setALert(baseAlert);
                }}
                components={{
                    Toolbar : () => {
                        return (
                            <GridToolbarContainer>
                                <Stack  direction="row">
                                    <Tooltip title="미디어 다운로드">
                                        <IconButton onClick={handleDownloadButton}>
                                            <FileDownloadIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                                {alert}
                            </GridToolbarContainer>
                        );
                    }
                }}
          
            />
            
        </div>
    );
}
