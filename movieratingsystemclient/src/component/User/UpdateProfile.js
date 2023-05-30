import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LocationCityIcon from "@material-ui/icons/LocationCity"
import LanguageIcon from '@material-ui/icons/Language';
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import jwt from 'jwt-decode'
import store from "../../store";
import {getUser} from "./../../actions/userAction"
import { useNavigate } from "react-router-dom";


const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user,userDetail } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  var data;
  if(user){
    if(Object.keys(user).length != 0){
      // console.log(user);
      data = jwt(user);
    }
  }

  // const [id,setId] = useState(0);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [middleName, setMiddleName] = useState("");
  // const [gender, setGender] = useState("");
  // const [dob, setDob] = useState("");
  // const [city, setCity] = useState("");
  // const [country, setCountry] = useState("");

  const [userObj, setUserObj] = useState({
    id: "",
    name: "",
    email: "",
    firstName: "",
    lastName: "",
    middleName: "",
    gender: "",
    dob: "",
    city: "",
    country: "",
});

const { id, name, email, firstName, lastName, middleName, gender, dob, city, country } = userObj;


  const [avatar, setAvatar] = useState("/avtar1.jpg");
  const [avatarPreview, setAvatarPreview] = useState("/avtar1.jpg");

  function convert(str) {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    
    const myForm = new FormData();
    
    myForm.set("userId",id);
    myForm.set("userName", name);
    myForm.set("uEmail", email);
    myForm.set("uFirstName", firstName);
    myForm.set("uLastName", lastName);
    myForm.set("uMiddleName", middleName);
    var ele = document.getElementsByName('gender');
    var i = 0; 
    for(i = 0; i < ele.length; i++) {
      if(ele[i].checked){
        myForm.set("uGender", ele[i].value);
      }
    }
      
    const DOB = convert(dob);
      
    myForm.set("uDOB", DOB);
    myForm.set("uCity", city);
    myForm.set("uCountry", country);
    myForm.set("imgUrl", avatar);
    dispatch(updateProfile(myForm,id));
  };

  const updateProfileDataChange = (e) => {
    // const reader = new FileReader();

    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setAvatarPreview(reader.result);
    //     setAvatar(reader.result);
    //   }
    // };

    // reader.readAsDataURL(e.target.files[0]);
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserObj({ ...userObj, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(data != null)
      store.dispatch(getUser(data.nameid));

      if(userDetail){
        // setId(userDetail.userId);
        // setName(userDetail.userName);
        // setEmail(userDetail.uEmail);
        // setFirstName(userDetail.uFirstName);
        // setLastName(userDetail.uLastName);
        // setMiddleName(userDetail.uMiddleName);
        // setGender(userDetail.uGender);
        // setDob(userDetail.uDOB);
        // setCity(userDetail.uCity);
        // setCountry(userDetail.uCountry);
        setAvatar(userDetail.imgUrl);
        var obj = {
          id:userDetail.userId,
          name: userDetail.userName,
          email: userDetail.uEmail,
          firstName: userDetail.uFirstName,
          lastName: userDetail.uLastName,
          middleName: userDetail.uMiddleName,
          gender: userDetail.uGender,
          dob: userDetail.uDOB,
          city: userDetail.uCity,
          country: userDetail.uCountry,
        }
        setUserObj(obj);
      }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/Profile");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }

  }, [dispatch, error, user,alert,isUpdated]);

  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    // onChange={(e) => setName(e.target.value)}
                    onChange={updateProfileDataChange}
                  />
                </div>
                <div className="updateProfileEmail">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={updateProfileDataChange}
                  />
                </div>

                <div className="updateProfileFirstName">
                <input
                    type="text"
                    placeholder="First Name"
                    required
                    name="firstName"
                    value={firstName}
                    // onChange={(e) => setFirstName(e.target.value)}
                    onChange={updateProfileDataChange}
                />
                </div>

                <div className="updateProfileLastName">
                <input
                    type="text"
                    placeholder="Last Name"
                    required
                    name="lastName"
                    value={lastName}
                    // onChange={(e) => setLastName(e.target.value)}
                    onChange={updateProfileDataChange}
                />
                </div>

                <div className="updateProfileMiddleName">
                <input
                    type="text"
                    placeholder="Middle Name"
                    required
                    name="middleName"
                    value={middleName}
                    // onChange={(e) => setMiddleName(e.target.value)}
                    onChange={updateProfileDataChange}
                />
                </div>
                        
                {/* <div className="updateProfileDOB">
                <input
                    type="date"
                    placeholder="D.O.B"
                    required
                    name="dob"
                    // value="2000-12-20"
                    value={d}
                    onChange={(e) => setDob(e.target.value)}
                />
                </div> */}

                <div className="updateProfileCity">
                <input
                    type="text"
                    placeholder="City"
                    required
                    name="city"
                    value={city}
                    // onChange={(e) => setCity(e.target.value)}
                    onChange={updateProfileDataChange}
                />
                </div>

                <div className="updateProfileCountry">
                <input
                    type="text"
                    placeholder="Country"
                    required
                    name="country"
                    value={country}
                    // onChange={(e) => setCountry(e.target.value)}
                    onChange={updateProfileDataChange}
                />
                </div>

                <div id="updateProfileImage">
                  <img src={avatar} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>

                <div className="signUpGender">
                <p>Gender</p>
                {(gender === "Male") ?
                <input type="radio" id="Male" name="gender" value="Male" checked/>
                :<input type="radio" id="Male" name="gender" value="Male"/>}
                <label htmlFor="Male">Male</label>

                {(gender === "Female")?
                <input type="radio" id="Female" name="gender" value="Female" checked/>
                :<input type="radio" id="Female" name="gender" value="Female"/>}
                <label htmlFor="Female">Female</label>

                {(gender === "Other")?
                <input type="radio" id="Other" name="gender" value="Other" checked/>
                :<input type="radio" id="Other" name="gender" value="Other"/>}
                <label htmlFor="Other">Other</label>
                {/* <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    defaultValue={gender && gender}
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
                </FormControl> */}
                </div>
                
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;