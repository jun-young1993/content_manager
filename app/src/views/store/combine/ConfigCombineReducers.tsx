import { combineReducers } from 'redux'

import ConfigCodeReducer from '@views/store/reducers/ConfigCodeReducer';

import ContentMetadataFieldsReducer from '@views/store/reducers/ContentMetadataFieldsReducer';
import FilePaths from '@views/store/reducers/FilePaths';
import ConfigViewReducer from "@views/store/reducers/ConfigViewReducer";



const ConfigCombineReducers = combineReducers({
    code : ConfigCodeReducer,
    // view : ConfigViewReducer
})

export default ConfigCombineReducers