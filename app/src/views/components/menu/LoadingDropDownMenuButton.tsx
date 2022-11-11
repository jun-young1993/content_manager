import React from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem, Menu, Fade} from "@mui/material";
import { isEmpty } from "lodash";

interface LoadingMenuItemInterface {
	startTitleIcon ?: JSX.Element
	endTitleIcon ?: JSX.Element
	title : string
	onClick ?: (setLoading:React.Dispatch<React.SetStateAction<boolean>>) => void
}
interface LoadingMenuButtonProps {
	title : string
	item : LoadingMenuItemInterface[]
}
export default function LoadingDropDownMenuButton(props:LoadingMenuButtonProps) : JSX.Element{
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [loading , setLoading] = React.useState(false);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
	  setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
	  setAnchorEl(null);
	};

	return (
		<>
			<LoadingButton
				loading={loading}
				variant="outlined"
				endIcon={<KeyboardArrowDownIcon />}
				//   startIcon={<AddIcon />}
				// id="ingest-fade-button"
				aria-controls={open ? 'ingest-fade-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				{props.title}		
			</LoadingButton>
			<Menu
				// id="ingest-fade-menu"
				MenuListProps={{
					'aria-labelledby': 'ingest-fade-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				{
				isEmpty(props.item)
				? (<MenuItem>No Item</MenuItem>)
				: props.item.map((item : LoadingMenuItemInterface) => {					
						return (<MenuItem onClick={()=>{
							if(item.onClick) item.onClick(setLoading);

							handleClose();
						}}> 
							{item.startTitleIcon || <></>}
							{item.title}
							{item.endTitleIcon || <></>}
						</MenuItem>)
					}
				)}
			</Menu>
		</>
	)

}