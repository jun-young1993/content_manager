import {Box, Modal, Stack} from "@mui/material";
import React from "react";
import WorkflowRequestList from "@views/main/support/workflow/WorkflowRequestList";
import {GridRowParams} from "@mui/x-data-grid";
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import Button from "@mui/material/Button";
import {sender, showAlert, showConfirm} from "@views/helper/helper";
import {isEmpty} from "lodash";

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
    const [selected, setSelected] = React.useState<any>(null);

    const contentId : string = props.contentId;
    return (
        <Modal
            {...props}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <WorkflowRequestList
                    params={{content_type : {$in : [props.contentType,null]}}}
                    onRowClick={(row:GridRowParams)=>{
                        setSelected(row.row);
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
                                if(isEmpty(selected)){
                                    showAlert({
                                        title : '선택된 워크플로우가 없습니다.',
                                        severity : "warning"
                                    })
                                    return false;
                                }
                                const workflowName:string = selected.name;
                                const workflowId : string = selected._id;
                                console.log(workflowName);
                                showConfirm({
                                    title : `[${workflowName}] 워크플로우를 호출하시겠습니까?`,
                                    severity : "info"
                                },(checked:boolean) => {
                                    if(checked){
                                       sender("#start-workflow",{
                                            workflow_id : workflowId,
                                           content_id : contentId
                                       });
                                    }
                                })
                                console.log('selected',selected);
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