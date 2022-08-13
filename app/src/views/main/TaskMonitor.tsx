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
import {useDispatch} from "react-redux";


// const rows: GridRowsProp = [
//     { id: 1, col1: 'Hello', col2: 'World' },
//     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//     { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];


// content_id: "J0LmOqi3OxgAg4Ba"
// createdAt: Sat Aug 13 2022 12:31:47 GMT+0900 (한국 표준시) {}
// id: "Ap3FtJJwzTrggTQK"
// module_id: "transcoder_proxy_online_to_proxy"
// priority: 0
// rule_id: "user_out_transcoder_proxy_online_to_proxy"
// source: "Gf0cVpni7t9JUZAJ.avi"
// source_media_id: "QeiK03hNGx0xwXnR"
// status: "complete"
// target: "Ap3FtJJwzTrggTQK.mp4"
// target_media_id: "sR9NHPSo4CjMwaLh"
// updatedAt: Sat Aug 13 2022 12:31:49 GMT+0900 (한국 표준시) {}
// workflow_id: "user_out_ingest"
// _id: "Ap3FtJJwzTrggTQK"



const reducer = (prevState:any, newState:any) => ({
    ...prevState,
    ...newState
})
export interface TaskMonitorSearchInterface {
    content_id ? :string
}
export interface TaskMonitorInterface {
    search? : TaskMonitorSearchInterface
}
export default function TaskMonitor(props:TaskMonitorInterface) {

    let search:TaskMonitorSearchInterface = {}
    let fullInfo:boolean = true;
    if (props.search) {
        fullInfo = false;
        search = props.search;
    }
    const columns: GridColDef[] = [
        { field: 'status', headerName: '상태', width: 150 },
        { field: 'workflow_nm', headerName: '워크플로우명', width: 250 },
        { field: 'module_nm', headerName: '모듈명', width: 250 },
        { field: 'source', headerName: '소스파일', width: 200 },
        { field: 'target', headerName: '타겟파일', width: 200 },
    ];


    const [rows, setRows] = React.useState([]);
    ipcRenderer.send("@Task/_index",search);
    ipcRenderer.on("@Task/_index/reply",(err,rows) => {
        console.log('rows',rows);
        setRows(rows.data);
        ipcRenderer.removeAllListeners("@Task/_index/reply");
    })


    if(fullInfo){
        columns.push({field : 'content_id' , headerName : '콘텐츠 아이디', width:200})
    }


    return (
        <div style={{ height: '75vh', width: '100%' }}>
            <DataGrid
                style={{height:'75vh'}}
                rows={rows.map((task:{_id : string, id? : string}) => {
                    task.id = task._id;
                    return task;
                })}
                columns={columns}
                hideFooter={!fullInfo}
                editMode="row"

            />

        </div>
    );
}
