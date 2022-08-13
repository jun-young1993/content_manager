
export interface ActionInterface {
    type : string
    value? : any
}

export interface initialStateInterface {
    code :  []
}
const initialState:initialStateInterface = {
    code : []
}

export default function ConfigCodeReducer(state = initialState,action:ActionInterface){
    switch(action.type){
        case 'code.put':
            // state.metadata = Object.assign(state.metadata,action.value)
            state.code = action.value;
            return state;
        default :
            return state;
    }

}