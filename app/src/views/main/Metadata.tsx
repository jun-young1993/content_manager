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
import TabPanel from "@views/components/TabPanel";
import { sender, showAlert } from '@views/helper/helper';
import BaseGrid from "@views/components/grid/BaseGrid";
import Switch from '@mui/material/Switch';
import { CheckRounded } from '@mui/icons-material';
// const rows: GridRowsProp = [
//     { id: 1, col1: 'Hello', col2: 'World' },
//     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//     { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];

// const getRows =()=> {

//     const fields = ipcRenderer.sendSync("@Field/all");
//     console.log('fields',fields);
//     if(fields.success){
//         return fields.data.map((field : any) => {

//             field.id = field._id;
//             return field;
//         });

//     }

// }

const isSwitch = (row:any,field:string) => {
    console.log('row',row);
    const id:string = row.id;
    // return (<></>)
    const [checked , setChecked] = React.useState(row.value);
    return (<Switch
        checked={checked}
        onChange={(event)=>{
            console.log(event);
            sender("@Field/_update",{[field]:!checked},{_id : id})
            .then((result) => {
                console.log(result);
                setChecked(!checked);
            })
            
            
        }}
    />)
};

const columns: GridColDef[] = [
    { field: 'type', headerName: '필드타입', width: 150 },
    { field: 'code', headerName: '필드코드', width: 150 },
    { field: 'name', headerName: '코드명', width: 150 },
    { field: 'is_use', headerName: '사용여부',renderCell : (row:any) => isSwitch(row,'is_use')},
    { field: 'is_search', headerName: '검색여부',renderCell : (row:any) => isSwitch(row,'is_search')},
    { field: 'description', headerName: '설명', width: 150 },
];


const reducer = (prevState:any, newState:any) => ({
    ...prevState,
    ...newState
})
export function MetadataGrid(props:{content_type : string}) {
    const [rows,setRows] = React.useState<any>([]);
    const [values, setValues] = React.useState({
        type : 'text',
        code : '',
        name : '',
        description : ''
    })
    React.useEffect(() => {
        sender("@Field/_all",{content_type : props.content_type})
        .then((result:any) => {
            setRows(result.data);
        })
    },[])

    const baseAlert = ((<CustomAlert open={false} />));
   
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

  
    return (
        <BaseGrid 
            toolbar={[  <FormDialog
                buttonTitle="등록"
                values={values}
                variant="standard"
                changeFields={[]}
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
                    // if(result){
                        const values = {...result.values,...{content_type : props.content_type}};
                        console.log('values',values);
                        sender("@Field/_insert",values)
                        .then((result:any) => {
                            console.log("result",result);
                            if(result.success){
                                showAlert({
                                    title : `[${result.data.code}] 메타데이터 필드가 추가되었습니다.`,
                                    severity : "success",
                                },() => {
                                    sender("@Field/_all",{content_type : props.content_type})
                                    .then((result:any) => {
                                        setRows(result.data);
                                    })
                                })      
                            }else{
                                showAlert({
                                    title : `${result.msg}`,
                                    severity : "warning",
                                })      
                            }
                        })
                    //     if(values){
                    //         const exists = ipcRenderer.sendSync("@Field/first",{code:values.code});
                    //         if(exists.success){
                    //             setALert((<CustomAlert serverity="info" title="중복된 필드코드입니다. \r\n 다른 필드코드로 요청해주세요." />));
                    //             return false;
                    //         }

                    //         const insert = ipcRenderer.sendSync("@Field/insert",values);
                    //         if(insert.success){
                    //             reload();
                    //             setALert((<CustomAlert serverity="success" title="등록되었습니다." />));
                    //             return  true;
                    //         }

                    //         console.log('insert',insert);
                    //     }
                    //     setALert((<CustomAlert serverity="error" title="등록에 실패했습니다." />))
                    //     return false;
                    // }

                    
    
                }}
            />]}
            dataGridProps={{
                columns:columns,
                rows:rows,
                hideFooter:true
            }}
        />
    )
}


export default function Metadata(){
    const contentTypeCode : "content_type" = "content_type";
    const [items , setItems] = React.useState([]);
    React.useEffect(()=>{
        sender("@CodeItem/_indexByParentCode",contentTypeCode)
        .then((codes:any) => {
            let grids:any = [];
            codes.data.map((code:{code : string , name : string},index:number) => {
                grids.push({
                    label : code.name,
                    children : <MetadataGrid content_type={code.code} />
                })
                if(codes.data.length -1 === index){
                    setItems(grids);
                }
            })
        })
    },[])
    
    // [{
    //     "label" : "비디오",
    //     "children" : (<MetadataGrid />)
    // }]
    return (
        <TabPanel 
            items={items}
        />
    )
}
