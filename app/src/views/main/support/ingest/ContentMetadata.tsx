import * as React from 'react';
import TextField from "@mui/material/TextField";
import {Button, MenuItem} from "@mui/material";
import Stack from "@mui/material/Stack";
import EditIcon from '@mui/icons-material/Edit';
import {invoker, sender, showAlert, showConfirm} from "@views/helper/helper";
import {CategorySelectMenuItem} from '@views/main/Content';
import dayjs from "dayjs";


const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const defaultField = () => {
    const workflowes = ipcRenderer.sendSync("@WorkFlow/all");
    const categorys = ipcRenderer.sendSync("@Category/index",{parent_id : 'folder'});
    const defaultFields = [
    //     {
    //     required : true,
    //     // helperText:"required field",
    //     select: true,
    //     fullWidth: true,
    //     name : 'workflow_id',
    //     label : '워크플로우',
    //     variant : "standard",
    //     color:"secondary",
    //     focused : true,
    //     // defaultValue:workflowes.data[0]._id,
    //     children : (workflowes.data.map((code: any) => {
    //         return (<MenuItem key={code._id} value={code._id}>{code.name}</MenuItem>)
    //     }))
    // },
    {
        required : true,
        // helperText:"required field",
        select: true,
        fullWidth: true,
        name : 'category',
        label : '카테고리',
        variant : "standard",
        color:"secondary",
        focused : true,
        // defaultValue:workflowes.data[0]._id,
        children : CategorySelectMenuItem({
            tags : categorys.data
        }).map((item: any) => item)
    }
];

    return defaultFields;
}

const settingField = (metaFields:[]) => {
    const fields:any = [...defaultField()]
	metaFields.map((metaField:any) => {
	    const fieldSet:any = {
		fullWidth : true,
		name : metaField.code,
		label : metaField.name,
		variant : "standard"
	    };
	    if(metaField.type == 'code') {
            const codeResult = ipcRenderer.sendSync("@CodeItem/indexByParentCode", metaField.code);
            let codes = [];
            if (codeResult.success) {
                if (codeResult.data) {
                codes = codeResult.data;
                console.log('codes', codes)
                }
            }
        
            const codeFieldSet = {
                select: true,
                fullWidth: true,
                children : (codes.map((code: any) => {
                return (<MenuItem key={code.code} value={code.code}>{code.name}</MenuItem>)
                }))
            }
        
        
            Object.assign(fieldSet,codeFieldSet);
	    }
    
        fields.push(fieldSet)
	});
    return fields;
}
const reducer = (prevState:any, newState:any) => ({
    ...prevState,
    ...newState
})
export default function ContentMetadata(props:any){
    console.log('props.metadata',props.metadata);
    const [state, setState] = React.useReducer(reducer,{
        metadata : props.metadata,
        fields : []
    })

    React.useEffect(()=>{
        sender("@Field/_index",{content_type : props.metadata.content_type})
        .then((result:any) => {


                invoker("@MediaInfo/$index",props.metadata._id)
                    .then((mediaInfo) => {
                        console.log("media info",{
                            fields : settingField(result.data),
                            mediaInfo : mediaInfo && mediaInfo.data ? mediaInfo.data : {}
                        });

                        setState({
                            fields : settingField(result.data),
                            mediaInfo : mediaInfo && mediaInfo.data ? mediaInfo.data : {}
                        });
                    })
        })
        // ipcRenderer.send("@Field/_index");
        // ipcRenderer.on('@Field/_index/reply',(event,result)=>{
        //     console.log('@Field/_index/reply',result)  
        //     console.log('settingField(result.data)',settingField(result.data))
        //     if(result.success){

        //         const fields:any = {fields : settingField(result.data)};
        //         setState(fields);
        //         ipcRenderer.removeAllListeners("@Field/_index/reply");
        //     }
                
                
        // })
    },[])
   
    const updateFiledValue = (event: { target: { name: string; value: string; }; }) => {
        const {name , value} = event.target;
        state.metadata[name] = value;
        setState({
            metadata : state.metadata
        });
        // dispatch({type : 'metadata.patch', value : {[name] : value} })
    }

    return(
        <>
            <TextField
                label="콘텐츠 아이디"
                fullWidth={true}
                style={{
                    backgroundColor : "#8080808c"
                }}
                defaultValue={state.metadata._id}
                InputProps={{
                    readOnly: true,
                }}
                variant="standard"
            />

            {state.fields.map((field:any)=>{

                    let element = <TextField  onChange={updateFiledValue}/>;
                    console.log('state.metadata[field.name]',state.metadata)
                    if(state.metadata && state.metadata[field.name]){
                        field.defaultValue = state.metadata[field.name];
                        console.log('setting ',field);
                    }

                    return(<div>{React.cloneElement(element,field)}</div>)

                })}
            <div>
            <TextField
                label="콘텐츠 생성일"
                defaultValue={dayjs(state.metadata.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                fullWidth={true}
                style={{
                    backgroundColor : "#8080808c"
                }}
                InputProps={{
                    readOnly: true,
                }}
                variant="standard"
            />
            </div>
            <div>
            <TextField
                fullWidth={true}
                label="콘텐츠 수정일"
                style={{
                    backgroundColor : "#8080808c"
                }}
                defaultValue={dayjs(state.metadata.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                InputProps={{
                    readOnly: true,
                }}
                variant="standard"
            />
            </div>
            <Stack
                sx={{padding : 1}}
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                spacing={2}
            >
                <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={()=>{
                        console.log('click edit metadata');
                        showConfirm({
                            title : `메타데이터를 수정하시겠습니까?`,
                            severity : "info"
                        },(checked:boolean) => {
                            if(checked){
                                console.log('changed',state.metadata)
                                sender("@Content/_update",state.metadata._id,state.metadata)
                                    .then((result : any) => {
                                        console.log('result',result);
                                        showAlert({
                                            title : "수정되었습니다.",
                                            severity : "success"
                                        });
                                    })
                            }
                        })

                    }}
                >
                    수정
                </Button>

            </Stack>
        </>
    );
}