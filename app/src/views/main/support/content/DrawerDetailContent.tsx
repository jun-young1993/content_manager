import * as React from "react";
import {Box, Button} from "@mui/material";

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';

// const drawerWidth: number = 240;
// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//     ({ theme, open }) => ({
//       '& .MuiDrawer-paper': {
//         position: 'relative',
//         whiteSpace: 'nowrap',
//         width: drawerWidth,
//         transition: theme.transitions.create('width', {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//         boxSizing: 'border-box',
//         ...(!open && {
//           overflowX: 'hidden',
//           transition: theme.transitions.create('width', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//           }),
//           width: theme.spacing(7),
//           [theme.breakpoints.up('sm')]: {
//             width: theme.spacing(9),
//           },
//         }),
//       },
//     }),
//   );
export default function DrawerDetailContent(){
    const [open , setOpen] = React.useState(true);
    const toggleDrawer =
        () =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                console.log(event);
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setOpen(!open);
            };
    return (


                <Drawer
                    variant="permanent"
                    anchor={"right"}
                    sx={{width : "480px"}}
                    open={open}
                    onClose={toggleDrawer}
                >
                    <Toolbar
                        sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                        }}
                    >
                    <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    {/* <Box style={{width: "200px"}}>
                       <Typography>
                           hi
                       </Typography>
                    </Box> */}
                </Drawer>


    );
}

