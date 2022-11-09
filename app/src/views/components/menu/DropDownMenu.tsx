import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
interface DropDownMenuItemInterface {
	title : string
	onClick ?: (event : React.SyntheticEvent) => void
	key : string
}
export interface DropDownMenuProps {
	items : DropDownMenuItemInterface[]
}
export default function DropDownMenu(props:DropDownMenuProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
	  setAnchorEl(event.currentTarget);
	};
	const handleClose = (event: Event | React.SyntheticEvent) => {
	  setAnchorEl(null);
	};
      
	return (
	  <div>
	    <IconButton
	      id="basic-button"
	      aria-controls={open ? 'basic-menu' : undefined}
	      aria-haspopup="true"
	      aria-expanded={open ? 'true' : undefined}
	      onClick={handleClick}
	    >
	      {/* {props.title || ""} */}
	      <MenuIcon />
	    </IconButton>
	    <Menu
	      id="basic-menu"
	      anchorEl={anchorEl}
	      open={open}
	      onClose={handleClose}
	      MenuListProps={{
		'aria-labelledby': 'basic-button',
	      }}
	    >
	     	{props.items.map((menuItem : DropDownMenuItemInterface) => {
			return (
				<MenuItem key={`${menuItem.key}`} onClick={(event: React.SyntheticEvent)=>{
					if(menuItem.onClick){
						menuItem.onClick(event);
					}
					handleClose(event);
				}}>
					{menuItem.title}
				</MenuItem>
			)
		})}
	    </Menu>
	  </div>
	);
	
}