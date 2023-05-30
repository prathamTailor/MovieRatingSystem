import React, { useEffect,Fragment, useState } from 'react'
import Loader from '../layout/Loader/Loader'
import {useSelector,useDispatch} from "react-redux"
import { useAlert } from 'react-alert';
import {getMovieDetail,newReview,clearErrors,getAllReviews} from './../../actions/movieAction'
import {getCelebritiesAndRolesOfMovie} from './../../actions/celebrityAction'
import { Container } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import "./MovieDetails.css";
import ReactStars from 'react-rating-stars-component'
import Carousel from "react-material-ui-carousel";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import jwt from 'jwt-decode'
import { NEW_REVIEW_RESET } from "./../../constants/movieConstants";
import ReviewCard from './ReviewCard';
import {useNavigate} from 'react-router-dom';
 
const MovieDetails = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {movie,loading,error} = useSelector((state) => state.movieDetails);
  const {user} = useSelector((state) => state.user);
  const { success, error: reviewError } = useSelector((state) => state.newReview);
  const {reviews,loadingMR} = useSelector((state) => state.movieReviews);
  const {celebrities,loadingCRM} = useSelector((state) => state.celebrities);

  
  function isEmpty(obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
      return false;
    }
    return true;
  }

  var data;
  if(!isEmpty(user)){
    data = jwt(user);
  }

  const params = useParams();

  const options = {
    value: movie.movieRating,
    readOnly: true,
    precision: 0.5,
    edit: false,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  
  const submitReviewToggle = () => {
    setRating(0);
    setComment("");
    open ? setOpen(false) : setOpen(true);
  };
  
  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    if(user != null){
      if(data.nameid){
        if(rating != 0 && comment != null){
          myForm.set("rating", rating);
          myForm.set("reviewDescription", comment);
          myForm.set("userId", data.nameid);
          myForm.set("movieId", movie.movieId);
          console.log(rating);
          console.log(comment);
          console.log(data.nameid);
          console.log(movie.movieId);
          dispatch(newReview(myForm));
          setOpen(false);
          window.location.reload(true);
        }else{
          alert.error("Add comment and rating");
        }
      }
    }else{
      alert.error("You need to login first");
      setOpen(false);
    }
  };

  const loadingComplete = (loading && loadingMR && loadingCRM);
  
  useEffect(()=>{
    if(error){
      alert.error(error);
    }
    
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    
    if (success) {
      alert.success("Review Submitted Successfully");
    }
    
    dispatch(getMovieDetail(params.id));
    dispatch(getAllReviews(params.id));
    dispatch(getCelebritiesAndRolesOfMovie(params.id));
  },[dispatch,params.id,alert,error,reviewError,success]);
  
  return (
    <>

      { loadingComplete ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="MovieDetails">
            <div>
              <Carousel>
                {movie &&
                  <img
                    className="CarouselImage"
                    key={1}
                    src={movie.imgUrl}
                    alt={movie.movieName}
                  />
                }
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{movie && movie.movieName}</h2>
              </div>
              <div className="detailsBlock-2">
                <h2>Movie Raing</h2>
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({movie && movie.reviewCount} Reviews)
                </span>
              </div>

              <div className="detailsBlock-4">
                Movie Type: <p>{movie && movie.movieType}</p>
              </div>

              <div className="detailsBlock-4">
                Movie Release Year: <p>{movie && movie.movieReleaseYear}</p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{movie && movie.movieDescription}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <h3 className="celebritiesHeading">CELEBRITIES</h3>

          
          {celebrities && celebrities[0] ? (
            <div className='container celebrities'>
              {celebrities && 
                celebrities.map((celebrity) => (
                  <>
                    <div className='celebrity'>
                      <div className='row'>
                        <div className='col-4 celebrityPhoto'>
                        <img
                          className='celebrityImg'
                          src={celebrity.imgUrl}
                        />
                        </div>
                        <div className='col-8'>
                          <p><b>Name : </b>{celebrity.celebrityName}</p>
                          <p><b>D.O.B. : </b>{celebrity.dob}</p>
                          <p><b>Birth Place : </b>{celebrity.birthPlace}</p>
                          <p><b>Role : </b>{celebrity.roleName}</p>
                          <p><b>Role Description : </b>{celebrity.roleDescription}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              }
            </div>
          ) : (<>
            <p className='noCelebrity'>No celebrity</p>
          </>)}

          <h3 className="reviewsHeading">REVIEWS</h3>
          {reviews && reviews[0] ? (
            <div className="container reviews">
              {reviews &&
                reviews.map((review) => (
                  <ReviewCard review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

        </Fragment>
      )}

    </>
  )
}

export default MovieDetails