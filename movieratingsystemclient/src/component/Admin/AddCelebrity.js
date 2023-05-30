import React, { Fragment, useRef, useState, useEffect } from "react";
import "./AddCelebrity.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import jwt from 'jwt-decode'
import {newCelebrity} from "./../../actions/movieAction"

const AddCelebrity = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, isAuthenticated, admin } = useSelector(
        (state) => state.user
    );

    var adminData;
    if(admin != null)
        adminData = jwt(admin);

    const [celebrity, setCelebrity] = useState({
        celebrityName : "",
        gender: "",
        dob: "",
        birthPlace: "",
        adminId:"",
    });

    const {celebrityName,gender,dob,birthPlace,adminId} = celebrity;

    const [celebrityImage, setCelebrityImage] = useState("/avtar1.jpg");
    const [celebrityImagePreview, setCelebrityImagePreview] = useState("/avtar1.jpg");

    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    const createCelebritySubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        if(adminData){
            myForm.set("celebrityName", celebrityName);
            
            var ele = document.getElementsByName('gender');
            var i = 0; 
            for(i = 0; i < ele.length; i++) {
                if(ele[i].checked){
                    myForm.set("gender", ele[i].value);
                }
            }

            const DOB = convert(dob);

            myForm.set("dob", DOB);
            myForm.set("birthPlace", birthPlace);
            myForm.set("imgUrl", celebrityImage);
            myForm.set("adminId",adminData.nameid);
            dispatch(newCelebrity(myForm));
            navigate("/Dashboard");
        }
    };

    const addCelebrityDataChange = (e) => {
        if (e.target.name === "celebrityImg") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setCelebrityImage(reader.result);
              setCelebrityImagePreview(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setCelebrity({ ...celebrity, [e.target.name]: e.target.value });
        }
    };


  return (
    <>
        <div className='AddCelebrityContainer'>
            <div className='AddCelebrityBox'>
                <center><h3>Add New Celebrity</h3></center>
                <form
                    className="AddCelebrityForm"
                    encType="multipart/form-data"
                    onSubmit={createCelebritySubmitHandler}
                >
                    <div className='formInput'>
                        <input
                            type="text"
                            placeholder="Celebrity Name"
                            required
                            name="celebrityName"
                            value={celebrityName}
                            onChange={addCelebrityDataChange}
                        />
                    </div>
                    
                    <div className='formInput'>
                        <input
                            type="text"
                            placeholder="Birth Place"
                            required
                            name="birthPlace"
                            value={birthPlace}
                            onChange={addCelebrityDataChange}
                        />
                    </div>

                    <div className='formInput'>
                        <input
                            type="date"
                            placeholder="D.O.B"
                            required
                            name="dob"
                            value={dob}
                            onChange={addCelebrityDataChange}
                        />
                    </div>

                    <div className='formInput'>
                        <p>Gender</p>
                        <input type="radio" id="Male" name="gender" value="Male"/>
                        <label htmlFor="Male">Male</label>

                        <input type="radio" id="Female" name="gender" value="Female"/>
                        <label htmlFor="Female">Female</label>

                        <input type="radio" id="Other" name="gender" value="Other"/>
                        <label htmlFor="Other">Other</label>
                    </div>

                    <div id='addCelebrityImage'>
                        <img src={celebrityImagePreview} alt="Avatar Preview" />
                        <input
                            type="file"
                            name="celebrityImg"
                            accept="image/*"
                            onChange={addCelebrityDataChange}
                        />
                    </div>
                    
                    <input type="submit" value="Add" className="signUpBtn" />

                </form>
            </div>
        </div>
    </>
  )
}

export default AddCelebrity