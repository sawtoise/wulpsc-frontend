import React, { useEffect, useState } from 'react'
import ClickablePhoto from '../ClickablePhoto.jsx'
import './PhotoSlideshow.css'
import LeftArrow from '../../assets/ButtonLeftArrow.svg'
import RightArrow from '../../assets/ButtonRightArrow.svg'
import SearchIcon from '../../assets/Search_Magnifying_Glass.svg'

export default function PhotoSlideshow( {data, coords, setCoords, handleAnalyse} ) {

    const [index, setIndex] = useState(1)
    const [selectedImage, setSelectedImage] = useState(data.image)

    useEffect(() => {   
        if (index === 0 ) {
            setSelectedImage(data.image)
        } else if (index === 1) {
            setSelectedImage(data.left)
        } else if (index === 2) {
            setSelectedImage(data.right)
        }
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

    return (
        <>
        <div className={"photoContainer"}>
            <ClickablePhoto photo={selectedImage} coords={coords} setCoords={setCoords} />

            <div className={"buttonRow"}>

                <button className={"captureButton"} onClick={handlePreviousClick}>
                    <div className={"nextButtonRow"}>
                    <img className={"buttonIcon"} src={LeftArrow} alt={"s"} />
                        Previous
                </div>
                </button>

                <button className={"captureButton"} onClick={handleNextClick}>
                    <div className={"nextButtonRow"}>
                        Next
                        <img className={"buttonIcon"} src={RightArrow} alt={"s"} />
                    </div>
                </button>

            </div>

            <div className={"analyseButtonRow"}>

            <button
                className={!isBoxShown ? "captureButtonDisabled" : "captureButton"}
                type="button"
                disabled={!isBoxShown}
                onClick={handleAnalyse}
            >
                <div className={"cameraButtonRow"}>
                    <img className={"cameraIcon"} src={SearchIcon} alt={"s"} />
                    Analyse
                </div>
            </button>

            </div>
        </div>
        </>
    )
}
