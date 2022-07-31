import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SvgIconProps } from '@mui/material/SvgIcon';
import IconButton from "@mui/material/IconButton";
import FormDialog from "@views/components/FormDialog";
import electron from "electron";
import CustomAlert from "@views/components/CustomAlert";
import {SyntheticEvent} from "react";
import {functions} from "electron-log";
const ipcRenderer = electron.ipcRenderer;
declare module 'react' {
    interface CSSProperties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
    labelIcon: React.ElementType<SvgIconProps>;
    labelInfo?: string;
    labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            {...other}
        />
    );
}
const laodByNode:any = (nodeId:string,callback:any) => {
    ipcRenderer.send("@Category/_index",{parent_id : nodeId})
    ipcRenderer.on("@Category/_index/reply",(event:any,result) => {
        console.log('result node by id')
        callback(result);

    });
}


export default function Category() {
    const baseAlert = ((<CustomAlert open={false} />));

    const [alert, setALert] = React.useState(baseAlert)
    const [alertOpen, setAlertOpen] = React.useState(false);



    const [children , setChildren] = React.useState([<StyledTreeItem nodeId={'sample'} labelText={''} labelIcon={FolderIcon} />])
    const load = () => {
        laodByNode('folder',(result:any) => {
            console.log(result);
            if(result.success){
                setChildren(result.data);
            }
        });
    }


    return (
        <>
            <Typography gutterBottom component="div" align="left" sx={{ borderBottom: 1 }}>
                <FormDialog
                    iconButton={<PlaylistAddIcon />}
                    buttonTitle={"추가"}
                    values={{
                        name : ''
                    }}
                    fields={[{
                        name : "name",
                        label : "카테고리명",
                        variant:"standard"
                    }]}
                    onSaveClick={(result:any) => {
                        if(result){
                            const values = result.values;
                            values.parent_id = 'folder';

                            ipcRenderer.send("@Category/_insert",values)
                            result.setOpen(false)
                            ipcRenderer.on("@Category/_insert/reply",(event:any,result:any) => {

                                load();
                            })
                        }
                    }}
                />

            </Typography>
            <TreeView
                aria-label="gmail"
                defaultExpanded={[]}
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                defaultEndIcon={<div style={{ width: 24 }} />}
                sx={{ height: '100vh', flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                onNodeSelect={(event:SyntheticEvent,nodeIds:string|string[])=>{
                    if(nodeIds == 'folder'){
                        load();
                    }

                }}
            >

            <StyledTreeItem nodeId="folder" labelText="카테고리" labelIcon={FolderIcon} >
                {children.map((children:any) => {
                    return <StyledTreeItem nodeId={children._id} labelText={children.name} labelIcon={FolderIcon} />;
                })}
            </StyledTreeItem>


        </TreeView>

        </>
    );
}
