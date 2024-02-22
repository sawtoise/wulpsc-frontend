import Photo from './Photo.jsx'
import './PhotoList.css'
import { useEffect, useState } from 'react'
import parameterService from '../../services/parameters.js'

export default function PhotoList( {currentPage} ) {

        const [latestPhotos, setLatestPhotos] = useState([])

        useEffect(() => {
                const fetchLatestPhotos = async () => {
                        try {
                                const limit = 15
                                const offset = limit * (currentPage - 1)
                                const response = await fetch(`${parameterService.BASE_URL}/photos?offset=${offset}&limit=${limit}`)
                                const data = await response.json()
                                console.log(data)
                                if (!response.ok) {
                                        throw new Error(`${response.status} ${parameterService.getErrorMessage(response, data)}`);
                                }
                                setLatestPhotos(data)
                        } catch (error) {
                                console.log(error)
                        }
                }

                fetchLatestPhotos()
                    .catch(console.error)
        }, [currentPage]);


    return (
        <div className={'photoListContainer'}>
                {latestPhotos.map((latestPhoto) =>
                    <Photo data={latestPhoto} key={latestPhoto.id}/>,
                )}
        </div>
    )

}