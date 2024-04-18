import { DateTimePicker, TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import './TimePickerContainer.css'
import Plus from '../../assets/Plus.svg'
import { Alert, Snackbar, TextField } from '@mui/material'
import utc from 'dayjs/plugin/utc'

export default function TimePickerContainer ({timeValues, setTimeValues, dateValues, setDateValues}) {
    dayjs.extend(utc)


    const [timeValue, setTimeValue] = useState(dayjs('2022-04-17T15:30'))
    const [dateValue, setDateValue] = useState(dayjs('2024-04-17T15:30'))
    const [currentDate, setCurrentDate] = useState(dayjs.utc())
    const trimmedTime = currentDate.hour() + ':' + currentDate.minute().toString().padStart(2, "0")
    const [openError, setOpenError] = useState(false)


    useEffect(() => {
        let secTimer = setInterval( () => {
            setCurrentDate(dayjs.utc())
        },1000)

        return () => clearInterval(secTimer);
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false)
    };

    const pushTime = () => {
    const trimmedTime = timeValue.hour() + ':' + timeValue.minute().toString().padStart(2, "0")
    if (timeValues.find(e => e === trimmedTime)) {
        setOpenError(true)
        return
    }

        setTimeValues(
            [
                ...timeValues,
                trimmedTime
            ]
        );

    console.log(timeValues)
}

    const pushDate = () => {
        const trimmedDate = dateValue.toISOString()


        setDateValues(
            [
                ...dateValues,
                trimmedDate
            ]
        );

        console.log(dateValues)
    }


return (
    <>
        <div className={"outerTimePickerContainer"}>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%', fontSize: 20 }}>
                    The time you are trying to add already exists!
                </Alert>
            </Snackbar>
        <div className={"utcLabel"}>Current UTC time is: {trimmedTime}</div>
        <div className={"timePickerContainer"}>
        <TimePicker
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
            <div className={"timePickerContainer"}>
            <DateTimePicker
                defaultValue={dayjs('2024-04-17T15:30')}
                value={dateValue}
                onChange={(newValue) => setDateValue(newValue)}
            />

            <button className={"pushButton"} type="button"
                    onClick={pushDate}
            >
                <img className={"plusIcon"} src={Plus} alt={""}></img>
            </button>
            </div>

        </div>
    </>
    )
}