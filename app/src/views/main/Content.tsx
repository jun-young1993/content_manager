import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Category from '@views/main/support/content/Category';
// import ContentList from '@views/main/support/content/ContentList';
import Typography from "@mui/material/Typography";
import ContentStore from "@views/store/ContentStore";
import {useDispatch, useSelector, Provider} from "react-redux";
import Container from "@mui/material/Container";
import {sender} from "@views/helper/helper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {contentsViewerInterface} from "@views/main/support/content/viewer/ViewerInterface";
import CardView from "@views/main/support/content/viewer/CardView";
import ContentPagination from "@views/main/support/content/ContentPagination";
import InputLabel from "@mui/material/InputLabel";
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
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
                    {/*<ContentList />*/}
                </Grid>
            </Grid>
    )
}
const reducer = (prevState:any, newState:any) => (Object.assign({},prevState,newState));
const searchReducer = (prevState:any, newState:any) => (Object.assign({},prevState,newState));
function ContentContainer(){
    // const dispatch = useDispatch();
    // const { searchText } = useSelector((state:any) => {return state.searchText})
    // const { category } = useSelector((state:any) => {return state.category})

    // const [contents , setContents] = React.useState<contentsViewerInterface[] | []>([]);
    const [state , setState] = React.useReducer(reducer,{
        contents : [],
        tags : [],
        count : 0
    })
    const [search , setSearch] = React.useReducer(searchReducer,{
        searchText : null,
        category : null,
        page : 0,
        size : 10
    });

    const load = () => {
        sender("@Category/_index",{parent_id : "folder"})
            .then((tags : any) => {
                sender("@Content/_index",search)
                    .then((contents:any) => {
                        console.log('contents',contents);
                        console.log('categories',tags);
                        setState({
                            contents : contents.data,
                            count : contents.count,
                            tags : tags.data
                        })
                    });
            })

    }

    React.useEffect(()=>{
        load();
    },[])
    React.useEffect(()=>{
        load();
    },[search])


    // dispatch({type:'searchText.put',value:props.searchText})
    return (
        <>
        <Stack direction="row"  justifyContent="space-between" spacing={2}>
            <Stack direction="row"  justifyContent="flex-end" spacing={2}>
                <FormControl fullWidth variant="standard" >
                    <InputLabel>{"태그"}</InputLabel>
                    <Select
                        sx={{width : "80px"}}
                        value={search.category}
                        onChange={(event : SelectChangeEvent)=>{

                        }}
                    >
                        {state.tags.map((tag : {name : string, _id : string}) => {
                            return (<MenuItem value={tag._id}>{tag.name}</MenuItem>)
                        })}

                        {/*<MenuItem value={10}>Ten</MenuItem>*/}
                        {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                        {/*<MenuItem value={30}>Thirty</MenuItem>*/}
                    </Select>
                </FormControl>
                <Button>2</Button>
                <Button>3</Button>
            </Stack>
            <Stack direction="row"  justifyContent="flex-satrt" spacing={2}>
                <Button>4</Button>
                <Button>5</Button>
                <Button>6</Button>
            </Stack>
        </Stack>
        <Container maxWidth="lg" sx={{  height:"65vh", flexGrow: 1, overflow: 'auto'}}>
            <CardView contents={state.contents}/>
            <ContentPagination
                count={state.count}
                page={search.page}
                size={search.size}
                onChangeHandle={(event : {page : number, size :number})=>{
                    setSearch(event);
                }}
            />
        </Container>
        </>
    );
}
export default function Content(props:any) {
    
    return (
        <Provider store={ContentStore}>
            {/*<ContentProvider searchText={props.searchText}/>*/}
            <ContentContainer />
        </Provider>
    );
}
