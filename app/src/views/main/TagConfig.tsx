import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
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


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper
}));

export function TagEdit() {
    const [tags, setTags] = React.useState([]);
    const load = () => {
        console.log('tags renderer load');
        sender("@Category/_index",{parent_id : "folder"})
            .then((tags : any) => {
                setTags(tags.data);
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
    if(isEmpty(tags)){
        console.log('첫 랜더링');
        load();
    }
    // React.useEffect(() => {
    //     load();
    // },[tags])


    return (

            <Demo>

                <Stack direction="row" justifyContent="flex-start" >
                    <IconButton
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
                        <Icons type={"listPlus"} />
                    </IconButton>

                    {/*title={`태그 아이콘을 클릭하여 색상을 변경할 수 있습니다.`}*/}
                    {/*<HtmlTooltip*/}
                    {/*    // placement={"left-end"}*/}
                    {/*    title={*/}
                    {/*    <Typography >*/}
                    {/*        {`태그 아이콘을 클릭하여 색상을 변경할 수 있습니다.`}*/}
                    {/*    </Typography>*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*     <Typography>*/}
                    {/*        <Icons type={"help"} />*/}
                    {/*    </Typography>*/}
                    {/*</HtmlTooltip>*/}
                </Stack>
                <List dense={true}>
                    <Container sx={{  height:"65vh", flexGrow: 1, overflow: 'auto'}}>
                        {tags.map((tag:{name : string, color ?: string, _id : string}) => {
                        return (
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={()=>{
                                        sender("@Content/_index",{
                                            category : tag._id
                                        })
                                            .then((contents:any) => {
                                                if(contents.count != 0){
                                                    showConfirm({
                                                        title : `[${tag.name}]에 ${contents.count}건의 콘텐츠가 "태그없음" 처리됩니다 
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
                                                                handleDelete(tag._id)
                                                            })
                                                        }
                                                    })
                                                }else{
                                                    handleDelete(tag._id)
                                                }

                                                console.log('contents',contents);
                                            })

                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                        <SketchColorPicker
                                            color={tag.color}
                                            onClose={(event : {color : { hex : string}})=>{
                                                 console.log("event",event);
                                                 sender("@Category/_update",{color : event.color.hex},{_id : tag._id})
                                            }}
                                        />
                                    {/*</LightTooltip>*/}
                                </ListItemAvatar>
                                <ListItemText
                                    // primary={tag.name}
                                    // secondary={secondary ? 'Secondary text' : null}
                                    primary={<TextField
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
                                    />}
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