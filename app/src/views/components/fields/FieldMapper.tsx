

import * as React from "react";
import DateRange from "@views/components/fields/DateRange";
import SelectChip from "@views/components/fields/SelectChip";
import MultiSelect from "@views/components/fields/MultiSelect";

import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { Stack } from '@mui/material'
export type fieldTypes = "date_range";
export interface Fields {
	field : fieldTypes
}
export interface Default {
	size : "small" | "medium" | undefined
	variant : "standard" | "outlined" | "filled" | undefined
}
export interface FieldMapperPropsInterfaece {
	fields : Fields[]
	default ?: Default
}

const map : {[key in string] : any} = {
	'date_range' : DateRange,
	'select_chip' : SelectChip,
	'select_multi' : MultiSelect
};
const fieldMap = () => {

}

/**
 * 커스텀된 필드들 타입 받아서 맵핑된 컴포넌트 배열로 리턴 
 * 
 * @param {FieldMapperPropsInterfaece} props 
 * @returns {React.ReactElement}
 */
export default function FieldMapper(props:FieldMapperPropsInterfaece){
	const defaultProps = props.default || {};

	return (
		<>
			<Stack spacing={1} direction="row" >
				{props.fields
					? props.fields.map((field:Fields) => {
						const fieldElement = map[field.field];
						Object.assign(field,defaultProps);
						return (
							fieldElement(field)
						)
						// return (mappingType(field));

					})
					: <></>
				}
			</Stack>
		</>
	);
}