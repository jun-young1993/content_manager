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
    TextField, Box
} from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import electron from "electron";
import AlertDialog from "@views/components/AlertDialog";
import CustomAlert from "@views/components/CustomAlert";
const ipcRenderer = electron.ipcRenderer;


// const rows: GridRowsProp = [
//     { id: 1, col1: 'Hello', col2: 'World' },
//     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//     { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];

const getRows =()=> {

    const storages = ipcRenderer.sendSync("@Storage/all");
    if(storages.success){
        return storages.data.map((storage : any) => {

            storage.id = storage._id;
            return storage;
        });

    }

}

const columns: GridColDef[] = [
    { field: 'type', headerName: '스토리지 타입', width: 150 },
    { field: 'code', headerName: '스토리지 코드', width: 150 },
    { field: 'code_name', headerName: '스토리지명', width: 150 },
    { field: 'description', headerName: '설명', width: 150 },
    { field: 'use_yn', headerName: '사용여부', width: 150 },
];


const reducer = (prevState:any, newState:any) => ({
    ...prevState,
    ...newState
})
export default function Metadata() {
    const [rows,setRows] = React.useState(getRows);
    const [values, setValues] = React.useReducer(reducer,{
        type : '',
        code : '',
        name : '',
        description : ''
    });
    const [state, setState] = React.useReducer(reducer, {
        grid : {
            selected : undefined
        }
    });

    const [alert, setALert] = React.useState((<CustomAlert open={false} />))

    const reload = () => {
        setRows(getRows);
    }
    const updateInputValues = (evt : any) => {
        setValues({
            [evt.target.name]: evt.target.value
        })

    }
    return (
        <div style={{ height: 300, width: '100%' }}>
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
                                    <FormDialog
                                        buttonTitle="등록"
                                        values={values}
                                        fields={[
                                            {
                                                name : "type",
                                                label : "타입",
                                                variant:"standard"
                                            },
                                            {
                                                name : "code",
                                                label : "스토리지 코드",
                                                variant:"standard"
                                            },
                                            {
                                                name : "name",
                                                label : "스토리지 명",
                                                variant:"standard"
                                            },
                                            {
                                                name : "description",
                                                label : "설명",
                                                variant:"standard"
                                            }
                                        ]}
                                        onSaveClick={(result:any)=>{
                                            
                                            if(result){
                                                const valuse = result.valuse;
                                                if(valuse){
                                                    const exists = ipcRenderer.sendSync("@Storage/first",{code:valuse.code});
                                                    if(exists.success){
                                                        return setALert((<CustomAlert serverity="info" title="중복된 코드입니다. \r\n 다른 코드로 요청해주세요." />));
                                                    }

                                                    const result = ipcRenderer.sendSync("@Storage/insert",values);
                                                    if(result.success){
                                                        reload();
                                                        return setALert((<CustomAlert serverity="success" title="등록되었습니다." />));
                                                    }

                                                    setALert((<CustomAlert serverity="error" title="등록에 실패했습니다." />))
                                                }
                                            }

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
                                                const result = ipcRenderer.sendSync("@Storage/delete",{
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
                                    {alert}
                            </GridToolbarContainer>
                        );
                    }
                }}
            />
        </div>
    );
}
