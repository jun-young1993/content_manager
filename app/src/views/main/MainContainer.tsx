import * as React from 'react';


import {
    Box,
    Tab,
    Tabs
} from '@mui/material';
import {
    TabContext,
    TabList,
    TabPanel
} from '@mui/lab';
import Storage from "@views/main/Storage";
import { Provider, useSelector, useDispatch  } from 'react-redux'

import ContentStore from "@views/store/ContentStore";
import Code from "@views/main/Code";
import Metadata from "@views/main/Metadata";
import Ingest from "@views/main/Ingest";
import Content from "@views/main/Content";
import Config from "@views/main/Config";
import TaskMonitor from '@views/main/TaskMonitor';
import MenuAppBar from '@views/main/support/main/MenuAppBar';
import ContentDialog from "@views/main/support/content/ContentDialog";
import UpdateSnackbar from './support/snackbar/UpdateSnackbar';
import {ipcRenderer, IpcRendererEvent} from "electron";


export default function MainContainer(props:any) {
    const [value, setValue] = React.useState(<Content />);
    
    ipcRenderer.on("@Ingest/_ingest/reply",(event:IpcRendererEvent,result) => {
        console.log('show ingest request',result)
        setValue(<Content />);
        ipcRenderer.removeAllListeners("@Ingest/_ingest/reply");
        // setContentDialog(<ContentDialog
        //     open={true}
        //     metadata={metadata}
        //     onClose={()=>{
        //         console.log('close');
        //     }}
        // />)
    })
    // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    //     setValue(newValue);
    // };
   
    return (


        
        <Box sx={{ width: '100%', typography: 'body1' , height:'auto'}}>
            <UpdateSnackbar />
            <Box sx={{ width: '100%',height:'auto'}}>
            <MenuAppBar
                onSearch={(searchText:any)=>{
                    console.log(searchText);
                    setValue(<Content searchText={searchText}/>);
                }}
                onClick={(value:any)=>{
                    console.log('value menu click',value);
                    const container:any = {
                        Content :<Content />,
                        Ingest : <Ingest />,
                        Config : <Config />
                    };
                    setValue(container[value]);
                }}
            />
            </Box>
            <Box sx={{ width: '100%',height:'auto'}}>
            {value}
            </Box>
        </Box>

    );
}
