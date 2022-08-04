import * as React from 'react';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import MenuList from '@views/main/support/config/MenuList';

import Metadata from "@views/main/Metadata";
import Code from "@views/main/Code";
import Storage from "@views/main/Storage";
import Module from "@views/main/Module";
import Workflow from "@views/main/Workflow";
export default function Config() {
	const [view, setView] = React.useState(<Metadata />)
	return (
		<Grid container spacing={2} style={{height: '100vh'}} >
			<Grid item xs={3}  style={{height: '100vh'}}>
			<Box sx={{borderRight:1, height:'100vh'}}>
				<MenuList 
					onClick={(menuId : string) => {
						if(menuId == 'metadata'){
							setView(<Metadata />);
						}
						if(menuId == 'storage'){
							setView(<Storage />);
						}
						if(menuId == 'code'){
							setView(<Code />);
						}
						if(menuId == 'module'){
							setView(<Module />);
						}
						if(menuId == 'workflow'){
							setView(<Workflow />);
						}
					}}
				/>
			</Box>
			</Grid>
			<Grid item xs={9} style={{height: '100vh'}}>
				{view}
			</Grid>
		</Grid>
	);
}
