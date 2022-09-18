import * as React from 'react';
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from "react-redux";

import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import {defaultValues} from "@views/main/support/config/ConfigItems";
import Content from "@views/main/Content";
import Store from "electron-store";
import {TagEdit} from "@views/main/TagConfig";
import TabPanel from "@views/components/TabPanel";
const store = new Store();


const BaseItem = (item:{title:string, sub_title : string , element : any}) => {
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
}      

const TitleItem = (item : {title : string}) => {
	return (
		<Typography sx={{borderBottom:1, borderBottomColor:'gray'}} variant={"h6"}>
			{item.title}
		</Typography>
	)
}
const settingItem = (item:{type : string} | any) => {
	let element = <></>;
	switch(item.type){
		case 'title' :
			element = TitleItem(item);
		break;
		case 'base' :
			element = BaseItem(item);
		break;
	}
	return element;
}
const BaseLayout = (props:any) => {
	return (
	      <Box sx={{ width: '100%' }}>
		<Stack spacing={4}>
			{props.items.map((item:any) => {
				console.log('baseLayout',store.get('default_values.tag'));
				return (settingItem(item))
			})}
		</Stack>
	      </Box>
	)

}
export default function Config() {

	console.log('store.get',store.get('default_values'));
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
	  setValue(newValue);
	};

	return (
		<TabPanel
			items={[{
				"label" : "기본값 변경",
				"children" : (	<BaseLayout
					items={defaultValues}
				/>)
			}]}
		/>
		// <Container fixed sx={{ height : '80vh'}}>
		// 	<Container fixed sx={{bgcolor: 'background.paper' }}>
		// 		<Tabs
		// 			value={value}
		// 			onChange={handleChange}
		// 			variant="scrollable"
		// 			scrollButtons
		// 			allowScrollButtonsMobile
		// 			aria-label="scrollable force tabs example"
		// 		>
		// 			<Tab label="기본값 변경" {...a11yProps(0)}/>
		// 			{/*<Tab label="콘텐츠 관리" {...a11yProps(1)}/>*/}
		// 		</Tabs>
		// 	</Container>
		// 	<TabPanel value={value} index={0}>
		// 		<BaseLayout
		// 			items={defaultValues}
		// 		/>
		// 	</TabPanel>
		// 	{/*<TabPanel index={1} value={value}>*/}
		// 	{/*	<>tags</>*/}
		// 	{/*</TabPanel>*/}
		// </Container>
		
	);
}
