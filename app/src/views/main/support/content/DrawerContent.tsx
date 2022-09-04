import * as React from "react";
import {Box, Drawer} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function DrawerContent(){
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
                    anchor={"right"}
                    open={open}
                    onClose={toggleDrawer}
                >
                    <Box style={{width: "200px"}}>
                       <Typography>
                           hi
                       </Typography>
                    </Box>
                </Drawer>


    );
}