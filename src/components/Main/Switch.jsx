
import Box from '@mui/material/Box';
import './Switch.css';
import { FormControlLabel, Switch } from '@mui/material'

export default function ParameterSwitch( {label, checked, setChecked} ) {

    const handleSwitchChange = (event, newValue) => {
        setChecked(newValue);
    };


    return (
        <div className={"switchContainer"}>
            <div className={"labelText"}>{label}</div>
                <Switch
                    checked = {checked}
                    color="success"
                    onChange={handleSwitchChange}
                />
            </div>
    );
}