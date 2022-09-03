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



const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function CardView(props:ViewerInterface) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <main  >
                <Container sx={{ py: 3 , flexGrow: 1, overflow: 'auto', height: "55vh"}}  maxWidth="lg" >
                    {/* End hero unit */}
                    <Grid container spacing={3} alignItems="stretch" >
                        {props.contents.map((content:contentsViewerInterface) => (
                            <Grid item key={content._id}
                                  xs={3}
                                  // sm={6}
                                  // md={4}
                            >
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
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h6" component="h6">
                                            {content.title}
                                        </Typography>
                                        {/*<Typography>*/}
                                            {/*This is a media card. You can use this section to describe the*/}
                                            {/*content.*/}
                                        {/*</Typography>*/}
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
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
