import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import ListItemText from '@mui/material/ListItemText';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import {sender, showAlert, showConfirm} from "@views/helper/helper";
import Container from "@mui/material/Container";
import Icons from "@views/components/Icons";
import {Circle} from "@mui/icons-material";
import {HtmlTooltip, LightTooltip} from "@views/components/tooltip/Tooltip";
import Stack from "@mui/material/Stack";
import TabPanel from "@views/components/TabPanel";
import SketchColorPicker from "@views/components/fields/SketchColorPicker";
import TextField from "@mui/material/TextField";
import {isEmpty} from "lodash";
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
import ListItemButton from '@mui/material/ListItemButton';
import TransferList from "@views/components/TransferList";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { CategorySelect } from '@views/main/Content';
import {SelectChangeEvent} from "@mui/material";
const Demo = styled('div')(({ theme }) => ({
    // backgroundColor: theme.palette.background.paper
}));
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100vh",
    height : "80vh",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow : 'auto'
  };



  export function TagEditModal(props:{id : string,title:string, color ?: string, tags:any}) {
    const [open, setOpen] = React.useState(false);
    const [contents , setContents] = React.useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [transferList ,setTransferList] = React.useState(<></>);

    
    const [rightTagValue , setRightTagValue] = React.useState("");

    const [rightTagSelect , setRightTagSelect] = React.useState<React.ReactNode>(<></>);
    const updateTag = (contents:any,categoryId:string) => {
        let index = 0;
        contents.map((content:any) => {

            sender("@Content/_update",content._id,{
                category : categoryId
            })
                .then(() => {
                    index++;
                    if(index == contents.length){
                        showAlert({
                            severity : "info",
                            title : "태그 일괄변경되었습니다."
                        })
                    }
                });
        })
    }
    const settingTransferList = (rightTagContent?:any):void =>  { 

            setTransferList(<TransferList 
                leftData={contents}
                rightData={rightTagContent ? rightTagContent : []}
                options={{
                    id : "_id",
                    text : "title"
                }}
                leftProps={{
                    onAdd : (values,position)=>{

                        updateTag(values,props.id)

                    },
                    title : (
                    <Typography>
                        <Circle 
                            sx={{
                                width:"20px",
                                height:"20px",
                                pr : 1,
                                color: props.color
                            }}
                        /> 
                        {props.title}
                    </Typography>)
                }}
                rightProps={{
                    onAdd : (values,position)=>{
                        console.log('onAdd',values,position);
                        updateTag(values,rightTagValue)


                    },
                    title : (
                        <CategorySelect 
                            sx={{width : "100px"}}
                            value={rightTagValue}
                            none={false}
                            tags={props.tags.filter((tag:{_id : string}) => {
                                console.log("tag",tag)
                                if(tag._id !== props.id){
                                    return tag;
                                }
                            })}
                            onChange={(event : SelectChangeEvent, child: React.ReactNode)=>{

                                    setRightTagValue(event.target.value);

                                    setRightTagSelect(child);

                                
                            }}
                            typographyProps={{
                                variant:"caption",
                                noWrap : true,
                            }}
                            selectProps={{
                                variant:"standard",
                                size:"small",
                                renderValue : (value : any) => {

                                    return rightTagSelect;

                                }
                            }}
                        />
                    )
                }}
            />)
    }
    React.useEffect(()=>{

        if(rightTagValue === ""){
            return;
        }
        sender("@Content/_index",{
            category : rightTagValue
        })
        .then((results:any) => {
           settingTransferList(results.data);
        })
    },[rightTagValue])
    React.useEffect(()=>{

        settingTransferList();
    },[contents])

    React.useEffect(()=>{

        if(open){
            sender("@Content/_index",{
                category : props.id
            })
            .then((results:any) => {
               setContents(results.data);
            })
        }else{
            setTransferList(<></>);
        }
    },[open])
    return (
      <>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <IconButton onClick={handleOpen}>
            <DriveFileMoveIcon />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                spacing={5}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                    >
                        <Typography variant="h6">
                        {props.title}
                        </Typography>
                </Stack>
                {/* <ListItem
                    sx={{borderBottom : 1}}
                >
                        <ListItemButton role={undefined} onClick={()=>{
                            setAllChecked(!allChecked);
                        }} dense>
                        <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={allChecked}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': '' }}
                        />
                        </ListItemIcon>
                        <ListItemText primary={"콘텐츠 명"}/>
                        </ListItemButton>
            
                </ListItem> */}
            </Stack>
            <Stack sx={{pt:2}}>
            {transferList}
            </Stack>
            
            
            {/* <List sx={{ width: '100%',height : '80%', bgcolor: 'background.paper', overflow: 'auto'}}>
                        {contents.map((content:{_id : string,title : string}) => {
                            return (
                                <ListItem>
                                <ListItemButton role={undefined} onClick={handleToggle(content._id)} dense>
                                <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(content._id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': content._id }}
                                />
                                </ListItemIcon>
                                <ListItemText id={content._id} primary={`Line item ${content.title}`} />
                                </ListItemButton>
                                </ListItem>
                            )
                        })}
            </List> */}
          </Box>
        
        </Modal>
      </>
    );
  }
export function TagEdit() {
    const [tags, setTags] = React.useState([]);
    const [currentContents , setCurrentContents] = React.useState([]);
    const load = () => {

        sender("@Category/_index",{parent_id : "folder"})
            .then((tags : any) => {
                if(!isEmpty(tags.data)){

                    setTags(tags.data);
                }
                
            })
    }
    const handleDelete = (tagId: string | null) => {
        sender("@Category/_delete",{_id : tagId})
            .then((resolve) => {
                showAlert({
                    title : "삭제되었습니다.",
                    severity : "success"
                },()=>{
                    setTags([])
                });

            })
    }
    

    const handleDeleteButton = (tagId:string | null,tagName: string) => {
        
            sender("@Content/_index",{
                category : tagId
            })
                .then((contents:any) => {
                    if(contents.count != 0){
                        showConfirm({
                            title : `[${tagName}]에 ${contents.count}건의 콘텐츠가 "태그없음" 처리됩니다 
                                       삭제하시겠습니까?`,
                            severity : "info"
                        },(checked:boolean)=>{
                            // Promise.all()
                            if(checked){
                                const senderPromises:any = [];
                                contents.data.map((content:{_id  : string}) => {
                                    senderPromises.push(sender("@Content/_update",content._id, {category: null}));
                                })
                                Promise.all(senderPromises).then((resolve:any) => {
                                    handleDelete(tagId)
                                })
                            }
                        })
                    }else{
                        handleDelete(tagId)
                    }


                })

        
    }
    if(isEmpty(tags)){

        load();
    }
    // React.useEffect(() => {
    //     load();
    // },[tags])


    return (

            <Demo>

                <Stack direction="row" justifyContent="space-between" >
                    <Stack direction="row" justifyContent="flex-start">
                        <Button
                            endIcon={<Icons type={"listPlus"} />}
                            onClick={()=>{
                                sender("@Category/_insert",{
                                    name : "no name",
                                    parent_id : "folder",
                                    color : "#000000"
                                })
                                    .then((resolve) => {
                                        setTags([])
                                    })
                            }}
                        >
                            태그 추가
                        </Button>
                    </Stack>
                    <Stack direction="row" justifyContent="flex-start">
                    <Typography>
                        태그 개수 : {tags.length}건
                    </Typography>
                    </Stack>
                </Stack>
                    <List dense={true}>
                        <Container sx={{  height:"65vh", flexGrow: 1, overflow: 'auto'}}>
                            {tags.map((tag:{name : string, color ?: string, _id : string}) => {
                            return (
                                <ListItem
                                    secondaryAction={<></>
                                        // <IconButton edge="end" aria-label="delete" onClick={()=>{
                                        //     handleDeleteButton(tag._id);
                                        // }}>
                                        //     <DeleteIcon />
                                        // </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                            <SketchColorPicker
                                                color={tag.color}
                                                onClose={(event : {color : { hex : string}})=>{

                                                    sender("@Category/_update",{color : event.color.hex},{_id : tag._id})
                                                }}
                                            />
                                        {/*</LightTooltip>*/}
                                    </ListItemAvatar>
                                    <ListItemText
                                        // primary={tag.name}
                                        // secondary={secondary ? 'Secondary text' : null}
                                        primary={
                                        <Stack direction="row" spacing={2}>
                                                <TextField
                                                sx={{
                                                    width : "50%"
                                                }}
                                                defaultValue={tag.name}
                                                size={"small"}
                                                variant="standard"
                                                onChange={(event:any) => {
                                                        const currentValue:string = event.target.value;
                                                    sender("@Category/_update",{name : currentValue},{_id : tag._id})
                                                }}
                                                />
                                                    {/* <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        // handleDeleteButton(tag._id,tag.name);
                                                        sender("@Content/_index",{
                                                            category : tag._id
                                                        })
                                                        .then((contents : any) => {
                                                            setCurrentContents(contents.data);
                                                        })
                                                    }}>
                                                        <InfoIcon />
                                                    </IconButton>
                                                     */}
                                                <TagEditModal 
                                                    title={tag.name}
                                                    id={tag._id}
                                                    color={tag.color}
                                                    tags={tags}
                                                />
                                                <LightTooltip title={"태그 삭제"} placement={"top-end"}>
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                                        handleDeleteButton(tag._id,tag.name);
                                                    }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </LightTooltip>
                                        </Stack>
                                        }
                                    >
                                    </ListItemText>
                                </ListItem>
                            )
                        })}
                        </Container>
                    </List>
            </Demo>

    );
}


export default function TagConfig(){
    return (
        <TabPanel
            items={[{
                "label" : "태그 목록",
                "children" : <TagEdit />
            },{
                "label" : "테스트",
                "children" : <><SketchColorPicker /></>
            }]}

        />
    )
}