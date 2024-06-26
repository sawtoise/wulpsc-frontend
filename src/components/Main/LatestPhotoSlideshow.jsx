import React, { useEffect, useState } from 'react'
import ClickablePhoto from '../ClickablePhoto.jsx'
import './LatestPhotoSlideshow.css'
import LeftArrow from '../../assets/ButtonLeftArrow.svg'
import RightArrow from '../../assets/ButtonRightArrow.svg'
import SearchIcon from '../../assets/Search_Magnifying_Glass.svg'
import CameraIcon from '../../assets/Camera.svg'
import { Tooltip } from '@mui/material'

export default function LatestPhotoSlideshow( {id, data, coords, setCoords, handleAnalyse, handleCaptureClick, isLoading, nextWakeup} ) {

    const [index, setIndex] = useState(1)
    const [selectedImage, setSelectedImage] = useState(data.image)
    const [countdownString, setCountDownString] = useState()


    useEffect(() => {
        const wakeupCountdown = () => {
            let currentDate = new Date()
            let diffTime = nextWakeup - currentDate

            let daysDiff = Math.round(diffTime / (1000 * 3600 * 24))
            let hoursDiff = Math.round(diffTime / (1000 * 3600))
            const minutesDiff = Math.floor((diffTime/1000)/60);
            let secondsDiff = Math.round(diffTime / (1000))

            if (daysDiff > 0) {
                setCountDownString(daysDiff + " days")
                return daysDiff + " days"
            }
            if (hoursDiff > 0) {
                setCountDownString(hoursDiff + " hours")
                return hoursDiff + " hours"
            }
            if (minutesDiff > 0) {
                setCountDownString(minutesDiff + " mins")
                return minutesDiff + " mins"
            }
            if (secondsDiff > 0) {
                setCountDownString(secondsDiff + " seconds")
                return secondsDiff + " seconds"
            }

            setCountDownString("Awake")
            return "Awake"
        }


        if (index === 0 ) {
            setSelectedImage(data.image)
        } else if (index === 1) {
            setSelectedImage(data.left)
        } else if (index === 2) {
            setSelectedImage(data.right)
        }

        wakeupCountdown()
        const intervalId = setInterval(() => {
            wakeupCountdown()
        }, 1000);
        return () => clearInterval(intervalId);

    }, [data.image, data.left, data.right, index]);

    const isBoxShown = coords.x1 != -1 && coords.y1 != -1 && coords.x2 != -1 && coords.y2 != -1



    const handleNextClick = () => {
        const newIndex = (index + 1) % 3;
        setIndex(newIndex)
    }

    const handlePreviousClick = () => {
        const newIndex = (3-1 + index) % 3
        setIndex(newIndex)
    }

     let wakeUpTimeStamp = new Date(nextWakeup + "Z")

    return (
        <>
            <div className={'photoContainer'}>
                <ClickablePhoto photo={selectedImage} coords={coords} setCoords={setCoords}/>

                <div className={'dateHeader'}>

                    <div className={'dateText'}>
                        {data.timestamp ? data.timestamp.substring(0, 16) : 22}
                    </div>

                    <Tooltip  title={<p style={{fontSize: "2.0vh" }}>{wakeUpTimeStamp.toString()}</p>}>
                    <div className={'dateText'}>

                        {countdownString === "Awake" ? "Awake" : countdownString}
                    </div>
                    </Tooltip>


                </div>

                <div className={'buttonRow'}>


                    <button className={'captureButton'} onClick={handlePreviousClick}>
                        <div className={'nextButtonRow'}>
                            <img className={'buttonIcon'} src={LeftArrow} alt={'s'}/>
                            Previous
                        </div>
                    </button>

                    <button className={'captureButton'} onClick={handleNextClick}>
                        <div className={'nextButtonRow'}>
                            Next
                            <img className={'buttonIcon'} src={RightArrow} alt={'s'}/>
                        </div>
                    </button>

                </div>

                <div className={'analyseButtonRow'}>

                    <button
                        className={!isBoxShown ? 'captureButtonDisabled' : 'captureButton'}
                        type="button"
                        disabled={!isBoxShown}
                        onClick={handleAnalyse}
                    >
                        <div className={'cameraButtonRow'}>
                            <img className={'cameraIcon'} src={SearchIcon} alt={'s'}/>
                            Analyse
                        </div>
                    </button>

                    <button
                        className={isLoading ? 'captureButtonDisabled' : 'captureButton'}
                        type="button"
                        onClick={() =>
                            handleCaptureClick()
                        }
                        disabled={isLoading}
                    >
                        <div className={'cameraButtonRow'}>
                            <img className={'cameraIcon'} src={CameraIcon} alt={'s'}/>
                            Capture
                        </div>
                    </button>

                </div>
            </div>
        </>
    )

}
