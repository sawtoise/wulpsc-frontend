import PhotoList from '../components/Gallery/PhotoList.jsx'
import './Gallery.css'
import BackArrowIcon from '../assets/LeftArrow.svg'
import { useNavigate } from 'react-router-dom'
function Gallery() {

    const navigate = useNavigate()

    return (
        <div className="galleryPage">
            <div className={"galleryPageHeader"}>
                <div className={"arrowContainer"}>
                <img className={"backArrow"} src={BackArrowIcon} alt={""}
                     onClick={() => {
                         navigate('/main')
                     }}
                ></img>
                </div>
                <div className={"PageTitle"}>
                Gallery
                </div>
                <div className={"arrowContainer"}>
                    <img className={"backArrow"} src={BackArrowIcon} alt={""}
                         onClick={() => {
                             navigate('/main')
                         }}
                    ></img>
                </div>

            </div>
            <PhotoList></PhotoList>
        </div>
    );
}

export default Gallery;