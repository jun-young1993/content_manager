import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import Button from '@mui/material/Button';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import electron from "electron";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ContentDialog from '@views/main/support/content/ContentDialog';
const ipcRenderer = electron.ipcRenderer;
// import img from "/Users/junyoungkim/Desktop/a.png";
/**
 * cols 열수
 * @constructor
 */
export default function ContentItemBar(props : any) {
    const [content, setContent] = React.useState(props.content);
    const [meta, setMeta] = React.useState(props.content);

    const [showMeta, setShowMeta] = React.useState((<></>))
    return (
        <div>
                    <ImageListItemBar
                        title={content.title}
                        position="below"
                        subtitle={
                        <span>
                            상세보기
                            <IconButton aria-label="delete" size="small" onClick={()=>{
                                    // console.log(content);
                                setShowMeta(<ContentDialog
                                    open={true}
                                    metadata={meta}
                                    onClose={()=>{
                                        setShowMeta(<></>);
                                    }}
                                />)
                            }}>
                                <InfoIcon fontSize="inherit" />
                            </IconButton>
                        </span>
                        }
                    />
            {showMeta}
        </div>
    );
}


