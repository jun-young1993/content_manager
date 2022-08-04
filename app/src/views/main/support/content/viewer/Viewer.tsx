import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import Button from '@mui/material/Button';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ContentItemBar from '@views/main/support/content/ContentItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import electron from "electron";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
const ipcRenderer = electron.ipcRenderer;
// import img from "/Users/junyoungkim/Desktop/a.png";

import ImageViewer from "@views/main/support/content/viewer/Image";
import VideoViewer from "@views/main/support/content/viewer/Video";
/**
 * cols 열수
 * @constructor
 */
export default function Viewer(props:any) {
    
    return (
       <VideoViewer metadata={props.metadata}/>
    )
}


