
export interface ActionInterface {
    type : string
    value? : any
}
export interface initialStateInterface {
    rules? :  any
    sort? :any
}
const initialState:initialStateInterface = {
    rules : [],
    sort : []
}

export default function WorkflowRuleReducer(state = initialState,action:ActionInterface){
    switch(action.type){
        case 'RULES.PUT':
            const newState : initialStateInterface = {
                rules :  action.value,
                sort : action.value
            }
            return newState;
        case 'RULES.SORT_CHANGE':
            const sortRules : initialStateInterface = {
                rules : state.rules,
                sort :  action.value
            }
            return sortRules;
        case 'RULES.SORT_INIT':
            const init : initialStateInterface = {
                rules : state.rules,
                sort : state.rules
            }
            return init;
        
        default :
            return state;
    }

}