import { combineReducers } from 'redux'

import ContentSearchTextReducer from '@views/store/reducers/ContentSearchTextReducer';
import ContentCategoryReducer from '@views/store/reducers/ContentCategoryReducer';
import ContentPageReducer from '@views/store/reducers/ContentPageReducer';


import ContentMetadataFieldsReducer from '@views/store/reducers/ContentMetadataFieldsReducer';
import FilePaths from '@views/store/reducers/FilePaths';
import ConfigViewReducer from "@views/store/reducers/ConfigViewReducer";



const ContentCombineReducers = combineReducers({
    searchText : ContentSearchTextReducer,
    category : ContentCategoryReducer,
    page : ContentPageReducer
    // view : ConfigViewReducer
})

export default ContentCombineReducers