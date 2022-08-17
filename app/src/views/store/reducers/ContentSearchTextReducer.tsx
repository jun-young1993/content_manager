
export interface ActionInterface {
    type : string
    value? : string
}

export interface initialStateInterface {
    searchText? :  string
}
const initialState:initialStateInterface = {
    searchText : ""
}

export default function ContentSearchTextReducer(state = initialState,action:ActionInterface){
    switch(action.type){
        case 'searchText.put':
            // state.metadata = Object.assign(state.metadata,action.value)
            state.searchText = action.value;
            return state;
        default :
            return state;
    }

}