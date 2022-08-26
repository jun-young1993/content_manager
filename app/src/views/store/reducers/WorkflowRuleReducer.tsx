
export interface ActionInterface {
    type : string
    value? : any
    old ? :any
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
            console.log('RULES.PUT')
            return newState;
        case 'RULES.SORT_CHANGE':
            console.log('state',state,action);
            const sortRules : initialStateInterface = {
                rules : state.rules,
                sort :  action.value
            }
            console.log('RULES.SORT_CHANGE')
            return sortRules;
        case 'RULES.SORT_INIT':
            console.log('state',state);
            const init : initialStateInterface = {
                rules : state.rules,
                sort : state.rules
            }
            console.log('RULES.SORT_INIT')
            return init;
        case 'RULES.SORT_DELETE':
            console.log("RULES.SORT_DELTE",state,action);

                state.sort = action.value;
            return state;
        default :
            return state;
    }

}