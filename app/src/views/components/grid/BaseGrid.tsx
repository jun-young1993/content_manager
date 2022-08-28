
import * as React from "react";
import {
    GridToolbarContainer,
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRowParams,
    GridCallbackDetails
} from '@mui/x-data-grid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {
    Container,
    Typography,
    Stack,
    TextField,
    Button
} from "@mui/material";
import {isEmpty} from "lodash";
import {sender} from "@views/helper/helper";
import {ipcRenderer, IpcRendererEvent} from "electron";
import {useEffect} from "react";

export interface ApiInterface {
    get : string
    post ?: string
    patch ?: string
    put ?: string
    delete ?: string
}
export interface SearchToolbar {
    type : string
}
export interface BaseGridInterface {
    columns : GridColDef[]
    api : ApiInterface
    title ?: string
    searchToolbar ?: any
}

/**
 * 그리드 타이틀
 * @param title string
 */
const makeTitle = (title ?: string) => {
    if(isEmpty(title)){
        return null;
    }
    return title;
}




const reducer = (prevState:any, newState:any) => ({
    ...prevState,
    ...newState
})

export default function BaseGrid(props:BaseGridInterface){
    const columns = props.columns;
    const searchToolbar = props.searchToolbar;
    const [rows, setRows] = React.useState([]);

    let searchValues = {};



    const types :any = [];
    if(!isEmpty(searchToolbar)){
        searchToolbar.map((search:any) => {
            types[search.type] = search;
        })
    }
    console.log('types',types)
    let dateSearchCheck : boolean = false;
    let dateSearchValues:any = {};
    if((!isEmpty(types['start_date'])) && (!isEmpty(types['end_date']))){
        dateSearchCheck = true;
        dateSearchValues['start_date'] = new Date();
        dateSearchValues['end_date'] = new Date();
    }

    // const [value, setValue] = React.useState<Date | null>(
    //     new Date('2014-08-18T21:11:54'),
    // );
    //
    // const handleChange = (newValue: Date | null) => {
    //     setValue(newValue);
    // };

    const [values, setValues] = React.useReducer(reducer,{
        ...dateSearchValues
    });



    const dateSearch = () => {

        if(dateSearchCheck === false){
            return (<></>)
        }
        return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>

                <Stack direction={"row"} spacing={2}>
                    <DesktopDatePicker
                        inputFormat="yyyy-MM-dd"
                        value={values.start_date}
                        onChange={(value) => {
                            setValues({start_date : value})
                        }}
                        renderInput={(params) => {
                            return <TextField
                                size={"small"}
                                style={{width:'120px'}}
                                variant="standard"
                                {...params}
                            />
                        }}
                    />
                    <DesktopDatePicker
                        inputFormat="yyyy-MM-dd"
                        value={values.end_date}
                        onChange={(value)=> {
                            setValues({end_date : value})
                        }}
                        renderInput={(params) => {
                            return <TextField
                                size={"small"}
                                style={{width:'120px'}}
                                variant="standard"
                                {...params}
                            />
                        }}
                    />
                </Stack>
            </LocalizationProvider>
        );
    }
    // ipcRenderer.send(props.api.get);
    // ipcRenderer.on(`${props.api.get}/reply`,(event:IpcRendererEvent,result) => {
    //     ipcRenderer.removeAllListeners(`${props.api.get}/reply`)
    //     setRows(result.data);
    //     console.log('renderer')
    //
    // })
    useEffect(() => {
        console.log('new data');
        sender(props.api.get,values)
            .then((result:any) => {
                console.log('ren')
                setRows(result.data);
            })
    },[])

    const load = () => {
            console.log('laod');
            sender(props.api.get,values)
                .then((result:any) => {
                    console.log('ren')
                    setRows(result.data);
                })

    }




    return (
        <Container fixed sx={{height:'80vh'}}>
            <Typography variant="h4" sx={{marginBottom:3}}>
                {makeTitle(props.title)}
            </Typography>
            <DataGrid
                sx={{height:'70vh'}}
                rows={rows.map((row:{_id : string, id ?: string}) => {
                    row.id = row._id;
                    return row;
                })}
                columns={columns}
                components={{
                    Toolbar : () => {
                        return (
                            <GridToolbarContainer>
                                <Stack direction={"row"}>
                                    {dateSearch()}
                                    {/*{makeSearchToolbar()}*/}
                                    <Button onClick={()=> {
                                        console.log('values',values);
                                        load();
                                    }}>검색</Button>
                                </Stack>
                            </GridToolbarContainer>
                        )
                        // return (makeToolbar(props.toolbar));
                    }
                }}
            />
        </Container>
    );
}