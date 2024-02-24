import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Settings.css'
import InputSlider from './Slider.jsx'
import GalleryIcon from '../../assets/Gallery.svg'
import CheckboxIcon from '../../assets/Checkbox.svg'
import TimePickerContainer from './TimePickerContainer.jsx'
import TimeList from './TimeList.jsx'
import parameterService from '../../services/parameters'
import { Alert, Snackbar } from '@mui/material'
import AlertDialog from './AlertDialog.jsx'
import ParameterSwitch from './Switch.jsx'

const Settings = ({
                      cameraSettings,
                      setCameraSettings,
                      saturation,
                      setSaturation,
                      contrast,
                      setContrast,
                      brightness,
                      setBrightness,
                      timeValues,
                      setTimeValues,
                  }) => {

    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [openApplyDialog, setOpenApplyDialog] = useState(false)
    const [serverData, setServerData] = useState({})
    const [awbChecked, setAWBChecked] = useState(false)
    const navigate = useNavigate()

    console.log(cameraSettings)


    useEffect(() => {
        const getParameters = async () => {
            try {
                const response = await fetch(`${parameterService.BASE_URL}/parameters`)
                const data = await response.json()
                console.log(data)
                if (!response.ok) {
                    throw new Error(`${response.status} ${parameterService.getErrorMessage(response, data)}`)
                }
                data.schedule = data.schedule.join(' ')
                setServerData(data)
            } catch (error) {
                console.log(error)
            }
        }
        getParameters()
            .catch(console.error)
    }, [timeValues])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpenSuccess(false)
        setOpenError(false)
    }

    const options2 = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            brightness: brightness,
            saturation: saturation,
            contrast: contrast,
            schedule: timeValues,
        }),

    }

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...cameraSettings,
            schedule: timeValues,
        })

    }

    const applyAsyncChanges = async () => {
        setOpenApplyDialog(false)
        console.log('applying async changes')
        try {
            const response = await fetch(`${parameterService.BASE_URL}/set_parameters`, options)
            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                setErrorMessage(`Error ${response.status}: ${parameterService.getErrorMessage(response, data)}`)
                throw new Error(`${response.status} ${parameterService.getErrorMessage(response, data)}`)
            }
            setOpenSuccess(true)
        } catch (error) {
            console.log(error)
            setOpenError(true)
        }
    }

    const handleClickOpen = () => {
        setOpenApplyDialog(true)
    }

    const label = { inputProps: { 'aria-label': 'Color switch demo' } }

    return (

        <div className={'outerSettingsContainer'}>
            <AlertDialog data={serverData} saturation={saturation}
                         brightness={brightness} contrast={contrast} schedule={timeValues}
                         open={openApplyDialog} setOpen={setOpenApplyDialog} handleClickOpen={handleClickOpen}
                         applyAsyncChanges={applyAsyncChanges}></AlertDialog>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openSuccess}
                      autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%', fontSize: 20 }}>
                    Success
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openError} autoHideDuration={6000}
                      onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%', fontSize: 20 }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <TimePickerContainer
                setCameraSettings={setCameraSettings}
                cameraSettings={cameraSettings}
                timeValues={timeValues}
                                 setTimeValues={setTimeValues}
            />

            <TimeList setCameraSettings={setCameraSettings} setTimeValues={setTimeValues} timeValues={timeValues}></TimeList>


            <div className={'buttonColumn'}>
                <button onClick={handleClickOpen} className={'captureButton'} type="button">
                    <div className={'cameraButtonRow'}>
                        <img className={'checkboxIcon'}
                             src={CheckboxIcon}
                             alt={'s'}
                        />
                        Apply
                    </div>
                </button>

                <button onClick={() => {
                    navigate('/gallery')
                }} className={'captureButton'} type="button">
                    <div className={'cameraButtonRow'}>
                        <img className={'cameraIcon'}
                             src={GalleryIcon}
                             alt={'s'}
                        />
                        Gallery
                    </div>
                </button>

            </div>
            <div className={'parameterContainer'}>
                <InputSlider label={'Quality'}
                             minimum={10}
                             maximum={63}
                             value={saturation}
                             setValue={setSaturation}
                />
                <InputSlider label={'Saturation'}
                             minimum={-2}
                             maximum={2}
                             value={cameraSettings.saturation}
                             setValue={(value) => {
                                 setCameraSettings({
                                     ...cameraSettings,
                                     saturation: value,
                                 })
                             }}
                />


                <InputSlider label={'Brightness'}
                             minimum={-2}
                             maximum={2}
                             value={cameraSettings.brightness}
                             setValue={(value) => {
                                 setCameraSettings({
                                     ...cameraSettings,
                                     brightness: value,
                                 })
                             }}
                />
                <InputSlider label={'Contrast'}
                             minimum={-2}
                             maximum={2}
                             value={cameraSettings.contrast}
                             setValue={(value) => {
                                 setCameraSettings({
                                     ...cameraSettings,
                                     contrast: value,
                                 })
                             }}
                />
                <InputSlider label={'Special Effect'}
                             minimum={0}
                             maximum={6}
                             value={contrast}
                             setValue={setContrast}
                />
                <InputSlider label={'White Balance Mode'}
                             minimum={0}
                             maximum={4}
                             value={contrast}
                             setValue={setContrast}
                />
                <InputSlider label={'Auto Exposure Level'}
                             minimum={-2}
                             maximum={2}
                             value={contrast}
                             setValue={setContrast}
                />
                <InputSlider label={'Auto Exposure Control Value'}
                             minimum={0}
                             maximum={1200}
                             value={contrast}
                             setValue={setContrast}
                />
                <InputSlider label={'Auto Gain Control Gain'}
                             minimum={0}
                             maximum={30}
                             value={contrast}
                             setValue={setContrast}
                />
                <InputSlider label={'Gain Ceiling'}
                             minimum={0}
                             maximum={6}
                             value={contrast}
                             setValue={setContrast}
                />
                <ParameterSwitch
                    label={'Lens Correction'}
                    checked={awbChecked}
                    setChecked={setAWBChecked}
                />
                <ParameterSwitch
                    label={'Auto Gain Control'}
                    checked={awbChecked}
                    setChecked={setAWBChecked}
                />
                <ParameterSwitch
                    label={'Auto Exposure Control'}
                    checked={awbChecked}
                    setChecked={setAWBChecked}
                />
                <ParameterSwitch
                    label={'Horizontal Mirror'}
                    checked={awbChecked}
                    setChecked={setAWBChecked}
                />
                <ParameterSwitch
                    label={'Vertical Flip'}
                    checked={awbChecked}
                    setChecked={setAWBChecked}
                />
                <ParameterSwitch
                    label={'Auto Exposure Control 2'}
                    checked={awbChecked}
                    setChecked={setAWBChecked}
                />
                <ParameterSwitch
                    label={'BPC'}
                    checked={awbChecked}
                    setChecked={setAWBChecked}
                />
                <ParameterSwitch
                    label={'WPC'}
                    checked={awbChecked}
                    setChecked={setAWBChecked}
                />
            </div>

        </div>
    )
}

export default Settings