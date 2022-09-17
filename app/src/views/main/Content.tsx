import * as React from 'react';
import Typography from "@mui/material/Typography";
import ContentStore from "@views/store/ContentStore";
import {useDispatch, useSelector, Provider} from "react-redux";
import Container from "@mui/material/Container";
import {sender} from "@views/helper/helper";
import Stack from "@mui/material/Stack";
import CardView from "@views/main/support/content/viewer/CardView";
import ContentPagination from "@views/main/support/content/ContentPagination";
import InputLabel from "@mui/material/InputLabel";
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import SearchField from "@views/components/fields/SearchField";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import LoadingButton from '@mui/lab/LoadingButton';

import {
    Circle as CircleIcon,
    Image as ImageIcon
} from '@mui/icons-material';
import {ChangeEvent, KeyboardEventHandler} from "react";
import Store from "electron-store";
import Icons from "@views/components/Icons";
const store = new Store();

const reducer = (prevState:any, newState:any) => (Object.assign({},prevState,newState));
const searchReducer = (prevState:any, newState:any) => (Object.assign({},prevState,newState));

const IngestButton = (props:{contentTypes:any[]}) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [loading , setLoading] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const handleMenuClick = (ingestType:string) => {
        
        setLoading(true);
        sender("#ingest",{
            ingest_type : ingestType
        })
        .then((result) => {
            setLoading(false);
            // handleClose();
        });

        handleClose();
     
        
    }
  
    return (
      <div>
        <LoadingButton
          loading={loading}
          variant="outlined"
          endIcon={<KeyboardArrowDownIcon />}
        //   startIcon={<AddIcon />}
          id="ingest-fade-button"
          aria-controls={open ? 'ingest-fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          인제스트
        </LoadingButton>
        <Menu
          id="ingest-fade-menu"
          MenuListProps={{
            'aria-labelledby': 'ingest-fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
            {props.contentTypes.map((contentType:{name:string, code: string}) => {
                return (
                    <MenuItem onClick={()=>{
                        handleMenuClick(contentType.code);
                        
                    }}>
                        <>
                        {Icons({
                            type:contentType.code,
                            sx:{
                                mr : 1
                            }
                        })}
                        {contentType.name}</>
                        </MenuItem>          
                )
            })}
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        </Menu>
      </div>
    );
};
function ContentContainer(){

    console.log("store.get('content.tag')",store.get('default_values.tag'));
    console.log("store.get('content.tag')",store.get('default_values.content_type'));
    console.log("store.get('content.tag')",store.get('default_values.rows_page_size_content'));
    

    const [state , setState] = React.useReducer(reducer,{
        contents : [],
        tags : [],
        count : 0,
        contentType : []
    })
    const [search , setSearch] = React.useReducer(searchReducer,{
        searchText : null,
        category : store.get('default_values.tag'),
        contentType : store.get('default_values.content_type'),
        page : 0,
        size : store.get('default_values.rows_page_size_content')
    });

    const load = () => {
        sender("@Category/_index",{parent_id : "folder"})
            .then((tags : any) => {
                console.log('search',search);
                sender("@Content/_index",search)
                    .then((contents:any) => {
                        console.log('contents',contents);
                        console.log('categories',tags);
                        sender("@CodeItem/_indexByParentCode",'content_type')
                        .then((contentTypes:any) => {
                            console.log('contentTypes',contentTypes);
                            setState({
                                contents : contents.data,
                                count : contents.count,
                                tags : tags.data,
                                contentType : contentTypes.data
                            })
                        })
                        
                    });
            })

    }

    React.useEffect(()=>{
        load();
    },[])
    React.useEffect(()=>{
        console.log('search',search);
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
                        // labelId="tag-select-standard-label"
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
                <FormControl fullWidth variant="standard" >
                    <InputLabel >콘텐츠 유형</InputLabel>
                    <Select
                        sx={{width : "100px"}}
                        value={search.contentType}
                        onChange={(event : SelectChangeEvent)=>{
                            setSearch({contentType : event.target.value});
                        }}
                    >
                        <MenuItem value={""}>
                            <em>None</em>
                        </MenuItem>
                        {state.contentType.map((tag : {name : string, code : string}) => {
                            return (
                            <MenuItem value={tag.code}>
                                    {tag.name}
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
                {/* <IconButton
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
                </HtmlTooltip> */}
                <IngestButton 
                    contentTypes={state.contentType}
                />
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
