import React, { Fragment, useRef, useState, useEffect } from "react";
import "./AddMovie.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import jwt from 'jwt-decode'
import {newMovie} from "./../../actions/movieAction"

const AddMovie = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, isAuthenticated, admin } = useSelector(
        (state) => state.user
    );

    var adminData;
    if(admin != null)
        adminData = jwt(admin);

    const [movie, setMovie] = useState({
        movieName : "",
        movieType: "",
        movieReleaseYear: "",
        movieRating: 0,
        movieDescription:"",
        trailerUrl:"",
        imgUrl: "",
        reviewCount: 0,
    });

    const {movieName,movieType,movieReleaseYear,movieRating,movieDescription,trailerUrl,imgUrl,reviewCount} = movie;

    const [movieImage, setMovieImage] = useState("/movie.jpg");
    const [movieImagePreview, setMovieImagePreview] = useState("/movie.jpg");

    const createMovieSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        if(adminData){
            myForm.set("movieName", movieName);
            myForm.set("movieType", movieType);
            myForm.set("movieReleaseYear", movieReleaseYear);
            myForm.set("movieRating", movieRating);
            myForm.set("movieDescription", movieDescription);
            myForm.set("trailerUrl", trailerUrl);
            myForm.set("reviewCount", reviewCount);
            myForm.set("imgUrl", movieImage);
            myForm.set("adminId",adminData.nameid);
            dispatch(newMovie(myForm));
            navigate("/Dashboard");
        }
    };

    const addMovieDataChange = (e) => {
        if (e.target.name === "movieImg") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setMovieImagePreview(reader.result);
              setMovieImage(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setMovie({ ...movie, [e.target.name]: e.target.value });
        }
    };

  return (
    <>
        <div className='AddMovieContainer'>
            <div className='AddMovieBox'>
                <center><h3>Add New Movie</h3></center>
                <form
                    className="AddMovieForm"
                    encType="multipart/form-data"
                    onSubmit={createMovieSubmitHandler}
                >
                    <div className='formInput'>
                        <input
                            type="text"
                            placeholder="Movie NAme"
                            required
                            name="movieName"
                            value={movieName}
                            onChange={addMovieDataChange}
                        />
                    </div>
                    
                    <div className='formInput'>
                        <input
                            type="text"
                            placeholder="Movie Type"
                            required
                            name="movieType"
                            value={movieType}
                            onChange={addMovieDataChange}
                        />
                    </div>

                    <div className='formInput'>
                        <input
                            type="text"
                            placeholder="Movie Release Year"
                            required
                            name="movieReleaseYear"
                            value={movieReleaseYear}
                            onChange={addMovieDataChange}
                        />
                    </div>

                    <div className='formInput'>
                        <input
                            type="text"
                            placeholder="Movie Description"
                            required
                            name="movieDescription"
                            value={movieDescription}
                            onChange={addMovieDataChange}
                        />
                    </div>

                    <div className='formInput'>
                        <input
                            type="text"
                            placeholder="Trailer Url"
                            required
                            name="trailerUrl"
                            value={trailerUrl}
                            onChange={addMovieDataChange}
                        />
                    </div>

                    <div id='addMovieImage'>
                        <img src={movieImagePreview} alt="Avatar Preview" />
                        <input
                            type="file"
                            name="movieImg"
                            accept="image/*"
                            onChange={addMovieDataChange}
                        />
                    </div>
                    
                    <input type="submit" value="Add" className="signUpBtn" />

                </form>
            </div>
        </div>
        
    </>
  )
}

export default AddMovie