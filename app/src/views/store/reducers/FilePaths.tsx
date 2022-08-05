
export interface ActionInterface {
	type : string
	value : string
}

export interface initialStateInterface {
	files :  any
}
const initialState:initialStateInterface = {
	files : []
}

export default function FilePaths(state = initialState,action:ActionInterface){
	switch(action.type){
		case 'files.patch':
			console.log('action.value',action.value);
			console.log('state.files',state.files);
			console.log('state.files.concat(action.value)',state.files.concat(action.value))
			state.files = action.value;
			return state;
		case 'files.put':
			console.log('before state files',state);
			state.files = action.value;
			console.log('after state files',state);
			return state;
		default : 
			return state;
	}
	
}