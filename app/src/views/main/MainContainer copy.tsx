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




export default function MainContainer() {
    const [value, setValue] = React.useState('0');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} centered aria-label="lab API tabs example">
                        <Tab label="인제스트" value="0" />
                        <Tab label="스토리지" value="1" />
                        <Tab label="코드관리" value="2" />
                        <Tab label="메타데이터" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="0"><Ingest /></TabPanel>
                <TabPanel value="1"><Storage /></TabPanel>
                <TabPanel value="2"><Code /></TabPanel>
                <TabPanel value="3"><Metadata /></TabPanel>
            </TabContext>
        </Box>
    );
}
