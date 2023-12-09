import './Main.css';
import LatestPhoto from "../components/LatestPhoto.jsx";
import Settings from "../components/Settings.jsx";
import * as React from "react";
function Main() {

    const [saturation, setSaturation] = React.useState(0);
    const [brightness, setBrightness] = React.useState(0);
    const [contrast, setContrast] = React.useState(0);
    const [timeValues, setTimeValues] = React.useState([])


    return (
        <div className="main-page">
            <div className="left-container">
                <LatestPhoto ></LatestPhoto>
            </div>
            <div className="right-container">
                <Settings
                    saturation={saturation}
                    setSaturation={setSaturation}
                    brightness={brightness}
                    setBrightness={setBrightness}
                    contrast={contrast}
                    setContrast={setContrast}
                    timeValues={timeValues}
                    setTimeValues={setTimeValues}
                />
            </div>
        </div>
    );
}

export default Main;