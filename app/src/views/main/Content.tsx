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
import IconButton from "@mui/material/IconButton";
import {contentsViewerInterface} from "@views/main/support/content/viewer/ViewerInterface";
import CardView from "@views/main/support/content/viewer/CardView";
import ContentPagination from "@views/main/support/content/ContentPagination";
import InputLabel from "@mui/material/InputLabel";
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import SearchField from "@views/components/fields/SearchField";
import AddIcon from '@mui/icons-material/Add';
import { HtmlTooltip } from '@views/components/tooltip/Tooltip';
// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));
import {Circle as CircleIcon} from '@mui/icons-material';
import {ChangeEvent, KeyboardEventHandler} from "react";
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
    const TagMenu = (tag:{_id : string, name : string, color: string}) => {
        console.log(tag._id)
        return (
            <>
                <MenuItem value={tag._id}>
                    {/*<Typography sx={{pr:1}}>*/}
                    {/*    <CircleIcon*/}
                    {/*        sx={{width:"15px", height:"15px", marginTop:"8px", color:tag.color}}*/}
                    {/*    />*/}
                    {/*</Typography>*/}
                    {tag.name}
                </MenuItem>
            </>

        )
    }
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
        <Stack direction="row"  justifyContent="space-between" spacing={12}>
            <Stack direction="row"  justifyContent="flex-start" spacing={2}>
                <FormControl fullWidth variant="standard" >
                    <InputLabel id="tag-select-standard-label">Tag</InputLabel>
                    <Select
                        labelId="tag-select-standard-label"
                        // id="demo-simple-select-standard"
                        sx={{width : "100px"}}
                        value={search.category}
                        onChange={(event : SelectChangeEvent)=>{
                            setSearch({category : event.target.value});
                        }}
                    >
                        <MenuItem value={""}>
                            <em>None</em>
                        </MenuItem>
                        {state.tags.map((tag : {name : string, _id : string, color ?: string}) => {
                            return (
                            <MenuItem value={tag._id}>
                                <Typography>
                                    <CircleIcon
                                        sx={{
                                            width:"20px",
                                            height:"20px",
                                            pr : 1,
                                            // marginTop:"8px",
                                            color:tag.color || "#000000"
                                        }}
                                    />
                                    {tag.name}
                                </Typography>
                            </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                {/*<Button>2</Button>*/}
                {/*<Button>3</Button>*/}
            </Stack>
            <Stack direction="row"  justifyContent="flex-satrt" spacing={2}>
                {/*<Button>4</Button>*/}
                {/*<Button>5</Button>*/}
                <SearchField
                    onChange={(event:ChangeEvent<HTMLInputElement>)=>{
                        setSearch({searchText : event.target.value});
                    }}
                    // onKeyPress={(event:KeyboardEventHandler) => {
                    //     console.log(event);
                    // }}
                ></SearchField>
                <IconButton
                    onClick={()=>{
                        sender("#ingest")
                        .then((result:any)=>{

                        })
                    }}
                >

                </IconButton>
                <HtmlTooltip
                    title={
                        <React.Fragment>
                            <Typography color="inherit">인제스트</Typography>
                            <em>콘텐츠 관리를 위해 지정된 온라인 스토리지로 미디어를 이동시킵니다.</em>
                        </React.Fragment>
                    }
                >
                    <Button
                        variant="outlined"
                        onClick={()=>{
                            sender("#ingest")
                            .then((result:any)=>{

                            })
                        }}
                        startIcon={<AddIcon />}
                    >
                        인제스트
                    </Button>
                </HtmlTooltip>
            </Stack>
        </Stack>
        <Container maxWidth="lg" sx={{  height:"75vh", flexGrow: 1, overflow: 'auto'}}>
            <CardView
                contents={state.contents}
            />
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
