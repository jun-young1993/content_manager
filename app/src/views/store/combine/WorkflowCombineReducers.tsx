import { combineReducers } from 'redux'

import WorkflowRuleReducer from '@views/store/reducers/WorkflowRuleReducer';





const WorkflowCombineReducers = combineReducers({
    rules : WorkflowRuleReducer,
    sort : WorkflowRuleReducer
    // view : ConfigViewReducer
})

export default WorkflowCombineReducers