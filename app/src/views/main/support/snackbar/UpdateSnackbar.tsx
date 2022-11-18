import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from '@mui/material/LinearProgress';
const ORIGIN : SnackbarOrigin = {
	vertical : 'top',
	horizontal : 'right'
}
import MuiAlert, { AlertProps } from '@mui/material/Alert';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
      ) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
export default function UpdateSnackbar() {
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(
	<Stack sx={{width : '100%'}}>
  		<LinearProgress color="secondary" />
		<br/>
		<div>
			최신버전으로 업데이트를 시작합니다.
		</div>
  	</Stack>
  )
//   ipcRenderer.on('auto-update-checking-for-update"',(event:IpcRendererEvent,messages:string)=>{
//         console.log('auto-updater event',messages);
//    })
  ipcRenderer.on('auto-update-update-available"',(event:IpcRendererEvent,messages:string)=>{
        console.log('auto-updater event',messages);
	setOpen(true);
   })

   ipcRenderer.on('auto-update-download-progress',(event:IpcRendererEvent,messages:string)=>{
        console.log('auto-updater event',messages);
	// setOpen(true);
   })

  
  

  
    
  

  const handleClose = () => {
	
    setOpen(false);
  };


  return (
    <div>
	
      <Snackbar
        anchorOrigin={ORIGIN}
        open={open}
        onClose={(event)=>{
		// console.log('event',event);
		// handleClose
	}}
        message={progress}
        key={ORIGIN.vertical + ORIGIN.horizontal}
	action={
		<React.Fragment>
			
		{/* <Tooltip title="클릭시 최신버전으로 업데이트 됩니다.">
		    <IconButton
		    aria-label="update"
		    color="inherit"
		    sx={{ p: 0.5 }}
		    onClick={() => {
			ipcRenderer.send('auto-update-start','auto-update-start')
			handleClose()
		    }}
			>
		    <UpgradeIcon />
		  </IconButton>
		</Tooltip> */}
		{/* <Tooltip title="다음에 다시 보기">
		  <IconButton
		    aria-label="close"
		    color="inherit"
		    sx={{ p: 0.5 }}
		    onClick={handleClose}
		  >
		    <CloseIcon />
		  </IconButton>
		  </Tooltip> */}
		</React.Fragment>
	      }
      />

    </div>
  );
}
