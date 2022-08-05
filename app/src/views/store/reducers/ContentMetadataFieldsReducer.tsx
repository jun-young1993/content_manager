
export interface ActionInterface {
	type : string,
	value? : []
}
export interface metadataFieldsInterface{

}
export interface initialStateInterface {
	fields :  metadataFieldsInterface
}
const initialState:initialStateInterface = {
	fields : []
}

export default function ContentMetadataFieldsReducer(state = initialState,action:ActionInterface){
	console.log('contentMEtareducer',action);
	switch(action.type){
		case 'field.push':
			return {
				...state,
				fields : action.value
			};
		default : 
			return state;
	}
	
}