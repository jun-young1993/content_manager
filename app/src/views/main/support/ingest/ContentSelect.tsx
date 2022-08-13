import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
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
import AddTaskIcon from '@mui/icons-material/AddTask';
import ArchiveIcon from '@mui/icons-material/Archive';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as Path from "path";
import {ipcRenderer, IpcRendererEvent} from "electron";
import CustomAlert from "@views/components/CustomAlert";
import { useSelector, useDispatch } from "react-redux";
import ContentDialog from '../content/ContentDialog';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));
const Input = styled('input')({
    display: 'none',
});






export default function ContentSelect() {
    // const [dense, setDense] = React.useState(false);
    
    const { metadata} = useSelector((state:any) => {return state.metadata})
    const { fields} = useSelector((state:any) => {return state.fields})
      const {files} = useSelector((state:any) => state.files);
      const [showContentDialog , setContentDialog] =  React.useState(<></>)
    // const files = [];
    const dispatch = useDispatch();
    const setFiles = (path:string) => {
        dispatch({type : 'files.patch', value : path})
    }
    const putFiles = (path:string) => {
        dispatch({type : 'files.put', value : path})
    }
    const listItemSecondaryButton = (files:any,file:string) => {
        return (
            <IconButton edge="end" 
            aria-label="delete" 
            onClick={() => {
                
                console.log('file',file)
                let newFiles:any = [];
                files.map((oldFile:string) => {
                    if(oldFile !== file){
                        newFiles.push(oldFile);
                    };
                })
                console.log('before new Files',newFiles);
                putFiles(newFiles);
                setLists(makeListItem(newFiles));
                
            }}>
                <DeleteIcon />
            </IconButton>
        )

    }
    const makeListItem = function(files:any){
        console.log('first files',files);

        
        if(files.length == 0){
            return (
                <div>파일을 선택해주세요.</div>
            );
        }
        // @ts-ignore
        return (files.map((file:string, index:any) =>
            <ListItem
                key={index}
                secondaryAction={
                    listItemSecondaryButton(files,file)
                }
            >
                <ListItemText sx={{width:'100%'}}
                    primary={Path.basename(file)}
                />
            </ListItem>
        )
        )
    }
    const [lists, setLists] = React.useState(makeListItem(files));
    console.log('files',files);
    return (
        <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Stack direction="row" spacing={2} sx={{width:'100%'}} >
                        <FormGroup row>
                            <label htmlFor="contained-button-file">
                            
                                <Input
                                    accept="video/*"
                                    id="contained-button-file"
                                    multiple type="file"
                                    style={{ display: 'none' }}
                                    onInput={(event:any) => {
                                        console.log('event.target.files',event.target.files)

                                        Array.from(event.target.files).forEach((file:any) => {
                                            const path:string = file.path;
                                            // @ts-ignore
                                            if(files.indexOf(path) === -1){
                                                // @ts-ignore
                                                files.push(path);

                                            }
                                        });
                                        console.log('before set Files ',files)
                                        setFiles(files);
                                        
                                        setLists(makeListItem(files));
                                        console.log('after set Files ',files)
                                    }}
                                />
                                
                                    <Button variant="contained" component="span" startIcon={<AddTaskIcon />}>
                                        미디어 선택
                                    </Button>
                        
                            </label>
                        </FormGroup>
                  
                        <Button variant="contained" component="span" endIcon={<ArchiveIcon />}
                            onClick={()=>{
                                console.log('ingest  button click')
                                ipcRenderer.send("@Ingest/_ingest",{
                                    metadata : metadata,
                                    files : files
                                });

                                // setALert((<CustomAlert serverity="info" 
                                // title="요청완료되었습니다." 
                                // onClose={()=>{
                                //     console.log('request complete');
                                // }}
                                // />));
                                console.log('metadta',metadata);
                                console.log('fields',fields)
                                console.log('files',files);
                            }}
                        >
                            인제스트
                        </Button>
                        
            </Stack>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 4 }} variant="h6" component="div">
                    </Typography>
                    <Demo>
                        <List>
                            {lists}
                                {/* {files.map((file:string, index:any) =>{
                                       <ListItem
                                       key={index}
                                       secondaryAction={
                                           <IconButton edge="end" aria-label="delete" onClick={(evt : any) => {
   
                                           }}>
                                               <DeleteIcon />
                                           </IconButton>
                                       }
                                   >
                                       <ListItemAvatar>
                                           <Avatar>
                                               <IconButton
                                                   onClick={(evt : any) => {
   
                                                       // if(options.setSecondary){
                                                       //     options.setSecondary(!options.secondary);
                                                       // }
                                                       console.log('click avatar',evt);
                                                   }}
                                               >
                                                   <FolderIcon />
                                               </IconButton>
                                           </Avatar>
                                       </ListItemAvatar>
                                       <ListItemText
                                           primary={Path.basename(file)}
                                           // secondary={secondary ? 'test' : null}
                                       />
                                   </ListItem>
                                })} */}
                        </List>
                    </Demo>
                </Grid>
            </Grid>
            {showContentDialog}       
        </Box>
     
    );
}
