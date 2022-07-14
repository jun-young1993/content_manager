import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import IngestStep from '@views/main/support/ingest/IngestStep';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MenuList from '@views/main/support/config/MenuList';
const steps = ['메타데이터 등록', '미디어 선택', 'Create an ad'];
import Metadata from "@views/main/Metadata";
import Code from "@views/main/Code";
import Storage from "@views/main/Storage";
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
						console.log('menu id',menuId)
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
