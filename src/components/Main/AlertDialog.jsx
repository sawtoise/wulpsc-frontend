import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react'
import parameterService from '../../services/parameters'

export default function AlertDialog({open, setOpen, applyAsyncChanges, contrast, brightness, saturation, schedule, data, setSata}) {

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
                        Saturation: {data.saturation} to {saturation}
                        <br></br>
                        Brightness: {data.brightness} to {brightness}
                        <br></br>
                        Contrast: {data.contrast} to {contrast}
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