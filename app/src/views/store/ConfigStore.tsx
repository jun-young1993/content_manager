import { legacy_createStore as createStore } from "redux"
import ConfigCombineReducers from '@views/store/combine/ConfigCombineReducers'

const ConfigStore = createStore(ConfigCombineReducers)

export default ConfigStore;