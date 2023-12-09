import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import './Slider.css';

const Input = styled(MuiInput)`
  width: 42px;
`;

export default function InputSlider( {label, minimum, maximum, value, setValue} ) {

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <Box sx={{ width: 300 }}>
            <div className={"labelText"}>{label}</div>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        color="success"
                        min = {minimum}
                        max = {maximum}
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={value}
                        size="medium"
                        color={'success'}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            style: {fontSize: 20, color: '#000000', fontWeight: 500},
                            step: 10,
                            min: minimum,
                            max: maximum,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}