import * as Type from './Types/TaskType';
export default interface MediaInterface {
	is_media : boolean,
	content_id : string,
	type : Type.TaskTypes,
	storage : string,
	path : string | null,
	full_path : string,
	_id : string,
	createdAt : any,
	updatedAt : any
}

