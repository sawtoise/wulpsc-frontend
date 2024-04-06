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
                <h2>Special Effect: {data.special_effect}</h2>
                <h2>White Balance Mode: {data.wb_mode}</h2>
                <h2>AE Level: {data.ae_level}</h2>
                <h2>AEC Value: {data.aec_value}</h2>
                <h2>AGC Gain: {data.agc_gain}</h2>
                <h2>Gain ceiling: {data.gainceiling}</h2>
                <h2>{data.timestamp.substring(0, 19)} UTC</h2>
            </div>

        </div>
    )
}