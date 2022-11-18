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
import {styled} from '@mui/material/styles';
const AppBarTitle = styled(Typography)`
  -webkit-app-region: drag;
`;
// style={"-webkit-app-region: drag;"}

export interface BasicAppBarProps {
  toolbar ?: JSX.Element[]
  title ?: string
  hideClose ?: true
  onCloseClick ?: () => void
}
export default function BasicAppBar(props:BasicAppBarProps) {
  return (
    <Box sx={{ flexGrow: 1}} >
      <AppBar position="static" >
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
          <AppBarTitle variant="h6" sx={{ flexGrow: 1 }}>
            {props.title || ""}
          </AppBarTitle>
          {/* "-webkit-app-region: drag;" */}
          {/* <IconButton aria-label="close" size="large" >
            
            <CloseIcon fontSize="inherit" />
          </IconButton> */}
          {(props.hideClose === true)
          ? <></>
            : (<IconButton aria-label="close" size="large" onClick={()=>{
                if(props.onCloseClick){
                  props.onCloseClick()
                }
              
              }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>)
          }
          
          
          {/* style="-webkit-app-region: drag;" */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}