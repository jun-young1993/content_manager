import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useDispatch, useSelector, Provider} from "react-redux";


function ContentPageProvider(){
	const dispatch = useDispatch();
	const { page } = useSelector((state:any) => {return state.page})  
	const { category } = useSelector((state:any) => {return state.category})  
	const { searchText } = useSelector((state:any) => {return state.searchText})  
	// const [p, sp] = React.useState(page);
	console.log('change page',page);
	const onChangeHandle = (event: React.ChangeEvent<unknown>, value: number)=> {
	
		dispatch({type:'page.put',value : value});
		// sp(value);
	    }
	return (
		<Pagination count={10} page={page} onChange={onChangeHandle} />
	)
}
export default function ContentPagination() {
	
	// const { page } = useSelector((state:any) => {return state.page})


  return (
	<Stack spacing={2}>
		
		<ContentPageProvider />

	</Stack>
  );
}
