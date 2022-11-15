import * as React from "react";
import {DataGrid, GridToolbarContainer,} from '@mui/x-data-grid';
import {Container, Stack, Typography, Button} from "@mui/material";
import {isEmpty} from "lodash";
import FieldMapper from "@views/components/fields/FieldMapper";
import Grid from "@mui/material/Grid";

interface toolbarItemInterface {
    title : string
    onClick : () => void
};
type toolbarType = toolbarItemInterface | React.ReactNode | JSX.Element;

export interface BaseGridInterface {
    title ?: string
    searchToolbar ?: any
    dataGridProps ?: any
    toolbar ?: toolbarType[]
    id ?: string
}
export type GridPanelItem = BaseGridInterface;
export interface GridPanelInterface {
    height ?: string
    items : GridPanelItem[]
}

/**
 * 그리드 타이틀
 * @param title string
 */
const makeTitle = (title ?: string) => {
    if(isEmpty(title)){
        return null;
    }
    return title;
}

const ArrayItems = (items:toolbarType[] | [] = []) => {

    
    return (
        items.map((item:toolbarType)=>{
            
                return item;
            
            
        })
    );
    
    
}
export function GridTitle(props:{title : string}){
    return (<Typography variant="h4" sx={{marginBottom:3}}>
    {makeTitle(props.title)}
</Typography>)
}
export default function BaseGrid(props:BaseGridInterface){
    

        props.dataGridProps.rows.map((row : {_id : string, id ?: string } | any) => {
            if(Boolean(props.dataGridProps.id)){
                row.id = row[props.dataGridProps.id];
            }else{
                row.id = row._id;
            }
            
            return row;
        })
    
    
    return (
        <Container fixed sx={{height:'65vh', width:"100%"}}>
            {props.title
                ? <GridTitle title={props.title}/>
                : <></>
            }

            <DataGrid
                sx={{height:'70vh'}}
                {...props.dataGridProps}
                components={{
                    Toolbar : () => {
                        return (
                            <GridToolbarContainer>
                                <Stack direction={"row"} spacing={2} >
                                    <FieldMapper 
                                        default={{
                                            size : "small",
                                            variant:"standard"
                                        }}
                                        fields={props.searchToolbar}
                                    />
                                    {ArrayItems(props.toolbar)}
                                </Stack>
                            </GridToolbarContainer>
                        )
                    }
                }}
            />
        </Container>
    );
}

export function GridPanel(props:GridPanelInterface){
    const height = props.height ? props.height : '70vh';

    return (
        <Grid container spacing={2} sx={{height: height}} >
            {props.items.map((item:GridPanelItem) => {
                console.log('baseGridItem', typeof item);
                return (
                        <Grid item xs={6} sx={{height: height}}>
                       
                            <BaseGrid
                                {...item}
                            />
                            
                            
                        </Grid>
                    )
            })}
        </Grid>

    )
}

