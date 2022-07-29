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
import MediaInfo from "@views/main/support/ingest/MediaInfo";
import Viewer from "@views/main/support/content/viewer/Viewer";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
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
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
export default function ContentDialog(props:any) {
    console.log(props);
    const [open, setOpen] = React.useState(props.open);
    const [value, setValue] = React.useState(0);
    const metadata = props.metadata;
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };


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
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            콘텐츠 상세정보
                        </Typography>
                        <IconButton 
                            edge="start"
                            color="inherit"
                            aria-label="close"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={1} style={{height: '80'}} sx={{gridRow : '2'}}>
                    <Grid item xs={6}  style={{height: '50vh'}}>
                            <Viewer metadata={metadata}/>
                    </Grid>
                    <Grid item xs={6} style={{height: '50vh'}}>
                        {/* <Box sx={{border:1, height:'50vh', width:'98%'}}>
                            <ContentMetadata metadata={metadata}/>
                        </Box> */}
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="메타데이터" {...a11yProps(0)} />
                            <Tab label="Item Two" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                        </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <ContentMetadata metadata={metadata}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <MediaInfo metadata={metadata}/>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                        Item Three
                        </TabPanel>
                    </Grid>
                </Grid>
            </Dialog>
        </div>
    );
}
