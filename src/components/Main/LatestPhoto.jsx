import { useState } from "react";
import PlaceholderPhoto from "../../assets/IMG_VGA_Q2.png";
import InfoIcon from "../../assets/Info.svg";
import CameraIcon from "../../assets/Camera.svg";
import "./LatestPhoto.css";
import paramatersService from "../../services/parameters";

const handleClick = async (setLoading) => {
  try {
    setLoading(true);
    const data = await fetch(`${paramatersService.BASE_URL}/take_photo`);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    console.log(err.message);
  }
};

const LatestPhoto = ({ latestPhoto }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <div className={"outerContainer"}>
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
      <div className={"dateText"}>10/12/2023 19:20 UTC</div>
      <div className={"activeText"}>Active</div>
      <button
        className={isLoading ? "captureButtonDisabled" : "captureButton"}
        type="button"
        onClick={() => handleClick(setLoading)}
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
