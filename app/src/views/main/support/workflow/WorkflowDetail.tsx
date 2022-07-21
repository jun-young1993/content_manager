import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import FormDialog from "@views/components/FormDialog";
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
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
    
    import electron from "electron";
import Workflow from '../../Workflow';
const ipcRenderer = electron.ipcRenderer;
interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}



// const data: RenderTree = {
//   id: 'root',
//   name: 'Parent',
//   children: [
//     {
//       id: '1',
//       name: 'Child - 1',
//     },
//     {
//       id: '3',
//       name: 'Child - 3',
//       children: [
//         {
//           id: '4',
//           name: 'Child - 4',
//         },
//       ],
//     },
//   ],
// };
const reducer = (prevState:any, newState:any) => (Object.assign(prevState,newState));

export default function WorkflowDetail(props:any) {
	
	console.log('before workflow detail',props);
		
	
	console.log('props',props.treeData);
	
	const [treeData , setTreeData] = React.useState({...props.treeData});
	
	const [moduleItems , setModuleItems] = React.useState(props.moduleItems);
	const [selectedId , setSelectedId] = React.useState(null);

	
	console.log('treeData',treeData);

	const [contextMenu, setContextMenu] = React.useState<{
		mouseX: number;
		mouseY: number;
	      } | null>(null);
	const handleContextMenu = (event: React.MouseEvent) => {
		event.preventDefault();
		setContextMenu(
			contextMenu === null
			? {
			mouseX: event.clientX + 2,
			mouseY: event.clientY - 6,
			}
			: // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
			// Other native context menus might behave different.
			// With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
			null,
		);
	};
	
	const handleClose = () => {
		setContextMenu(null);
	};
	const renderTree = (nodes: RenderTree) => (
		
		(<div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
			<TreeItem key={nodes.id} 
				nodeId={nodes.id} 
				label={nodes.name} 
				>
				{Array.isArray(nodes.children)
				? nodes.children.map((node) => renderTree(node))
				: null}
			</TreeItem>
			{/* <Menu
				open={contextMenu !== null}
				onClose={handleClose}
				anchorReference="anchorPosition"
				anchorPosition={
				contextMenu !== null
				? { top: contextMenu.mouseY, left: contextMenu.mouseX }
				: undefined
				}
			>
				<MenuItem onClick={()=>{

				}}>추가</MenuItem>
				<MenuItem onClick={handleClose}>Print</MenuItem>
				<MenuItem onClick={handleClose}>Highlight</MenuItem>
				<MenuItem onClick={handleClose}>Email</MenuItem>
			</Menu> */}
		</div>)
		
	);


	// React.useEffect(()=>{
	// 	console.log('before render tree',treeData);
	// 	setTree(renderTree(treeData));
	// },[treeData])
	const [tree , setTree] = React.useState(renderTree(props.treeData));	
  return (
	<>
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
									
									if(selectedId == 'root'){
										children = treeData['children'] =[{
											id : values.module_id,
											name : moduleInfo.data.name
										}];
										console.log('props.treeData',props.treeData);
										props.treeData['children'] = children;	
										
									}
									
									console.log(props.treeData);
									const insert =ipcRenderer.sendSync("@WorkFlowRule/insert",{
										workflow_id : props.workflowId,
										module_id : values.module_id,
										module_name : moduleInfo.data.name,
										parent_id : selectedId

									})
									// setTree(props.treeData);
									return;
									const update =ipcRenderer.sendSync("@WorkFlow/update",{'children' :children},{_id : props.workflowId})
									if(update.data){
										const workflowData = ipcRenderer.sendSync("@WorkFlow/first",{_id : props.workflowId})
										console.log('workflowData',workflowData);
										if(workflowData){
											setTreeData(workflowData.data.children);
										}
									}
									console.log('update',update)
									console.log(addChildrenModule)
									console.log(props.workflowId);
									console.log(values);
								}
							
								return false;
							}

						}}
			/>
						
				</Stack>
		<TreeView
		aria-label="rich object"
		defaultCollapseIcon={<ExpandMoreIcon />}
		defaultExpanded={['root']}
		defaultExpandIcon={<ChevronRightIcon />}
		onNodeSelect={(evt:any,nodeId:any)=>{
			setSelectedId(nodeId);
		}}
		sx={{ height: '100vh', flexGrow: 1,  overflowY: 'auto' }}
		>
		{tree}
		</TreeView>
	</>
  );
}
