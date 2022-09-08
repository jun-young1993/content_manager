
import {TaskStatus} from "./Types/TaskStatus";
export default interface TaskInterface {
	content_id : string,
	workflow_id : string,
	module_id : string,
	rule_id : string,
	source : string | null,
	target : string | null,
	status : TaskStatus,
	priority : number,
	progress : number
}


