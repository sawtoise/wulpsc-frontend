import React, { useState } from "react";
import PlaceholderPhoto from "../../assets/IMG_VGA_Q2.png";
import InfoIcon from "../../assets/Info.svg";
import CameraIcon from "../../assets/Camera.svg";
import SearchIcon from "../../assets/Search_Magnifying_Glass.svg";
import "./LatestPhoto.css";
import paramatersService from "../../services/parameters";
import { Alert, Snackbar } from "@mui/material";
import parameterService from "../../services/parameters.js";
import ClickablePhoto from "../ClickablePhoto.jsx";
import AlertDialogDimensions from './AlertDialogDimensions.jsx'
import AlertDialogTutorial from './AlertDialogTutorial.jsx'
import LatestPhotoSlideshow from './LatestPhotoSlideshow.jsx'
import './LatestPhotoSlideshow.css'




const LatestPhoto = ({ latestPhoto, setLatestPhoto, backendSettings }) => {
  const [isLoading, setLoading] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [openDimensionDialog, setOpenDimensionDialog] = useState(false);
  const [openTutorialDialog, setOpenTutorialDialog] = useState(false)
  const [dimensionData, setDimensionData] = useState({})
  const [coords, setCoords] = useState({
        x1: -1,
        y1: -1,
        x2: -1,
        y2: -1
  });


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
  };

    const handleAnalyseClick = async (
    ) => {
        await paramatersService.getObjectDimensions(latestPhoto.id, coords, setErrorMessage, setOpenError, setDimensionData, setOpenDimensionDialog)
    };

    const handleCaptureClick = async (
    ) => {
        let data;
        let response;
        try {
            setLoading(true);
            response = await fetch(`${paramatersService.BASE_URL}/take_photo`);
            data = await response.json();
            setLoading(false);
            if (!response.ok) {
                setErrorMessage(
                    `Error ${response.status}: ${parameterService.getErrorMessage(
                        response,
                        data
                    )}`
                );
                throw new Error(
                    `${response.status} ${parameterService.getErrorMessage(response, data)}`
                );
            }
            setLatestPhoto(data);
            setOpenSuccess(true);
        } catch (err) {
            setOpenError(true);
            setLoading(false);
            console.log(err.message);
        }
    };

  return (
    <div className={"outerContainer"}>
        <AlertDialogTutorial setOpen={setOpenTutorialDialog} open={openTutorialDialog}></AlertDialogTutorial>
        <AlertDialogDimensions setOpen={setOpenDimensionDialog} open={openDimensionDialog} data={dimensionData} >
        </AlertDialogDimensions>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", fontSize: 20 }}
        >
          Success
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openError}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%", fontSize: 20 }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <div className={"photoHeader"}>
          <div className={"activeText"}>Active</div>
        <div className={"photoTitle"}>Last photo</div>
        <img className={"infoIcon"} src={InfoIcon}
             onClick={() => setOpenTutorialDialog(true)} />
      </div>
        <LatestPhotoSlideshow data={latestPhoto} coords={coords} setCoords={setCoords} handleAnalyse={handleAnalyseClick}
                              handleCaptureClick={handleCaptureClick} isLoading={isLoading} nextWakeup={backendSettings.next_wakeup}
        ></LatestPhotoSlideshow>


        <div className={"buttonsRow"}>



        </div>

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
