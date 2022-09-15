import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Store from "electron-store";
const store = new Store();
interface SelectApiInterface {
  label ?: string
  sender : any
  value : any
  valueField ?: string
  displayField ?: string
  customList ?: Function
  onChange : Function
}
const reducer = (prevState:any, newState:any) => (Object.assign({},prevState,newState));
export default function SelectApi(props:SelectApiInterface) {
  console.log('store.get("default_values.tag")',store.get("default_values.tag"));
  console.log('props.value',props.value);
  const [list , setList] = React.useState([]);
  const [value, setValue] = React.useState(props.value || null);
  const load = () => {
    props.sender
    .then((result : any) => {
      setList(result.data);
    })
  }
  React.useEffect(()=>{
    load();
  },[])
  
  return (
    
      <FormControl fullWidth>
        {props.label 
        ? <InputLabel variant="standard" htmlFor="uncontrolled-native">
          props.label
          </InputLabel>
        :
        <></>
        }
        <Select
          value={value}
          onChange={(event : SelectChangeEvent)=>{
            props.onChange(event.target.value);
            setValue(event.target.value);
          }}
        >
          {list.map((item:any) => {
            const valueField:string = props.valueField || '_id';
            const displayField : string = props.displayField || 'name';
            return (
              props.customList
              ? props.customList(item)
              :<option value={item[valueField]}>{item[displayField]}</option>      
              
            )
          })}
          

        </Select>
      </FormControl>
    
  );
}
