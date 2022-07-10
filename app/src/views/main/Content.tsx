import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Category from '@views/main/support/content/Category';
import ContentList from '@views/main/support/content/ContentList';

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

export default function Content() {
    return (
        // <Box sx={{ flexGrow: 1, height:"100%" }} style={{height: '100%'}}>
            <Grid container spacing={2} style={{height: '100vh'}} >
                <Grid item xs={2}  style={{height: '100vh',border: "1px solid grey"}}>
                    <Category />
                </Grid>
                <Grid item xs={10} style={{height: '100vh'}}>
                    <ContentList />
                </Grid>
            </Grid>
        // </Box>
    );
}
