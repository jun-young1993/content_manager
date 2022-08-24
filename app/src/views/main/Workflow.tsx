import * as React from 'react';
import WorkflowList from "@views/main/support/workflow/WorkflowList";
import WorkflowStore from "@views/store/WorkflowStore";
import { Provider} from "react-redux";
export default function Workflow() {
	
	
	return (
		<Provider store={WorkflowStore}>
			<WorkflowList />
		</Provider>
	);
}