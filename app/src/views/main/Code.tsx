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
import IconButton from '@mui/material/IconButton';
import CustomAlert from "@views/components/CustomAlert";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const ipcRenderer = electron.ipcRenderer;
import { cloneDeep } from 'lodash'
import FormTextField from '../components/FormTextField';

// const rows: GridRowsProp = [
//     { id: 1, col1: 'Hello', col2: 'World' },
//     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//     { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];

const getRows =()=> {
    const codes = ipcRenderer.sendSync("@Code/all");
    if(codes.success){
        return codes.data.map((code : any) => {

            code.id = code._id;
            code.root = true;
            code.collapse = false;
            return code;
        });

    }

}



const reducer = (prevState:any, newState:any) => ({
    ...prevState,
    ...newState
})
export default function Code() {
    const [rows,setRows] = React.useState(getRows);

    const openChildren = (params:any) => {
        rows.forEach((row:any,index:number)=>{
            if(row.id == params.id){
                let temp = cloneDeep(rows);
                let tempIndex = index+1;
                for(let i=0; i<row.children.length; i++){
                    const child = row.children[i];
                    temp[i].collapse = true;
                    console.log('row',row);
                    console.log('params',params);
                    if(row.collapse){

                    }else{
                        temp.splice(tempIndex,0,child);
                        tempIndex = tempIndex+1;
                    }
                    
                }
                setRows(temp);
                return false;
            }
           });
    }
    const columns: GridColDef[] = [
        { field: 'tasks', headerName: '', width : 50 , 
        renderCell : (params:any) => {
            if(params.row.root){
                let arrowIcon = <ArrowRightIcon />
                if(params.row.collapse){
                    arrowIcon = <ArrowDropDownIcon />
                };
                
                return (
                    <IconButton color="secondary" 
                               aria-label="add an alarm"
                               onClick= {(evt:any)=>{
                                   console.log(evt);
                                //    openChildren(params);
                                    if(params.row.collapse){
                                        params.row.collapse = false;
                                    }else{
                                        params.row.collapse = true;
                                    }

                                    let tmpCode = cloneDeep(rows);
                                    rows.forEach((row:any,index:number)=>{
                                        if(row.id == params.id){
                                            tmpCode[index] = params.row;
                                            let tmpIndex = index+1;
                                            const childCodes = ipcRenderer.sendSync("@CodeItem/indexByParentCode",params.row.code);
                                            if(childCodes.success){
                                                
                                                    for(let childIndex=0; childIndex<childCodes.data.length; childIndex++){
                                                        const child = childCodes.data[childIndex];
                                                        if(params.row.collapse){
                                                            tmpCode.splice(tmpIndex,0,Object.assign(child,{
                                                                id : child._id,
                                                                root : false
                                                            }));
                                                            tmpIndex = tmpIndex+1;
                                                        }else{
                                                            tmpCode.splice(tmpIndex,childCodes.data.length);
                                                        }
                                                        
                                                    }        
                                              
                                            
                                            }
                                            
                                            setRows(tmpCode);
                                        }
                                    })
                                    
                               }}
                   >
                       {arrowIcon}
                   </IconButton>
                   )
            }
            return (
                <></>
            )
        }},
        { field: 'code', headerName: '코드', width: 150 },
        { field: 'name', headerName: '코드명', width: 150 },
        { field: 'description', headerName: '설명', width: 150 },
        { field: 'use_yn', headerName: '사용여부', width: 150 },
    ];
    
    const [values, setValues] = React.useReducer(reducer,{
        type : '',
        code : '',
        name : '',
        description : ''
    });

    const [selected , setSelected] = React.useState({
        _id : null
    });



    const baseAlert = ((<CustomAlert open={false} />));
    const [alert, setALert] = React.useState(baseAlert)
    
    const [saveButtonTitle ,setSaveButtonTitle] = React.useState('등록(대표코드)');
    const [saveChildField, setSaveChildField] = React.useState<null | any>(null);
    

    const reload = () => {
        setRows(getRows);
    }
  
    // const [buttons , setButtons] = React.useState(baseCode);
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
                        if(params.row.root){
                        
                            setSaveButtonTitle("등록("+params.row.name+")");
                            setSaveChildField({
                                disabled : true,
                                name : "parent_code",
                                label : "대표코드",
                                variant:"standard"
                            });
                            setValues({
                                    parent_code : params.row.code,
                                    type : '',
                                    code : '',
                                    name : '',
                                    description : ''
                            })
                        }else{
                            setSaveButtonTitle("등록(대표코드)");
                            setSaveChildField(null);
                            setValues({
                                    type : '',
                                    code : '',
                                    name : '',
                                    description : ''
                            })
                        }
                     

                        // setButtons( (
                        //     <>
                        //         <FormDialog
                        //             buttonTitle={'등록('+name+')'}
                        //             values={{
                        //                 parent_code : params.row.code,
                        //                 code : '',
                        //                 name : '',
                        //                 description : ''
                        //             }}
                        //             variant="standard"
                        //             fields={[
                        //                 {
                        //                     name : "parent_code",
                        //                     label : "대표코드",
                        //                     variant:"standard"
                        //                 },
                        //                 {
                        //                     name : "code",
                        //                     label : "코드",
                        //                     variant:"standard"
                        //                 },
                        //                 {
                        //                     name : "name",
                        //                     label : "코드명",
                        //                     variant:"standard"
                        //                 },
                        //                 {
                        //                     name: "description",
                        //                     label: "설명",
                        //                     variant: "standard"
                        //                 }
                    
                        //             ]}
                        //             onSaveClick={(result:any)=>{
                        //                 console.log('result',result);
                        //                 let errorMsg:string = '';
                                        
                        //                 if(result){
                        //                     const values = result.values;
                        //                     if(values){
                        //                         const exists = ipcRenderer.sendSync("@CodeItem/findByParentCode",values.parent_code,values.code);
                        //                         if(exists.success){
                        //                             setALert((<CustomAlert serverity="info" title="중복된 코드입니다. \r\n 다른 코드로 요청해주세요." />));
                        //                             return false;
                        //                         }
                    
                        //                         const insert = ipcRenderer.sendSync("@CodeItem/insert",{
                        //                             parent_code : values.parent_code,
                        //                             code : values.code,
                        //                             name : values.name,
                        //                             description : values.description
                        //                         });
                        //                         if(insert.success){
                        //                             reload();
                        //                             setALert((<CustomAlert serverity="success" title="등록되었습니다." />));
                        //                             return  true;
                        //                         }
                    
                        //                         console.log('insert',insert);
                        //                     }
                        //                     setALert((<CustomAlert serverity="error" title="등록에 실패했습니다." />))
                        //                     return false;
                        //                 }
                    
                                        
                    
                        //             }}
                        //         />
                        //         <FormDialog
                        //             buttonTitle="수정"
                        //             values={Object.assign(para)}
                        //             fields={[
                        //                 {
                        //                     name : "parent_code",
                        //                     label : "대표코드",
                        //                     variant:"standard"
                        //                 },
                        //                 {
                        //                     name : "code",
                        //                     label : "코드",
                        //                     variant:"standard"
                        //                 },
                        //                 {
                        //                     name : "name",
                        //                     label : "코드명",
                        //                     variant:"standard"
                        //                 },
                        //                 {
                        //                     name : "description",
                        //                     label : "설명",
                        //                     variant:"standard"
                        //                 }
                        //             ]}
                        //     onSaveClick={(result:any)=>{
                        //         console.log('result',result);
                        //         let errorMsg:string = '';
                                
                        //         if(result){
                        //             const update = ipcRenderer.sendSync("@Code/update",result.values,{
                        //                 _id : result.oldValues._id
                        //             });
                        //             if(update.success){
                        //                 reload();
                        //                 setALert((<CustomAlert serverity="success" title="등록되었습니다." />));
                        //                 return  true;
                        //             }
                        //             setALert((<CustomAlert serverity="error" title="등록에 실패했습니다." />))
                        //             return false;
                        //         }
                    
                                
                        //             }}
                        //         />
                        //         <Button
                        //             variant="outlined"
                        //         onClick={(evt:any)=>{
                        //             const id:any = selected._id;
                        //             if(id){
                        //                 const result = ipcRenderer.sendSync("@Code/delete",{
                        //                     _id : id
                        //                 });
                        //                 if(result.success){
                        //                     reload();
                        //                     setALert((<CustomAlert serverity="success" title="삭제 되었습니다." />));
                        //                 }else{
                        //                     setALert((<CustomAlert serverity="error" title="삭제 실패 했습니다." />));
                        //                 }
                        //             }else{
                        //                 setALert((<CustomAlert serverity="error" title="선택된 항목이 없습니다." />));
                        //             }
                        //         }}
                        //         >
                        //             삭제
                        //         </Button>
                        //     </>
                        //     ))
                        // setValues(params.row);
                        // setSelected(params);
                }}
                components={{
                    Toolbar: () => {
                        return (
                            <GridToolbarContainer>
                                <Stack spacing={2} direction="row">
                                    {}
                                </Stack>
                                <FormDialog
                                        buttonTitle={saveButtonTitle}
                                        values={values}
                                        variant="standard"
                                        fields={[
                                            saveChildField,
                                            {
                                                name : "code",
                                                label : "코드",
                                                variant:"standard"
                                            },
                                            {
                                                name : "name",
                                                label : "코드명",
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
                                                    let exists = {
                                                        success : false
                                                    };
                                                    let table = '@Code';
                                                    if(saveChildField === null){
                                                        exists = ipcRenderer.sendSync("@Code/first",{code:values.code});
                                                    }else{
                                                        exists = ipcRenderer.sendSync("@CodeItem/findByParentCode",values.parent_code,values.code);
                                                        console.log('child exists',exists);
                                                        table = '@CodeItem';
                                                    }
                                                    
                                                    if(exists.success){
                                                        setALert((<CustomAlert serverity="info" title="중복된 코드입니다. \r\n 다른 코드로 요청해주세요." />));
                                                        return false;
                                                    }
                                            
                                                    
                                                                                                            
                                                    const insert = ipcRenderer.sendSync(table+"/insert",values);
                                                    
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
                                                name : "code",
                                                label : "코드",
                                                variant:"standard"
                                            },
                                            {
                                                name : "name",
                                                label : "코드명",
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
                                        let table = '@Code';
                                        if(saveChildField === null){
                                        }else{ 
                                            table = '@CodeItem';
                                        }
                                        const update = ipcRenderer.sendSync(table+"/update",result.values,{
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
                                        variant="outlined"
                                    onClick={(evt:any)=>{
                                        const id:any = selected._id;
                                        if(id){
                                            let table = '@Code';
                                            if(saveChildField === null){
                                            }else{ 
                                                table = '@CodeItem';
                                            }
                                            console.log('before deleted',{_id : id});
                                            const result = ipcRenderer.sendSync(table+"/delete",{
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
                                 {alert}
                            </GridToolbarContainer>
                    
                        );
                    }
                }}
            />
        </div>
    );
}
