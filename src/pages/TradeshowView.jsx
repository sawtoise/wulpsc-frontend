import './DetailedPhoto.css'
import BackArrowIcon from '../assets/LeftArrow.svg'
import { useNavigate, useParams } from 'react-router-dom'
import PhotoSlideshow from '../components/DetailedPhoto/PhotoSlideshow.jsx'
import PhotoInformation from '../components/DetailedPhoto/PhotoInformation.jsx'
import { useEffect, useState } from 'react'
import parameterService from '../services/parameters.js'
import PointcloudView from '../components/DetailedPhoto/PointcloudView.jsx'
import paramatersService from '../services/parameters.js'
import AlertDialogDimensions from '../components/Main/AlertDialogDimensions.jsx'
import { Alert, Snackbar } from '@mui/material'
import './TradeshowView.css'

export default function TradeshowView() {

    const navigate = useNavigate()
    const { id } = useParams()
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [latestPhoto, setLatestPhoto] = useState({})

    useEffect(() => {

    const fetchLatestPhoto = async () => {
        try {
            const response = await fetch(
                `${parameterService.BASE_URL}/get_latest_photo`
            );
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                setErrorMessage(
                    `Error ${response.status}: Could not fetch the latest photo from the backend.`
                );
                throw new Error(
                    `${response.status} ${parameterService.getErrorMessage(
                        response,
                        data
                    )}`
                );
            }
            setLatestPhoto(data);
        } catch (error) {
            console.log(error);
            setOpenError(true);
        }
    };

        fetchLatestPhoto().catch(console.error);

        const intervalId = setInterval(() => {
            console.log("fetching")
            fetchLatestPhoto().catch(console.error);
        }, 10000);

        return () => clearInterval(intervalId);

  
}, []);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenError(false);
    };

    return (
        <div className={'detailedPhotoPage'}>
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
            <div className={'detailedPageHeader'}>


                <div className={'detailedPageTitle'}>
                </div>


            </div>
            <div className={'contentContainer'}>
                <img
                    className={"tradeshowPhoto"}
                    src={"data:image/jpeg;base64," + latestPhoto.image}
                    alt={"s"}
                />

                <img
                    className={"tradeshowPhoto"}
                    src={"data:image/jpeg;base64," + latestPhoto.left}
                    alt={"s"}
                />

                <img
                    className={"tradeshowPhoto"}
                    src={"data:image/jpeg;base64," + latestPhoto.right}
                    alt={"s"}
                />
            </div>

        </div>
    )
}