import { legacy_createStore as createStore } from "redux"
import ContentMetadataReducerCombineRecucers from '@views/store/combine/ContentMetadataReducerCombineRecucers'

const contentMetadataStore = createStore(ContentMetadataReducerCombineRecucers)

export default contentMetadataStore