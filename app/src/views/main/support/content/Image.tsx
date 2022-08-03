import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import Button from '@mui/material/Button';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ContentItemBar from '@views/main/support/content/ContentItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import electron from "electron";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
const ipcRenderer = electron.ipcRenderer;
import {isEmpty} from 'lodash';
// import img from "/Users/junyoungkim/Desktop/a.png";
type ImageProps = {
    searchText : string | null
    category : string | null
}
/**
 * cols 열수
 * @constructor
 */
export default function Image(props:ImageProps) {
    let where:any = {};
    if(!isEmpty(props.searchText)){
        where['title'] = props.searchText;
    }

    if(!isEmpty(props.category)){
        where['category'] = props.category;
    }

    const contens = ipcRenderer.sendSync("@Content/index",where);
    let contentList:[] = [];
    if(contens.success){
        console.log(contens.data);
        contentList = contens.data;
    }
    return (
        <ImageList sx={{ width: "100%", height: "100%" }} cols={5} rowHeight={100}>
            {contentList.map((item:any) => (
                <ImageListItem key={item.img}>
                    <img
                        // src={`${item.img}?w=248&fit=crop&auto=format`}
                        // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={"http://localhost:11101/thumbnail/"+item._id+"?w=100&fit=crop&auto=format"}
                        srcSet={"http://localhost:11101/thumbnail/"+item._id+"?w=100&fit=crop&auto=format&dpr=2 2x"}
                        alt={item.title}
                        loading="lazy"
                    />
                    {/* <ImageListItemBar
                        title={<Button>{item.title}</Button>}
                        subtitle={<Button><span>{item.sub_title}</span></Button>}
                        position="below"
                    /> */}
                    <ContentItemBar content={item} />
                    {/*<ImageListItemBar*/}
                    {/*    title={item.title}*/}
                    {/*    position="below"*/}
                    {/*    subtitle={*/}
                    {/*    <span>*/}
                    {/*        상세보기*/}
                    {/*        <IconButton aria-label="delete" size="small" onClick={()=>{*/}
                    {/*            */}
                    {/*        }}>*/}
                    {/*            <InfoIcon fontSize="inherit" />*/}
                    {/*        </IconButton>*/}
                    {/*    </span>*/}
                    {/*    }*/}
                    {/*/>*/}
                </ImageListItem>
            ))}
        </ImageList>
    );
}

