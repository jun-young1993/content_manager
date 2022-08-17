import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useDispatch, useSelector, Provider} from "react-redux";

function ContentPageProvicer(props:any){
	  
	const { searchText } = useSelector((state:any) => {return state.searchText})
	const { category } = useSelector((state:any) => {return state.category})
	const { page } = useSelector((state:any) => {return state.page})
	console.log(searchText,category,page);
	return (
		<Stack spacing={2}>
		<Typography>Page: {page}</Typography>
		<Pagination count={10} page={page} onChange={props.handleChange} />
	      	</Stack>
	)
}
export default function ContentPagination() {
	const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {

	dispatch({type:'page.put',value : value});
    
  };

  return (
	<ContentPageProvicer handleChange={handleChange}/>
  );
}
