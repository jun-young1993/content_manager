import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import IngestStep from '@views/main/support/ingest/IngestStep';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
const steps = ['메타데이터 등록', '미디어 선택', 'Create an ad'];

export default function Ingest() {
	
	return (
		<Grid container spacing={2} style={{height: '100vh'}} >
			<Grid item xs={2}  style={{height: '100vh'}}>
			<Box sx={{borderRight:1, height:'100vh'}}>
				<div>test</div>
			</Box>
			</Grid>
			<Grid item xs={10} style={{height: '100vh'}}>
				<div>test</div>
			</Grid>
		</Grid>
	);
}
