import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react'
import parameterService from '../../services/parameters'

export default function AlertDialog({open, setOpen, applyAsyncChanges, contrast, brightness, saturation, schedule, data, cameraSettings}) {

    const [dataNew, setData] = useState({});
    const [separatedSchedule, setSeparatedSchedule] = useState([])



    useEffect(() => {

        setData(data)
        console.log(dataNew)
        /*const getParameters = async () => {
            try {
                const response = await fetch('${parameterService.BASE_URL}/parameters')
                const data = await response.json()
                console.log(data)
                if (!response.ok) {
                    throw new Error(`${response.status} ${parameterService.getErrorMessage(response, data)}`);
                }
                setData(data)
                setSeparatedSchedule(data.schedule.join(' '))
            } catch (error) {
                console.log(error)
            }
        }

        getParameters()
           .catch(console.error)*/
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    const array = data.schedule

    return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Apply new parameter changes?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Saturation: {data.saturation} to {cameraSettings.saturation}
                        <br></br>
                        Brightness: {data.brightness} to {cameraSettings.brightness}
                        <br></br>
                        Contrast: {data.contrast} to {cameraSettings.contrast}
                        <br></br>
                        Special Effect: {data.special_effect} to {cameraSettings.special_effect}
                        <br></br>
                        White Balance Mode: {data.wb_mode} to {cameraSettings.wb_mode}
                        <br></br>
                        Auto Exposure Level: {data.ae_level} to {cameraSettings.ae_level}
                        <br></br>
                        Auto Exposure Control Value: {data.aec_value} to {cameraSettings.aec_value}
                        <br></br>
                        Auto Gain Control Gain: {data.agc_gain} to {cameraSettings.agc_gain}
                        <br></br>
                        Gain Ceiling: {data.gainceiling} to {cameraSettings.gainceiling}
                        <br></br>
                        Lens Correction: {data.lenc ? data.lenc.toString() : false} to {cameraSettings.lenc ? cameraSettings.lenc.toString() : false}
                        <br></br>
                        Auto Gain Control: {data.agc ? data.agc.toString() : false} to {cameraSettings.agc ? cameraSettings.agc.toString() : false}
                        <br></br>
                        Auto Exposure Control: {data.aec ? data.aec.toString() : false} to {cameraSettings.aec? cameraSettings.aec.toString() : false}
                        <br></br>
                        Horizontal Mirror: {data.hmirror ? data.hmirror.toString() : false} to {cameraSettings.hmirror ? cameraSettings.hmirror.toString() : false}
                        <br></br>
                        Vertical Flip: {data.vflip ? data.vflip.toString() : false} to {cameraSettings.vflip ? cameraSettings.vflip.toString() : false}
                        <br></br>
                        Auto Exposure Control 2: {data.aec2 ? data.aec2.toString() : false} to {cameraSettings.aec2 ? cameraSettings.aec2.toString() : false}
                        <br></br>
                        BPC: {data.bpc ? data.bpc.toString() : false} to {cameraSettings.bpc ? cameraSettings.bpc.toString() : false}
                        <br></br>
                        WPC: {data.wpc ? data.wpc.toString() : false} to {cameraSettings.wpc ? cameraSettings.wpc.toString() : false}
                        <br></br>
                        Schedule: {data.schedule}
                        <br></br>
                        New schedule: {schedule.join(' ')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={applyAsyncChanges} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
    );
}