import * as React from 'react';
import Content from "@views/main/Content";
import TaskMonitor from '@views/main/TaskMonitor';
import Dashboard from "@views/main/support/main/Dashboard";
import Metadata from "@views/main/Metadata";
import Code from "@views/main/Code";
import Storage from "@views/main/Storage";
import Config from "@views/main/Config";
import Module from "@views/main/Module";
import Workflow from "@views/main/Workflow";
import LabelIcon from '@mui/icons-material/Label';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {DrawerClickEvent} from "@views/main/support/main/MainInterface";
import {
    AccountTree as AccountTreeIcon,
    Dns as DnsIcon,
    Folder as FolderIcon,
    Monitor as MonitorIcon,
    PermDataSetting as PermDataSettingIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    SettingsSuggest as SettingsSuggestIcon,
    TableView as TableViewIcon,
    Task as TaskIcon,
    ViewModule as ViewModuleIcon,
    Upgrade as UpgradeIcon
} from '@mui/icons-material';

import {TagEdit} from "@views/main/TagConfig";
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import StorageMonitor from '@views/main/StorageMonitor';
import UpdateRequest from "@/src/views/main/support/main/GnbMenu/Main/UpdateRequest";
export default function MainContainer() {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'dark',
                },
            }),
        [prefersDarkMode],
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <>
                    <Dashboard
                        defaultMainContainer={<UpdateRequest />}
                        leftMenu={[{
                            name : "설정",
                            onClick : (event : DrawerClickEvent) => {
                                event.setMainContainer((<Config />));
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
                            },{
                                name : "스토리지 모니터링",
                                onClick : (event : DrawerClickEvent) => {
                                    event.setMainContainer((<StorageMonitor />));
                                },
                                icon :<MonitorIcon />
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
                                name : "태그 관리",
                                onClick : (event : DrawerClickEvent) => {
                                    event.setMainContainer((<TagEdit />));
                                },
                                icon :<LabelIcon />
                            }]
                        },{
                            name : "시스템",
                            collapse : true,
                            onClick : (event : DrawerClickEvent) => {},
                            icon : <DnsIcon />,
                            drive:true,
                            items : [{
                                name : "코드 관리",
                                onClick : (event : DrawerClickEvent) => {
                                    event.setMainContainer((<Code />));
                                },
                                icon :<SettingsSuggestIcon />
                            },{
                                name : "업데이트 이력",
                                onClick : (event : DrawerClickEvent) => {
                                    event.setMainContainer((<UpdateRequest />));
                                },
                                icon :<UpgradeIcon />
                            }]
                        }]}
                    />
                </>
        </ThemeProvider>
    );
}
