import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({open, setOpen}) {

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
                    {"Tips and Help"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This website offers several features to assist with defect analysis and stereo image capture:
                        <p></p>

                        <b>Analyse:</b> A bounding box can be drawn over any defect of choice shown in the image via two clicks. Clicking the Analyse button will retrieve dimensions for the chosen object.
                        <p></p>
                        <b>Capture:</b> Use the Capture button to take photos instantly. This allows you to capture images on demand, ensuring you never miss a moment during your inspection or analysis process.
                        <p></p>
                        <b>Adjust Parameters:</b> Adjust various camera parameters to optimize your image capture settings. Simply tweak the settings according to your needs and click Apply to implement the changes instantly.
                        <p></p>
                        <b>Gallery:</b> Access the Gallery to view all previously captured photos. You can also re-analyze these images for further insights or comparisons.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
    );
}