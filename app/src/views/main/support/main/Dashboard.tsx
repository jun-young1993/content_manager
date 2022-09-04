import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
// import Tooltip from '@mui/material/Tooltip';
import {LightTooltip} from "@src/views/components/tooltip/Tooltip";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {DashboardInterface, leftMenuInterface, DrawerClickEvent} from "@views/main/support/main/MainInterface";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Collapse } from '@mui/material';
import ExpandLess from "@mui/icons-material/ExpandLess";
import {ExpandMore} from "@mui/icons-material";
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

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
  const [mainContainer , setMainContainer] = React.useState<React.ReactNode>(<></>)

  props.leftMenu.map((leftMenu:leftMenuInterface) => {
    if(leftMenu.collapse === true){
      const [collapse, setCollapse] = React.useState(false);
      leftMenu["currentCollapse"] = collapse;
      leftMenu["setCollapse"] = setCollapse;
    }

  })

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
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
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
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
                                      <ListItemIcon>
                                        {collapseItem.icon}
                                      </ListItemIcon>
                                      <ListItemText primary={collapseItem.name} />
                                      </ListItemButton>
                                    )
                                })}
                                {/*{collapseItems.map(collapseItem:any) => {*/}
                                {/*  return (*/}
                                {/*    //   <></>*/}
                                {/*    // <ListItemButton onClick={(event)=>{*/}
                                {/*    //*/}
                                {/*    // }}>*/}
                                {/*    // <ListItemIcon>*/}
                                {/*    //*/}
                                {/*    // </ListItemIcon>*/}
                                {/*    // <ListItemText primary={leftMenuItem.name} />*/}
                                {/*    // </ListItemButton>*/}
                                {/*  )*/}

                                {/*}}*/}

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
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {mainContainer}
            {/* <Grid container spacing={3}> */}
              {/* Chart */}
              {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid> */}
              {/* Recent Deposits */}
              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid> */}
              {/* Recent Orders */}
              {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid> */}
            {/* </Grid> */}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}


