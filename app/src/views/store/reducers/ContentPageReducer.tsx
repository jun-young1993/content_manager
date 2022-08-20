
export interface ActionInterface {
    type : string
    value : {
        page : number,
        size : number
    }
}

export interface initialStateInterface {
    page :  number,
    size : number
}
const initialState:initialStateInterface = {
    page : 0,
    size : 10
}

export default function ContentPageReducer(state = initialState,action:ActionInterface){
    switch(action.type){
        case 'page.put':

            // state.metadata = Object.assign(state.metadata,action.value)
            const newState:initialStateInterface = {
                page : action.value.page,
                size : action.value.size
            }

            return newState;
        case 'PAGE.INIT' :

            return initialState;
        default :
            return state;
    }

}