import './PointcloudView.css'
import * as OV from 'online-3d-viewer';
import { useEffect } from 'react'
export default function PointcloudView() {


    useEffect(() => {
        OV.Init3DViewerElements();
    }, []);
    return ( <div
        className="online_3d_viewer"
        style={{ width: "500px", height: "500px" }}
        model="/brain.ply"
    />)
}