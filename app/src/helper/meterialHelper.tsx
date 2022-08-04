import electron from "electron";
const ipcRenderer = electron.ipcRenderer;
import {
	Button,
	Stack,
	FormControlLabel,
	FormControl,
	Select,
	MenuItem,
	SelectChangeEvent,
	TextField, Box
    } from '@mui/material';
function codeItemByMenuItem(parentCode:string){
	const data = ipcRenderer.sendSync("@CodeItem/indexByParentCode",parentCode);
	const items = []
	if(data.success){
		const codeItem = data.data;
		for(let codeItemIndex = 0; codeItemIndex < codeItem.length; codeItemIndex++){
			items.push((<MenuItem key={codeItem[codeItemIndex].code} value={codeItem[codeItemIndex].code}>{codeItem[codeItemIndex].name}</MenuItem>))	
		}
		return (items);
	}
}
function allByModel(model:string){
	const data = ipcRenderer.sendSync("@"+model+"/all");
	if(data.success){
		return data.data;
	}
}
export {
	codeItemByMenuItem,
	allByModel
}