import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import electron from "electron";
import { isEmpty } from 'lodash';
import WorkflowDetailDndList from '@views/main/support/workflow/WorkflowDetailDndList';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { useDispatch,useSelector} from "react-redux";
import {sender,showAlert} from "@views/helper/helper";
const ipcRenderer = electron.ipcRenderer;


export interface updateRuleInterface {parent_id : string , rule_id : string};
export default function WorkflowDetailEditDialog(){
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);
	const { rules } = useSelector((state:any) => {return state.rules})
	const { sort } = useSelector((state:any) => {return state.sort})

	const handleClickOpen = () => {
	  setOpen(true);
	};
      
	const handleClose = (event:any , reason?:string) => {
		if(reason == 'backdropClick'){
			return false;
		}
	  	setOpen(false);
	};

	const handleSave = () => {
		sender("@WorkFlowRule/_changeOrder",sort)
		.then((result) => {
			// @close = "handleClose('event')";
			dispatch({type : "RULES.PUT" , value : sort});
			showAlert({
				title : '워크플로우 흐름 변경이 적용되었습니다.',
				severity : "info",
			},()=>{
				setOpen(false);
			})
			
			// handleClose('event');
		
		})
		return;
		ipcRenderer.send("@WorkFlowRule/_changeOrder",sort)
		ipcRenderer.on("@WorkFlowRule/_changeOrder/reply",(event:any,result) => {
			console.log('changeOrder',result);
			dispatch({type : "RULES.PUT" , value : sort});
			ipcRenderer.removeAllListeners("@WorkFlowRule/_changeOrder/reply");
		})
		return;
		let sortedRule : any | [updateRuleInterface] | [] = [];
		
		sort.map((sortRule:{_id :string},index:number) => {
			if(index >= 1){
				const parentId : string = sort[index-1]._id;
				const updateRule :updateRuleInterface = {
					parent_id : parentId,
					rule_id : sortRule._id
				};
				sortedRule.push(updateRule)
				console.log(sortedRule);
				// const changeParentId = sort[index-1].parent_id;
				// const currentId = sortRule._id;
				// ipcRenderer.send("@WorkFlowRule/_update",{parent_id : changeParentId},{_id : currentId})
				// ipcRenderer.on("@WorkFlowRule/_update/reply",(event:any,result) => {
				// 	console.log('_update result',result)
					
				// })
			}
			// parent_id
			// _id
		})
	}

	return (
		<>
			<Button variant="outlined" 
						startIcon={<FormatListNumberedIcon />}
						onClick={()=>{
							if(isEmpty(rules)){
								console.log('send workflow')
								ipcRenderer.send("#ShowMessageAlert",{
									title : "워크플로우 목록을 선택후 수정해주세요.",
									severity : "warning"
								})
								return false;
							}
							dispatch({type : "RULES.SORT_INIT"});
							handleClickOpen();
							
						}}
					>
						워크플로우 편집
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>워크플로우 편집</DialogTitle>
				<DialogContent>
					<WorkflowDetailDndList />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>취소</Button>
					<Button onClick={handleSave}>저장</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
