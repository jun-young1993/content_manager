import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Category from '@views/main/support/content/Category';
import ContentList from '@views/main/support/content/ContentList';
import Typography from "@mui/material/Typography";

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

export default function Content(props:any) {

    return (
        // <Box sx={{ flexGrow: 1, height:"100%" }} style={{height: '100%'}}>
            <Grid container spacing={2} style={{height: '100vh'}} >
                <Grid item xs={2}  style={{height: '100vh'}}>
                    <Box sx={{borderRight:1, height:'100vh'}}>
                        <Category />
                    </Box>
                    
                </Grid>
                <Grid item xs={10} style={{height: '100vh'}}>
                    <ContentList searchText={props.searchText}/>
                </Grid>
            </Grid>
        // </Box>
    );
}
