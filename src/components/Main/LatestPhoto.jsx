import { useState } from "react";
import PlaceholderPhoto from "../../assets/IMG_VGA_Q2.png";
import InfoIcon from "../../assets/Info.svg";
import CameraIcon from "../../assets/Camera.svg";
import "./LatestPhoto.css";
import paramatersService from "../../services/parameters";
import { Alert, Snackbar } from '@mui/material'
import parameterService from '../../services/parameters.js'

const handleClick = async (setLoading, setErrorMessage, setOpenError, setOpenSuccess) => {
    let data
    let response
  try {
    setLoading(true);
     response = await fetch(`${paramatersService.BASE_URL}/take_photo`);
     data = await response.json()
    setLoading(false);
     if (!response.ok) {
         setErrorMessage(`Error ${response.status}: ${parameterService.getErrorMessage(response, data)}`)
         throw new Error(`${response.status} ${parameterService.getErrorMessage(response, data)}`)
     }
      setOpenSuccess(true)
  } catch (err) {
      setOpenError(true)
      setLoading(false);
    console.log(err.message);
  }
};




const LatestPhoto = ({ latestPhoto }) => {
  const [isLoading, setLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [errorMessage, setErrorMessage] = useState()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpenSuccess(false)
        setOpenError(false)
    }

  return (
    <div className={"outerContainer"}>
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
      <div className={"photoHeader"}>
        <Battery percentage={"50%"} />
        <div className={"photoTitle"}>Last photo</div>
        <img className={"infoIcon"} src={InfoIcon} />
      </div>
      <div className={"imageContainer"}>
        <img
          className={"image"}
          src={"data:image/jpeg;base64," + latestPhoto.image}
          alt={"s"}
        />
      </div>
      <div className={"dateText"}>{latestPhoto.timestamp.substring(0, 16)}</div>
      <div className={"activeText"}>Active</div>
      <button
        className={isLoading ? "captureButtonDisabled" : "captureButton"}
        type="button"
        onClick={() => handleClick(setLoading, setErrorMessage, setOpenError, setOpenSuccess)}
        disabled={isLoading}
      >
        <div className={"cameraButtonRow"}>
          <img className={"cameraIcon"} src={CameraIcon} alt={"s"} />
          Capture
        </div>
      </button>
    </div>
  );
};

const Battery = ({ percentage }) => {
  return (
    <div className={"batteryContainer"}>
      <div className={"batteryShape"}>
        <div className={"batteryBackground"}>
          <div style={{ width: percentage }} className={"battery"}></div>
        </div>
        <div className={"batteryTip"}></div>
      </div>
      <div className={"batteryText"}>{percentage}</div>
    </div>
  );
};

export default LatestPhoto;
