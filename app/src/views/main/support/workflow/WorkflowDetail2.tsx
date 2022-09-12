import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

import Typography from '@mui/material/Typography';
import WorkflowRuleIcons from '@views/main/support/workflow/WorkflowRuleIcons';
import {sender} from "@views/helper/helper";



export default function WorkflowDetail2(props:{
	workflowId : string
	sx ?: {}
}) {



	const [rules , setRules] = React.useState([]);

	const [workflowId , setWorkflowId] = React.useState(props.workflowId);
	console.log('workflowId : workflowDetail2 props.workflowid',props.workflowId)


	if(workflowId != props.workflowId){
		console.log('workflowId != props.workflowId',workflowId,props.workflowId)
		setWorkflowId(props.workflowId);
	}

	const getRules = (workflowId:string) => {
		sender("@WorkFlowRule/_getByWorkflowId",{workflow_id : workflowId})
			.then((workflowRules:any) => {

				setRules(workflowRules.data);
			})
			.catch((workflowRulesCatch) => {

			});
	}
	// if(props.workflowId != workflowId){
	// 	getRules(props.workflowId);
	// }
	React.useEffect(()=> {
		console.log('[] effect',workflowId)
		getRules(workflowId);
	},[])

	React.useEffect(() => {
		getRules(workflowId);
	},[workflowId])













  return (

    <Timeline position="left" sx={{...props.sx || {}}}>
	{rules.map((workflowRule:{module_name : string,
					  task_type_nm : string,
					  source_storage_nm : string,
					  target_storage_nm : string,
					  source_media_nm : string,
					  target_media_nm : string,
					  parent_id : null | string,
					  task_type : string
					}) => {
		if(workflowRule.parent_id == null){
			return (
				<></>
			)
		}
		return (
			<TimelineItem>
			<TimelineOppositeContent
			  sx={{ m: 'auto 0' }}
			  align="right"
			  variant="subtitle2"
			  color="text.secondary"
			>
				{workflowId}
			  <Typography  variant="caption" component="span">
			  {workflowRule.module_name}
			  </Typography>
			  <br/>
			  <Typography >
			  {workflowRule.task_type_nm}
			  </Typography>
			</TimelineOppositeContent>
			<TimelineSeparator>
			  <TimelineConnector />
			  <TimelineDot>
				<WorkflowRuleIcons task_type={workflowRule.task_type} />
			  </TimelineDot>
			  <TimelineConnector />
			</TimelineSeparator>
			<TimelineContent sx={{ py: '8px', px: 2 }}>
			  <Typography variant="caption" component="span">
			    {workflowRule.source_storage_nm+'('+workflowRule.source_media_nm+')'}
			  </Typography>
			  <br/>
			  <Typography variant="caption">
			  	{workflowRule.target_storage_nm+'('+workflowRule.target_media_nm+')'}
			  </Typography>
			</TimelineContent>
		      </TimelineItem>
		)
	})}
    </Timeline>

  );
}
