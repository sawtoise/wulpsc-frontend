import { useEffect } from 'react'
import './Settings.css'
import InputSlider from './Slider.jsx'
import GalleryIcon from '../assets/Gallery.svg'
import CheckboxIcon from '../assets/Checkbox.svg'
import TimePickerContainer from './TimePickerContainer.jsx'
import TimeList from './TimeList.jsx'

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

            <TimePickerContainer timeValues={timeValues}
                                 setTimeValues={setTimeValues}
            />

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

export default Settings