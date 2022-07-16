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
/**
 * cols 열수
 * @constructor
 */
export default function ImageViewer() {
    return (
        // <div>
        <img
            // style={{
            //     width : '100%',
            //     height : 'auto'
            // }}
            // src={`${item.img}?w=248&fit=crop&auto=format`}
            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={"http://localhost:3000/logo192.png?w=100&fit=crop&auto=format"}
            srcSet={"http://localhost:3000/logo192.png?w=100&fit=crop&auto=format&dpr=2 2x"}
            loading="lazy"
        />
        // </div>
    )
}


