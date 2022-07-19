import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export default function MenuList(props:any) {
  const [open, setOpen] = React.useState(true);

  const [userOpen, setUserOpen] = React.useState(true);
  const handleUserClick = () => {
	setUserOpen(!userOpen);
  };

  const [systemOpen, setSystemOpen] = React.useState(false);
  const handleSystemClick = () => {
	setSystemOpen(!systemOpen);
  };

  const [taskOpen, setTaskOpen] = React.useState(false);
  const handleTaskClick = () => {
    setTaskOpen(!taskOpen);
  };


  const menuClick = (menuId:string) => {
	if(props.onClick){
		props.onClick(menuId);
	}
	
  }
  const listItem = (title:string,id:string,icon:any,collapse:boolean = false) => {
	let sxStyle = {};
	if(collapse){
		sxStyle = { pl: 4 }
	}
	
	return (
		<ListItemButton sx={sxStyle} onClick={(event)=>{
			menuClick(id);
		}}>
		<ListItemIcon>
		  {icon}
		</ListItemIcon>
		<ListItemText primary={title} />
	      </ListItemButton>
	);
  }
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
//       subheader={
//         <ListSubheader component="div" id="nested-list-subheader">
// 		<SettingsIcon />
//         </ListSubheader>
//       }
    >
      <ListItemButton onClick={handleUserClick}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="사용자 관리" />
        {userOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
	<Collapse in={userOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
	{listItem("메타데이터","metadata",<StarBorder />,true)}
        </List>
      	</Collapse>
        <ListItemButton onClick={handleTaskClick}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="작업 관리" />
        {taskOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
	<Collapse in={taskOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {listItem("워크플로우","workflow",<StarBorder />,true)}
	        {listItem("작업 모듈","module",<StarBorder />,true)}
          {listItem("스토리지","storage",<StarBorder />,true)}
        </List>
      	</Collapse>
	      <ListItemButton onClick={handleSystemClick}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="시스템 관리" />
        {systemOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
	<Collapse in={systemOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
	{listItem("코드","code",<StarBorder />,true)}
        </List>
      	</Collapse>
      {/* <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton> */}
      {/* <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse> */}
    </List>
  );
}
