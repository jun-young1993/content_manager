
import * as React from "react";
import {
    GridToolbarContainer,
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRowParams,
    GridCallbackDetails,
    DataGridProps,
} from '@mui/x-data-grid';
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
import DateRange from "@views/components/fields/DateRange";
import FieldMapper from "@views/components/fields/FieldMapper";

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
    // columns : GridColDef[]
    title ?: string
    searchToolbar ?: any
    dataGridProps ?: any
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
    // const columns = props.columns;
    const searchToolbar = props.searchToolbar;
    // const rows = props.rows;
    // console.log('basegrid rows',props.rows)
    // const [rows, setRows] = React.useState(props.rows);

    let searchValues = {};
 

    // const types :any = [];
    // if(!isEmpty(searchToolbar)){
    //     searchToolbar.map((search:any) => {
    //         types[search.type] = search;
    //     })
    // }
    // console.log('types',types)



    // const [value, setValue] = React.useState<Date | null>(
    //     new Date('2014-08-18T21:11:54'),
    // );
    //
    // const handleChange = (newValue: Date | null) => {
    //     setValue(newValue);
    // };

    // const [values, setValues] = React.useReducer(reducer,{
    //     start_date : new Date(),
    //     end_date : new Date()
    // });



    // const dateSearch = () => {

    
    //     return (
    //         <DateRange 
    //         ></DateRange>
    //     );
    // }
    // ipcRenderer.send(props.api.get);
    // ipcRenderer.on(`${props.api.get}/reply`,(event:IpcRendererEvent,result) => {
    //     ipcRenderer.removeAllListeners(`${props.api.get}/reply`)
    //     setRows(result.data);
    //     console.log('renderer')
    //
    // })


    // const load = () => {
    //         console.log('laod');
    //         sender(props.api.get,values)
    //             .then((result:any) => {
    //                 console.log('ren')
    //                 setRows(result.data);
    //             })

    // }

    // useEffect(() => {
    //     console.log('new data');
    //     load();
    // },[])


    return (
        <Container fixed sx={{height:'65vh', width:"100%"}}>
            {props.title
                ? <Typography variant="h4" sx={{marginBottom:3}}>
                    {makeTitle(props.title)}
                </Typography>
                : <></>
            }

            <DataGrid
                sx={{height:'70vh'}}
                // rows={rows}
                // columns={columns}
                {...props.dataGridProps}
                components={{
                    Toolbar : () => {
                        return (
                            <GridToolbarContainer>
                                <Stack direction={"row"}>
                                    <FieldMapper 
                                        default={{
                                            size : "small",
                                            variant:"standard"
                                        }}
                                        fields={props.searchToolbar}
                                    />
                                    {/* {dateSearch()} */}
                                    {/*{makeSearchToolbar()}*/}
                                    {/* <Button onClick={()=> {
                                        console.log('values',values);
                                        load();
                                    }}>검색</Button> */}
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