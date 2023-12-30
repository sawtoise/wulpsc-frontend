import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Button, Paper } from '@mui/material'
import PlaceholderPhoto from '../../assets/IMG_VGA_Q2.png'
import './PhotoSlideshow.css'
import parameterService from '../../services/parameters.js'

export default function PhotoSlideshow( {id} ) {

    const items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]


    return (
        <div className={"carouselContainer"}>
            <Carousel
                swipe={true}
                indicatorContainerProps={{
                    style: {
                        marginTop: '0px', // 5

                    }

                }}
                activeIndicatorIconButtonProps={{
                    style: {

                        color: 'var(--primary-accent)'
                    }
                }}
                navButtonsProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
                    style: {
                        bottom: '1',
                        width: '5vh',
                        height: '5vh',
                        backgroundColor: 'var(--primary-accent)',
                    }
                }}
                autoPlay={false}
                navButtonsAlwaysVisible={true}

            >
                {
                    items.map( (item, i) => <Item id={id} key={i} item={item} /> )
                }
            </Carousel>
        </div>
    )
}

function Item( {id} ) {

    const [photo, setPhoto] = useState([])

    useEffect(() => {
        const fetchLatestPhoto = async () => {
            try {
                console.log("ID IS: " + id)
                const response = await fetch(`https://stereo-backend.fly.dev/photo?id=${id}`)
                const data = await response.json()
                console.log(data)
                if (!response.ok) {
                    throw new Error(`${response.status} ${parameterService.getErrorMessage(response, data)}`);
                }
                setPhoto(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchLatestPhoto()
            .catch(console.error)
    }, [id]);

    {
        return (
            <img className={"carouselImage"}
                 src={"data:image/jpeg;base64," + photo.image}
                 alt={"s"}
            />
        )
    }

}