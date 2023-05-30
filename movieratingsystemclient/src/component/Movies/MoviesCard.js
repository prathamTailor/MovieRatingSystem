import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

const MoviesCard = ({movie}) => {

  const options = {
    value: movie.movieRating,
    readOnly: true,
    precision: 0.5,
    edit: false,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  const deleteMovie = () => {
    console.log("Delete Movie");
  }
  
  return (
    <Link className='Card' to={`/Movie/${movie.movieId}`}>
        <img src={movie.imgUrl} alt={movie.movieName} />
        <p><b>Name :</b> {movie.movieName}</p>
        <p><b>Type :</b> {movie.movieType}</p>
        <div>
          <ReactStars {...options} />{" "}
          <span className="movieCardSpan">
            {" "}
            ({movie.reviewCount} Reviews)
          </span>
        </div>
    </Link>
  )
}

export default MoviesCard