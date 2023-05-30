import React, { useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import pic1 from './../../images/spider-man.jpg';
import pic2 from './../../images/blackwidow.jpg';
import pic3 from './../../images/master.jpg';
import MetaData from '../layout/MetaData';
import "./Home.css"

const Home = (props) => {

  return (
    <>
        <MetaData title="Movie Rating System"/>
        <Carousel variant="light" bg="light">
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={pic1}
                alt="First slide"
                width={props.width}
                height={props.height}
                />
                <Carousel.Caption>
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={pic2}
                alt="Second slide"
                width={props.width}
                height={props.height}
                />
                <Carousel.Caption>
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={pic3}
                alt="Third slide"
                width={props.width}
                height={props.height}
                />
                <Carousel.Caption>
                <h5>Third slide label</h5>
                <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        
    </>
  )
}

export default Home