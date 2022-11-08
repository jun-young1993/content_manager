import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {invoker} from "@views/helper/helper";
import CloseIcon from '@mui/icons-material/Close';
export interface BasicAppBarProps {
  toolbar ?: JSX.Element[]
  title ?: string
}
export default function BasicAppBar(props:BasicAppBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {props.toolbar 
          ? props.toolbar.map((toolbarItem : JSX.Element) => toolbarItem)
          : <></>
          }
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title || ""}
          </Typography>
          <IconButton aria-label="close" size="large" onClick={()=>{
              invoker("$focus-window-close")
              .then((result) => {
                console.log('result',result);
              })
          }}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}