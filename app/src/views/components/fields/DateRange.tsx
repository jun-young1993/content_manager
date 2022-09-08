import * as React from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {
	Container,
	Typography,
	Stack,
	TextField,
	Button
    } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
export interface BetweenDateFieldInteface {
    field : string
	start_date ?: Date
	end_date ?: Date
    onChange ?: { (newValue : Dayjs | null, type : "start" | "end") : void }
    values : Date[] 
    size : "small" | "medium" | undefined
}
const reducer = (prevState:any, newState:any) => ({
	...prevState,
	...newState
    })


/**
 * 
 * @param props 
 * @returns 
 */    
export default function DateRange(props:BetweenDateFieldInteface | any){
	const size = props.size;
    
	const [values, setValues] = React.useReducer(reducer,{
		'start_date' : dayjs(props.values[0]),
		'end_date' : dayjs(props.values[1]),
	});    
	      const handleStartChange = (newValue: Dayjs | null) => {
                    console.log('new Value',newValue)
                setValues({start_date : dayjs(newValue)});
                if(props.onChange){
                    props.onChange(newValue,'start');
                }
                
	      };
          const handleEndChange = (newValue : Dayjs | null) => {
                setValues({end_date : dayjs(newValue)});
                if(props.onChange){
                    props.onChange(newValue,'end');
                }
                
          }
	      console.log('values',values);
          React.useEffect(() => {},[]);
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>

                <Stack direction={"row"} spacing={2}>
                    <DesktopDatePicker
                        inputFormat="yyyy-MM-dd"
                        value={values.start_date}
                        onChange={handleStartChange}
                        renderInput={(params) => {
                            return <TextField
                                size={size}
                                style={{width:'120px'}}
                                variant={props.variant}
                                {...params}
                            />
                        }}
                    />
                    <Typography>
                        to
                    </Typography>
                    <DesktopDatePicker
                        inputFormat="yyyy-MM-dd"
                        value={values.end_date}
                        onChange={handleEndChange}
                        renderInput={(params) => {
                            return <TextField
                                size={size}
                                style={{width:'120px'}}
                                variant={props.variant}
                                {...params}
                            />
                        }}
                    />
                </Stack>
            </LocalizationProvider>
	)
}