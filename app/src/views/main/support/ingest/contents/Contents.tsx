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
import Button from "@mui/material/Button";



const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));
const Input = styled('input')({
    display: 'none',
});
const makeListItem = function(files:any,options :any = {
    setSecondary : null,
    secondary : null
}){
    console.log(options);
    // @ts-ignore
    return (files.map((file:any, index:any) =>
        <ListItem
            key={index}
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <IconButton
                        onClick={(evt : any) => {
                            if(options.setSecondary){
                                options.setSecondary(!options.secondary);
                            }
                            console.log('click avatar',evt);
                        }}
                    >
                        <FolderIcon />
                    </IconButton>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={file}
                secondary={options.secondary ? 'test' : null}
            />
        </ListItem>
    )
    )
}
export default function Contents() {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState({});
    const [files, setFiles] = React.useState([]);
    // @ts-ignore
    const [lists, setLists] = React.useState(makeListItem(['no item']),{
        setSecondary: setSecondary,
        secondary : secondary
    });
    const [currentDate, setCurrentDate] = React.useState(Date.now());
    const inputEl = React.useRef(null)
    // const inputChange = (event:any) => {
    //     console.log('inputChange',event.target.files);
    // }
    // const generate = function(element: React.ReactElement) {
    //     files.map((file) => {
    //         console.log('generate file',file);
    //     })
    //     // return files.map((value) => {
    //     //         console.log(value);
    //     //         // React.cloneElement(element, {
    //     //         //     key: value,
    //     //         // })
    //     // }
    //     //
    //     // );
    // }
    // console.log(makeListItem(['no item']));
    console.log('files',files);

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <FormGroup row>
                {/*<FormControlLabel*/}
                {/*    control={*/}
                {/*        <Checkbox*/}
                {/*            checked={dense}*/}
                {/*            onChange={(event) => setDense(event.target.checked)}*/}
                {/*        />*/}
                {/*    }*/}
                {/*    label="Enable dense"*/}
                {/*/>*/}
                <label htmlFor="contained-button-file">
                    {/*<input onChange={handleChange} onInput={(event:any)=>{*/}
                    {/*    console.log('event')*/}
                    {/*}} multiple={false} type="file" />*/}
                    <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple type="file"
                        key={currentDate}
                        style={{ display: 'none' }}
                        // onClick={(event) => {
                        //     const randomString = Math.random().toString(36);
                        //     setInputKey(randomString);
                        //     console.log('event button',event.target)
                        //     // setFiles(target.files);
                        //     // console.log(files);
                        // }}
                        // onChange={(event:any)=>{
                        //     // event.preventDefault();
                        //     setCurrentDate(Date.now());
                        //     console.log('event button',event.target,files)
                        //     setFiles(event.target.files);
                        //     console.log(files);
                        //
                        //     // const selectedFiles = Array.from(evt.target.files);
                        //     // console.log('selectedFiles',selectedFiles);
                        //     // const [file] = selectedFiles;
                        //     // console.log('file',file);
                        // }}
                        // onChange={(event : any) => {
                        //     // @ts-ignore
                        //     inputEl.current.value = '';
                        // }}
                        // onChange={handleChange}
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

                            // const secondaryArray:[] = [];
                            // secondaryArray.fill()
                            const tmpSecondary = new Array(files.length).fill(false);
                            console.log('tmpSecondary',tmpSecondary);
                            // for(let i = 0; files.length < i; i++){
                            //     secondaryObj[i] = false;
                            // }
                            // @ts-ignore
                            setSecondary(Object.assign({},tmpSecondary))
                            console.log('secondary',secondary);
                            // React.useEffect(() => {
                            //    console.log('use Effect',secondary);
                            // }, [secondary]);
                            console.log('before set Files ',files)
                            setFiles(files);

                            setLists(makeListItem(files,{
                                setSecondary : setSecondary,
                                secondary : secondary
                            }));
                            console.log('after set Files ',files)
                        }}
                    />
                    <Button variant="contained" component="span" >
                        Upload
                    </Button>
                </label>
                {/*<FormControlLabel*/}
                {/*    control={*/}
                {/*        <Checkbox*/}
                {/*            checked={secondary}*/}
                {/*            onChange={(event) => setSecondary(event.target.checked)}*/}
                {/*        />*/}
                {/*    }*/}
                {/*    label="Enable secondary text"*/}
                {/*/>*/}
            </FormGroup>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 4 }} variant="h6" component="div">
                        Avatar with text and icon
                    </Typography>
                    <Demo>
                        <List dense={dense}>
                            {/*{files.map((file) => {*/}
                            {/*    console.log('file',file);*/}
                            {/*})}*/}
                            {lists}
                            {/*{files.map((file) => {*/}
                            {/*    console.log(file);*/}
                            {/*    <ListItem*/}
                            {/*        secondaryAction={*/}
                            {/*            <IconButton edge="end" aria-label="delete">*/}
                            {/*                <DeleteIcon />*/}
                            {/*            </IconButton>*/}
                            {/*        }*/}
                            {/*    >*/}
                            {/*        <ListItemAvatar>*/}
                            {/*            <Avatar>*/}
                            {/*                <IconButton*/}
                            {/*                    onClick={(evt : any) => {*/}
                            {/*                        // console.log(evt);*/}
                            {/*                    }}*/}
                            {/*                >*/}
                            {/*                    <FolderIcon />*/}
                            {/*                </IconButton>*/}
                            {/*            </Avatar>*/}
                            {/*        </ListItemAvatar>*/}
                            {/*        <ListItemText*/}
                            {/*            primary="Single-line item"*/}
                            {/*            secondary={secondary ? 'Secondary text' : null}*/}
                            {/*        />*/}
                            {/*    </ListItem>*/}
                            {/*})}*/}
                        {/*    {generate(*/}
                        {/*        <ListItem*/}
                        {/*            secondaryAction={*/}
                        {/*                <IconButton edge="end" aria-label="delete">*/}
                        {/*                    <DeleteIcon />*/}
                        {/*                </IconButton>*/}
                        {/*            }*/}
                        {/*        >*/}
                        {/*            <ListItemAvatar>*/}
                        {/*                <Avatar>*/}
                        {/*                    <IconButton*/}
                        {/*                        onClick={(evt : any) => {*/}
                        {/*                            // console.log(evt);*/}
                        {/*                        }}*/}
                        {/*                    >*/}
                        {/*                        <FolderIcon />*/}
                        {/*                    </IconButton>*/}
                        {/*                </Avatar>*/}
                        {/*            </ListItemAvatar>*/}
                        {/*            <ListItemText*/}
                        {/*                primary="Single-line item"*/}
                        {/*                secondary={secondary ? 'Secondary text' : null}*/}
                        {/*            />*/}
                        {/*        </ListItem>,*/}
                        {/*    )}*/}
                        </List>
                    </Demo>
                </Grid>
            </Grid>
        </Box>
    );
}
