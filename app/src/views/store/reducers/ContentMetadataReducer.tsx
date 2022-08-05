
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
			return {
				...action.value
			};
		default : 
			return state;
	}
	
}