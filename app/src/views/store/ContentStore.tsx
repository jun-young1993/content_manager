import { legacy_createStore as createStore } from "redux"
import ContentCombineReducers from '@views/store/combine/ContentCombineReducers'

const ContentStore = createStore(ContentCombineReducers)

export default ContentStore