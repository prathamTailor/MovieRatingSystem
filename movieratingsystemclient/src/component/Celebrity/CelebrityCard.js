import React from 'react'
import { Link } from 'react-router-dom'

const CelebrityCard = ({celebrity}) => {
  return (
    <>
        <Link className='Card' to="#">
            <img src={celebrity.imgUrl} alt={celebrity.celebrityName} />
              <p><b>Name</b> : {celebrity.celebrityName}</p>
              <p><b>Gender</b> : {celebrity.gender}</p>
              <p><b>D.O.B</b> : {celebrity.dob}</p>
              <p><b>Birth Place</b> : {celebrity.birthPlace}</p>
        </Link>
    </>
  )
}

export default CelebrityCard