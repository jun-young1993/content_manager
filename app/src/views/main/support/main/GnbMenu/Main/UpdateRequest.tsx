import { invoker } from "@views/helper/helper"
import {useEffect, useState} from "react";
import {  Grid, Typography, Stack } from "@mui/material";
import {
	GridRowParams
    } from '@mui/x-data-grid';
import BaseGrid, {GridTitle} from "@views/components/grid/BaseGrid";
import MarkdownTypography from "@views/components/utill/MarkdownTypography";

export default function UpdateRequest() {
	const [releases, setReleases] = useState<[{id : number,  node_id : string , tag_name : string, created_at : string, body : string}] | []>([]);
	const [body , setBody] = useState<string>("");
	console.log('releases',releases);
	useEffect(() => {
		invoker("@Git/$release")
		.then((releses) => {
			console.log('releases',JSON.parse(releses));
			
			setReleases(JSON.parse(releses));
		})
	},[])
	useEffect(()=>{
		if(releases.length !== 0) setBody(releases[0].body);
	},[releases])

	return (
		<Grid container spacing={2} sx={{height: "70vh"}} >
				<Grid item xs={6} sx={{height: "70vh"}}>
					{(releases.length === 0)
					? <></>
					: <BaseGrid
						title ="업데이트 이력"
						dataGridProps={{
								id : "node_id",
								onRowClick:(params:GridRowParams) => {
									setBody(params.row.body);
								},
								columns : [
									{field : 'tag_name', headerName : "버전", flex : 1},
									{field : 'created_at', headerName : "업데이트 일시", flex : 2}
								],
								rows : releases,
								hideFooterPagination : true,
								HideFooterSelectedRowCount : true,
								hideFooter : true,
						}}
					/>}
				</Grid>
			<Grid item xs={6} sx={{height: "70vh"}} style={{border : 1}}>
				<GridTitle title={"업데이트 내용"} />
				<MarkdownTypography markdown={body} />
			</Grid>
		</Grid>
	)
}