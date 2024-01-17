import PhotoList from '../components/Gallery/PhotoList.jsx'
import './Gallery.css'
import BackArrowIcon from '../assets/LeftArrow.svg'
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import parameterService from '../services/parameters.js'
function Gallery() {

    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)

    const handleChange = (event) => {
        setCurrentPage(event.target.value);
    };

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
                    <PageSelector maxCount={100} currentPage={currentPage} handleChange={handleChange}></PageSelector>
                </div>

            </div>
            <PhotoList currentPage={currentPage}></PhotoList>
        </div>
    );
}

function PageSelector( {maxCount, currentPage, handleChange} ) {

 
    let numPages = Math.floor(maxCount / 15)
    console.log(numPages)
    const arr = Array.from({length: numPages-1+1}, (_, i) => i + 1);
    console.log(arr)

    {
        return (
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Page</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentPage}
                label="Page"
                onChange={handleChange}
            >
                {arr.map(item => {
                    return (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    )
                })}
            </Select>
            </FormControl>
        )
    }

}


export default Gallery;