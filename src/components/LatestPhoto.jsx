import PlaceholderPhoto from '../assets/IMG_VGA_Q2.png';
import InfoIcon from '../assets/Info.svg';
import CameraIcon from '../assets/Camera.svg';
import './LatestPhoto.css';
const LatestPhoto = () => {

    return (
        <div className={'outerContainer'}>
            <div className ={'photoHeader'}>
                <Battery percentage={'50%'}/>
            <div className={'photoTitle'}>Last photo</div>
                <img className={"infoIcon"} src={InfoIcon}/>
            </div>
        <div className={'imageContainer'}>
    <img className={"image"}
         src={PlaceholderPhoto}
         alt={"s"}
    />
        </div>
            <div className={'dateText'} >
                10/12/2023 19:20 UTC
            </div>
            <div className={"activeText"}>Active</div>
            <button className={"captureButton"} type="button">
                <div className={"cameraButtonRow"}>
                <img className={"cameraIcon"}
                     src={CameraIcon}
                     alt={"s"}
                />
                Capture</div></button>
        </div>
    )
}

const Battery = ({percentage}) => {



    return (
        <div className={"batteryContainer"}>
            <div className={"batteryShape"}>
        <div className={"batteryBackground"}>
            <div style={{width: percentage}} className={"battery"}>
            </div>
        </div>
                <div className={"batteryTip"}></div>
            </div>
            <div className={"batteryText"}>
                {percentage}
            </div>
        </div>
    )
}

export default LatestPhoto