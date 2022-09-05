import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ViewerInterface, contentsViewerInterface} from "@views/main/support/content/viewer/ViewerInterface";
import {Circle as CircleIcon} from "@mui/icons-material";
import {LightTooltip} from "@views/components/tooltip/Tooltip";
import IconButton from "@mui/material/IconButton";
import {showDrawer} from "@views/helper/helper";
import {
    Pageview as PageviewIcon,
    PageviewOutlined as PageviewOutlinedIcon
} from '@mui/icons-material';

import { ipcRenderer } from 'electron';


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function CardView(props:ViewerInterface) {
    // const [openContentDetail , setOpenContentDetail] = React.useState(false);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <main  >
                <Container sx={{ py: 3 , flexGrow: 1, overflow: 'auto', height: "65vh"}}  maxWidth="lg" >
                    {/* End hero unit */}
                    <Grid container spacing={3} alignItems="stretch" >
                        {props.contents.map((content:contentsViewerInterface) => (
                            <Grid item key={content._id}
                                  xs={3}
                                  // sm={6}
                                  // md={4}
                            >
                                <Stack direction="row" spacing={2}>
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
                                </Stack>
                                <Card
                                    style={{height:"100%"}}
                                    sx={{display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            // pt: '0%',
                                        }}
                                        image={"http://localhost:11101/thumbnail/"+content._id+"?w=248&fit=crop&auto=format"}
                                        alt="random"
                                    />
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
    );
}
