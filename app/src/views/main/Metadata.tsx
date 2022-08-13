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

    const fields = ipcRenderer.sendSync("@Field/all");
    console.log('fields',fields);
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
    const [values, setValues] = React.useReducer(reducer,{
        type : 'text',
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
    
    const [codeField, setCodeField] = React.useState({
        name : "code",
        label : "필드코드",
        variant:"standard"
    })
    const [nameField , setNameField] = React.useState<any>({
        name: "name",
        label : "필드명",
        variant:"standard"
    })
    const [changeFields, setChangeFields] = React.useState<any>([]);
    const handleTypeChange =(event: React.ChangeEvent<HTMLInputElement>,info:any) => {



        if(event.target.name === 'type'){
            if(event.target.value === 'code'){
                const codeResult = ipcRenderer.sendSync("@Code/indexByUsing");
                let codes = [];
                if(codeResult.success){
                    if(codeResult.data){
                        codes = codeResult.data;
                        console.log('codes',codes)
                    }
                }
                const codeCombo = {
                    select : true,
                    fullWidth : true,
                    name : "code",
                    label : "필드코드",
                    variant:"standard",
                    children : (codes.map((code:any)=>{return (<MenuItem key={code.code} value={code.code}>{code.name}</MenuItem>)})),
                    onChangeValue:handleTypeChange
                }
                info.setChangeFields([codeCombo,{
                    name: "name",
                    label : "필드명",
                    variant:"standard",
                    disabled : true
                }]);



            }else{
                info.setChangeFields([{
                    name : "code",
                    label : "필드코드",
                    variant:"standard"
                },{
                    name: "name",
                    label : "필드명",
                    variant:"standard"
                }]);

            }
        };

        if(event.target.name === 'code'){
            console.log('event.target',event.target)
            const selectedCodeValue = event.target.value;

            const codeInfo = ipcRenderer.sendSync("@Code/first",{code : selectedCodeValue});

            if(codeInfo){
                console.log('codeInfo',codeInfo)
                if(codeInfo.data){
                    console.log('codeInfo',codeInfo)
                    const codeName = codeInfo.data.name;
                    info.setChangeFields([{
                        name: "name",
                        label : "필드명",
                        variant:"standard",
                        defaultValue : codeName
                    }]);

                }
            }
            console.log('codeValue',info.refs.code.current);
        }
    }

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
                            <GridToolbarContainer >
                                <Stack spacing={2} direction="row">
                                    <FormDialog
                                        buttonTitle="등록"
                                        values={values}
                                        variant="standard"
                                        changeFields={changeFields}
                                        fields={[
                                            {
                                                select : true,
                                                fullWidth : true,
                                                name : "type",
                                                label : "필드타입",
                                                variant:"standard",
                                                onChangeValue:handleTypeChange,
                                                children : (
                                                    [
                                                        (<MenuItem
                                                        key="text" value="text"
                                                    >
                                                        텍스트필드
                                                    </MenuItem>),
                                                        (<MenuItem
                                                        key="code" value="code"
                                                    >
                                                        코드콤보
                                                    </MenuItem>)
                                                ])
                                            },
                                            {
                                                name : "code",
                                                label : "필드코드",
                                                variant:"standard"
                                            },
                                            {
                                                name : "name",
                                                label : "필드명",
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
                                                    const exists = ipcRenderer.sendSync("@Field/first",{code:values.code});
                                                    if(exists.success){
                                                        setALert((<CustomAlert serverity="info" title="중복된 필드코드입니다. \r\n 다른 필드코드로 요청해주세요." />));
                                                        return false;
                                                    }

                                                    const insert = ipcRenderer.sendSync("@Field/insert",values);
                                                    if(insert.success){
                                                        reload();
                                                        setALert((<CustomAlert serverity="success" title="등록되었습니다." />));
                                                        return  true;
                                                    }

                                                    console.log('insert',insert);
                                                }
                                                setALert((<CustomAlert serverity="error" title="등록에 실패했습니다." />))
                                                return false;
                                            }

                                            
                            
                                        }}
                                    />
                                    <FormDialog
                                        buttonTitle="수정"
                                        values={selected}
                                        fields={[
                                            {
                                                select : true,
                                                name : "type",
                                                label : "필드타입",
                                                onChange : handleTypeChange,
                                                variant:"standard",
                                                children : (
                                                    [
                                                        (<MenuItem
                                                        key="text" value="text"
                                                    >
                                                        텍스트필드
                                                    </MenuItem>),
                                                        (<MenuItem
                                                        key="code" value="code"
                                                    >
                                                        코드콤보
                                                    </MenuItem>)
                                                ])
                                            },
                                            {
                                                name : "code",
                                                label : "필드코드",
                                                variant:"standard"
                                            },
                                            {
                                                name : "name",
                                                label : "필드명",
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
                                                const update = ipcRenderer.sendSync("@Field/update",result.values,{
                                                    _id : result.oldValues._id
                                                });
                                                if(update.success){
                                                    reload();
                                                    setALert((<CustomAlert serverity="success" title="등록되었습니다." />));
                                                    return  true;
                                                }
                                                setALert((<CustomAlert serverity="error" title="등록에 실패했습니다." />))
                                                return false;
                                            }

                                            
                                        }}
                                    />
                                    <Button
                                       onClick={(evt:any)=>{
                                           const id:any = selected._id;
                                           if(id){
                                               const result = ipcRenderer.sendSync("@Field/delete",{
                                                   _id : id
                                               });
                                               if(result.success){
                                                   reload();
                                                   setALert((<CustomAlert serverity="success" title="삭제 되었습니다." />));
                                               }else{
                                                   setALert((<CustomAlert serverity="error" title="삭제 실패 했습니다." />));
                                               }
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
