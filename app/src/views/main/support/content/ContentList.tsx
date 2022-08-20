import * as React from 'react';
import Image from "@views/main/support/content/Image";
import ContentPagination from "@views/main/support/content/ContentPagination";
import {Box} from '@mui/material';
import {ipcRenderer , IpcRendererEvent} from "electron";
import {isEmpty} from 'lodash';
import {useDispatch, useSelector, Provider} from "react-redux";


export default function ContentList() {
    const dispatch = useDispatch();
    const { searchText } = useSelector((state:any) => {return state.searchText})
    const { category } = useSelector((state:any) => {return state.category})
    const { page } = useSelector((state:any) => {return state.page})
    const { size }   = useSelector((state:any) => {return state.page})
    console.log('contentList searchText, category, page',searchText,category,page);
    let where:{
        searchText? : string | null
        category? : string | null
        page : number
        size : number
    } = {
        size : size,
        page : page
    };
    if(!isEmpty(searchText)){
        where['searchText'] = searchText;
    }

    if(!isEmpty(category)){
        where['category'] = category;
    }



    
    

    // const [contentList , setContentList] = React.useState<[]>([]);
    ipcRenderer.send("@Content/_index",where);
    ipcRenderer.send("@Content/_count",where);


    
    console.log('render page',page)
    return(
        <Box sx={{height:'auto'}}>
            <Image />
            <ContentPagination />
        </Box>
    )
}