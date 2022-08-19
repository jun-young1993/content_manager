
export interface ActionInterface {
    type : string
    value : number
}

export interface initialStateInterface {
    page :  number
}
const initialState:initialStateInterface = {
    page : 1
}

export default function ContentPageReducer(state = initialState,action:ActionInterface){
    switch(action.type){
        case 'page.put':
            console.log('page state',state)
            // state.metadata = Object.assign(state.metadata,action.value)
            Object.assign(state,{
                page : action.value
            })
            console.log('page after state',state)
            return state;
        default :
            return state;
    }

}