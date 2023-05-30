import React, { useEffect } from 'react'
import {getMovie,clearErrors} from "./../../actions/movieAction"
import {useSelector,useDispatch} from "react-redux"
import MoviesCard from './MoviesCard';
import { Container } from 'react-bootstrap';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

const AllMovies = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const {movies,loading,error} = useSelector((state) => state.movies);

  useEffect(()=>{
    if(error){
      return alert.error(error);
    }
    dispatch(getMovie());
  },[dispatch,error,alert]);

  const results = [];
  movies.map(movie => {
    results.push(
        movie && <MoviesCard movie={movie && movie}/>
    );
  });

  return (
    <>
      { loading ? (
        <Loader />
      ) : (
        <>
          <Container>
              <div className='heading mt-5'>
                <center><h2>Top Rated Movies</h2></center>
              </div>
              <div className='Items'>
                {results}
              </div>
          </Container>
        </>
      )}
    </>
  )
}

export default AllMovies