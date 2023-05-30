import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LocationCityIcon from "@material-ui/icons/LocationCity"
import LanguageIcon from '@material-ui/icons/Language';
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {login,clearErrors,register,adminLogin} from "./../../actions/userAction";
import "./LoginSignUp.css";
import { useNavigate } from "react-router-dom";
import Loader from './../layout/Loader/Loader'

const LoginSignUp = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginUserName, setloginUserName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        middleName: "",
        gender: "",
        dob: "",
        city: "",
        country: "",
    });

    const { name, email, password, firstName, lastName, middleName, gender, dob, city, country } = user;

    const [avatar, setAvatar] = useState("/avtar1.jpg");
    const [avatarPreview, setAvatarPreview] = useState("/avtar1.jpg");

    const loginSubmit = (e) => {
        e.preventDefault();
        var isUser = true;
        var ele = document.getElementsByName('userRole');
        var i = 0; 
        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked){
                if(ele[i].value === "Admin"){
                    isUser = false;
                }                
            }
        }
        if(isUser){
            dispatch(login(loginUserName, loginPassword));
        }else{
            dispatch(adminLogin(loginUserName, loginPassword));
        }
    };

    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    const registerSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("userName", name);
        myForm.set("uEmail", email);
        myForm.set("password", password);
        myForm.set("uFirstName", firstName);
        myForm.set("uLastName", lastName);
        myForm.set("uMiddleName", middleName);
        
        var ele = document.getElementsByName('gender');
        var i = 0; 
        for(i = 0; i < ele.length; i++) {
            if(ele[i].checked){
                myForm.set("uGender", ele[i].value);
                // gender = ele[i].value;
            }
        }
        const DOB = convert(dob);

        myForm.set("uDOB", DOB);
        myForm.set("uCity", city);
        myForm.set("uCountry", country);
        myForm.set("imgUrl", avatar);

        console.log(myForm.userName);
        dispatch(register(myForm));
    };

    const registerDataChange = (e) => {
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
          setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const switchTabs = (e, tab) => {
        if (tab === "login") {
          switcherTab.current.classList.add("shiftToNeutral");
          switcherTab.current.classList.remove("shiftToRight");
    
          registerTab.current.classList.remove("shiftToNeutralForm");
          loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
          switcherTab.current.classList.add("shiftToRight");
          switcherTab.current.classList.remove("shiftToNeutral");
    
          registerTab.current.classList.add("shiftToNeutralForm");
          loginTab.current.classList.add("shiftToLeft");
        }
    };

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
          if(email){
            console.log("before");
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
        
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
            console.log("After");
          }
        }

        if(isAuthenticated){
            navigate('/Profile', { replace: true });
        }
    }, [dispatch, error,isAuthenticated,alert]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login_signUp_toggle">
                            <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                            <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={loginUserName}
                                onChange={(e) => setloginUserName(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>

                        <input type="radio" id="User" name="userRole" value="User" required/>
                        <label htmlFor="User">User</label>
                        <input type="radio" id="Admin" name="userRole" value="Admin"/>
                        <label htmlFor="Admin">Admin</label>

                        <Link to="/password/forgot">Forget Password ?</Link>
                        <input type="submit" value="Login" className="loginBtn" />
                    </form>
                    <form
                        className="signUpForm"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className="signUpName">
                        <FaceIcon />
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            name="name"
                            value={name}
                            onChange={registerDataChange}
                        />
                        </div>
                        <div className="signUpEmail">
                        <MailOutlineIcon />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={registerDataChange}
                        />
                        </div>
                        <div className="signUpPassword">
                        <LockOpenIcon />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            name="password"
                            value={password}
                            onChange={registerDataChange}
                        />
                        </div>

                        <div className="signUpFirstName">
                        <FaceIcon />
                        <input
                            type="text"
                            placeholder="First Name"
                            required
                            name="firstName"
                            value={firstName}
                            onChange={registerDataChange}
                        />
                        </div>

                        <div className="signUpLastName">
                        <FaceIcon />
                        <input
                            type="text"
                            placeholder="Last Name"
                            required
                            name="lastName"
                            value={lastName}
                            onChange={registerDataChange}
                        />
                        </div>

                        <div className="signUpMiddleName">
                        <FaceIcon />
                        <input
                            type="text"
                            placeholder="Middle Name"
                            required
                            name="middleName"
                            value={middleName}
                            onChange={registerDataChange}
                        />
                        </div>
                        
                        <div className="signUpDOB">
                        <input
                            type="date"
                            placeholder="D.O.B"
                            required
                            name="dob"
                            value={dob}
                            onChange={registerDataChange}
                        />
                        </div>

                        <div className="signUpCity">
                        <LocationCityIcon />
                        <input
                            type="text"
                            placeholder="City"
                            required
                            name="city"
                            value={city}
                            onChange={registerDataChange}
                        />
                        </div>

                        <div className="signUpCountry">
                        <LanguageIcon />
                        <input
                            type="text"
                            placeholder="Country"
                            required
                            name="country"
                            value={country}
                            onChange={registerDataChange}
                        />
                        </div>

                        <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange}
                        />
                        </div>
                        <div className="signUpGender">

                        <p>Gender</p>
                        <input type="radio" id="Male" name="gender" value="Male" required/>
                        <label htmlFor="Male">Male</label>

                        <input type="radio" id="Female" name="gender" value="Female"/>
                        <label htmlFor="Female">Female</label>

                        <input type="radio" id="Other" name="gender" value="Other"/>
                        <label htmlFor="Other">Other</label>

                        {/* <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                        </FormControl> */}
                        </div>
                        
                        <input type="submit" value="Register" className="signUpBtn" />
                    </form>
                </div>
            </div>
            )}
        </>
    )
}

export default LoginSignUp