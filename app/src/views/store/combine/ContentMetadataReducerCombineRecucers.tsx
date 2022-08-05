import { combineReducers } from 'redux'

import ContentMetadataReducer from '@views/store/reducers/ContentMetadataReducer';
import ContentMetadataFieldsReducer from '@views/store/reducers/ContentMetadataFieldsReducer';
import FilePaths from '@views/store/reducers/FilePaths';



const ContentMetadataReducerCombineRecucers = combineReducers({
	metadata: ContentMetadataReducer,
	fields : ContentMetadataFieldsReducer,
	files : FilePaths
})

export default ContentMetadataReducerCombineRecucers