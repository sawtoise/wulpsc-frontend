import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Button, Paper } from '@mui/material'
import PlaceholderPhoto from '../../assets/IMG_VGA_Q2.png'
import './PhotoSlideshow.css'
import parameterService from '../../services/parameters.js'

export default function PhotoSlideshow( {id, data} ) {




    const items = [
        {
            name: "default"
        },
        {
            name: "left",
        },
        {
            name: "right",
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

                    items.map( (item, i) => <Item data={data} id={id} key={i} item={item} /> )
                }
            </Carousel>
        </div>
    )
}

function Item( {id, data, item} ) {

    let photo = data.image
    if (item.name === "left") {
        photo = data.left
    } else if (item.name === "default") {
        photo = data.image
    } else if (item.name === "right") {
        photo = data.right
    }

    {
        return (
            <img className={"carouselImage"}
                 src={"data:image/jpeg;base64," + photo}
                 alt={"s"}
            />
        )
    }

}