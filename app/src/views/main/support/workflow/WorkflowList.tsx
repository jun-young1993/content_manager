import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import Typography from '@mui/material/Typography';
import { GridToolbarContainer} from '@mui/x-data-grid';
import FormDialog from "@views/components/FormDialog";
import Grid from '@mui/material/Grid';
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
    import WorkflowDetail from "@views/main/support/workflow/WorkflowDetail";
    import electron from "electron";
const ipcRenderer = electron.ipcRenderer;

const getRows = () =>{
	const workflows = ipcRenderer.sendSync("@WorkFlow/all");
	if(workflows.success){
		return workflows.data;
	}
}
export default function WorkflowList() {
	const [rows,setRows] = React.useState(getRows);
	const baseAlert = ((<CustomAlert open={false} />));
    const [alert, setALert] = React.useState(baseAlert)
    const [details , setDetails] = React.useState([]);
    const [workflowView , setWorkflowView] = React.useState(<WorkflowDetail 
	id={"test"}
	/>)	
    
    const onClickItem = (evt : any, id:any) => {
	console.log(id);
	setWorkflowView(<WorkflowDetail 
		id={id}
	/>)
    }
    const reload = () => {
        setRows(getRows);
    }
  return (
	<Grid container spacing={2} style={{height: '100vh'}} >
		<Grid item xs={6}  style={{height: '100vh'}}>
			<Box sx={{ width: '100%', borderRight:1, height:'100vh', bgcolor: 'background.paper' }}>
				<Stack spacing={2} direction="row">
						<FormDialog
						buttonTitle="등록"
						values={{
							name : '',
							description : ''
						}}
						variant="standard"
						fields={[
							{
							name : "name",
							label : "워크플로우 명",
							variant:"standard"
							},
							{
							name: "description",
							label: "설명",
							variant: "standard"
							}
						]}
						onSaveClick={(result:any)=>{
							if(result){
								const values = result.values;
								if(values){
								const exists = ipcRenderer.sendSync("@WorkFlow/first",{code:values.name});
								if(exists.success){
									setALert((<CustomAlert serverity="info" 
												title="중복된 워크플로우 명입니다. 다른 워크플로우 명 으로 요청해주세요" 
										/>));
									return false;
								}

								const insert = ipcRenderer.sendSync("@WorkFlow/insert",values);
								if(insert.success){
									reload();
									setALert((<CustomAlert serverity="success" 
												title="등록되었습니다." 
										/>));
										
									return  true;
								}

								console.log('insert',insert);
								}
								setALert((<CustomAlert serverity="error" 
											title="등록에 실패했습니다." 
									/>))
								return false;
							}

						}}
						/>
						
				</Stack>
			
				<List>
				
				{rows.map((row:any) => {
					return (
						<>
						<ListItem disablePadding>
							<ListItemButton onClick={(evt:any)=> {
								onClickItem(evt,row._id);
							}}>
								<ListItemText primary={row.name}/>
							</ListItemButton>
						</ListItem>
							<ListItemText
							secondary={
							<React.Fragment>
								{row.description}
							</React.Fragment>
							}
							/>
						<Divider />
						</>
					
					)
				})}
				<ListItem disablePadding>
				<ListItemButton component="a" href="#simple-list">
				<ListItemText primary="Spam" />
				</ListItemButton>
				</ListItem>
				</List>
				<Divider />
				{alert}
			</Box>
		</Grid>
		<Grid item xs={6} style={{height: '100vh'}}>
			{workflowView}
		</Grid>
	</Grid>
  );
}
