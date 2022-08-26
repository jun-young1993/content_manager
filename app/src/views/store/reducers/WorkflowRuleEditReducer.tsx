
export interface ActionInterface {
    type : string
    value? : any
}
export interface initialStateInterface {
    rules? :  any
    sort? :any
}
const initialState:initialStateInterface = {
    sort : []
}

export default function WorkflowRuleEditReducer(state = initialState,action:ActionInterface){
    switch(action.type){
        case 'RULES.SORT_CHANGE':
            // const sortRules : initialStateInterface = {
            //     rules : state.rules,
            //     sort :  action.value
            // }
            const sortRules = Object.assign({},state,...action.value);
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