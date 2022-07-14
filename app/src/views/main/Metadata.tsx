import * as React from 'react';
import { GridToolbarContainer, DataGrid, GridRowsProp, GridColDef,GridRowParams,GridCallbackDetails } from '@mui/x-data-grid';
import MetadataFormDialog from "@views/main/support/metadata/MetadataFormDialog";
import {
    Button,
    Stack,
    FormControlLabel,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    TextField, Box
} from '@mui/material';
import InputLabel from "@mui/material/InputLabel";

import AlertDialog from "@views/components/AlertDialog";
import electron from "electron";
const ipcRenderer = electron.ipcRenderer;


// const rows: GridRowsProp = [
//     { id: 1, col1: 'Hello', col2: 'World' },
//     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//     { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];

const getRows =()=> {

    const fields = ipcRenderer.sendSync("@Field/all");
    if(fields.success){
        return fields.data.map((field : any) => {

            field.id = field._id;
            return field;
        });

    }

}

const columns: GridColDef[] = [
    { field: 'type', headerName: '필드타입', width: 150 },
    { field: 'code', headerName: '필드코드', width: 150 },
    { field: 'name', headerName: '코드명', width: 150 },
    { field: 'description', headerName: '설명', width: 150 },
    { field: 'use_yn', headerName: '사용여부', width: 150 },
];


const reducer = (prevState:any, newState:any) => ({
    ...prevState,
    ...newState
})
export default function Metadata() {
    const [rows,setRows] = React.useState(getRows);

    const [state, setState] = React.useReducer(reducer, {
        grid : {
            selected : undefined
        }
    });

    const reload = () => {
        setRows(getRows);
    }
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                // autoHeight={true}
                // rowCount={10}
                editMode="row"
                onRowClick={(params: any, event: any, details: GridCallbackDetails)=>{
                        console.log('params',params)
                        console.log('event',event)
                        console.log('details',details)
                        setState({
                            grid : {
                                selected : params
                            }
                        })
                        // setSelected(params);
                }}
                components={{
                    Toolbar: () => {
                        return (
                            <GridToolbarContainer>
                                <Stack spacing={2} direction="row">
                                    <MetadataFormDialog
                                        buttonTitle="등록"
                                        type = "INSERT"
                                        grid = {{
                                            reload : reload
                                        }}
                                    />
                                    <MetadataFormDialog
                                        buttonTitle="수정"
                                        type = "PATCH"
                                        grid = {{
                                            selected : state.grid.selected,
                                            reload : reload
                                        }}
                                    />
                                    <AlertDialog
                                        button="삭제"
                                        onClick={(alertDialog:any)=>{
                                            if(state.grid.selected){
                                                const result = ipcRenderer.sendSync("@Field/delete",{
                                                    _id : state.grid.selected.row._id
                                                });
                                                if(result.success){
                                                    alertDialog.setALertOption({
                                                        severity : 'success',
                                                        onClose : () => {
                                                            reload();


                                                        },
                                                        title : "성공",
                                                        text : "성공적으로 삭제 되었습니다."
                                                    })
                                                }else{
                                                    alertDialog.setALertOption({
                                                        severity : 'error',
                                                        title : "알림",
                                                        text : "삭제처리 실패했습니다.",
                                                        disableBackDrop : true
                                                    })
                                                }
                                            }else{
                                                alertDialog.setALertOption({
                                                    severity : 'warning',
                                                    title : "알림",
                                                    text : "삭제할 항목을 선택해주세요.",
                                                    disableBackDrop : true
                                                })
                                            }
                                        }}
                                    />
                                    {/* <Button variant="text">수정</Button>
                                    <Button variant="text">삭제</Button> */}
                                </Stack>
                            </GridToolbarContainer>
                        );
                    }
                }}
            />
        </div>
    );
}
