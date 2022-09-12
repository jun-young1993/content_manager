import * as React from "react";
import BaseGrid from "@views/components/grid/BaseGrid";
import {sender} from "@views/helper/helper";
import {HtmlTooltip} from "@views/components/tooltip/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import WorkflowDetail from "@views/main/support/workflow/WorkflowDetail";
import Typography from "@mui/material/Typography";
import {WorkflowRuleInterface} from "@/public/interfaces/WorkflowRuleInterface";
import WorkflowDetail2 from "@views/main/support/workflow/WorkflowDetail2";
import {
    DataGridProps
} from '@mui/x-data-grid';
import {Box} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
interface WorkflowRequestListInterface extends DataGridProps{

}
export default function WorkflowRequestList(props:any){
    const [rows , setRows] = React.useState([]);

    React.useEffect(()=> {
        sender("@WorkFlow/_all")
            .then((rows:any) => {
                setRows(rows.data);
            })
    },[])
    return (
        <BaseGrid
            dataGridProps={{...{
                style:{
                    height : "60vh",
                    width : "100%"
                },
                columns:[
                    { width : 50, renderCell : (row:{row : {_id : string}})=>{
                        const workflowId : string = row.row._id;
                        return (
                            <HtmlTooltip
                                sx={{
                                    width : "0.1vh",
                                    height : "0.1vh"
                                }}
                                title={
                                        <WorkflowDetail2
                                            workflowId={workflowId}
                                            sx={{
                                                border:'1px solid #dadde9',
                                                width:"100vh",
                                                backgroundColor : "#f5f5f9",
                                                borderRadius : "2%"
                                            }}
                                        />
                                }

                            >
                            <IconButton>
                                <AccountTreeIcon />
                            </IconButton>
                            </HtmlTooltip>
                        );
                    }},
                    { field : 'name', headerName: "워크플로우명",flex : 1},
                    { field : 'description', headerName: "설명",flex : 1},
                ],
                rows:rows.map((row:{_id : string , id ?: string}) => {
                    row.id = row._id;
                    return row;
                }),
                isCellEditable : true,
                hideFooter:true
            },...props || {}}}

        />
    )
}