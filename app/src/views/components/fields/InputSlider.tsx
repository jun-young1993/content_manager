import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Typography from "@mui/material/Typography";

const Input = styled(MuiInput)`
  width: 42px;
`;
interface inputSliderInterface {
    value ?: number | any
    title ?: string
    onChange ?: Function
}
export default function InputSlider(props:inputSliderInterface) {
    const [value, setValue] = React.useState<number | string | Array<number | string>>(
        props.value || 0
    );

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        if(props.onChange){
            props.onChange(newValue);
        }
        setValue(newValue);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(props.onChange){
            props.onChange(event.target.value === '' ? '' : Number(event.target.value));
        }
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <Box sx={{ width: "100%" }}>
            {props.title
            ?<Typography id="input-slider" gutterBottom>
                    {props.title}
                </Typography>
            :<></>}

            <Grid container spacing={2} alignItems="center">
                {/*<Grid item>*/}
                {/*    <VolumeUp />*/}
                {/*</Grid>*/}
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
