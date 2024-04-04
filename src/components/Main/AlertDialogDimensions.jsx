import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react'
import parameterService from '../../services/parameters'

export default function AlertDialog({open, setOpen, data}) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Object Dimensions"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Distance: {data.distance ? data.distance.toFixed() : 0} cm
                        <br></br>
                        Distance Diff: {data.distance_diff ? data.distance_diff.toFixed() : 0} cm
                        <br></br>
                        Width: {data.width ? data.width.toFixed() : 0} cm
                        <br></br>
                        Height: {data.height ? data.height.toFixed() : 0} cm
                        <br></br>
                        Length: {data.length ? data.length.toFixed() : 0} cm
                        <br></br>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
    );
}