import COPYICON from '@mui/icons-material/ContentCopy';
import TRANSCODERICON from '@mui/icons-material/Transform';
import MEDIAINFOICON from '@mui/icons-material/Info';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
export default function WorkflowRuleIcons(props:{task_type :string}) {
	
	
	function IconRender(){
		const taskType = props.task_type;
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
		<IconRender />
	)
}