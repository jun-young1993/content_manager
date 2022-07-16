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
// import img from "/Users/junyoungkim/Desktop/a.png";
/**
 * cols 열수
 * @constructor
 */
export default function Image() {
    return (
        <ImageList sx={{ width: "100%", height: "100%" }} cols={5} rowHeight={100}>
            {contentList.map((item:any) => (
                <ImageListItem key={item.img}>
                    <img
                        // src={`${item.img}?w=248&fit=crop&auto=format`}
                        // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={"http://localhost:3000/logo192.png?w=100&fit=crop&auto=format"}
                        srcSet={"http://localhost:3000/logo192.png?w=100&fit=crop&auto=format&dpr=2 2x"}
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
const contens = ipcRenderer.sendSync("@Content/index");
let contentList:[] = [];
if(contens.success){
    console.log(contens.data);
    contentList = contens.data;
}
const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        author: '@bkristastucchio',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    // {
    //     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    //     title: 'Camera',
    //     author: '@helloimnik',
    // },
    // {
    //     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    //     title: 'Coffee',
    //     author: '@nolanissac',
    // },
    // {
    //     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    //     title: 'Hats',
    //     author: '@hjrc33',
    // },
    // {
    //     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    //     title: 'Honey',
    //     author: '@arwinneil',
    // },
    // {
    //     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    //     title: 'Basketball',
    //     author: '@tjdragotta',
    // },
    // {
    //     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    //     title: 'Fern',
    //     author: '@katie_wasserman',
    // },
    // {
    //     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    //     title: 'Mushrooms',
    //     author: '@silverdalex',
    // },
    // {
    //     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    //     title: 'Tomato basil',
    //     author: '@shelleypauls',
    // },
    // {
    //     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    //     title: 'Sea star',
    //     author: '@peterlaster',
    // },
    // {
    //     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    //     title: 'Bike',
    //     author: '@southside_customs',
    // },
];
