import { legacy_createStore as createStore } from "redux"
import WorkflowCombineReducers from '@views/store/combine/WorkflowCombineReducers'

const WorkflowStore = createStore(WorkflowCombineReducers)

export default WorkflowStore;