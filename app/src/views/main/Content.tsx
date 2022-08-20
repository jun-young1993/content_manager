import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Category from '@views/main/support/content/Category';
import ContentList from '@views/main/support/content/ContentList';
import Typography from "@mui/material/Typography";
import ContentStore from "@views/store/ContentStore";
import {useDispatch, useSelector, Provider} from "react-redux";
// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));
function ContentProvider(props:any) {
    const dispatch = useDispatch();
    dispatch({type:'searchText.put',value:props.searchText})
    
    return (
        
            <Grid container spacing={2} style={{height: '100vh'}} >
                <Grid item xs={2}  style={{height: '100vh'}}>
                    <Box sx={{borderRight:1, height:'100vh'}}>
                        <Category onClickCategory={(nodeId:string)=>{
                            if(nodeId === 'folder'){
                                dispatch({type: 'category.put', value: null})

                            }else{
                                dispatch({type: 'category.put', value: nodeId})
                                
                            }
                            dispatch({type: 'PAGE.INIT'});
                        }}/>
                    </Box>
                    
                </Grid>
                <Grid item xs={10} style={{height: '100vh'}}>
                    <ContentList />
                </Grid>
            </Grid>
    )
}
export default function Content(props:any) {
    
    return (
        <Provider store={ContentStore}>
            <ContentProvider searchText={props.searchText}/>
        </Provider>
    );
}
