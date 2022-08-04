import Text from '@views/main/support/ingest/fields/Text'
import * as React from "react";
const reducer = (prevState:any, newState:any) => ({...prevState,...newState});

export default function FieldSet(props:any){

    const fields = props.fields;
    const [valuse, setValues] = React.useReducer(reducer, {});
    const updateValue = (evt:any,option:any) => {
        setValues({
            [option.code] : evt.target.value
        })
        console.log(valuse);
        props.onUpdateValues(valuse);
    }
    return(<div>
        {fields.map((data:any)=>{
            const type = data.type;
            if(type == 'text_field'){
                return <Text option={data} updateValue={updateValue}></Text>;
            }
        })}
    </div>);
}