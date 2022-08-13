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
import AlertDialog from "@views/components/AlertDialog";
import CustomAlert from "@views/components/CustomAlert";
import electron, {IpcRendererEvent} from "electron";
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
    { field: 'name', headerName: '스토리지 명', width: 150 },
    { field: 'path', headerName: '스토리지 경로', width: 150 },
    { field: 'description', headerName: '설명', width: 150 },
    { field: 'use_yn', headerName: '사용여부', width: 150 },
];


const reducer = (prevState:any, newState:any) => ({
    ...prevState,
    ...newState
})
export default function Storage() {
    const [rows,setRows] = React.useState([]);
    ipcRenderer.send("@Storage/_all");
    ipcRenderer.on("@Storage/_all/reply",(event:IpcRendererEvent, codeResult) => {

        setRows(codeResult.data);
        ipcRenderer.removeAllListeners("@Storage/_all/reply");
    })
    const [values, setValues] = React.useReducer(reducer,{
        type : '',
        code : '',
        name : '',
        description : ''
    });

    const [selected , setSelected] = React.useState({
        _id : null
    });


    const [state, setState] = React.useReducer(reducer, {
        grid : {
            selected : undefined
        }
    });
    const baseAlert = ((<CustomAlert open={false} />));
    const [alert, setALert] = React.useState(baseAlert)
    

    const reload = () => {
        ipcRenderer.send("@Storage/_all");
        ipcRenderer.on("@Storage/_all/reply",(event:IpcRendererEvent, codeResult) => {

            setRows(codeResult.data);
            ipcRenderer.removeAllListeners("@Storage/_all/reply");
        })
    }
    
    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid
                rows={rows.map((storage : any) => {

                    storage.id = storage._id;
                    return storage;
                })}
                columns={columns}
                // autoHeight={true}
                // rowCount={10}
                editMode="row"
                onRowClick={(params: any, event: any, details: GridCallbackDetails)=>{
                        console.log('params',params)
                        console.log('event',event)
                        console.log('details',details)
                        // setState({
                        //     grid : {
                        //         selected : params
                        //     }
                        // })
                        setALert(baseAlert);
                        setSelected(params.row);
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
                                        variant="standard"
                                        fields={[
                                            {
                                                select : true,
                                                name : "type",
                                                fullWidth : true,
                                                label : "타입",
                                                variant:"standard",
                                                children : (
                                                    [
                                                        (<MenuItem
                                                        key="local" value="local"
                                                    >
                                                        local
                                                    </MenuItem>),
                                                        (<MenuItem
                                                        key="ftp" value="ftp"
                                                    >
                                                        ftp
                                                    </MenuItem>),
                                                        (<MenuItem
                                                        key="sftp" value="sftp"
                                                    >
                                                        sftp
                                                    </MenuItem>),
                                                        (<MenuItem
                                                        key="nas" value="nas"
                                                    >
                                                        nas
                                                    </MenuItem>),
                                                        (<MenuItem
                                                        key="san" value="san"
                                                    >
                                                        san
                                                    </MenuItem>),
                                                        (<MenuItem
                                                        key="aws" value="aws"
                                                    >
                                                        aws
                                                    </MenuItem>)
                                                ])
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
                                                name: "path",
                                                label : "경로",
                                                variant:"standard"
                                            },
                                            {
                                                name: "description",
                                                label: "설명",
                                                variant: "standard"
                                            }

                                        ]}
                                        onSaveClick={(result:any)=>{
                                            console.log('result',result);
                                            let errorMsg:string = '';
                                            if(result){
                                                const values = result.values;
                                                if(values){
                                                    const exists = ipcRenderer.sendSync("@Storage/first",{code:values.code});
                                                    if(exists.success){
                                                        setALert((<CustomAlert serverity="info" title="중복된 코드입니다. \r\n 다른 코드로 요청해주세요." />));
                                                        return false;
                                                    }

                                                    // const insert =
                                                    ipcRenderer.send("@Storage/_insert",values);
                                                    ipcRenderer.on("@Storage/_insert/reply",(event:IpcRendererEvent,insert)=>{
                                                        if(insert.success){
                                                            reload();
                                                            setALert((<CustomAlert serverity="success" title="등록되었습니다." />));
                                                            return  true;
                                                        }else{
                                                            setALert((<CustomAlert serverity="error" title="등록에 실패했습니다." />))
                                                            return false;
                                                        }

                                                        console.log('insert',insert);
                                                    })

                                                }

                                            }

                                            
                            
                                        }}
                                    />
                                    <FormDialog
                                        buttonTitle="수정"
                                        values={selected}
                                        fields={[
                                            {
                                                type : "combo",
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
                                                name: "path",
                                                label : "경로",
                                                variant:"standard"
                                            },
                                            {
                                                name : "description",
                                                label : "설명",
                                                variant:"standard"
                                            }
                                        ]}
                                        onSaveClick={(result:any)=>{
                                            console.log('result',result);
                                            let errorMsg:string = '';
                                            
                                            if(result){
                                                // const update =
                                                    ipcRenderer.send("@Storage/_update",result.values,{
                                                        _id : result.oldValues._id
                                                    });
                                                    ipcRenderer.on("@Storage/_update/reply",(event:IpcRendererEvent,update) => {
                                                        if(update.success){
                                                            reload();
                                                            setALert((<CustomAlert serverity="success" title="등록되었습니다." />));
                                                            return  true;
                                                        }
                                                        setALert((<CustomAlert serverity="error" title="등록에 실패했습니다." />))
                                                        return false;
                                                    })


                                            }

                                            
                                        }}
                                    />
                                    <Button
                                       onClick={(evt:any)=>{
                                           const id:any = selected._id;
                                           if(id){
                                               // const result =
                                               ipcRenderer.send("@Storage/_delete",{
                                                   _id : id
                                               });
                                               ipcRenderer.on("@Storage/_delete/reply",(event:IpcRendererEvent,result) => {
                                                   if(result.success){
                                                       reload();
                                                       setALert((<CustomAlert serverity="success" title="삭제 되었습니다." />));
                                                   }else{
                                                       setALert((<CustomAlert serverity="error" title="삭제 실패 했습니다." />));
                                                   }
                                               })

                                           }else{
                                               setALert((<CustomAlert serverity="error" title="선택된 항목이 없습니다." />));
                                           }
                                       }}
                                    >
                                        삭제
                                    </Button>
                           
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
