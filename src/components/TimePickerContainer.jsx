import { TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useState } from 'react'
import './TimePickerContainer.css'
import Plus from '../assets/Plus.svg'
import { TextField } from '@mui/material'

export default function TimePickerContainer ({timeValues, setTimeValues}) {

    const [timeValue, setTimeValue] = useState(dayjs('2022-04-17T15:30'))

    const pushTime = () => {
    const trimmedTime = timeValue.hour() + ':' + timeValue.minute()
    if (timeValues.find(e => e.time === trimmedTime)) {
        window.alert('Already exists')
        return
    }

    setTimeValues(prevState => [...prevState, {
        id: prevState.length + 1,
        time: trimmedTime,
    }])
    console.log(timeValues)
}


return (
        <div className={"timePickerContainer"}>
        <TimePicker

            renderInput={(params) => {
                return (
                    <TextField
                        {...params}
                        sx={{
                           fontSize: 40
                        }}
                    />
                );
            }}
            defaultValue={dayjs('2022-04-17T15:30')}
            value={timeValue}
            onChange={(newValue) => setTimeValue(newValue)}
        />
            <button className={"pushButton"} type="button"
                    onClick={pushTime}
            >
                <img className={"plusIcon"} src={Plus} alt={""}></img>
            </button>
        </div>
    )
}