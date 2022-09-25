import * as React from 'react';
import {
    DataGrid,
    GridCallbackDetails,
    GridColDef,
    GridRowId,
    GridRowParams,
    GridToolbarContainer
} from '@mui/x-data-grid';
import FormDialog from "@views/components/FormDialog";
import {Box, Button,} from '@mui/material';

import electron, {IpcRendererEvent} from "electron";
import CustomAlert from "@views/components/CustomAlert";
import {isEmpty} from 'lodash'
import Grid from "@mui/material/Grid";
import {GridPanel} from "@views/components/grid/BaseGrid";
import {sender} from "@views/helper/helper";

const ipcRenderer = electron.ipcRenderer;


const reducer = (prevState:any, newState:any) => ({
    ...prevState,
    ...newState
})


export function Code_backup() {
    const [rows,setRows] = React.useState<any>([]);
    const [childrenRows,setChildrenRows] = React.useState<any>([]);




        ipcRenderer.send("@Code/_all");
        ipcRenderer.on("@Code/_all/reply",(event:IpcRendererEvent, codeResult) => {

                setRows(codeResult.data);
                ipcRenderer.removeAllListeners("@Code/_all/reply");
        })





    const columns: GridColDef[] = [
        // { field: 'tasks', headerName: '', width : 50 ,
        // renderCell : (params:any) => {
        //     if(params.row.root){
        //         let arrowIcon = <ArrowRightIcon />
        //         if(params.row.collapse){
        //             arrowIcon = <ArrowDropDownIcon />
        //         };
        //
        //         return (
        //             <IconButton color="secondary"
        //                        aria-label="add an alarm"
        //                        onClick= {(evt:any)=>{
        //                            console.log(evt);
        //                         //    openChildren(params);
        //                            let collapse = false;
        //                             if(params.row.collapse){
        //                                 console.log('collapse true 로 바꾸기')
        //                                 params.row.collapse = false;
        //                             }else{
        //                                 console.log('collapse true 로 바꾸기')
        //                                 collapse = true;
        //                                 params.row.collapse = true;
        //                             }
        //                            console.log('params collapse',params.row.collapse);
        //                             let tmpCode = cloneDeep(rows);
        //                             console.log('rows',rows);
        //                             rows.forEach((row:any,index:number)=>{
        //                                 if(row.id == params.id){
        //                                     console.log('params collapse_forEach',params.row.collapse);
        //                                     tmpCode[index] = params.row;
        //                                     tmpCode[index].collapse = collapse
        //                                     console.log('forEach first tmpCode',tmpCode[index]);
        //                                     let tmpIndex = index+1;
        //                                     console.log('request params row code',params.row.code);
        //                                     ipcRenderer.send("@CodeItem/_indexByParentCode",params.row.code);
        //
        //                                     ipcRenderer.on("@CodeItem/_indexByParentCode/reply",(event:IpcRendererEvent,childCodes) =>{
        //
        //                                         if(childCodes.success){
        //                                             console.log('childern codes success',childCodes.data)
        //
        //                                             for(let childIndex=0; childIndex<childCodes.data.length; childIndex++){
        //                                                 const child = childCodes.data[childIndex];
        //
        //                                                 console.log('for params',params.row.collapse);
        //                                                 if(params.row.collapse){
        //                                                     console.log('childCodes',childCodes);
        //                                                     console.log('child',child)
        //                                                     tmpCode.splice(tmpIndex,0,Object.assign(child,{
        //                                                         id : child._id,
        //                                                         root : false
        //                                                     }));
        //                                                     tmpIndex = tmpIndex+1;
        //                                                     console.log('added tmpCode',tmpCode);
        //                                                 }else{
        //                                                     tmpCode.splice(tmpIndex,childCodes.data.length);
        //                                                 }
        //
        //                                             }
        //                                             console.log('tmpCode',tmpCode)
        //
        //                                             setRows(tmpCode);
        //                                             ipcRenderer.removeAllListeners("@CodeItem/_indexByParentCode/reply");
        //                                         }
        //
        //                                     })
        //                                     // const childCodes =
        //
        //                                 }
        //                             })
        //
        //                        }}
        //            >
        //                {arrowIcon}
        //            </IconButton>
        //            )
        //     }
        //     return (
        //         <></>
        //     )
        // }},
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
        _id : null,
        code : null
    });



    const baseAlert = ((<CustomAlert open={false} />));
    const [alert, setALert] = React.useState(baseAlert)
    
    const [saveButtonTitle ,setSaveButtonTitle] = React.useState('등록');
    const [saveChildField, setSaveChildField] = React.useState<null | any>(null);
    

    const reload = () => {
        setRows(rows.map((code : any) => {

            code.id = code._id;
            code.root = true;
            code.collapse = false;
            return code;
        }));
    }

    const childrenReload = () => {
        setChildrenRows(childrenRows.map((code : any) => {

            code.id = code._id;
            code.root = true;
            code.collapse = false;
            return code;
        }));
    }
    const loadChildren = (parentCode:string) => {
        ipcRenderer.send("@CodeItem/_indexByParentCode",parentCode)
        ipcRenderer.on("@CodeItem/_indexByParentCode/reply",(event:IpcRendererEvent,children) => {
            console.log("children",children);
            setChildrenRows(children.data);
        })
    }

    // const [buttons , se¡uttons] = React.useState(baseCode);
    return (
        <Grid container spacing={2} >
            <Grid item xs={6}  >
                <Box sx={{border:1, }}>
                    <DataGrid
                        sx={{height:"70vh"}}
                        rows={rows.map((code : any) => {

                            code.id = code._id;
                            code.root = true;
                            code.collapse = false;
                            return code;
                        })}
                        columns={columns}
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
                                setSaveButtonTitle(`등록(${params.row.code})`);
                                loadChildren(params.row.code);

                        }}
                        components={{
                            Toolbar: () => {
                                return (
                                    <GridToolbarContainer>

                                        <FormDialog
                                                buttonTitle="등록"
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


                                                    if(result){
                                                        const values = result.values;
                                                        if(values){



                                                            let exists:{success:boolean} = ipcRenderer.sendSync("@Code/first",{code:values.code});



                                                            if(exists.success){
                                                                setALert((<CustomAlert serverity="info" title="중복된 코드입니다. \r\n 다른 코드로 요청해주세요." />));
                                                                return false;
                                                            }



                                                            ipcRenderer.send("@Code/_insert",values);
                                                            ipcRenderer.on(`/@Code/_insert/reply`,(event:IpcRendererEvent,result)=>{
                                                                console.log(' reply result',result);
                                                                if(result.success){
                                                                    reload();
                                                                    setALert((<CustomAlert serverity="success" title="등록되었습니다." />));
                                                                    console.log('insert',result);
                                                                    return  true;
                                                                }
                                                            })




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

                                                 ipcRenderer.send("@Code/_update",result.values,{
                                                    _id : result.oldValues._id
                                                    });
                                                ipcRenderer.on(`@Code/_update/reply`,(event:IpcRendererEvent,result:any) => {
                                                    if(result.success){
                                                        reload();
                                                        setALert((<CustomAlert serverity="success" title="등록되었습니다." />));
                                                        return  true;
                                                    }else{
                                                        setALert((<CustomAlert serverity="error" title="등록에 실패했습니다." />))
                                                        return false;
                                                    }
                                                })


                                            }


                                                }}
                                            />
                                            <Button
                                                variant="outlined"
                                            onClick={(evt:any)=>{
                                                const id:any = selected._id;
                                                if(id){

                                                    console.log('before deleted',{_id : id});
                                                    ipcRenderer.send("@Code/_delete",{
                                                        _id : id
                                                    });

                                                    ipcRenderer.on(`@Code/_delete/reply`,(event:IpcRendererEvent,result) => {
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
                                    </GridToolbarContainer>

                                );
                            }
                        }}
                    />
                </Box>
            </Grid>
            <Grid item xs={6}  >
                <Box sx={{border:1, height:'70vh'}}>
                    <DataGrid
                        sx={{height:"70vh"}}
                        rows={childrenRows.map((code : any) => {
                            console.log('children rows',childrenRows);
                            code.id = code._id;
                            code.root = true;
                            code.collapse = false;
                            return code;
                        })}
                        columns={columns}
                        editMode="row"
                        components={{
                            Toolbar: () => {
                                return (
                                    <GridToolbarContainer>

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
                                                    console.log('result',result);

                                                    if(values){
                                                        const parentCode:any = selected.code;
                                                            ipcRenderer.send("@CodeItem/_findByParentCode",parentCode,values.code);
                                                            ipcRenderer.on("@CodeItem/_findByParentCode/reply",(event,findParentCode) => {
                                                                    if(isEmpty(findParentCode.data)){
                                                                        ipcRenderer.send("@CodeItem/_insert",{...values,...{
                                                                                parent_code : selected.code
                                                                            }});
                                                                        ipcRenderer.on(`@CodeItem/_insert/reply`,(event:IpcRendererEvent,result)=>{
                                                                            console.log(' reply result',result);
                                                                            if(result.success){

                                                                                ipcRenderer.send("#ShowMessageAlert",{
                                                                                    title : "코드아이템이 추가되었습니다.",
                                                                                    severity : "info"
                                                                                })
                                                                                loadChildren(parentCode);
                                                                                console.log('insert',result);

                                                                                return  true;
                                                                            }
                                                                        })

                                                                    }else{
                                                                        ipcRenderer.send("#ShowMessageAlert",{
                                                                            title : "중복된 코드입니다. 다른코드로 요청해주세요.",
                                                                            severity : "warning"
                                                                        })
                                                                    }
                                                            })




                                                //
                                                //         if(exists.success){
                                                //             setALert((<CustomAlert serverity="info" title="중복된 코드입니다. \r\n 다른 코드로 요청해주세요." />));
                                                //             return false;
                                                //         }
                                                //



                                                //
                                                //
                                                        ipcRenderer.send("#ShowMessageAlert",{
                                                            title : "코드 등록에 실패했습니다.",
                                                            severity : "warning"
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


                                                if(result){

                                                    ipcRenderer.send("@CodeItem/_update",result.values,{
                                                        _id : result.oldValues._id
                                                    });
                                                    ipcRenderer.on(`@CodeItem/_update/reply`,(event:IpcRendererEvent,result:any) => {
                                                        if(result.success){
                                                            const parentCode:any = selected.code;
                                                            ipcRenderer.send("#ShowMessageAlert",{
                                                                title : "코드아이템이 수정되었습니다.",
                                                                severity : "info"
                                                            })
                                                            loadChildren(parentCode);

                                                            return  true;
                                                        }else{
                                                            ipcRenderer.send("#ShowMessageAlert",{
                                                                title : "코드아이템 수정에 실패했습니다.",
                                                                severity : "warning"
                                                            })

                                                            return false;
                                                        }
                                                    })


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
                                                    ipcRenderer.send("@CodeItem/_delete",{
                                                        _id : id
                                                    });

                                                    ipcRenderer.on(`@CodeItem/_delete/reply`,(event:IpcRendererEvent,result) => {
                                                        if(result.success){
                                                            const parentCode:any = selected.code;
                                                            loadChildren(parentCode);
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

                                    </GridToolbarContainer>

                                );
                            }
                        }}
                    />

                </Box>
            </Grid>
            {alert}
        </Grid>

    );
}

export default function Code(){
    const [rows,setRows] = React.useState<any>([]);
    const [rowItems,setRowItems] = React.useState<any>([]);
    React.useEffect(()=>{
        sender("@Code/_all")
            .then((result:any) => {
                setRows(result.data);
            })
    },[])

    return (
        <GridPanel
            items={[{
                title:"코드",
                dataGridProps:{
                    columns:[
                        {field : 'code', headerName : '코드',flex : 1},
                        {field : 'name', headerName : '코드명',flex : 1}
                    ],
                    rows : rows,
                    onRowClick:(params:GridRowParams)=>{
                        const code:GridRowId = params.id;
                        sender("@CodeItem/_indexByParentCode",code)
                            .then((result : any) => {
                                setRowItems(result.data);
                            });
                    },
                    hideFooterPagination : true,
                    HideFooterSelectedRowCount : true,
                    hideFooter : true,
                }
            },{
                title:"코드 아이템",
                dataGridProps:{
                    columns:[
                        {field : 'code', headerName : '코드',flex : 1},
                        {field : 'name', headerName : '코드명',flex : 1}
                    ],
                    rows : rowItems,
                    hideFooterPagination : true,
                    HideFooterSelectedRowCount : true,
                    hideFooter : true
                }
            }]}

        />
    );
}
