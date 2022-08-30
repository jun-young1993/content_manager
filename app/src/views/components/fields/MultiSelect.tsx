import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
type lists = {[key : string] : string};
export interface MultiSelectInterface {
	lists : never | lists
	defaultLists ?: string[]
	emptyText ?: string
	onChange ?: Function
}

export default function MultiSelect(props:any | MultiSelectInterface) {
  
	


  const theme = useTheme();

  const [personName, setPersonName] = React.useState<string[]>(props.defaultLists ? props.defaultLists : []);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    
    const values = typeof value === 'string' ? value.split(',') : value;
    
    if(props.onChange){

	props.onChange(values);
    }
//     values.map((code:string) => {
// 	valueName.push(props.lists[code]);
//     });
    setPersonName(
      // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value
	values
    );
  };

  return (
    <div>
      <FormControl sx={{ width: 300}}>
        <Select
	  size={props.size}
	  variant={props.variant}
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
        //   input={<OutlinedInput />}
          renderValue={(selected:any) => {
            if (selected.length === 0) {
		return <em>{props.emptyText || "선택된 항목이 없습니다"}</em>
            }
	    const newSelectedValue : string[] = [];
	    
	    selected.map((code:string) => {
		newSelectedValue.push(props.lists[code]);
	    });
	//     console.log('selected',selected);
            return newSelectedValue.join(', ');
          }}
          MenuProps={MenuProps}
        //   inputProps={{ 'aria-label': 'Without label' }}
        >
          {/* <MenuItem disabled value="">
            <em>props.emptyText || "선택된 항목이 없습니다"</em>
          </MenuItem> */}
	  {Object.keys(props.lists).map((value:string) => (
		
		<MenuItem
			key={value}
			value={value}
			style={getStyles(value, personName, theme)}
		>
			{props.lists[value]}
		</MenuItem>
	  ))}
        </Select>
      </FormControl>
    </div>
  );
}
