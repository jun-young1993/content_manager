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
import {LightTooltip} from "@views/components/tooltip/Tooltip";
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
                    <Stack
                        direction={"row"}
                        justifyContent={'flex-start'}
                        spacing={2}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <LightTooltip title={"패널 닫기"} placement={"top-end"}>
                            <KeyboardDoubleArrowRightIcon />
                            </LightTooltip>
                        </IconButton>
                        <Typography
                            component="p" variant="h6"
                        >
                            {state.view == 'player'
                                ? "프리뷰"
                                : state.view == 'metadata'
                                    ? "메타데이터"
                                    : ""}
                        </Typography>
                    </Stack>
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
                        프리뷰
                    </Button>
                    <Button 
                        onClick={()=>{
                            setState({view : "metadata"});
                            console.log('change state',state)
                        }}
                        startIcon={<SourceIcon />}
                    >
                        메타데이터
                    </Button>
                </Stack>
                </>
            </Toolbar>
            <Divider />
                    <ContentDetail 
                        view={state.view}
                        metadata={state.metadata}
                    />
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