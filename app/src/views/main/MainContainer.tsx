import * as React from 'react';
import Content from "@views/main/Content";
import TaskMonitor from '@views/main/TaskMonitor';
import Dashboard from "@views/main/support/main/Dashboard";
import Metadata from "@views/main/Metadata";
import Code from "@views/main/Code";
import Storage from "@views/main/Storage";
import Module from "@views/main/Module";
import Workflow from "@views/main/Workflow";
import {ipcRenderer, IpcRendererEvent} from "electron";

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {DashboardInterface, leftMenuInterface, DrawerClickEvent} from "@views/main/support/main/MainInterface";
import {
    Search as SearchIcon,
    Settings as SettingsIcon,
    List as ListIcon,
    TableView as TableViewIcon,
    Task as TaskIcon,
    Person as PersonIcon,
    PermDataSetting as PermDataSettingIcon,
    Folder as FolderIcon,
    SettingsSuggest as SettingsSuggestIcon,
    ViewModule as ViewModuleIcon,
    AccountTree as AccountTreeIcon,
    Monitor as MonitorIcon
} from '@mui/icons-material';
import DrawerContent from "@views/main/support/content/DrawerContent";
export default function MainContainer() {
    const mdTheme = createTheme();
    const [value, setValue] = React.useState(<Content />);
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
		setOpen(!open);
	      };
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

        <Dashboard 
            leftMenu={[{
                name : "검색",
                onClick : (event : DrawerClickEvent) => {
                    event.setMainContainer((<>검색</>));
                },
                icon : <SearchIcon />
            },{
                name : "설정",
                onClick : (event : DrawerClickEvent) => {
                    event.setMainContainer((<>설정</>));
                },
                icon : <SettingsIcon />,
                drive:true
            },{
                name : "콘텐츠",
                onClick : (event : DrawerClickEvent) => {
                    event.setMainContainer((<Content />));
                },
                icon : <TableViewIcon />,
                drive:true
            },{
                name : "모니터링",
                collapse : true,
                onClick : (event : DrawerClickEvent) => {},
                icon : <MonitorIcon />,
                drive:true,
                items : [{
                    name : "작업관리",
                    onClick : (event : DrawerClickEvent) => {
                        event.setMainContainer((<TaskMonitor />));
                    },
                    icon :<TaskIcon />

                }]
            },{
                name : "사용자 지정 관리",
                collapse : true,
                onClick : (event : DrawerClickEvent) => {},
                icon : <PersonIcon />,
                drive:true,
                items : [{
                    name : "메타데이터 관리",
                    onClick : (event : DrawerClickEvent) => {
                        event.setMainContainer((<Metadata />));
                    },
                    icon :<PermDataSettingIcon />

                },{
                    name : "스토리지 관리",
                    onClick : (event : DrawerClickEvent) => {
                        event.setMainContainer((<Storage />));
                    },
                    icon :<FolderIcon />

                },{
                    name : "코드 관리",
                    onClick : (event : DrawerClickEvent) => {
                        event.setMainContainer((<Code />));
                    },
                    icon :<SettingsSuggestIcon />
                },{
                    name : "모듈 관리",
                    onClick : (event : DrawerClickEvent) => {
                        event.setMainContainer((<Module />));
                    },
                    icon :<ViewModuleIcon />
                },{
                    name : "워크플로우 관리",
                    onClick : (event : DrawerClickEvent) => {
                        event.setMainContainer((<Workflow />));
                    },
                    icon :<AccountTreeIcon />
                },{
                    name : "test",
                    onClick : (event :any) => {
                        event.setMainContainer(   <DrawerContent />);

                    },
                    icon :<AccountTreeIcon />
                }]
            }]}
        />

        // <Box sx={{ width: '100%', height:'90vh'}}>
            
        //     < sx={{ width: '100%',height:'auto'}}>
        //     <MenuAppBar
        //         onSearch={(searchText:any)=>{
        //             console.log(searchText);
        //             setValue(<Content searchText={searchText}/>);
        //         }}
        //         onClick={(value:any)=>{
        //             console.log('value menu click',value);
        //             const container:any = {
        //                 Content :<Content />,
        //                 Ingest : <Ingest />,
        //                 Config : <Config />,
        //                 TaskMonitor : <TaskMonitor />
        //             };
        //             setValue(container[value]);
        //         }}
        //     />
        //     </Box>
        //     <Box sx={{ width: '100%',height:'auto'}}>
        //     {value}
        //     </Box>
        // </Box>


    );
}
