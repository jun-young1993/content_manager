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
import Store from "electron-store";
const store = new Store();
interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}
function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;
      
	return (
	  <div
	    role="tabpanel"
	    hidden={value !== index}
	    id={`simple-tabpanel-${index}`}
	    aria-labelledby={`simple-tab-${index}`}
	    {...other}
	  >
	    {value === index && (
	      <Box sx={{ p: 3 }}>
		{children}
	      </Box>
	    )}
	  </div>
	);
}
function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
      }));

      
const defaultValues = [{
	"title" : "Tag",
	"sub_title" : "콘텐츠 검색시 기본 검색 조건 태그",
	"element" : <SelectApi 
		sender={sender("@Category/_index",{parent_id : "folder"})}
		value={()=>{
			return store.get('default_values.tag');
		}}
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
			console.log('default_values.tag',value);
			console.log(store.get('default_values.tag'));
		}}
	/>
}
// ,{
// 	"title" : "콘텐츠 유형",
// 	"sub_title" : "콘텐츠 검색시 기본 검색 조건 콘텐츠 유형",
// 	"element" : <SelectApi />
// }
]


const BaseLayout = (props:any) => {
	return (
	      <Box sx={{ width: '100%' }}>
		<Stack spacing={4}>
			{props.items.map((item:any) => {
				console.log('baseLayout',store.get('default_values.tag'));
				return (
					<Stack
					direction="row"
					justifyContent="space-around"
					alignItems="center"
					spacing={12}
					>
						<Box sx={{ width :'70%'}}>
							<Stack
								spacing={0}
							>
							<Typography variant="inherit">
							{item.title}
							</Typography>
							<Typography variant="subtitle2">
							{item.sub_title}
							</Typography >
							</Stack>
						</Box>
						<Box sx={{ width :'30%'}}>
							{item.element}
						</Box>
					
					</Stack>
				)
			})}
		</Stack>
	      </Box>
	)

}
export default function Config() {


	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
	  setValue(newValue);
	};

	return (
		<Container fixed sx={{ height : '80vh'}}>
			<Container fixed sx={{bgcolor: 'background.paper' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="scrollable"
					scrollButtons
					allowScrollButtonsMobile
					aria-label="scrollable force tabs example"
				>
					<Tab label="기본값 변경" {...a11yProps(0)}/>
					<Tab label="Item Two" {...a11yProps(1)}/>
					<Tab label="Item Three" />
					<Tab label="Item Four" />
					<Tab label="Item Five" />
					<Tab label="Item Six" />
					<Tab label="Item Seven" />
				</Tabs>
			</Container>
			<TabPanel value={value} index={0}>
				<BaseLayout 
					items={defaultValues}
				/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<>bye</>
			</TabPanel>
		</Container>
	);
}
