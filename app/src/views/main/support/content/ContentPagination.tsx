import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useDispatch, useSelector, Provider} from "react-redux";
import {ipcRenderer, IpcRendererEvent} from "electron";


// function ContentPageProvider(){
// 	const dispatch = useDispatch();
// 	const { page } = useSelector((state:any) => {return state.page})
//
// 	const [count , setCount] = React.useState<number>(1);
// 	ipcRenderer.on("@Content/_count/reply",(event:IpcRendererEvent,result:any)=>{
// 		if(result.success){
// 			const searchCount = result.data;
// 			const pageCount:number = searchCount/10;
// 			let viewCount = 1;
// 			if(pageCount == 0){
// 				setCount(viewCount);
// 				return;
// 			}
// 			if(Number.isInteger(pageCount)){
// 				viewCount = pageCount;
// 			}else{
// 				viewCount = parseInt(String(pageCount))+1;
// 			}
// 			setCount(viewCount);
// 		}
// 		ipcRenderer.removeAllListeners("@Content/_count/reply")
// 	})
//
// 	const onChangeHandle = (event: React.ChangeEvent<unknown>, value: number)=> {
//
// 		dispatch({type:'page.put',value : value});
// 		// sp(value);
// 	    }
// 	return (
// 		<Pagination count={count} page={page} onChange={onChangeHandle} />
// 	)
// }
// export default function ContentPagination() {
//
// 	// const { page } = useSelector((state:any) => {return state.page})
//
//
//   return (
// 	<Stack spacing={2}>
//
// 		<ContentPageProvider />
//
// 	</Stack>
//   );
// }

import TablePagination from '@mui/material/TablePagination';

export default function ContentPagination() {
	const dispatch = useDispatch();
	const { page } = useSelector((state:any) => {return state.page})
	const { size }   = useSelector((state:any) => {return state.page})


	// const { perPage } = useSelector((state:any) => {return state.perPage})
	// console.log('perPage',perPage);

	const [totalCount , setTotalCount] = React.useState<number>(0);
	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		dispatch({type:'page.put',value : {page : newPage, size : size}});
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		// setRowsPerPage(parseInt(event.target.value, 10));
		dispatch({type:'page.put',value : {page : 0,size : parseInt(event.target.value)}});
	};
	ipcRenderer.on("@Content/_count/reply",(event:IpcRendererEvent,result:any)=>{
		if(result.success){
			const searchCount = result.data;

			setTotalCount(searchCount);

		}
		ipcRenderer.removeAllListeners("@Content/_count/reply")
	})
	return (
		<TablePagination
			component="div"
			count={totalCount}
			page={page}
			onPageChange={handleChangePage}
			rowsPerPage={size}
			onRowsPerPageChange={handleChangeRowsPerPage}
		/>
	);
}
