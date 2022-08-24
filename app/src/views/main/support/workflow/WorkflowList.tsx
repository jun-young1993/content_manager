import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import FormDialog from "@views/components/FormDialog";
import Grid from '@mui/material/Grid';
import TreeItem from '@mui/lab/TreeItem';
import WorkflowDetail from '@views/main/support/workflow/WorkflowDetail';
import WorkflowDetailEditDialog from '@views/main/support/workflow/WorkflowDetailEditDialog';
const { createTreeHierarchy } = require('hierarchy-js');
import {useDispatch, useSelector} from "react-redux";
import {
	Button,
	Stack,
	FormControlLabel,
	FormControl,
	Select,
	MenuItem,
	Box
    } from '@mui/material';
    import CustomAlert from "@views/components/CustomAlert";

    import electron from "electron";
import { isEmpty } from 'lodash';

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
	const dispatch = useDispatch();
	
	
	const [rows,setRows] = React.useState([]);

	ipcRenderer.send("@WorkFlow/_all");
	ipcRenderer.on("@WorkFlow/_all/reply",(event,result) => {

		setRows(result.data);

		ipcRenderer.removeAllListeners("@WorkFlow/_all/reply");
	})
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
    const makeHierarchy = (workflowId : string) => {
			console.log('getWorkflow',workflowId);

		return new Promise((resolve, reject) => {


		// const ruleData =
			ipcRenderer.send("@WorkFlowRule/_getByWorkflowId",{workflow_id : workflowId});
			ipcRenderer.on("@WorkFlowRule/_getByWorkflowId/reply",(err,ruleData) => {
				console.log('ruleData',ruleData);
				const expandedArray:any = [];
				if(ruleData){
					if(ruleData.success){
						if(ruleData.data){
							console.log('ruleData',ruleData)
							if(ruleData.data.length != 0){
								ruleData.data.map((rule:any) => {
									console.log('rule',rule)
									expandedArray.push(rule._id);
								})
								console.log('beforExpanded',expandedArray)
								setExpanded(expandedArray);
								console.log('expanded',expandedArray)
								const hierarchy = createTreeHierarchy(ruleData.data);
								if(hierarchy){
									resolve(hierarchy[0]);
								}
							}




						}

					}

				}else{
					resolve ([{
						id : 'root',
						name : 'start workflow'
					}]);
				}
			})





		})
    }

    const onClickItem = (evt : any, id:any) => {
	
		// let children:any =
			makeHierarchy(id)
				.then((children) => {
					setWorkflowId(id);
					setTreeData(children);
					setTree(renderTree(children))
				});

			




    }
    const reload = () => {
		ipcRenderer.send("@WorkFlow/_all");
		ipcRenderer.on("@WorkFlow/_all/reply",(event,result) => {
			console.log('result data',result.data);
			setRows(result.data);

			ipcRenderer.removeAllListeners("@WorkFlow/_all/reply");
		})
    }
   
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
		<Grid item xs={5}  style={{height: '100vh'}}>
			<Typography  variant="h6" gutterBottom={true}>
			  {"워크플로우 목록"}
			  </Typography>
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

									// const insert = ipcRenderer.sendSync("@WorkFlow/insert",values);
										ipcRenderer.send("@WorkFlow/_insert",values);
										ipcRenderer.on("@WorkFlow/_insert/reply",(event, insert) => {
											console.log('insert ager ',insert);
											if(insert.success){
												reload();
												result.setOpen(false)
												setALert((<CustomAlert serverity="success"
																	   title="등록되었습니다."
												/>));

												return  true;
											}
											console.log('insert',insert);
											setALert((<CustomAlert serverity="error"
																   title="등록에 실패했습니다."
											/>))
											return false;
										})

								}

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
								// onClickItem(evt,row._id);
								// setWorkflowId(row._id);
								const selectedWorkflowId = row._id;
								if(!isEmpty(selectedWorkflowId)){
									ipcRenderer.send("@WorkFlowRule/_getByWorkflowId",{workflow_id : selectedWorkflowId});
									ipcRenderer.on("@WorkFlowRule/_getByWorkflowId/reply",(event,ruleData) => {
										console.log('ruleData workflowDetail',ruleData)
										
									
										dispatch({type:"RULES.PUT" , value : ruleData.data});
												
										
										ipcRenderer.removeAllListeners("@WorkFlowRule/_getByWorkflowId/reply");
									});
								}
								
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
				{/*<ListItem disablePadding>*/}
				{/*<ListItemButton component="a" href="#simple-list">*/}
				{/*<ListItemText primary="Spam" />*/}
				{/*</ListItemButton>*/}
				{/*</ListItem>*/}
				</List>
				{/*<Divider />*/}
				{alert}
			</Box>
		</Grid>
		<Grid item xs={7} style={{height: '100vh'}}>
			<Typography  variant="h6" gutterBottom={true}>
			  {"워크플로우 흐름"}
			  </Typography>
			  
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
								console.log('values',values);
								if(values){
									
									ipcRenderer.send("@Module/_first",{_id : values.module_id});

									ipcRenderer.on("@Module/_first/reply",(err,moduleInfo) => {
										console.log('moduleInfo',moduleInfo);
										let addChildrenModule:any =  null;
										let children:any = null;

										// const selecteIds = selectedId.split('/');

										children = treeData['children'] =[{
											id : values.module_id,
											name : moduleInfo.data.name
										}];
										// console.log('props.treeData',treeData);
										treeData['children'] = children;
										if(values.module_id == moduleInfo.data._id) {
											ipcRenderer.send("@WorkFlowRule/_insert",{
												workflow_id : workflowId,
												module_id : values.module_id,
												module_name : moduleInfo.data.name,
												parent_id : selectedId
											})
											ipcRenderer.on("@WorkFlowRule/_insert/reply",(err,insert) => {
												console.log('workflow callback insert',insert);
												
												if(insert.data){
													makeHierarchy(insert.data.workflow_id)
														.then((children) => {

															setTree(renderTree(children));
															result.setOpen(false);						
														})
												}
												ipcRenderer.removeAllListeners("@WorkFlowRule/_insert/reply");
											})
		
										}
									

										ipcRenderer.removeAllListeners("@WorkFlowRule/_first/reply");

									})


								}

								return false;
							}

						}}
					/>
					<WorkflowDetailEditDialog />
				</Stack>
			<WorkflowDetail />
		</Grid>
	</Grid>
  );
}
