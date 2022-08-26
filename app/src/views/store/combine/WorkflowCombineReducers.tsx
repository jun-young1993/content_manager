import { combineReducers } from 'redux'

import WorkflowRuleReducer from '@views/store/reducers/WorkflowRuleReducer';
import WorkflowRuleEditReducer from '@views/store/reducers/WorkflowRuleEditReducer';
import ModuleReducer from '@views/store/reducers/ModuleReducer';






const WorkflowCombineReducers = combineReducers({
    rules : WorkflowRuleReducer,
    sort : WorkflowRuleReducer,
    modules : ModuleReducer
    // view : ConfigViewReducer
})

export default WorkflowCombineReducers