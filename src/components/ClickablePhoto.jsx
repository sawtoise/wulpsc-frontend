import { useState } from "react";
import "./ClickablePhoto.css"

export default function ClickablePhoto( {photo, style} ) {
    const [coords, setCoords] = useState({
        x1: -1,
        y1: -1,
        x2: -1,
        y2: -1
    });
    const width = Math.abs(coords.x2 - coords.x1)
    const height = Math.abs(coords.y2 - coords.y1)
    const showBox = coords.x1 != -1 && coords.y1 != -1 && coords.x2 != -1 && coords.y2 != -1
    const showFirstPoint = !showBox && coords.x1 != -1 && coords.y1 != -1
    return (
        <div class="img-overlay-wrap"  onClick={(e) => addPoint(e, coords, setCoords)}>
            <img 
             src={"data:image/jpeg;base64," + photo}
             alt={"s"}
             />
             {showBox &&
             <svg viewBox="0 0 617 444" >
             <rect x={coords.x1} y={coords.y1} width={width} height={height} stroke="black" stroke-width="5"  fill="none"/>
                </svg>
             }
             {showFirstPoint &&
                <svg viewBox="0 0 617 444" >
                <circle cx={coords.x1} cy={coords.y1} r="3" fill="black"/>
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

  
