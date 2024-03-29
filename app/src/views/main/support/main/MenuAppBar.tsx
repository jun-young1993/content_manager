import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Fade from '@mui/material/Fade';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const pages = [
  {
    key : 'Content',
    label : "콘텐츠"
  },
  {
    key : 'Ingest',
    label : "인제스트"
  },
  {
    key : 'TaskMonitor',
    label : "모니터링"
  },
  {
    key : 'Config',
    label : "설정"
  }
  
];

export function FadeMenu(props:any) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClick = () => {
    if(props.onClick){
      props.onClick()
    }
  }

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={onClick}>Profile</MenuItem>
        <MenuItem onClick={onClick}>My account</MenuItem>
        <MenuItem onClick={onClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

const MenuAppBar = (props:any) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchoreElConfig, setAnchorElConfig] = React.useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseNavMenu = (event:any) => {
    console.log(event);
    props.onClick(event.target.value);
    
    // handleOpenConfigMenu(event.currentTarget)
    setAnchorElNav(null);
  };



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/*<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
          <Typography
            variant="h6"
            noWrap
            component="a"
            // href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ContentManager
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => {
            
                  return (
                      <MenuItem key={page.key} value={page.key} onClick={() => {
                        handleCloseNavMenu({
                            target : {
                                value : page.key
                            }
                        })
                    }}>
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                  )
              })}
              {/* {pages.map((page) => (
                
                <MenuItem key={page.key} value={page.key} onClick={() => {
                    handleCloseNavMenu({
                        target : {
                            value : page.key
                        }
                    })
                }}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
    
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
       
              return (
                  <Button
                    key={page.key}
                    value={page.key}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.label}
                  </Button>
                )
              })}
          </Box>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{
                        'aria-label': 'search' ,
                        'onKeyPress':(event:any)=>{

                            if(event.key === 'Enter'){
                                if(props.onSearch){
                                    props.onSearch(event.target.value);
                                    // event.target.value = '';
                                }

                            }

                        }
                    }}
                />
            </Search>
          {/*<Box sx={{ flexGrow: 0 }}>*/}
          {/*  <Tooltip title="Open settings">*/}
          {/*    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>*/}
          {/*      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />*/}
          {/*    </IconButton>*/}
          {/*  </Tooltip>*/}
          {/*  <Menu*/}
          {/*    sx={{ mt: '45px' }}*/}
          {/*    id="menu-appbar"*/}
          {/*    anchorEl={anchorElUser}*/}
          {/*    anchorOrigin={{*/}
          {/*      vertical: 'top',*/}
          {/*      horizontal: 'right',*/}
          {/*    }}*/}
          {/*    keepMounted*/}
          {/*    transformOrigin={{*/}
          {/*      vertical: 'top',*/}
          {/*      horizontal: 'right',*/}
          {/*    }}*/}
          {/*    open={Boolean(anchorElUser)}*/}
          {/*    onClose={handleCloseUserMenu}*/}
          {/*  >*/}
          {/*    {settings.map((setting) => (*/}
          {/*      <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
          {/*        <Typography textAlign="center">{setting}</Typography>*/}
          {/*      </MenuItem>*/}
          {/*    ))}*/}
          {/*  </Menu>*/}
          {/*</Box>*/}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MenuAppBar;
