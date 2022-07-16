import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuList from "@views/main/support/config/MenuList";
import Metadata from "@views/main/Metadata";
import Storage from "@views/main/Storage";
import Code from "@views/main/Code";
import ContentMetadata from "@views/main/support/ingest/ContentMetadata";
import Viewer from "@views/main/support/content/viewer/Viewer";
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ContentDialog(props:any) {
    console.log(props);
    const [open, setOpen] = React.useState(props.open);

    const metadata = props.metadata;



    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        if(props.onClose){
            props.onClose();
        }
        setOpen(false);
    };

    return (
        <div>
            {/*<Button variant="outlined" onClick={handleClickOpen}>*/}
            {/*    Open full-screen dialog*/}
            {/*</Button>*/}
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={1} style={{height: '80'}} sx={{gridRow : '2'}}>
                    <Grid item xs={9}  style={{height: '50vh'}} sx={{gridRow : '2'}}>
                        <Box sx={{border:1, height:'50vh'}}>
                            <Viewer />
                        </Box>
                        <Box sx={{border:1, height:'50vh'}}>
                            <Box sx={{border:1, height:'25vh'}}>
                                <div>콘텐츠 정보</div>
                            </Box>
                            <Box sx={{border:1, height:'25vh'}}>
                                <div>콘텐츠 미디어 정보</div>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={3} style={{height: '50vh'}}>
                        <Box sx={{border:1, height:'50vh', width:'98%'}}>
                            <ContentMetadata metadata={metadata}/>
                        </Box>
                    </Grid>
                </Grid>
                {/*<List>*/}
                {/*    <ListItem button>*/}
                {/*        <ListItemText primary="Phone ringtone" secondary="Titania" />*/}
                {/*    </ListItem>*/}
                {/*    <Divider />*/}
                {/*    <ListItem button>*/}
                {/*        <ListItemText*/}
                {/*            primary="Default notification ringtone"*/}
                {/*            secondary="Tethys"*/}
                {/*        />*/}
                {/*    </ListItem>*/}
                {/*</List>*/}
            </Dialog>
        </div>
    );
}
