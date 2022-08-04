import {useRef,cloneElement} from 'react';
import TextField from '@mui/material/TextField';
export default function FormTextField(props:any) {
	// const inputRef = useRef(props.value);
	const element = <TextField 
	// 	inputRef={inputRef}
	/>
	const textField = cloneElement(element,{
		name : props.name,
		label : props.label,
		variant : props.variant
	})
	return (textField);
}