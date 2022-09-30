import * as React from 'react';
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from "react-redux";

import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';
import MenuList from '@views/main/support/config/MenuList';

import Metadata from "@views/main/Metadata";
import Code from "@views/main/Code";
import Storage from "@views/main/Storage";
import Module from "@views/main/Module";
import Workflow from "@views/main/Workflow";
import ConfigStore from "@views/store/ConfigStore";
import {ipcRenderer, IpcRendererEvent} from "electron";
import TaskMonitor from "@views/main/TaskMonitor";
import BaseGrid from "@views/components/grid/BaseGrid";
import SelectApi from "@views/components/fields/SelectApi";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import {sender} from "@views/helper/helper";
import {MenuItem} from "@mui/material";
import {Circle as CircleIcon} from '@mui/icons-material';
import MultiSelect from "@views/components/fields/MultiSelect";
import Store from "electron-store";
const store = new Store();

export const defaultValues = [{
	"type" : "title",
	"title" : "인제스트"
},{
	'type' : "base",
	"title" : "비디오 인제스트 호출 워크플로우",
	"sub_title" : "워크플로우 흐름이 외부입수로 시작하는 워크플로우만 등록해주세요.",
	"element" : <SelectApi 
		sender={sender("@WorkFlow/_all")}
		value={()=>{
			return store.get('default_values.ingest_workflow_video');
		}}
		onChange={(value:string)=>{
			store.set('default_values.ingest_workflow_video',value);
		}}
	/>
},{
	'type' : "base",
	"title" : "이미지 인제스트 호출 워크플로우",
	"sub_title" : "워크플로우 흐름이 외부입수로 시작하는 워크플로우만 등록해주세요.",
	"element" : <SelectApi 
		sender={sender("@WorkFlow/_all")}
		value={()=>{
			return store.get('default_values.ingest_workflow_image');
		}}
		onChange={(value:string)=>{
			store.set('default_values.ingest_workflow_image',value);
		}}
	/>
},{
	'type' : "base",
	"title" : "음원 인제스트 호출 워크플로우",
	"sub_title" : "워크플로우 흐름이 외부입수로 시작하는 워크플로우만 등록해주세요.",
	"element" : <SelectApi 
		sender={sender("@WorkFlow/_all")}
		value={()=>{
			return store.get('default_values.ingest_workflow_music');
		}}
		onChange={(value:string)=>{
			store.set('default_values.ingest_workflow_music',value);
		}}
	/>
},{
	"type" : "title",
	"title" : "콘텐츠 검색"
},{
	'type' : "base",
	"title" : "Tag",
	"sub_title" : "콘텐츠 검색시 검색 조건 태그",
	"element" : <SelectApi 
		sender={sender("@Category/_index",{parent_id : "folder"})}
		value={()=>{
			return store.get('default_values.tag');
		}}
		topMenu={<MenuItem value={""}><em>None</em></MenuItem>}
		customList={(tag:any)=>{
			return (
				
				<MenuItem value={tag._id}>
					<Typography>
					    <CircleIcon
						sx={{
						    width:"20px",
						    height:"20px",
						    pr : 1,
						    // marginTop:"8px",
						    color:tag.color || "#000000"
						}}
					    />
					    {tag.name}
					</Typography>
				    </MenuItem>
				
				
			)
		}}
		onChange={(value:string)=>{
			store.set('default_values.tag',value);
		}}
	/>
},{
	'type' : "base",
	"title" : "콘텐츠 유형",
	"sub_title" : "콘텐츠 검색시 기본 검색 조건 콘텐츠 유형",
	"element" : <SelectApi 
		sender={sender("@CodeItem/_indexByParentCode",'content_type')}
		value={()=>{
			return store.get('default_values.content_type');
		}}
		topMenu={<MenuItem value={""}><em>None</em></MenuItem>}
		valueField={"code"}
		displayField={"name"}
		onChange={(value:string)=>{
			store.set('default_values.content_type',value);
		}}
	/>
},{
	'type' : "base",
	"title" : "콘텐츠 노출 항목 개수",
	"sub_title" : "콘텐츠 리스트 항목 열 개수 설정",
	"element" : <SelectApi 
		sender={new Promise((resolve) => {
			sender("@CodeItem/_indexByParentCode","grid_row_count")
			.then((result:any) => {
				console.log('content list row count ',result);
				resolve(result.data);
			})
			// resolve({
			// 	data : [{
			// 		"_id" : 10,
			// 		"name" : 10
			// 	},{
			// 		"_id" : 25,
			// 		"name" : 25
			// 	},{
			// 		"_id" : 50,
			// 		"name" : 50
			// 	},{
			// 		"_id" : 100,
			// 		"name" : 100
			// 	}]
			// })
		})}
		value={()=>{
			return store.get('default_values.rows_page_size_content');
		}}
		onChange={(value:string)=>{
			store.set('default_values.rows_page_size_content',value);
		}}
	/>	
},{
	"type" : "title",
	"title" : "모니터링 검색"
},{
	"type" : "base",
	"title" : "작업 모니터링 상태",
	"sub_title" : "작업 모니터링 상태 조회",
	"element" : <MultiSelect
		defaultLists={()=>{
			return store.get('default_values.task_monitor_status');
		}}
		lists={{"queue" : "대기", "processing" : "작업중", "complete" : "완료", "error" : "실패"}}
		onChange={(values:string[])=>{
			store.set('default_values.task_monitor_status',values);
		}}
	/>
},{
	'type' : "base",
	"title" : "작업모니터링 노출 항목 개수",
	"sub_title" : "작업모니터링 리스트 항목 열 개수 설정",
	"element" : <SelectApi 
		sender={new Promise((resolve) => {
			sender("@CodeItem/_indexByParentCode","grid_row_count")
			.then((result:any) => {
				resolve(result.data);
				// resolve({
				// 	data : [{
				// 		"_id" : 10,
				// 		"name" : 10
				// 	},{
				// 		"_id" : 25,
				// 		"name" : 25
				// 	},{
				// 		"_id" : 50,
				// 		"name" : 50
				// 	},{
				// 		"_id" : 100,
				// 		"name" : 100
				// 	}]
				// })
			})
		
		})}
		value={()=>{
			return store.get('default_values.rows_page_size_task_monitor');
		}}
		onChange={(value:string)=>{
			store.set('default_values.rows_page_size_task_monitor',value);
		}}
	/>	
}]