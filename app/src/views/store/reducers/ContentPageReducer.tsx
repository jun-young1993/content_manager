
export interface ActionInterface {
    type : string
    value? : number
}

export interface initialStateInterface {
    page? :  number
}
const initialState:initialStateInterface = {
    page : 1
}

export default function ContentPageReducer(state = initialState,action:ActionInterface){
    switch(action.type){
        case 'page.put':
            // state.metadata = Object.assign(state.metadata,action.value)
            state.page = action.value;
            
            return state;
        default :
            return state;
    }

}