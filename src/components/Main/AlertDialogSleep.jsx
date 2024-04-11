import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react'
import parameterService from '../../services/parameters'

export default function AlertDialog({open, setOpen, handleSleepClick, data}) {

    const [dataNew, setData] = useState({});


    useEffect(() => {
        setData(data)
        console.log(dataNew)
    }, [])

    let t = new Date()
    t.setSeconds(t.getSeconds() + data.sleep)

    const handleClose = () => {
        setOpen(false);
    };

    return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={{height: '100vh'}}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Set the system to sleep?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to hibernate the system for {data.sleep} seconds?
                        <br></br>
                        It will be active again on:
                        <p></p>
                        {t ? t.toString() : ""}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleSleepClick} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
    );
}