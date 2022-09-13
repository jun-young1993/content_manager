import * as React from "react";
import BaseGrid from "@views/components/grid/BaseGrid";
import {sender} from "@views/helper/helper";
import TaskCircularProgress from "@views/main/support/taskMonitor/TaskCircularProgress";
const reducer = (prevState:any, newState:any) => ({
	...prevState,
	...newState
})
const pageReducer = (prevState:any, newState:any) => ({
	...prevState,
	...newState
})
const taskReducer = (prevState:any, newState:any) => ({
	...prevState,
	...newState
})
import {TaskStatus} from "../../../public/interfaces/Types/TaskStatus"
import dayjs from "dayjs";
export interface valuesInterface {
	createdAt : {
		$gte : Date,
		$lte : Date
	}
	status : TaskStatus[]
}
export default function TaskMonitor(){
	
	const [values, setValues] = React.useReducer(reducer,{
		createdAt : {$gte : new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
			 $lte : new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),23,59,59)},
		status : {$in : ['processing']}
	});    
	const [pagenation, setPagenation] = React.useReducer(pageReducer,{
		page : 0,
		size : 10
	})

	const [tasks, setTasks] = React.useReducer(taskReducer,{
		rows : [],
		count : 0
	})
	// const [rows, setRows] = React.useState([]);
	const onDateChangeHandle = (newValue:any, type : "start" | "end") => {
		console.log('new Value',newValue);
		console.log('type',type);
		const endDate = values.createdAt.$lte;
		const startDate = values.createdAt.$gte;
		if(type === "start"){
			console.log('start change',{createdAt : {$gte : newValue, $lte : endDate}})
			setValues({createdAt : {$gte : newValue, $lte : endDate}});
		}else if(type == "end"){
			console.log('end date',{createdAt : {$gte : startDate , $lte : newValue}})
			setValues({createdAt : {$gte : startDate , $lte : newValue}});
		}
		
	}
	const load = () => {
		console.log('laod',values);
		sender("@Task/_index",values,pagenation)
		    .then((result:any) => {
			console.log("@Task/_index",result.data);
			setTasks({rows : result.data, count : result.count});
		    })
    
	}
    
	React.useEffect(() => {
	    console.log('one render');
	    load();
	},[])

	React.useEffect(() => {
		console.log('value render');
		load();
	},[values])

	React.useEffect(() => {
		console.log('pagenation render');
		load();
	},[pagenation])
	
	return (
		<BaseGrid
			// title={"작업 모니터링"}
			
			// rows={tasks.rows.map((row:{_id : string, id ?: string}) => {
			// 	row.id = row._id;
			// 	return row;
			//     })}
			searchToolbar={[
				{ field : "date_range" , onChange : onDateChangeHandle , values : [values.createdAt.$gte, values.createdAt.$lte]},
				{ 
					field : "select_multi" , onChange : (values : string[])=>{
						setValues({status : {$in : values}});
					} , 
					lists : {"queue" : "대기", "processing" : "작업중", "complete" : "완료", "error" : "실패"},
					defaultLists : values.status.$in
				}
			]}
			dataGridProps={{
				columns:[
					{ field: 'progress', headerName: '진행률', width: 100, renderCell : (row:{id : string, row : {status : string, progress ?: number}}) => {
						// console.log('render cell',row);
						return (<TaskCircularProgress taskId={row.id} status={row.row.status} progress={row.row.progress}/>);
					} },
					{ field: 'status', headerName: '상태', width: 150 },
					{ field: 'workflow_nm', headerName: '워크플로우명', width: 250 },
					{ field: 'module_nm', headerName: '모듈명', width: 250 },
					{ field: 'source', headerName: '소스파일', width: 200 },
					{ field: 'target', headerName: '타겟파일', width: 200 },
					{ field: "createdAt", headerName: "작업생성일", width : 180, renderCell : (row : {createdAt : Date}) => {
						return dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss');
					}}	
				],
				rows : tasks.rows.map((row:{_id : string, id ?: string, progress ?: any}) => {
					// row.progress = (<CircularStatic />)
					row.id = row._id;
					return row;
				    }),
				rowCount : tasks.count,
				rowsPerPageOptions: [5,10,15,20,25,30],
				page : pagenation.page,
				pageSize : pagenation.size,
				onPageChange:(page:number)=>{
					setPagenation({page : page})
				},
				onPageSizeChange:(pageSize:number)=>{
					setPagenation({size : pageSize})
				}
			}}
		/>
	)
}