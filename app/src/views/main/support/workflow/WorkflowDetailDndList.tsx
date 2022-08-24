import React, { useState } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import {arrayMoveImmutable} from "array-move";
import {Button,Stack} from "@mui/material";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import ListItemButton from '@mui/material/ListItemButton';
import InboxIcon from '@mui/icons-material/Inbox';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete'
import RuleAddIcon from '@mui/icons-material/PlaylistAdd';
import {useDispatch, useSelector} from "react-redux";
export default function WorkflowDetailDndList(){
	const dispatch = useDispatch();
	const { rules } = useSelector((state:any) => {return state.rules})
	const { sort } = useSelector((state:any) => {return state.sort})
	console.log('sort',sort);
	let equalCheck:boolean = true;
	rules.map((rule:{_id : string}, index:number) => {
		if(sort[index]._id != rule._id){
			equalCheck = false;
		}
	}) 


	const onDrop = (event:any) => {
		
		dispatch({type:"RULES.SORT_CHANGE",value:arrayMoveImmutable(sort, event.removedIndex+1, event.addedIndex+1)});
	}
//   const onDrop = (test:any) => {
// 	console.log('test')
//   }
  return (
    <List>
	{/* RuleAddIcon */}
	<Stack direction="row" spacing={2}>
		<Button variant="outlined" startIcon={<RuleAddIcon />}>
			작업흐름 추가
		</Button>
	</Stack>
      <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
        {sort.map((rule:{_id : string, module_name : string, parent_id : null | string, task_type_nm : string}) => {
	if(rule.parent_id === null){
		return (<></>)
	}	
	return (
	
          <Draggable key={rule._id}>
		
			<ListItem >
			<Tooltip title="드래그 하여 작업순서 변경">
					<ListItemIcon className="drag-handle">
						<DragHandleIcon />
					</ListItemIcon>
			</Tooltip>
			<ListItemText 
				primary={rule.module_name} 
				primaryTypographyProps={{style:{marginRight:"100px"}}}
				secondary={rule.task_type_nm}
				className="drag-handle"
				/>
			<ListItemSecondaryAction>
				<Tooltip title="작업흐름 삭제">
					<ListItemIcon>
						<DeleteIcon />
					</ListItemIcon>
				</Tooltip>
			</ListItemSecondaryAction>
			</ListItem>
		{/* </Stack> */}
          </Draggable>
        )
	})}
      </Container>
    </List>
  );
};