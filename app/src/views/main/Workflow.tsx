import * as React from 'react';
import { GridToolbarContainer} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import WorkflowList from "@views/main/support/workflow/WorkflowList";

import FormDialog from "@views/components/FormDialog";
import {
	Button,
	Stack,
	FormControlLabel,
	FormControl,
	Select,
	MenuItem,
	SelectChangeEvent,
	TextField, 
	Box
    } from '@mui/material';
    import CustomAlert from "@views/components/CustomAlert";
export default function Workflow() {
	const [view, setView] = React.useState(null)
	
	return (
				<WorkflowList />
	);
}