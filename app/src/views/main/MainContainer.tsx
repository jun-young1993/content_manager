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
import Dashboard from "@views/main/support/main/Dashboard";

import ContentDialog from "@views/main/support/content/ContentDialog";
import UpdateSnackbar from './support/snackbar/UpdateSnackbar';
import {ipcRenderer, IpcRendererEvent} from "electron";
// import Dashboard from './support/dashboard/Dashboard';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {DashboardInterface, leftMenuInterface, DrawerClickEvent} from "@views/main/support/main/MainInterface";
import {
    Search as SearchIcon,
    Settings as SettingsIcon,
    List as ListIcon,
    TableView as TableViewIcon,
    Task as TaskIcon
} from '@mui/icons-material';
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
                onClick : (event : DrawerClickEvent) => {
                    console.log(event);
                    // event.setMainContainer((<Content />));
                },
                icon : <TableViewIcon />,
                drive:true,
                items : [{
                    name : "작업관리",
                    onClick : (event : DrawerClickEvent) => {

                    },
                    icon :<TaskIcon />

                }]
            }]}
        />

        // <Box sx={{ width: '100%', height:'90vh'}}>
            
        //     <Box sx={{ width: '100%',height:'auto'}}>
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
