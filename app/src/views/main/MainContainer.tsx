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

import Code from "@views/main/Code";
import Metadata from "@views/main/Metadata";
import Ingest from "@views/main/Ingest";
import Content from "@views/main/Content";
import TaskMonitor from '@views/main/TaskMonitor';




export default function MainContainer(props:any) {
    const [value, setValue] = React.useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' , height:"100vh"}}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} centered aria-label="lab API tabs example">
                        <Tab label="콘텐츠" value="0" />
                        <Tab label="인제스트" value="1" />
                        <Tab label="스토리지" value="2" />
                        <Tab label="코드관리" value="3" />
                        <Tab label="메타데이터" value="4" />
                        <Tab label="작업관리" value="5" />
                    </TabList>
                </Box>
                <TabPanel value="0"><Content /></TabPanel>
                <TabPanel value="1"><Ingest /></TabPanel>
                <TabPanel value="2"><Storage /></TabPanel>
                <TabPanel value="3"><Code /></TabPanel>
                <TabPanel value="4"><Metadata /></TabPanel>
                <TabPanel value="5"><TaskMonitor /></TabPanel>
            </TabContext>
        </Box>
    );
}
