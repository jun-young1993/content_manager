
export interface ActionInterface {
    type : string
    value? : any
}
export interface initialStateInterface {
    modules? :  any
}
const initialState:initialStateInterface = {
    modules : []
}

export default function ModuleReducer(state = initialState,action:ActionInterface){
    switch(action.type){
        case 'MODULES.PUT':
            const newState : initialStateInterface = {
                modules :  action.value,
            }
            return newState;
      
        default :
            return state;
    }

}