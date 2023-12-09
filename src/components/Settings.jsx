import { useEffect, useState } from 'react'
import { TimePicker } from '@mui/x-date-pickers'
import './Settings.css'
import InputSlider from './Slider.jsx'
import GalleryIcon from '../images/Gallery.svg'
import CheckboxIcon from '../images/Checkbox.svg'
import dayjs from 'dayjs'

const Settings = ({
                      saturation,
                      setSaturation,
                      contrast,
                      setContrast,
                      brightness,
                      setBrightness,
                      timeValues,
                      setTimeValues,
                  }) => {

    const [timeValue, setTimeValue] = useState(dayjs('2022-04-17T15:30'))

    useEffect(() => {
    }, [timeValues])

    return (
        <div className={'outerSettingsContainer'}>
            <InputSlider label={'Saturation'}
                         minimum={0}
                         maximum={100}
                         value={saturation}
                         setValue={setSaturation}
            />
            <InputSlider label={'Brightness'}
                         minimum={0}
                         maximum={20}
                         value={brightness}
                         setValue={setBrightness}
            />
            <InputSlider label={'Contrast'}
                         minimum={0}
                         maximum={100}
                         value={contrast}
                         setValue={setContrast}
            />
            <TimePicker
                defaultValue={dayjs('2022-04-17T15:30')}
                value={timeValue}
                onChange={(newValue) => setTimeValue(newValue)}>
            </TimePicker>
            <button type="button"
                    onClick={() => {

                        const trimmedTime = timeValue.hour() + ':' + timeValue.minute()
                        /* timeValues.push({
                              id: timeValues.length + 1,
                              time: trimmedTime
                          })*/

                        if (timeValues.find(e => e.time === trimmedTime)) {
                            window.alert('Already exists')
                            return
                        }

                        setTimeValues(prevState => [...prevState, {
                            id: prevState.length + 1,
                            time: trimmedTime,
                        }])
                        console.log(timeValues)
                    }}
            >Push
            </button>

            <TimeList setTimeValues={setTimeValues} timeValues={timeValues}></TimeList>


            <div className={'buttonColumn'}>
                <button className={'captureButton'} type="button">
                    <div className={'cameraButtonRow'}>
                        <img className={'checkboxIcon'}
                             src={CheckboxIcon}
                             alt={'s'}
                        />
                        Apply
                    </div>
                </button>

                <button className={'captureButton'} type="button">
                    <div className={'cameraButtonRow'}>
                        <img className={'cameraIcon'}
                             src={GalleryIcon}
                             alt={'s'}
                        />
                        Gallery
                    </div>
                </button>

            </div>
        </div>
    )
}

const TimeList = ({ timeValues, setTimeValues }) => {

    const listItems = timeValues.map((timeValue) =>
        <li onClick={() => setTimeValues(timeValues.filter(t => t.id !== timeValue.id))}
            key={timeValue.id}>{timeValue.time}</li>,
    )


    return (
        <ul>{listItems}</ul>
    )
}

export default Settings