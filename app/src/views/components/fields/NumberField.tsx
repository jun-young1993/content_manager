import * as React from 'react';
import MuiInput from '@mui/material/Input';
import {styled} from '@mui/material/styles';
const Input = styled(MuiInput)`
  width: 42px;
`;

interface NumberFieldInterface {
	value ?: number | {():number}
	title ?: string
	onChange ?: Function
	hideSlider ?: boolean
	max ?: number
    }
export default function NumberField(props:NumberFieldInterface){
	console.log('numberField',props);
	const [value, setValue] = React.useState<number | string | Array<number | string>>(
		props.value || 0
	    );
	    const max = props.max || 100;
	    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(props.onChange){
			
			props.onChange(event.target.value === '' ? '' : Number(event.target.value));
			
			
		}
		setValue(event.target.value === '' ? '' : Number(event.target.value));

	    };
	    const handleBlur = () => {
		if (value < 0) {
		    setValue(0);
		} else if (value > max) {
		    setValue(max);
		}
	    };
	return (
		<Input
                        value={value}
                        size="medium"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: max,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
	)
}