import * as React from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
// import Tooltip from '@mui/material/Tooltip';
import {LightTooltip} from "@src/views/components/tooltip/Tooltip";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {DashboardInterface, DrawerClickEvent, leftMenuInterface} from "@views/main/support/main/MainInterface";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Collapse} from '@mui/material';
import ExpandLess from "@mui/icons-material/ExpandLess";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {ExpandMore} from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import {getZIndex, invoker, showAlert} from '@views/helper/helper';

const speedDialActionItem = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];
function Footer(props: any) {
  return (
      <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
      >
        {speedDialActionItem.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
            />
        ))}
      </SpeedDial>

  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
interface AppInfoInterface {app_version : string , latest_version : string, is_latest : Boolean, port : number}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();
const title = "ContentManager";


/**
 *
 * @param props
 * @constructor
 */
export default function Dashboard(props:DashboardInterface) {
  const [open, setOpen] = React.useState<boolean>(true);
  const [mainContainer , setMainContainer] = React.useState<React.ReactNode>(props.defaultMainContainer || <></>)
  const [appInfo , setAppInfo] = React.useState<AppInfoInterface | null>(null)
  props.leftMenu.map((leftMenu:leftMenuInterface) => {
    if(leftMenu.collapse === true){
      const [collapse, setCollapse] = React.useState(false);
      leftMenu["currentCollapse"] = collapse;
      leftMenu["setCollapse"] = setCollapse;
    }

  })
  React.useEffect(() => {
    invoker("$app-info")
    .then((appInfo : AppInfoInterface) => {
      console.log('appInfo',appInfo) ;
      setAppInfo(appInfo);
    });
  },[])
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar id="main-app-bar" position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >

            
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {title}
              </Typography>
           
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={()=>{
                    if(appInfo !== null){
                      showAlert({
                        title : `
                        Ver. ${appInfo.app_version} 
                        <br/>
                        ${appInfo.is_latest ? "최신버전입니다." : "업데이트가 필요합니다."}
                        <br/>
                        juny3738@gmail.com
                        <br/>
                        Copyright © 2022 
                        `,
                        severity : "info"
                      })
                    }else{
                      showAlert({
                        title : `앱 정보가 업습니다.`,
                        severity : "warning"
                      })
                    }
                    
                  }}
                  color="inherit"
                >
                  <QuestionMarkIcon />
                </IconButton>
              </div>
     
          </Toolbar>
        </AppBar>
        <Drawer id="main-app-gnb" variant="permanent" open={open} style={getZIndex(-1)}>
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
          <List component="nav">
		<React.Fragment>
	  	{props.leftMenu.map((leftMenu:leftMenuInterface) => {
			const drive = <Divider sx={{ my: 1 }} />
            const isCollapse:boolean = leftMenu.collapse || false;
            const collapseItems : leftMenuInterface[] | [] = leftMenu.items || [];

			return (
				<>
					<ListItemButton onClick={(event : React.MouseEvent<HTMLElement>)=>{

                        const DrawerEvent :DrawerClickEvent = {
                          setMainContainer : setMainContainer,
                          self : leftMenu
                        };
						leftMenu.onClick(DrawerEvent);
                        if(leftMenu.setCollapse){
                          const setCollapse = leftMenu.setCollapse;
                          setCollapse(!leftMenu.currentCollapse);
                        }
                        // leftMenu.setCollapse(!leftMenu.currentCollapse);
					}}>
                      {open
                      ? (
                                <ListItemIcon>
                                      {leftMenu.icon}
                                </ListItemIcon>
                          ) : (

                              <LightTooltip title={leftMenu.name}>
                                <ListItemIcon>
                                  {leftMenu.icon}
                                  {isCollapse ? leftMenu.currentCollapse ? <ExpandLess /> : <ExpandMore /> : <></>}
                                </ListItemIcon>
                              </LightTooltip>
                          )}
						<ListItemText primary={leftMenu.name} />
                      {isCollapse ? leftMenu.currentCollapse ? <ExpandLess /> : <ExpandMore /> : <></>}
					</ListItemButton>
                    {isCollapse ?
                        (
                            <Collapse in={leftMenu.currentCollapse} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding>
                                {collapseItems.map((collapseItem : leftMenuInterface) => {
                                    return (
                                      <ListItemButton
                                          sx={{ pl: 4 }}
                                          onClick={(event)=>{
                                              const DrawerEvent :DrawerClickEvent = {
                                                setMainContainer : setMainContainer,
                                                self : collapseItem
                                              };
                                              collapseItem.onClick(DrawerEvent);
                                      }}>
                                        {open ? <ListItemIcon>
                                          {collapseItem.icon}
                                        </ListItemIcon>
                                        :
                                            <LightTooltip title={collapseItem.name}>
                                            <ListItemIcon>
                                              {collapseItem.icon}
                                            </ListItemIcon>
                                            </LightTooltip>
                                        }

                                      <ListItemText primary={collapseItem.name} />
                                      </ListItemButton>
                                    )
                                })}
                              </List>
                            </Collapse>
                        )
                        :
                        (
                            <></>
                        )
                    }
					{leftMenu.drive ? drive : <></>}
				</>
			)
		})}
		</React.Fragment>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Stack
              direction="column"
              justifyContent="space-between"
              spacing={2}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>

                {mainContainer}


            </Container>
            {/* <Footer sx={{ pt: 1 }} /> */}
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}


