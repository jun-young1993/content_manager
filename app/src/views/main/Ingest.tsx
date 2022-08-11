import { Provider } from 'react-redux'
import { 
	Typography,
	Grid ,
	Box,
	MenuItem
} from '@mui/material';
import ContentMetadata from '@views/main/support/ingest/ContentMetadata';
import ContentSelect from '@views/main/support/ingest/ContentSelect';
import ContentMetadataStore from "@views/store/ContentMetadataStore";
import { useSelector, useDispatch } from "react-redux";
import {ipcRenderer} from 'electron';



export default function Ingest(){
	// ipcRenderer.send("@WorkFlow/_all");
	
	return (
	<Provider store={ContentMetadataStore}>
		<Box sx={{height:'auto'}}>
			<Typography variant="h4" style={{marginBottom:'10px'}}>메타데이터 등록</Typography>
		</Box>
		<Grid container spacing={2} style={{height: 'auto'}} >
			<Grid item xs={6}  style={{height: 'auto'}}>
			<Box sx={{borderRight:1, height:'auto'}}>
				<ContentMetadata />
			</Box>
			
			</Grid>
			<Grid item xs={6} style={{height: '100vh'}}>
				<ContentSelect />
			</Grid>
		</Grid>
	    </Provider>
	);
}