import * as React from 'react';
import {ChangeEvent} from 'react';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {invoker, sender} from "@views/helper/helper";
import Stack from "@mui/material/Stack";
import CardView, {SimpleView} from "@views/main/support/content/viewer/CardView";
import ContentPagination from "@views/main/support/content/ContentPagination";
import InputLabel from "@mui/material/InputLabel";
import {FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import SearchField from "@views/components/fields/SearchField";

import LoadingDropDownMenuButton from "@views/components/menu/LoadingDropDownMenuButton";

import {Circle as CircleIcon} from '@mui/icons-material';
import Store from "electron-store";
import Icons from "@views/components/Icons";

const store = new Store();

const reducer = (prevState:any, newState:any) => (Object.assign({},prevState,newState));
const searchReducer = (prevState:any, newState:any) => (Object.assign({},prevState,newState));



type contentListType = "simple" | "card";
function ContentList(contents:any, type:contentListType = "card"){

        const view:{[key:string] : any} = {
            "simple" : <SimpleView contents={contents} />,
            "card" : <CardView contents={contents} />
        };
        const viewItem = view[type];
        return viewItem;





}
export function CategorySelectMenuItem(props:{
    tags : [{name : string, _id : string, color ?: string}],
    typographyProps ?: any,
    icon ?: boolean,
    none ?: boolean}):any  {
    const items : any = [(props.none !== false)
                                    ?<MenuItem value={""} key={""}>
                                            <em>None</em>
                                        </MenuItem>
                                    : <></>].concat(props.tags.map((tag : {name : string, _id : string, color ?: string}) => {
                                        console.log("tag._id",tag._id);
                                        return (
                                        <MenuItem value={tag._id} key={tag._id}>
                                            <Typography
                                                {...props.typographyProps || {}}
                                            >
                                                {(props.icon === false)
                                                ? <></>
                                                : <CircleIcon
                                                    sx={{
                                                        width:"20px",
                                                        height:"20px",
                                                        pr : 1,
                                                        // marginTop:"8px",
                                                        color:tag.color || "#000000"
                                                    }}
                                                />}
                                                {tag.name}
                                            </Typography>
                                        </MenuItem>
                                        )
                                    }));
    return items;
    
    
}
/**
 * 태그 셀렉터
 * @param props 
 * @returns JSX.Element
 */
export function CategorySelect(props:
    {
        value ?: string, sx ?: any, tags : [{name : string, _id : string, color ?: string}], 
        onChange?:(event : SelectChangeEvent, child: React.ReactNode) => void
        typographyProps ?: any,
        selectProps ?: any
        autoChange ?: boolean
        none ?: boolean
        icon ?: boolean
    }) : JSX.Element
{
    const [value ,setValue] = React.useState(props.value || "");
    React.useEffect(()=>{
        setValue(props.value || "");
    },[props.value])
    return (
        <Select
        {...props.selectProps || {}}
        sx={{...props.sx || {width : "100px"}}}
        value={value}
        onChange={props.onChange
            ? props.onChange
            :props.autoChange
                ? (event : SelectChangeEvent,child: React.ReactNode) => {
                    console.log('change ',event);
                    setValue(event.target.value);
                }
                : null
            // props.onChange
            // || props.autoChange
            //     ? (event : SelectChangeEvent,child: React.ReactNode) => {
            //         setValue(event.target.value);
            //     }
            //     : null
        }
    >
        {CategorySelectMenuItem({
            none: props.none,
            tags:props.tags,
            typographyProps : props.typographyProps
        }).map((item:any) => item)}
        {/* {<CategorySelectMenuItem 
            none={props.none}
            tags={props.tags}
            typographyProps={props.typographyProps}
        />} */}
        {/* <> */}
            {/* {props.none !== false
            ?<MenuItem value={""}>
                    <em>None</em>
                </MenuItem>
            : <></>}
        {props.tags.map((tag : {name : string, _id : string, color ?: string}) => {
            return (
            <MenuItem value={tag._id}>
                <Typography
                    {...props.typographyProps || {}}
                >
                    {(props.icon === false)
                    ? <></>
                    : <CircleIcon
                        sx={{
                            width:"20px",
                            height:"20px",
                            pr : 1,
                            // marginTop:"8px",
                            color:tag.color || "#000000"
                        }}
                    />}
                    {tag.name}
                </Typography>
            </MenuItem>
            )
        })} */}
        {/* </> */}
    </Select>
    )
}
interface ContentInterface {
    type ?: contentListType
    hidePagination ?: boolean
    hideIngestButton ?: boolean
}
export default function Content(props:ContentInterface){
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
    return (
        <>
        <Stack direction="row"  justifyContent="space-between" spacing={12}>
            <Stack direction="row"  justifyContent="flex-start" spacing={2}>
                <FormControl fullWidth variant="standard" >
                    <InputLabel id="tag-select-standard-label">Tag</InputLabel>
                    <CategorySelect 
                        sx={{width : "100px"}}
                        value={search.category}
                        onChange={(event : SelectChangeEvent)=>{
                            setSearch({category : event.target.value});
                        }}
                        tags={state.tags}
                    />
                    {/* <Select
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
                    </Select> */}
                
                </FormControl>
                <FormControl fullWidth variant="standard" >
                    <InputLabel >콘텐츠 유형</InputLabel>
                    {/* <CategorySelect 
                        sx={{width : "100px"}}
                        value={search.contentType}
                        onChange={(event : SelectChangeEvent)=>{
                            console.log('content_type setSearch' , event.target.value)
                            setSearch({contentType : event.target.value});
                        }}
                        icon={false}
                        tags={state.contentType}
                    /> */}
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
            </Stack>
            <Stack direction="row"  justifyContent="flex-satrt" spacing={2}>
                <SearchField
                    onChange={(event:ChangeEvent<HTMLInputElement>)=>{
                        setSearch({searchText : event.target.value});
                    }}
                ></SearchField>
                {props.hideIngestButton
                ? <></>
                :
                // <IngestButton
                //     contentTypes={state.contentType}
                // />
                <LoadingDropDownMenuButton 
                    
                    title={"인제스트"}
                    item={[{
                        startTitleIcon : (Icons({
                            type:"video",
                            sx:{
                                mr : 1
                            }
                        })),
                        title : "사용자 로컬 입수",
                        onClick : (setLoading) => {
                                setLoading(true);
                                invoker("$ingest")
                                .then((result) => {
                                    setLoading(false);
                                })
                                .catch((exception) => {
                                    setLoading(false);
                                });
                        }
                    },{
                        startTitleIcon : (Icons({
                            type:"share",
                            sx:{
                                mr : 1
                            }
                        })),
                        title : "네트워크 공유 입수",
                        onClick : (setLoading) => {
                            setLoading(true);
                            invoker("$lan-share-window")
                                .then((result) => {
                                    setLoading(false);
                                });
                        }
                    }]}
                />
                }

            </Stack>
        </Stack>
        <Container maxWidth="lg" sx={{  height:"75vh", flexGrow: 1, overflow: 'auto'}}>
            {ContentList(state.contents,props.type)}
            {props.hidePagination
            ? <></>
            :<ContentPagination
                    count={state.count}
                    page={search.page}
                    size={search.size}
                    onChangeHandle={(event : {page : number, size :number})=>{
                        setSearch(event);
                    }}
            />}

        </Container>
        </>
    );
}

