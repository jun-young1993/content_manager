import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useDispatch, useSelector, Provider} from "react-redux";
import {ipcRenderer, IpcRendererEvent} from "electron";




import TablePagination from '@mui/material/TablePagination';

export default function ContentPagination(props:{count : number, page : number, size : number, onChangeHandle : Function}) {




	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		props.onChangeHandle({page : newPage, size : props.size});

	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		// setRowsPerPage(parseInt(event.target.value, 10));
		props.onChangeHandle({page : 0,size : parseInt(event.target.value)});
		// dispatch({type:'page.put',value : {page : 0,size : parseInt(event.target.value)}});
	};
	// ipcRenderer.on("@Content/_count/reply",(event:IpcRendererEvent,result:any)=>{
	// 	if(result.success){
	// 		const searchCount = result.data;
	//
	// 		setTotalCount(searchCount);
	//
	// 	}
	// 	ipcRenderer.removeAllListeners("@Content/_count/reply")
	// })
	return (
		<TablePagination
			component="div"
			count={props.count}
			page={props.page}
			onPageChange={handleChangePage}
			rowsPerPage={props.size}
			onRowsPerPageChange={handleChangeRowsPerPage}
		/>
	);
}
