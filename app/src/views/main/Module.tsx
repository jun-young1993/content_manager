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
import {codeItemByMenuItem} from "@src/helper/meterialHelper";
const ipcRenderer = electron.ipcRenderer;


// const rows: GridRowsProp = [
//     { id: 1, col1: 'Hello', col2: 'World' },
//     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//     { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];

const getRows =()=> {

    const storages = ipcRenderer.sendSync("@Module/all");
    if(storages.success){
        return storages.data.map((storage : any) => {

            storage.id = storage._id;
            return storage;
        });

    }

}

const columns: GridColDef[] = [
    { field: 'task_type_nm', headerName: '작업 타입', width: 150 },
    { field: 'source_media_nm', headerName: '소스 미디어', width: 150 },
    { field: 'source_storage_nm', headerName: '소스 스토리지', width: 150 },
    { field: 'target_media_nm', headerName: '타겟 미디어', width: 150 },
    { field: 'target_storage_nm', headerName: '타겟 스토리지', width: 150 },
    { field: 'description', headerName: '설명', width: 150 },
];
function storageByMenuItem(){
	const data = ipcRenderer.sendSync("@Storage/all");
	const items = []
	if(data.success){
		const codeItem = data.data;
		for(let codeItemIndex = 0; codeItemIndex < codeItem.length; codeItemIndex++){
			items.push((<MenuItem key={codeItem[codeItemIndex].code} value={codeItem[codeItemIndex].code}>{codeItem[codeItemIndex].name}</MenuItem>))	
		}
		return (items);
	}
}


function codeNameMapping(result:any){
    const nm:any = {
        task_type_nm : '',
        source_media_nm : '',
        source_storage_nm : '',
        target_media_nm : '',
        target_storage_nm : ''
    };

    if(result.values.task_type){
        const taskType = ipcRenderer.sendSync('@CodeItem/findByParentCode','TASK_MODULE_TYPE',result.values.task_type);
        console.log(taskType);
        if(taskType){
            if(taskType.success){
                nm['task_type_nm'] = taskType.data.name;
            }
        }
    }
    if(result.values.source_media){
        const sourceMedia = ipcRenderer.sendSync('@CodeItem/findByParentCode','MEDIA_TYPE',result.values.source_media);
        if(sourceMedia){
            if(sourceMedia.success){
                nm['source_media_nm'] = sourceMedia.data.name;
            }
        }
    }

    if(result.values.source_media){
        const targetMedia = ipcRenderer.sendSync('@CodeItem/findByParentCode','MEDIA_TYPE',result.values.target_media)
        if(targetMedia){
            if(targetMedia.success){
                nm['target_media_nm'] = targetMedia.data.name;
            }
        }
    }
    
    if(result.values.source_storage){
        const sourceStorage = ipcRenderer.sendSync('@Storage/first',{code : result.values.source_storage});
        if(sourceStorage){
            if(sourceStorage.success){
                nm['source_storage_nm'] = sourceStorage.data.name;
            }
        }
    }

    if(result.values.target_storage){
        const targetStorage = ipcRenderer.sendSync('@Storage/first',{code : result.values.target_storage});
        if(targetStorage){
            if(targetStorage.success){
                nm['target_storage_nm'] = targetStorage.data.name;
            }
        }
    }

    return nm;
}
const reducer = (prevState:any, newState:any) => ({
    ...prevState,
    ...newState
})
export default function Module() {

    const [rows,setRows] = React.useState(getRows);
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
        setRows(getRows);
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
                                                name : "task_type",
                                                label : "작업타입",
                                                fullWidth: true,
                                                variant:"standard",
                                                children : codeItemByMenuItem('TASK_MODULE_TYPE')
                                            },
                                            {
                                                name: "name",
                                                label: "작업명",
                                                variant: "standard"
                                            },
                                            {
                                                select : true,
                                                name : "source_media",
                                                label : "소스 미디어",
                                                fullWidth: true,
                                                variant:"standard",
                                                children : codeItemByMenuItem('MEDIA_TYPE')
                                            },
                                            {
                                                select : true,
                                                name : "source_storage",
                                                label : "소스 스토리지",
                                                fullWidth : true,
                                                variant:"standard",
                                                children : storageByMenuItem()
                                            },
                                            {
                                                select : true,
                                                name : "target_media",
                                                label : "타겟 미디어",
                                                fullWidth: true,
                                                variant:"standard",
                                                children : codeItemByMenuItem('MEDIA_TYPE')
                                            },
                                            {
                                                select : true,
                                                name : "target_storage",
                                                label : "타겟 스토리지",
                                                fullWidth : true,
                                                variant:"standard",
                                                children : storageByMenuItem()
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
                                                  
                                                    const nm = codeNameMapping(result);
                                                    
                                                    Object.assign(result.values,nm);
                                                    

                                                    
                                                    const insert = ipcRenderer.sendSync("@Module/insert",result.values);
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
                                                name : "task_type",
                                                label : "작업타입",
                                                fullWidth: true,
                                                variant:"standard",
                                                children : codeItemByMenuItem('TASK_MODULE_TYPE')
                                            },
                                            {
                                                name: "name",
                                                label: "작업명",
                                                variant: "standard"
                                            },
                                            {
                                                select : true,
                                                name : "source_media",
                                                label : "소스 미디어",
                                                fullWidth: true,
                                                variant:"standard",
                                                children : codeItemByMenuItem('MEDIA_TYPE')
                                            },
                                            {
                                                select : true,
                                                name : "source_storage",
                                                label : "소스 스토리지",
                                                fullWidth : true,
                                                variant:"standard",
                                                children : storageByMenuItem()
                                            },
                                            {
                                                select : true,
                                                name : "target_media",
                                                label : "타겟 미디어",
                                                fullWidth: true,
                                                variant:"standard",
                                                children : codeItemByMenuItem('MEDIA_TYPE')
                                            },
                                            {
                                                select : true,
                                                name : "target_storage",
                                                label : "타겟 스토리지",
                                                fullWidth : true,
                                                variant:"standard",
                                                children : storageByMenuItem()
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
                                                const nm = codeNameMapping(result);


                                                
                                                    
                                                Object.assign(result.values,nm);
                                                const update = ipcRenderer.sendSync("@Module/update",result.values,{
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
                                               const result = ipcRenderer.sendSync("@Module/delete",{
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
