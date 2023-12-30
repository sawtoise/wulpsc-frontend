import './Main.css';
import LatestPhoto from "../components/Main/LatestPhoto.jsx";
import Settings from "../components/Main/Settings.jsx";
import * as React from "react";
import { useEffect, useState } from 'react'
import parameterService from '../services/parameters.js'
import { Alert, Snackbar } from '@mui/material'
function Main() {

    const [saturation, setSaturation] = React.useState(0);
    const [brightness, setBrightness] = React.useState(0);
    const [contrast, setContrast] = React.useState(0);
    const [timeValues, setTimeValues] = React.useState([])
    const [openError, setOpenError] = useState(false);
    const [latestPhoto, setLatestPhoto] = useState({});
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://stereo-backend.fly.dev/parameters')
                const data = await response.json()
                console.log(data)
                if (!response.ok) {
                    setErrorMessage(`Error ${response.status}: Could not fetch the latest parameters from the backend.`)
                    throw new Error(`${response.status} ${parameterService.getErrorMessage(response, data)}`);
                }
                setBrightness(data.brightness)
                setSaturation(data.saturation)
                setContrast(data.contrast)
                setTimeValues(data.schedule)
            } catch (error) {
                console.log(error)
                setOpenError(true)
            }
        }

        const fetchLatestPhoto = async () => {
            try {
                const response = await fetch('https://stereo-backend.fly.dev/get_latest_photo')
                const data = await response.json()
                console.log(data)
                if (!response.ok) {
                    setErrorMessage(`Error ${response.status}: Could not fetch the latest photo from the backend.`)
                    throw new Error(`${response.status} ${parameterService.getErrorMessage(response, data)}`);
                }
                setLatestPhoto(data)
            } catch (error) {
                console.log(error)
                setOpenError(true)
            }
        }

        fetchLatestPhoto()
            .catch(console.error)
        fetchData()
            .catch(console.error)
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false)
    };

    return (
        <div className="main-page">
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={openError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%', fontSize: 20 }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <div className="left-container">
                <LatestPhoto latestPhoto={latestPhoto}></LatestPhoto>
            </div>
            <div className="right-container">
                <Settings
                    saturation={saturation}
                    setSaturation={setSaturation}
                    brightness={brightness}
                    setBrightness={setBrightness}
                    contrast={contrast}
                    setContrast={setContrast}
                    timeValues={timeValues}
                    setTimeValues={setTimeValues}
                />
            </div>
        </div>
    );
}

export default Main;