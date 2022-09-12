import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

import Typography from '@mui/material/Typography';
import { ipcRenderer } from 'electron';
import { isEmpty } from 'lodash';

import COPYICON from '@mui/icons-material/ContentCopy';
import TRANSCODERICON from '@mui/icons-material/Transform';
import MEDIAINFOICON from '@mui/icons-material/Info';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

import WorkflowRuleIcons from '@views/main/support/workflow/WorkflowRuleIcons';
import { useSelector} from "react-redux";



export default function WorkflowDetail() {


		const { rules } = useSelector((state:any) => {return state.rules})







	// getWorkflowRule(props.workflowId)

	
	// const renderTree = function(data:any,){
	// 	if(!isEmpty(data.props)){
	// 		if(!isEmpty(data.props.children)){
	// 			renderTree()
	// 		}
	// 	}
	// }
	const mappingIcon = (moduleId : string) => {

	}
	const iconMapper = (taskType:string) => {
	
		const [type, job] = taskType.split('_');
		let icon = <DisabledByDefaultIcon />
		if(type == 'fs'){
			if(job == 'copy'){
				icon = <COPYICON />
			}
		}
		if(type == "transcoder"){
			if(job == "thumbnail"){
				
			}
			icon = <TRANSCODERICON />
		}
			

		if(type == "mediainfo"){
			if(job == "video"){

			}
			icon = <MEDIAINFOICON />
		}
			
		return icon;
	}
  return (
    <Timeline position="left">
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
					{/* <FastfoodIcon /> */}
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
		})
	}
      {/* <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          9:30 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Eat
          </Typography>
          <Typography>Because you need strength</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          variant="body2"
          color="text.secondary"
        >
          10:00 am
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Code
          </Typography>
          <Typography>Because it&apos;s awesome!</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" variant="outlined">
            <HotelIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Sleep
          </Typography>
          <Typography>Because you need rest</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          <TimelineDot color="secondary">
            <RepeatIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Repeat
          </Typography>
          <Typography>Because this is the life you love!</Typography>
        </TimelineContent>
      </TimelineItem> */}
    </Timeline>
  );
}
