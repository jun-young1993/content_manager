import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
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
    
    import electron from "electron";
const ipcRenderer = electron.ipcRenderer;
interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}
function workflowByMenuItem(){
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
const data: RenderTree = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4',
        },
      ],
    },
  ],
};

export default function WorkflowDetail(props:any) {
	const workflowId = props.id;
	const baseAlert = ((<CustomAlert open={false} />));
    const [alert, setALert] = React.useState(baseAlert)
  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

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
								children : workflowByMenuItem()
							},
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
									
								}
								setALert((<CustomAlert serverity="error" 
											title="등록에 실패했습니다." 
									/>))
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
		sx={{ height: '100vh', flexGrow: 1,  overflowY: 'auto' }}
		>
		{renderTree(data)}
		</TreeView>
	</>
  );
}
