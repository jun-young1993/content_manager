import {Box, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import BaseGrid from "@views/components/grid/BaseGrid";
import Workflows from "@views/main/support/workflow/WorkflowRequestList";
import WorkflowRequestList from "@views/main/support/workflow/WorkflowRequestList";
import {GridRowParams, DataGridProps} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import Button from "@mui/material/Button";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface WorkflowRequestContentInterface {
    contentId : string
}
interface WorkflowRequestInterface {
    content : WorkflowRequestContentInterface
}
export default function WorkflowRequest(props:any) {
    console.log('workflowReqest',props);


    const contentId : string = props.contentId;
    return (
        <Modal
            {...props}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <WorkflowRequestList
                    onRowClick={(row:GridRowParams)=>{
                        console.log('click row',row);
                    }}

                />
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                >
                    <Button variant="outlined"
                            startIcon={<AccountTreeIcon />}
                            onClick={()=>{
                                    console.log('contentId 워크플로우 실행',contentId);
                            }}
                    >
                        워크플로우 실행
                    </Button>

                </Stack>
            </Box>
        </Modal>
    )
}