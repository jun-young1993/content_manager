import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};


export default function LoadMask() {
	const [open, setOpen] = React.useState(true);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
  return (
	<Modal
		open={open}
		onClose={handleClose}
		aria-labelledby="modal-modal-title"
		aria-describedby="modal-modal-description"
	>
			<CircularProgress sx={style}/>
	</Modal>
  );
}