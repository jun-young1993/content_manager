import Image from "@views/main/support/content/Image";
type ContentListType = {
    searchText : string | null,
    category : string | null
}
export default function ContentList(props:ContentListType) {
    return(
        <Image searchText={props.searchText} category={props.category}/>
    )
}