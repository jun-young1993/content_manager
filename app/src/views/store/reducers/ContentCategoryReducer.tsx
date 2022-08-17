
export interface ActionInterface {
    type : string
    value? : string | null
}

export interface initialStateInterface {
    category? :  string | null
}
const initialState:initialStateInterface = {
    category : null
}

export default function ContentCategoryReducer(state = initialState,action:ActionInterface){
    switch(action.type){
        case 'category.put':
            // state.metadata = Object.assign(state.metadata,action.value)
            state.category = action.value;
            return state;
        default :
            return state;
    }

}