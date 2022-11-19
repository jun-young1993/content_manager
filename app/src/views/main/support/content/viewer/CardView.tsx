import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {contentsViewerInterface, ViewerInterface} from "@views/main/support/content/viewer/ViewerInterface";
import {
    AccountTree as AccountTreeIcon,
    Circle as CircleIcon,
    PageviewOutlined as PageviewOutlinedIcon
} from "@mui/icons-material";
import {LightTooltip} from "@views/components/tooltip/Tooltip";
import IconButton from "@mui/material/IconButton";
import Chip from '@mui/material/Chip';

import WorkflowRequest from "@views/main/support/workflow/WorkflowRequest";
import {OverridableStringUnion} from "@mui/types";
import {ChipPropsColorOverrides} from "@mui/material/Chip/Chip";
import ContentManagerFolder from "@views/images/ContentManagerFolder.png";
import NoThumbNail from "@views/images/NoThumbNail.png";
import {Box} from "@mui/material";
import {BasicModalPropsContentEvent} from "@views/components/BasicModal";
import ContentDetail from "@views/main/ContentDetail";
import ResizingDragbleModal from "@views/components/utill/ResizingDragbleModal";

const Store = require("electron-store");
const store = new Store();


const theme = createTheme();
const WorkflowButton = (props : {contentId : string, contentType ?: string}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
        <LightTooltip title={"워크플로우 호출"} placement={"top-end"}>
            <IconButton onClick={handleOpen}>
                <AccountTreeIcon />
            </IconButton>
        </LightTooltip>
        <WorkflowRequest
            contentId={props.contentId}
            contentType={props.contentType}
            open={open}
            onClose={handleClose}
        />
        </>
    )
}
const contentTypeChip = (contentType?:string) => {
    const label = contentType || "None";
    let color: OverridableStringUnion<
        'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
        ChipPropsColorOverrides
        > = "warning";
    switch(label){
        case "video" :
            color="success";
            break;
        case "image" :
            color="info";
            break;
        case "music" :
            color="secondary";
            break;
    }
    return (<Chip label={label} size="small" color={color} variant="outlined" />)
}
export function SimpleView(props:ViewerInterface){
    return (<>
        {props.contents.map((content:contentsViewerInterface) => {
            return (
            <>
                {content.title}
                <br/>
            </>
            )
        })}
    </>)
}

export function ShowContentDetail(props:{button : JSX.Element, id : string}){
    return (
        <ResizingDragbleModal
            initWidth={store.get("content.panel_width")}
            initHeight={store.get("content.panel_height")}
            hideHeader={true} 
            button={props.button}
            content={(event:BasicModalPropsContentEvent) => {
                return <ContentDetail 
                    contentId={props.id}
                    onCloseClick={event.close}
                />
                }
            }
        />
    );
}
export default function CardView(props:ViewerInterface) {
    console.log('content rerender');
    // const [modal,setModal] = React.useState(<></>);
    const showDetailWindow = (contentId:string) => {
        console.log('show detail window');
        // setModal(<BasicModal />);
        // setLoadMask(<LoadMask />);
        // invoker('$content-detail-window',contentId)
        // .then((resolve) => {
        //     setLoadMask(<></>);
        //     console.log("resolve",resolve);
        // });
    }
    return (
        <>
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <main  >
                <Container sx={{ py: 3 , flexGrow: 1, overflow: 'auto', height: "65vh"}}  maxWidth="lg" >
                    {/* End hero unit */}
                    {props.contents.length === 0
                        ? <Box id={"test"} sx={
                            { textAlign: "center",
                                margin : "0 auto",
                                position:"absolute",
                                left:"50%",
                                top:"50%"}
                        }>항목이 없습니다.</Box>
                        : <Grid container spacing={2} rowSpacing={4} alignItems="stretch">
                            {
                                props.contents.map((content: contentsViewerInterface) => {
                                    let thumbnailUrl : string = "http://localhost:11101/thumbnail/" + content._id + "?w=248&fit=crop&auto=format";
                                    if(content.content_type === "folder"){
                                        thumbnailUrl = ContentManagerFolder;
                                    }else if(content.content_type === "other"){
                                        thumbnailUrl = NoThumbNail;
                                    }else if(content.content_type === "music"){
                                        thumbnailUrl = NoThumbNail;
                                    }
                                    return (
                                        <Grid item key={content._id}
                                              xs={3}
                                            // sm={6}
                                            // md={4}
                                        >
                                            <Stack direction="row" spacing={2}>
                                                <LightTooltip title={content.category_name || "지정된 테그가 없습니다."}>
                                                    <CircleIcon
                                                        sx={{
                                                            width: "20px",
                                                            height: "20px",
                                                            pr: 1,
                                                            // marginTop:"8px",
                                                            color: content.category_color || "#000000"
                                                        }}
                                                    />
                                                </LightTooltip>
                                                {contentTypeChip(content.content_type)}
                                                {/*<Chip label={content.content_type} size="small" color="primary" variant="outlined" />*/}
                                            </Stack>
                                            <Card
                                                style={{height: "100%"}}
                                                sx={{display: 'flex', flexDirection: 'column'}}
                                            >
                                                <ShowContentDetail
                                                    id={content._id}
                                                    button={
                                                        <CardMedia
                                                                component="img"
                                                                sx={{
                                                                    '&:hover': {
                                                                        cursor: "pointer",
                                                                        transform: "scale(1.1)",
                                                                        transition: "all 1.2s linear",
                                                                        overflow: "hidden"
                                                                    }
                                                                    // 16:9
                                                                    // pt: '1%',
                                                                }}
                                                                style={{
                                                                    width: "calc(98%)",
                                                                    height: "calc(100% - 75px)",
                                                                    marginLeft : "calc(1%)",
                                                                    backgroundColor : "gray",
                                                                    maxWidth : "100%",
                                                                    borderRadius: "7px",
                                                                    border: "1px solid black",
                                                                    objectFit : "fill"
                                                                }}
                                                                image={thumbnailUrl}
                                                                alt="썸네일 생성작업을 요청해주세요."
                                                                onError={(event: any) => {
                                                                    event.target.src = NoThumbNail;
                                                                }}
                                                                onDrag={(event : any)=>{
                                                                //    drag envet
                                                                //    1.콘텐츠 순서 변경
                                                                }}
                                                            />
                                                    }
                                                />
                                                <CardContent sx={{flexGrow: 1, padding: "3px", height: "3vh"}}>
                                                    <Typography gutterBottom noWrap variant="h6" component="h6">
                                                        {content.title}
                                                    </Typography>
                                                    {/*<Typography>*/}
                                                    {/*This is a media card. You can use this section to describe the*/}
                                                    {/*content.*/}
                                                    {/*</Typography>*/}
                                                </CardContent>
                                                <CardActions sx={{height: "3vh", justifyContent: "flex-end"}}>
                                                    <ShowContentDetail
                                                        id={content._id}
                                                        button={
                                                            <LightTooltip title={"상세보기"} placement={"top-end"}>
                                                                <IconButton>
                                                                    <PageviewOutlinedIcon/>
                                                                </IconButton>
                                                            </LightTooltip>
                                                        }
                                                    />
                                                    <WorkflowButton
                                                        contentId={content._id}
                                                        contentType={content.content_type}
                                                    />
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    )
                                })

                            }
                        </Grid>
                    }
                </Container>
                
            </main>

            {/* Footer */}

            {/* End footer */}

        </ThemeProvider>
        </>
    );
}
