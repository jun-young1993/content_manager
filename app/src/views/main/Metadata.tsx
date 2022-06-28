import * as React from 'react';
import { GridToolbarContainer, DataGrid, GridRowsProp, GridColDef,GridRowParams,GridCallbackDetails } from '@mui/x-data-grid';
import MetadataFormDialog from "@views/main/support/MetadataFormDialog";
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
    { field: 'code', headerName: '필드코드', width: 150 },
    { field: 'name', headerName: '코드명', width: 150 },
    { field: 'description', headerName: '설명', width: 150 },
    { field: 'use_yn', headerName: '사용여부', width: 150 },
];



export default function Metadata() {
    const [rows,setRows] = React.useState(getRows);
    const [selected,setSelected] = React.useState(null);
    const reload = () => {
        setRows(getRows);
    }
    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight={true}
                rowCount={10}
                editMode="row"
                loading={true}
                onRowClick={(params: GridRowParams, event: any, details: GridCallbackDetails)=>{
                        console.log('params',params)
                        console.log('event',event)
                        console.log('details',details)
                        setSelected(params.row);
                }}
                components={{
                    Toolbar: () => {
                        return (
                            <GridToolbarContainer>
                                <Stack spacing={2} direction="row">
                                    <MetadataFormDialog
                                        buttonTitle="등록"
                                        grid = {{
                                            reload : reload
                                        }}
                                    />
                                    <MetadataFormDialog
                                        buttonTitle="수정"
                                        grid = {{
                                            selected : selected,
                                            reload : reload
                                        }}
                                    />
                                    <MetadataFormDialog
                                        buttonTitle="삭제"
                                        grid = {{
                                            selected : selected,
                                            reload : reload
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
