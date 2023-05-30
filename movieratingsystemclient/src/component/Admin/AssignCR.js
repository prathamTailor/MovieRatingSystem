import React, { useState, useEffect } from 'react'
import "./AssignCR.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import jwt from 'jwt-decode'
import {addCelebrityRole, addMovieCelebrity, addMovieCelebrityRole, addMovieRole, getMovie} from "./../../actions/movieAction"
import {getCelebrities} from "./../../actions/celebrityAction"
import {getRoles} from "./../../actions/roleAction"
import Loader from '../layout/Loader/Loader';

const AssignCR = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const {movies} = useSelector((state) => state.movies);
    const {celebrities} = useSelector((state) => state.celebrities);
    const {roles} = useSelector((state) => state.roles);

    const { error, loading, isAuthenticated, admin } = useSelector(
        (state) => state.user
    );

    var adminData;
    if(admin != null)
        adminData = jwt(admin);

    useEffect(()=>{
        dispatch(getMovie());
        dispatch(getCelebrities());
        dispatch(getRoles());
    },[dispatch]);

    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    
    const [movieId, setMovieId] = useState(1); 
    const [celebrityId, setCelebrityId] = useState(1); 
    const [roleId, setRoleId] = useState(1); 

    const assignCelebrityRoleSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm1 = new FormData();
        const myForm2 = new FormData();
        const myForm3 = new FormData();
        const myForm4 = new FormData();
    
        if(adminData){
            myForm1.set("movieId", movieId);
            myForm1.set("celebrityId", celebrityId);
            dispatch(addMovieCelebrity(myForm1));

            myForm2.set("celebrityId",celebrityId);
            myForm2.set("roleId",roleId);
            dispatch(addCelebrityRole(myForm2));
            
            myForm3.set("movieId",movieId);
            myForm3.set("roleId",roleId);
            dispatch(addMovieRole(myForm3));

            myForm4.set("movieId",movieId);
            myForm4.set("celebrityId",celebrityId);
            myForm4.set("roleId",roleId);
            dispatch(addMovieCelebrityRole(myForm4));

            navigate("/Dashboard");
        }
    };

    const addMovieDataChange = (e) => {
        setMovieId(e.target.value);
    };

    const addCelebrityDataChange = (e) => {
        setCelebrityId(e.target.value);
    };

    const addRoleDataChange = (e) => {
        setRoleId(e.target.value);
    };

  return (
    <>
        <div className='AssignContainer'>
            <div className='AssignBox'>
                <center><h3>Assign Celebrity to Movie & Role to the Celebrity</h3></center>
                <form
                    className="AssignForm"
                    encType="multipart/form-data"
                    onSubmit={assignCelebrityRoleSubmitHandler}
                >
                    <div className='formInput'>
                        <div> 
                        <p>Movie :</p>
                        <select value={movieId} onChange={addMovieDataChange} className='selectMovie'>
                            {movies.map((movie) => (
                                <option value={movie.movieId}>{movie.movieName}</option>
                            ))}
                        </select>
                        {/* <Select
                            value={movieId}
                            isMulti
                            className="basic-single selectMovie"
                            classNamePrefix="select"
                            defaultValue={MovieOptions[0]}
                            isClearable={isClearable}
                            isSearchable={isSearchable}
                            name="Movie"
                            options={MovieOptions}
                            onChange={addMovieDataChange}
                        /> */}
                        </div>
                    </div>

                    <div className='formInput'>
                        <div> 
                        <p>Celebrity :</p>
                        <select value={celebrityId} onChange={addCelebrityDataChange} className='selectMovie'>
                            {celebrities.map((celebrity) => (
                                <option value={celebrity.celebrityId}>{celebrity.celebrityName}</option>
                            ))}
                        </select>
                        </div>
                    </div>

                    <div className='formInput'>
                        <div> 
                        <p>Role :</p>
                        <select value={roleId} onChange={addRoleDataChange} className='selectMovie'>
                            {roles.map((role) => (
                                <option value={role.roleId}>{role.roleName}</option>
                            ))}
                        </select>
                        </div>
                    </div>

                    <input type="submit" value="Add" className="AssignBtn" />

                </form>
            </div>
        </div>
    </>
  )
}

export default AssignCR