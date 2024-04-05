import { useState } from "react";
import "./ClickablePhoto.css"
import paramatersService from '../services/parameters.js'
import parameterService from '../services/parameters.js'



const handleClick = async (
    id,
    options
) => {
    let data;
    let response;
    let DEV_URL = "http://192.168.0.75:8000"
    try {
        response = await fetch(`${DEV_URL}/get_object_dimensions?id=${id}`, options);
        data = await response.json();
        if (!response.ok) {
            throw new Error(
                `${response.status} ${parameterService.getErrorMessage(response, data)}`
            );
        }
        console.log("RETURNED DISSTANCE STUFF IS", data)
    } catch (err) {
        console.log(err.message);
    }
};

export default function ClickablePhoto( { photo, coords, setCoords} ) {
    const width = Math.abs(coords.x2 - coords.x1)
    const height = Math.abs(coords.y2 - coords.y1)
    const showBox = coords.x1 != -1 && coords.y1 != -1 && coords.x2 != -1 && coords.y2 != -1
    const showFirstPoint = !showBox && coords.x1 != -1 && coords.y1 != -1

    // const options = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         ...coords,
    //     })
    // }

    if (showBox) {
        //parameterService.getObjectDimensions(id, coords)
        //handleClick(id, options)
    }

    return (
        <div className="img-overlay-wrap" onClick={(e) => addPoint(e, coords, setCoords)}>
            <img
                className={"clickablePhoto"}
             src={"data:image/jpeg;base64," + photo}
             alt={"s"}
             />
             {showBox &&
             <svg viewBox="0 0 617 444" >
             <rect x={coords.x1} y={coords.y1} width={width} height={height} stroke="black" strokeWidth="3" fill="none"/>
                </svg>
             }
             {showFirstPoint &&
                <svg viewBox="0 0 617 444" >
                <circle cx={coords.x1} cy={coords.y1} r="1" fill="black"/>
                </svg>
             }
         
        </div>
        
    )

}

const getClickCoords = (event) => {
    var e = event.target;
    var dim = e.getBoundingClientRect();
    var x = event.clientX - dim.left;
    var y = event.clientY - dim.top;
    return [x, y];
  };


  const addPoint = (event, coords, setCoords) => {
    // get click coordinates
    let [x, y] = getClickCoords(event);
    //window.alert(`x ${x} y ${y}`)
    if (coords.x1 == -1 && coords.y1 == -1 && coords.x2 == -1 && coords.y2 == -1) {
        setCoords({
            ...coords, 
            x1: Math.floor(x),
            y1: Math.floor(y)
        })
    } else if (coords.x1 != -1 && coords.y1 != -1 && coords.x2 == -1 && coords.y2 == -1) {
        setCoords({
            ...coords, 
            x2: Math.floor(x),
            y2: Math.floor(y)
        })
    } else {
        setCoords({
            x1: -1,
            y1: -1,
            x2: -1,
            y2: -1
        })
    }
  };    

  
