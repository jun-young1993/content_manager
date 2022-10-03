import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {SxProps, Typography} from '@mui/material';
import {contentDetailPanel, defaultValues} from "@views/main/support/config/ConfigItems";
import Store from "electron-store";
import TabPanel from "@views/components/TabPanel";
import {Theme} from "@mui/material/styles";

const store = new Store();

interface BaseItemLayoutPropsInterface {
	spacing ?: number
	leftBoxSx ?:  SxProps<Theme>

	rightBoxSx ?: SxProps<Theme>
}
const BaseItem = (item:{title:string, sub_title : string , element : JSX.Element, layoutProps ?:BaseItemLayoutPropsInterface }) => {

	const layoutProps : BaseItemLayoutPropsInterface = item.layoutProps || {};
	let spacing = layoutProps.spacing || 12;
	let leftBoxSx = layoutProps.leftBoxSx || {width : '70%'};
	let rightBoxSx = layoutProps.rightBoxSx || {width : '30%'};


	const RightBox = () => {
		return (
			<Box sx={rightBoxSx}>
				{item.element}
			</Box>
		)
	}

	return (
		<Stack
			direction="row"
			justifyContent="space-around"
			alignItems="center"
			spacing={spacing}
			>
				<Box sx={leftBoxSx}>
					<Stack
						spacing={0}
					>
						<Typography variant="inherit">
							{item.title}
						</Typography>
						<Typography variant="subtitle2">
							{item.sub_title}
						</Typography>
					</Stack>
				</Box>
			{<RightBox />}
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
	let element: (() => JSX.Element) | JSX.Element = <></>;
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
export const BaseLayout = (props:any) => {
	return (
	      <Box sx={{ width: '100%' }}>
		<Stack spacing={4}>
			{props.items.map((item:any) => {
				// if(props.render){
				// 	const custom:JSX.Element = props.render(item,props.type);
				// 	return (settingItem(custom));
				// }
				return (settingItem(item))
			})}
		</Stack>
	      </Box>
	)

}
export interface ContentDetailListenerInterface {
	onChange ?: () => void
}
export function ContentDetailPanelConfigLayout(){
	return (
		<BaseLayout
			items={contentDetailPanel}
		/>


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
			},{
				"label" : "콘텐츠 상세보기",
				"children" : 	(<BaseLayout
					items={contentDetailPanel}
				/>)
			}
			// ,{
			// 	"label" : "태그 관리",
			// 	"children" : (<TagEdit />)
			// }
			]}
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
