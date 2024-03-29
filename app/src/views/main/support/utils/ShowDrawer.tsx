import * as React from "react";
import {ipcRenderer, IpcRendererEvent} from "electron";
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import {Typography} from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ContentDetail from "@views/main/support/content/ContentDetail";
import PreviewIcon from '@mui/icons-material/Preview';
import SourceIcon from '@mui/icons-material/Source';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import SettingsIcon from '@mui/icons-material/Settings';
import {LightTooltip} from "@views/components/tooltip/Tooltip";
import Dialog from '@mui/material/Dialog';
import {contentDetailPanel} from "@views/main/support/config/ConfigItems";
import {BaseLayout, ContentDetailPanelConfigLayout} from "@views/main/Config";
import Store from "electron-store";
import InputSlider from "@views/components/fields/InputSlider";
import NumberField from "@views/components/fields/NumberField";

const store = new Store();
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
interface DrawerConfigDialogProps {

}

function ListenerDrawer(){
    const width:any = store.get('content.panel_width');
    const panelWidth = (width : number) => {
        
        return `${width+30}vh`;
    }
    const [state , setState] = React.useReducer(reducer,{
        open : false,
        width : store.get('content.panel_width'),
        view : "player",
        element : <></>,
        metadata : {},
    });
    console.log("=>(ShowDrawer.tsx:79) renderer",state.width);
    // React.useEffect(()=>{
    //     console.log('effect width',state.width);
    //     store.set('content.panel_width',state.width);
    // },[state.width])
    // if(state.width !== panelWidth(Number(store.get('content.panel_width')))){
    //     setState({width : panelWidth(Number(store.get('content.panel_width')))});
    // }

    // React.useEffect(()=>{
    //     console.log('effect',state.width,store.get('content.panel_width'));
    //     // if(state.width !== panelWidth(Number(store.get('content.panel_width')))){
    //     //     setState({width : panelWidth(Number(store.get('content.panel_width')))});
    //     // }   
    // },[state])


    const toggleDrawer = (event : any) => {
        console.log('renderer toggle drawer',event);
        ipcRenderer.send("#ShowDrawerClose");
        setState({open : !state.open});
    }
    
    ipcRenderer.on(`#ShowDrawer/reply`,(event:IpcRendererEvent,args:ListenerAlert) => {
        console.log('showDrawer args',args);

        setState(args);
        ipcRenderer.removeAllListeners("#ShowDrawer/reply");

    })

    
    const list = () => (
        <Box
          sx={{width : panelWidth(state.width) }}
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

                        </Typography>
                    </Stack>
                <Stack
                    direction={"row"}
                    justifyContent={'flex-end'}
                    spacing={2}
                >

                    <LightTooltip title={"프리뷰"} placement={"top-end"}>
                        <IconButton
                            onClick={(event:React.MouseEvent)=>{
                                setState({view : "player"});
                            }}
                        >
                            <PreviewIcon
                                color={(state.view == 'player') ? 'primary' : "inherit"}
                            />
                        </IconButton>
                    </LightTooltip>
                    <LightTooltip title={"메타데이터"} placement={"top-end"}>
                        <IconButton
                            onClick={(event:React.MouseEvent)=>{
                                setState({view : "metadata"});
                            }}
                        >
                            <SourceIcon
                                color={(state.view == 'metadata') ? 'primary' : "inherit"}
                            />
                        </IconButton>
                    </LightTooltip>
                    <LightTooltip title={"미디어 리스트"} placement={"top-end"}>
                        <IconButton
                            onClick={(event:React.MouseEvent)=>{
                                setState({view : "media_list"});
                            }}
                        >
                            <PermMediaIcon
                                color={(state.view == 'media_list') ? 'primary' : "inherit"}
                            />
                        </IconButton>
                    </LightTooltip>
                    {/* <LightTooltip title={"상세보기 설정"} placement={"top-end"}>
                        <IconButton
                            onClick={(event:React.MouseEvent)=>{
                                contentDetailPanel.map((item :any) => {
                                    if(item.key == "panel_width"){
                                        return item = null;
                                        // return item= {
                                        //     type : "base",
                                        //     key : "panel_width",
                                        //     title : "패널 넓이 조절",
                                        //     element : <NumberField 
                                        //         value={Number(store.get("content.panel_width"))}
                                        //         onChange={(value : number)=>{
                                                    
                                        //             store.set("content.panel_width",value)
                                        //             setState({width : panelWidth()});
                                                    
                                        //         }}
                                        //     />
                                        // }
                                        
                                    }

                                })
                                console.log('contentDetailPanel',contentDetailPanel);
                                setState({
                                    view : "config",
                                    element : (<BaseLayout
                                        items={contentDetailPanel}
                                    />)
                                });
                            }}
                        >
                            <SettingsIcon
                                color={(state.view == 'config') ? 'primary' : "inherit"}
                            />
                        </IconButton>
                    </LightTooltip> */}
                    {/*<DrawerConfigDialog />*/}
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