import Metadata from "@views/main/Metadata";

export interface ActionInterface {
    type : string
    value? : object
}

export interface initialStateInterface {
    view :  any
}
const initialState:initialStateInterface = {
    view : <Metadata />
}

export default function ConfigViewReducer(state = initialState,action:ActionInterface){
    switch(action.type){
        case 'code.put':
            // state.metadata = Object.assign(state.metadata,action.value)
            state.view = action.value;
            return state;
        default :
            return state;
    }

}