import React ,{ useEffect, Link } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Loader from '../layout/Loader/Loader';
import { useAlert } from "react-alert";
import jwt from 'jwt-decode'
import {getUser,getAdmin} from "./../../actions/userAction"
import store from '../../store';
import "./Profile.css";

const Profile = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isAuthenticated,user, userDetail, admin ,adminDetail } = useSelector(
    (state) => state.user
  );

  function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
  }

  var data;
  if(!isEmpty(user))
    data = jwt(user);
  
  var adminData;
  if(!isEmpty(admin))
    adminData = jwt(admin);

  // if(data){
  //   console.log(data);
  //   console.log(data.unique_name);
  //   console.log(data.role);
  //   console.log(data.nameid);
  // }else{
  //   console.log("than than gopal");
  // }

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    // if(user != null)
    //   store.dispatch(getUser(data.nameid));
    // if(admin != null)
    //   store.dispatch(getAdmin(adminData.nameid));
    if(!isEmpty(user))
      store.dispatch(getUser(data.nameid));
    if(!isEmpty(admin))
      store.dispatch(getAdmin(adminData.nameid));
  }, [dispatch, error,isAuthenticated,alert]);

  return (
    <>
        {loading ? (
          <Loader />
        ) : (
          <>
            {(user != null) ? (
              <div className="profileContainer">
                <div>
                  <h1>My Profile</h1>
                  <img src={userDetail && userDetail.imgUrl} alt={userDetail && userDetail.userName} />
                </div>
                <div>
                  <div>
                    <h4>User Name</h4>
                    <p>{userDetail && userDetail.userName}</p>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>{userDetail && userDetail.uEmail}</p>
                  </div>
                  <div>
                    <h4>Full Name</h4>
                    <p>{userDetail && userDetail.uFirstName} {userDetail && userDetail.uMiddleName} {userDetail && userDetail.uLastName}</p>
                  </div>
                  <div>
                    <h4>Gender</h4>
                    <p>{userDetail && userDetail.uGender}</p>
                  </div>
                  <div>
                    <h4>Date of Birth</h4>
                    <p>{userDetail && userDetail.uDOB}</p>
                  </div>
                  <div>
                    <h4>City</h4>
                    <p>{userDetail && userDetail.uCity}</p>
                  </div>
                  <div>
                    <h4>Country</h4>
                    <p>{userDetail && userDetail.uCountry}</p>
                  </div>

                </div>
              </div>
            ) : (
              <div className="profileContainer">
                <div>
                  <h1>My Profile</h1>
                  <img src={adminDetail && adminDetail.imgUrl} alt={adminDetail && adminDetail.adminName} />
                </div>
                <div>
                  <div>
                    <h4>Admin Name</h4>
                    <p>{adminDetail && adminDetail.adminName}</p>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>{adminDetail && adminDetail.aEmail}</p>
                  </div>
                  <div>
                    <h4>Full Name</h4>
                    <p>{adminDetail && adminDetail.aFirstName} {adminDetail && adminDetail.aMiddleName} {adminDetail && adminDetail.aLastName}</p>
                  </div>
                  <div>
                    <h4>Gender</h4>
                    <p>{adminDetail && adminDetail.aGender}</p>
                  </div>
                  <div>
                    <h4>Date of Birth</h4>
                    <p>{adminDetail && adminDetail.aDOB}</p>
                  </div>
                  <div>
                    <h4>City</h4>
                    <p>{adminDetail && adminDetail.aCity}</p>
                  </div>
                  <div>
                    <h4>Country</h4>
                    <p>{adminDetail && adminDetail.aCountry}</p>
                  </div>

                </div>
              </div>
            )}
          </>
        )}
    </>
  )
}

export default Profile