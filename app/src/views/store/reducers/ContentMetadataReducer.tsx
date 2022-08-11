
export interface ActionInterface {
	type : string
	value? : object
}
export interface metadataInterface{

}
export interface initialStateInterface {
	metadata :  metadataInterface
}
const initialState:initialStateInterface = {
	metadata : {}
}

export default function ContentMetadataReducer(state = initialState,action:ActionInterface){
	switch(action.type){
		case 'metadata.patch':
			state.metadata = Object.assign(state.metadata,action.value)
			return state;
		default : 
			return state;
	}
	
}