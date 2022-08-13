import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import Button from '@mui/material/Button';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ContentItemBar from '@views/main/support/content/ContentItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import electron from "electron";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
const ipcRenderer = electron.ipcRenderer;
// import img from "/Users/junyoungkim/Desktop/a.png";
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function a11yProps(index: number) {
    return {
        id: `player-tab-${index}`,
        'aria-controls': `player-tabpanel-${index}`,
    };
}

import ImageViewer from "@views/main/support/content/viewer/Image";
import VideoViewer from "@views/main/support/content/viewer/Video";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
/**
 * cols 열수
 * @constructor
 */
export default function Viewer(props:any) {
    const [value, setValue] = React.useState(0);
    return (
        <>
            <Tabs value={value} aria-label="basic tabs example">
                <Tab label="저해상도 플레이어" {...a11yProps(0)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <VideoViewer metadata={props.metadata}/>

        </TabPanel>
        </>
    )
}


