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
import AlertDialogSleep from './AlertDialogSleep.jsx'
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
                      setBackendSettings
                  }) => {

    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [openApplyDialog, setOpenApplyDialog] = useState(false)
    const [openSleepDialog, setOpenSleepDialog] = useState(false)
    const [serverData, setServerData] = useState({})
    const [awbChecked, setAWBChecked] = useState(false)
    const navigate = useNavigate()
    const [dateValues, setDateValues] = useState([])



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

    const handleSleepClick = async () => {
        setOpenSleepDialog(false)
        console.log('calling sleep')
        try {
            const response = await fetch(`${parameterService.BASE_URL}/wuc_sleep`)
            const data = await response.json()
            console.log(data)
            if (!response.ok) {
                setErrorMessage(`Error ${response.status}: ${parameterService.getErrorMessage(response, data)}`)
                throw new Error(`${response.status} ${parameterService.getErrorMessage(response, data)}`)
            }
    
            setBackendSettings((prevState) => ({
                ...prevState,
                next_wakeup: data
              }))
            setOpenSuccess(true)
        } catch (error) {
            console.log(error)
            setOpenError(true)
        }
    }

    const handleClickOpen = () => {
        setOpenApplyDialog(true)
    }

    const handleSleepClickOpen = () => {
        setOpenSleepDialog(true)
    }

    const label = { inputProps: { 'aria-label': 'Color switch demo' } }

    return (

        <div className={'outerSettingsContainer'}>
            <div className={'controlContainer'}>
                <AlertDialogSleep className={"alertDialog"} data={serverData}
                             open={openSleepDialog} setOpen={setOpenSleepDialog}
                             handleSleepClick={handleSleepClick}></AlertDialogSleep>
            <AlertDialog className={"alertDialog"} data={serverData} saturation={saturation}
                         brightness={brightness} contrast={contrast} schedule={timeValues} cameraSettings={cameraSettings}
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
                dateValues={dateValues}
                setDateValues={setDateValues}
            />

            <TimeList setCameraSettings={setCameraSettings} setTimeValues={setTimeValues} timeValues={timeValues}></TimeList>
                <TimeList setCameraSettings={setCameraSettings} setTimeValues={setDateValues} timeValues={dateValues}></TimeList>


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

                <button onClick={handleSleepClickOpen} className={'captureButton'} type="button">
                    <div className={'cameraButtonRow'}>
                        <img className={'cameraIcon'}
                             src={GalleryIcon}
                             alt={'s'}
                        />
                        Sleep
                    </div>
                </button>

            </div>
            </div>
            <div className={'parameterContainer'}>
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
                             value={cameraSettings.special_effect}
                             setValue={(value) => {
                                 setCameraSettings({
                                     ...cameraSettings,
                                     special_effect: value,
                                 })
                             }}
                />
                <InputSlider label={'White Balance Mode'}
                             minimum={0}
                             maximum={4}
                             value={cameraSettings.wb_mode}
                             setValue={(value) => {
                                 setCameraSettings({
                                     ...cameraSettings,
                                     wb_mode: value,
                                 })
                             }}
                />
                <InputSlider label={'Auto Exposure Level'}
                             minimum={-2}
                             maximum={2}
                             value={cameraSettings.ae_level}
                             setValue={(value) => {
                                 setCameraSettings({
                                     ...cameraSettings,
                                     ae_level: value,
                                 })
                             }}
                />
                <InputSlider label={'Auto Exposure Control Value'}
                             minimum={0}
                             maximum={1200}
                             value={cameraSettings.aec_value}
                             setValue={(value) => {
                                 setCameraSettings({
                                     ...cameraSettings,
                                     aec_value: value,
                                 })
                             }}
                />
                <InputSlider label={'Auto Gain Control Gain'}
                             minimum={0}
                             maximum={30}
                             value={cameraSettings.agc_gain}
                             setValue={(value) => {
                                 setCameraSettings({
                                     ...cameraSettings,
                                     agc_gain: value,
                                 })
                             }}
                />
                <InputSlider label={'Gain Ceiling'}
                             minimum={0}
                             maximum={6}
                             value={cameraSettings.gainceiling}
                             setValue={(value) => {
                                 setCameraSettings({
                                     ...cameraSettings,
                                     gainceiling: value,
                                 })
                             }}
                />
                <InputSlider label={'Sleep Time'}
                             minimum={1}
                             maximum={2628000}
                             value={cameraSettings.sleep}
                             setValue={(value) => {
                                 setCameraSettings({
                                     ...cameraSettings,
                                     sleep: value,
                                 })
                             }}
                />
                
            </div>
            <div className={'parameterContainer'}>
                <ParameterSwitch
                    label={'Lens Correction'}
                    checked={cameraSettings.lenc}
                    setChecked={(value) => {
                        setCameraSettings({
                            ...cameraSettings,
                            lenc: value,
                        })
                    }}
                />
                <ParameterSwitch
                    label={'Auto Gain Control'}
                    checked={cameraSettings.agc}
                    setChecked={(value) => {
                        setCameraSettings({
                            ...cameraSettings,
                            agc: value,
                        })
                    }}
                />
                <ParameterSwitch
                    label={'Auto Exposure Control'}
                    checked={cameraSettings.aec}
                    setChecked={(value) => {
                        setCameraSettings({
                            ...cameraSettings,
                            aec: value,
                        })
                    }}
                />
                <ParameterSwitch
                    label={'Horizontal Mirror'}
                    checked={cameraSettings.hmirror}
                    setChecked={(value) => {
                        setCameraSettings({
                            ...cameraSettings,
                            hmirror: value,
                        })
                    }}
                />
                <ParameterSwitch
                    label={'Vertical Flip'}
                    checked={cameraSettings.vflip}
                    setChecked={(value) => {
                        setCameraSettings({
                            ...cameraSettings,
                            vflip: value,
                        })
                    }}
                />
                <ParameterSwitch
                    label={'Auto Exposure Control 2'}
                    checked={cameraSettings.aec2}
                    setChecked={(value) => {
                        setCameraSettings({
                            ...cameraSettings,
                            aec2: value,
                        })
                    }}
                />
                <ParameterSwitch
                    label={'BPC'}
                    checked={cameraSettings.bpc}
                    setChecked={(value) => {
                        setCameraSettings({
                            ...cameraSettings,
                            bpc: value,
                        })
                    }}
                />
                <ParameterSwitch
                    label={'WPC'}
                    checked={cameraSettings.wpc}
                    setChecked={(value) => {
                        setCameraSettings({
                            ...cameraSettings,
                            wpc: value,
                        })
                    }}
                />
                <ParameterSwitch
                    label={'SD Save'}
                    checked={cameraSettings.sd_save}
                    setChecked={(value) => {
                        setCameraSettings({
                            ...cameraSettings,
                            sd_save: value,
                        })
                    }}
                />
                <ParameterSwitch
                    label={'Automatic Sleep'}
                    checked={cameraSettings.auto_sleep}
                    setChecked={(value) => {
                        setCameraSettings({
                            ...cameraSettings,
                            auto_sleep: value,
                        })
                    }}
                />
                <ParameterSwitch
                    label={'Low Light Mode'}
                    checked={cameraSettings.low_light}
                    setChecked={(value) => {
                        setCameraSettings({
                            ...cameraSettings,
                            low_light: value,
                        })
                    }}
                />
            </div>


        </div>
    )
}

export default Settings