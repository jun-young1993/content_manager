import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Store from "electron-store";

const store = new Store();

/**
 * label - 셀렉트 박스 라벨
 * sender - promise api
 * value - 기본값
 * topMenu - 최상단 매뉴 아이템
 *
 * @interface SelectApiInterface
 */
interface SelectApiInterface {
  label ?: string
  sender : any
  value : any
  emptyText ?: string,
  topMenu ?: any
  valueField ?: string
  displayField ?: string
  customList ?: Function
  onChange : Function
}
const reducer = (prevState:any, newState:any) => (Object.assign({},prevState,newState));


const makeMenuList = () => {

}
export default function SelectApi(props:SelectApiInterface) {
  
  const [list , setList] = React.useState([]);
  const [value, setValue] = React.useState(props.value || null);
  const load = () => {
    
    props.sender
    .then((result : any) => {
      // if(Array.isArray(result.data)){
      //     return setList([]);
      // }
      return setList(result.data);

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
          {props.topMenu || <></>}
          {list.map((item:any) => {
            const valueField:string = props.valueField || '_id';
            const displayField : string = props.displayField || 'name';
            return (
              props.customList
              ? props.customList(item)
              :(<MenuItem value={item[valueField]}>
					      {item[displayField]}
				        </MenuItem>)
            )
          })}
          

        </Select>
      </FormControl>
    
  );
}
