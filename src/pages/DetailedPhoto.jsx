import './DetailedPhoto.css'
import BackArrowIcon from '../assets/LeftArrow.svg'
import { useNavigate, useParams } from 'react-router-dom'
import PhotoSlideshow from '../components/DetailedPhoto/PhotoSlideshow.jsx'
import PhotoInformation from '../components/DetailedPhoto/PhotoInformation.jsx'
import { useEffect, useState } from 'react'
import parameterService from '../services/parameters.js'

export default function DetailedPhoto() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchLatestPhoto = async () => {
            try {
                console.log('ID IS: ' + id)
                const response = await fetch(`https://stereo-backend.fly.dev/photo?id=${id}`)
                const data = await response.json()
                console.log(data)
                if (!response.ok) {
                    throw new Error(`${response.status} ${parameterService.getErrorMessage(response, data)}`)
                }
                setData(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchLatestPhoto()
            .catch(console.error)
    }, [])

    return (
        <div className={'detailedPhotoPage'}>
            <div className={'detailedPageHeader'}>

                <div className={'detailedArrowContainer'}>
                    <img className={'backArrow'} src={BackArrowIcon} alt={''}
                         onClick={() => {
                             navigate('/gallery')
                         }}
                    ></img>
                </div>

                <div className={'detailedPageTitle'}>
                    Photo
                </div>

                <div className={'detailedArrowContainer'}>
                    <img className={'backArrow'} src={BackArrowIcon} alt={''}
                         onClick={() => {
                             navigate('/gallery')
                         }}
                    ></img>
                </div>

            </div>
            <div className={'contentContainer'}>
                <PhotoSlideshow id={id} data={data}></PhotoSlideshow>
                <PhotoInformation id={id} data={data}></PhotoInformation>
            </div>

        </div>
    )
}