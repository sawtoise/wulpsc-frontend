import './PhotoInformation.css'
import { useEffect } from 'react'
export default function PhotoInformation({data}) {
    

    return (
        <div className={"photoInformationContainer"}>
            <h1>Information</h1>
            <div className={"informationText"}>
            <h2>Saturation: {data.saturation}</h2>
            <h2>Brightness: {data.brightness}</h2>
            <h2>Contrast: {data.contrast}</h2>
                <h2>{data.timestamp} UTC</h2>
            </div>

        </div>
    )
}