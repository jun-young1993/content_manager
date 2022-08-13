import * as React from 'react';
import Image from "@views/main/support/content/Image";
import {ipcRenderer , IpcRendererEvent} from "electron";
import {isEmpty} from 'lodash';

type ContentListType = {
    searchText : string | null,
    category : string | null
}
export default function ContentList(props:ContentListType) {
    let where:any = {};
    if(!isEmpty(props.searchText)){
        where['searchText'] = props.searchText;
    }

    if(!isEmpty(props.category)){
        where['category'] = props.category;
    }
    

    // const [contentList , setContentList] = React.useState<[]>([]);
    ipcRenderer.send("@Content/_index",where);


    
    return(
        <Image />
    )
}