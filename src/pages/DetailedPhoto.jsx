import './DetailedPhoto.css'
import BackArrowIcon from '../assets/LeftArrow.svg'
import { useNavigate } from 'react-router-dom'
import PhotoSlideshow from '../components/DetailedPhoto/PhotoSlideshow.jsx'
import PhotoInformation from '../components/DetailedPhoto/PhotoInformation.jsx'
export default function DetailedPhoto() {

    const navigate = useNavigate()

    return (
        <div className={"detailedPhotoPage"}>
            <div className={"detailedPageHeader"}>

                <div className={"detailedArrowContainer"}>
                    <img className={"backArrow"} src={BackArrowIcon} alt={""}
                         onClick={() => {
                             navigate('/gallery')
                         }}
                    ></img>
                </div>

                <div className={"detailedPageTitle"}>
                    Photo
                </div>

                <div className={"detailedArrowContainer"}>
                    <img className={"backArrow"} src={BackArrowIcon} alt={""}
                         onClick={() => {
                             navigate('/gallery')
                         }}
                    ></img>
                </div>

            </div>
            <div className={"contentContainer"}>
                <PhotoSlideshow></PhotoSlideshow>
                <PhotoInformation></PhotoInformation>
            </div>

        </div>
    )
}