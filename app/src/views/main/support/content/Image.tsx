import * as React from 'react';
import { Provider } from 'react-redux'
import ImageList from '@mui/material/ImageList';
import Button from '@mui/material/Button';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ContentItemBar from '@views/main/support/content/ContentItemBar';
import ListSubheader from '@mui/material/ListSubheader';

import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import {isEmpty} from 'lodash';
import ContentMetadataStore from "@views/store/ContentMetadataStore";
import {ipcRenderer , IpcRendererEvent} from "electron";
import ContentDialog from "@views/main/support/content/ContentDialog";

// import noimage from "../../../../assets/image/noimg.jpg"
// import img from "/Users/junyoungkim/Desktop/a.png";
type ImageProps = {
    contents : []
}
/**
 * cols 열수
 * @constructor
 */
export default function Image() {
    const [contentList , setContentList] = React.useState<[]>([]);
    const [showMeta, setShowMeta] = React.useState((<></>))
    ipcRenderer.on("@Content/_index/reply",(event:IpcRendererEvent,result:any)=>{
        if(result.success){
            setContentList(result.data);
        }
        ipcRenderer.removeAllListeners("@Content/_index/reply")
    })
    
    return (
        // <Provider store={ContentMetadataStore}>
            <ImageList sx={{ width: "100%", height: "80vh", maxHeight:"500px"}} cols={5} rowHeight={200}>
                {contentList.map((item:any) => (
                    <ImageListItem key={item.img}>
                        <img
                            // src={`${item.img}?w=248&fit=crop&auto=format`}
                            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={"http://localhost:11101/thumbnail/"+item._id+"?w=248&fit=crop&auto=format"}
                             // srcSet={"http://localhost:11101/thumbnail/"+item._id+"?w=248&fit=crop&auto=format&dpr=2 2x"}
                            // onClick={{()=>{
                            //
                            // }}}
                            onClick={()=>{
                                //render 많이 일어남
                                // setShowMeta(<ContentDialog
                                //     open={true}
                                //     metadata={item}
                                //     onClose={()=>{
                                //         setShowMeta(<></>);
                                //     }}
                                // />)
                            }}
                            onError={( currentTarget : any) => {
                                
                                // currentTarget.onerror = null; // prevents looping
                                // currentTarget.onError = null;
                                // currentTarget.target.src = "https://raw.githubusercontent.com/jun-young1993/electron/83e37f3c1af830627fd11ab54daf563fdce67b0b/app/src/logo.svg?w=248&fit=crop&auto=format";
                                // console.log('currentTarget',currentTarget);
                                // console.log(currentTarget);
                                // this = <div>no image</div>;
                                // currentTarget = <div>no image</div>;
                              }}
                            alt={item.title}
                            loading="lazy"
                        />
                        {showMeta}
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

        // </Provider>
    );
}

