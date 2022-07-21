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
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
const { createTreeHierarchy } = require('hierarchy-js');
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
const reducer = (prevState:any, newState:any) => ({
	...prevState,
	...newState
    })
export default function WorkflowList() {
	const [rows,setRows] = React.useState(getRows);
	const baseAlert = ((<CustomAlert open={false} />));
    const [alert, setALert] = React.useState(baseAlert)
    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [workflowId, setWorkflowId] = React.useState(null);
    const [selectedId , setSelectedId] = React.useState(null);
    const [treeData, setTreeData] = React.useReducer(reducer,{
	id : 'no',
	name : '작업흐름이 없습니다.'
    })



    const workflowByMenuItem = () =>{
	const data = ipcRenderer.sendSync("@Module/all");
	console.log('modules',data);
	const items = []
	if(data.success){
		const module = data.data;
		for(let codeItemIndex = 0; codeItemIndex < module.length; codeItemIndex++){
			items.push((<MenuItem key={module[codeItemIndex]._id} value={module[codeItemIndex]._id}>{module[codeItemIndex].name}</MenuItem>))	
		}
		return (items);
	}
	
    }

    const [moduleItems , setModuleItems] = React.useState(workflowByMenuItem);
    const makeHierarchy = (workflowId : any) => {
	const ruleData = ipcRenderer.sendSync("@WorkFlowRule/getByWorkflowId",{workflow_id : workflowId});
	const expandedArray:any = [];
	ruleData.data.map((rule:any) => {
		console.log('rule',rule)
		expandedArray.push(rule._id);
	})
	console.log('beforExpanded',expandedArray)
	setExpanded(expandedArray);
	console.log('expanded',expandedArray)
	console.log('hierarchy',createTreeHierarchy(ruleData.data)[0]);
	return createTreeHierarchy(ruleData.data)[0];
	
    }

    const onClickItem = (evt : any, id:any) => {
	
	let children:any = makeHierarchy(id);
	
	
	setWorkflowId(id);
	setTreeData(children);
	setTree(renderTree(children))

    }
    const reload = () => {
        setRows(getRows);
    }
    const [workflowDetailView,setWorkflowDetailView] = React.useState(<WorkflowDetail 
	workflowId={workflowId}
	treeData={treeData}
	moduleItems={moduleItems}
	/>);
	const renderTree = (nodes: any) => (
		
		(
			<TreeItem key={nodes.id} 
				nodeId={nodes.id} 
				label={nodes.name} 
				>
				{Array.isArray(nodes.children)
				? nodes.children.map((node:any) => renderTree(node))
				: null}
			</TreeItem>
			)
		
	);
	const [tree , setTree] = React.useState(renderTree(treeData));	
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
									result.setOpen(false)
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
							select : true,
							name : "module_id",
							label : '모듈',
							fullWidth : true,
							variant : "standard",
							children : moduleItems
						}
					]}
					onSaveClick={(result:any)=>{
						if(result){
							const values = result.values;
							console.log(values);
							if(values){
								const moduleInfo = ipcRenderer.sendSync("@Module/first",{_id : values.module_id});
								console.log(moduleInfo);
								let addChildrenModule:any =  null;
								let children:any = null;
								
								// const selecteIds = selectedId.split('/');

									children = treeData['children'] =[{
										id : values.module_id,
										name : moduleInfo.data.name
									}];
									console.log('props.treeData',treeData);
									treeData['children'] = children;	
									
									const insert =ipcRenderer.sendSync("@WorkFlowRule/insert",{
										workflow_id : workflowId,
										module_id : values.module_id,
										module_name : moduleInfo.data.name,
										parent_id : selectedId
									})
										
						
								
								if(insert.data){
									
										setTree(renderTree(makeHierarchy(workflowId)));
										result.setOpen(false);
									
								}
							
							}
						
							return false;
						}

					}}
				/>
							
			</Stack>
			<TreeView
				aria-label="rich object"
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpanded={expanded}
				expanded={expanded}
				defaultExpandIcon={<ChevronRightIcon />}
				onNodeSelect={(evt:any,nodeId:any)=>{
					setSelectedId(nodeId);
				}}
				sx={{ height: '100vh', flexGrow: 1,  overflowY: 'auto' }}
			>
				{tree}
			</TreeView>
		</Grid>
	</Grid>
  );
}
