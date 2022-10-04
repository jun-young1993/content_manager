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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ViewerInterface, contentsViewerInterface} from "@views/main/support/content/viewer/ViewerInterface";
import {Circle as CircleIcon} from "@mui/icons-material";
import {LightTooltip} from "@views/components/tooltip/Tooltip";
import IconButton from "@mui/material/IconButton";
import {showDrawer} from "@views/helper/helper";
import Chip from '@mui/material/Chip';
import {
    PageviewOutlined as PageviewOutlinedIcon,
    AccountTree as AccountTreeIcon
} from '@mui/icons-material';

import WorkflowRequest from "@views/main/support/workflow/WorkflowRequest";
import {OverridableStringUnion} from "@mui/types";
import {ChipPropsColorOverrides} from "@mui/material/Chip/Chip";



const theme = createTheme();
const WorkflowButton = (props : {contentId : string}) => {
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
export default function CardView(props:ViewerInterface) {


    return (
        <>
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <main  >
                <Container sx={{ py: 3 , flexGrow: 1, overflow: 'auto', height: "65vh"}}  maxWidth="lg" >
                    {/* End hero unit */}
                    <Grid container spacing={2} rowSpacing={4} alignItems="stretch" >
                        {props.contents.map((content:contentsViewerInterface) => (
                            <Grid item key={content._id}
                                  xs={3}
                                  // sm={6}
                                  // md={4}
                            >
                                <Stack direction="row" spacing={2} >
                                    <LightTooltip title={content.category_name || "지정된 테그가 없습니다."} >
                                        <CircleIcon
                                            sx={{
                                                width:"20px",
                                                height:"20px",
                                                pr : 1,
                                                // marginTop:"8px",
                                                color:content.category_color || "#000000"
                                            }}
                                        />
                                    </LightTooltip>
                                    {contentTypeChip(content.content_type)}
                                    {/*<Chip label={content.content_type} size="small" color="primary" variant="outlined" />*/}
                                </Stack>
                                <Card
                                    style={{height:"100%"}}
                                    sx={{display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            // pt: '1%',
                                        }}
                                        image={"http://localhost:11101/thumbnail/"+content._id+"?w=248&fit=crop&auto=format"}
                                        alt="썸네일 생성작업을 요청해주세요."
                                        onError={(event:any)=>{
                                            // event.target.style['display'] = 'none';
                                            // event.target.style['background-image'] = 'red';
                                            // console.log(event);
                                            event.target.src = "https://user-images.githubusercontent.com/102360897/184477107-6769a937-5cdb-4906-8aa2-ef29e6a4c4c9.png?w=248&fit=crop&auto=format";
                                            // console.log(event);
                                            // // event.stopPropagation();
                                            // event.target.onError = () => {
                                            //     console.log('target on error');
                                            // }
                                            // return false;
                                        }}
                                    >
                                    </CardMedia>
                                    <CardContent sx={{ flexGrow: 1 , padding:"3px", height : "3vh"}}>
                                        <Typography gutterBottom noWrap variant="h6" component="h6">
                                            {content.title}
                                        </Typography>
                                        {/*<Typography>*/}
                                            {/*This is a media card. You can use this section to describe the*/}
                                            {/*content.*/}
                                        {/*</Typography>*/}
                                    </CardContent>
                                    <CardActions sx={{height:"3vh", justifyContent:"flex-end"}} >
                                        <LightTooltip title={"상세보기"} placement={"top-end"}>
                                            <IconButton onClick={()=>{
                                                // setOpenContentDetail(true);
                                                showDrawer({
                                                    open : true,
                                                    metadata : content
                                                },(checked:boolean)=>{

                                                        console.log('수정완료 close event',content._id);

                                                });
                                            }}>
                                                <PageviewOutlinedIcon />
                                            </IconButton>
                                        </LightTooltip>
                                        <WorkflowButton contentId={content._id}/>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                
            </main>

            {/* Footer */}

            {/* End footer */}

        </ThemeProvider>
        </>
    );
}
