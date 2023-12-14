import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Button, Paper } from '@mui/material'
import PlaceholderPhoto from '../../assets/IMG_VGA_Q2.png'
import './PhotoSlideshow.css'

export default function PhotoSlideshow() {

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
                    items.map( (item, i) => <Item key={i} item={item} /> )
                }
            </Carousel>
        </div>
    )
}

function Item()
{
    return (
            <img className={"carouselImage"}
                 src={PlaceholderPhoto}
                 alt={"s"}
            />
    )
}