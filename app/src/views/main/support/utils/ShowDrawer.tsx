import Dialog from "@mui/material/Dialog";

import * as React from "react";
import CustomAlert from "@views/components/CustomAlert";
import {ipcRenderer, IpcRendererEvent} from "electron";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { Typography } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ContentDetail from "@views/main/support/content/ContentDetail";
import PreviewIcon from '@mui/icons-material/Preview';
import SourceIcon from '@mui/icons-material/Source';
export interface ListenerAlert {
    open ?: boolean
    width ?: number
    view ?: string
    metadata ?: any
}
const reducer = (prevState:any, newState:any) => ({
    ...{},
    ...prevState,
    ...newState
})
function ListenerDrawer(){
    
    const [state , setState] = React.useReducer(reducer,{
        open : false,
        width : 500,
        view : "player",
        metadata : {},
    });
    const [view , setView] = React.useState("player");
    React.useEffect(()=>{
        console.log('초기 랜더링',state);
    },[])
    React.useEffect(()=>{
        console.log('state change',state)
    },[state])
    console.log('listenerDrawer',state);
    // const toggleDrawer =
    //     () =>
    //         (event: React.KeyboardEvent | React.MouseEvent) => {
    //             console.log(event);
    //             if (
    //                 event.type === 'keydown' &&
    //                 ((event as React.KeyboardEvent).key === 'Tab' ||
    //                     (event as React.KeyboardEvent).key === 'Shift')
    //             ) {
    //                 return;
    //             }

    //             setOpen(!open);
    //         };

    const toggleDrawer = (event : any) => {
        console.log('renderer toggle drawer',event);
        setState({open : !state.open});
    }
    
    ipcRenderer.on(`#ShowDrawer/reply`,(event:IpcRendererEvent,args:ListenerAlert) => {
        console.log('showDrawer args',args);
        
        setState(args);
        ipcRenderer.removeAllListeners("ShowDrawer/reply");

    })
    const list = () => (
        <Box
          sx={{width : state.width }}
          role="presentation"
        //   onClick={toggleDrawer}
        //   onKeyDown={toggleDrawer}
        >
            <Toolbar
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                }}
            >
            </Toolbar>
            <Divider />
            <Toolbar
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: [1],
                }}
            >
                <>
                <IconButton onClick={toggleDrawer}>
                    <KeyboardDoubleArrowRightIcon />
                </IconButton>
                <Stack
                    direction={"row"}
                    justifyContent={'flex-end'}
                    spacing={2}
                >
                    <Button 
                        onClick={(event:React.MouseEvent)=>{
                            setState({view : "player"});
                        }}
                        startIcon={<PreviewIcon />}
                    >
                        Preview
                    </Button>
                    <Button 
                        onClick={()=>{
                            setState({view : "metadata"});
                            console.log('change state',state)
                        }}
                        startIcon={<SourceIcon />}
                    >
                        Metadata
                    </Button>
                    {/* <IconButton onClick={()=>{
                        setState({
                            view : 'player'
                        })
                    }}>
                        <PreviewIcon />
                    </IconButton> */}
                    {/* <IconButton onClick={()=>{
                        setState({
                            view : 'metadata'
                        })
                    }}>
                        <SourceIcon />
                    </IconButton> */}
                </Stack>
                </>
            </Toolbar>
            <Divider />
            {/* <Box sx={{height:"80vh"}}> */}
                    <ContentDetail 
                        view={state.view}
                        metadata={state.metadata}
                    />
            {/* </Box> */}
        </Box>
      );
    return (
        <div>
  
          <React.Fragment key={"right"}>
            {/* <Button onClick={toggleDrawer}>{"right"}</Button> */}
            <Drawer
              anchor={"right"}
              open={state.open}
              onClose={(event : any)=>{
                    console.log('onClose',event)
              }}
            >
              {list()}
            </Drawer>
          </React.Fragment>
    
      </div>
    
  
    
    )
}
export default function ShowDrawer(){

    return (
        <>
            <ListenerDrawer
            />
        </>
    );
}