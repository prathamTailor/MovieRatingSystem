import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import UpdateIcon from '@material-ui/icons/Update';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import jwt from 'jwt-decode'
import {logout,logoutAdmin} from "./../../../actions/userAction";
import { useNavigate } from "react-router-dom";

const UserOptions = ({ user , admin}) => {

  var data;
  if(user != null)
    data = jwt(user);

  var adminData;
  if(admin != null)
    adminData = jwt(admin);
  
  
  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
  ];
  
  if(adminData){
    if (adminData.role === "Admin") {
      options.unshift({
        icon: <DashboardIcon />,
        name: "Dashboard",
        func: dashboard,
      });
      options.unshift({
        icon: <ExitToAppIcon />,
        name: "Logout Admin",
         func: logoutadmin
      })
    }
  }

  if(data){
    if (data.role === "User") {
      options.unshift({
        icon: <UpdateIcon />,
        name: "Update Profile",
        func: upateUser
      });
      options.unshift({
        icon: <ExitToAppIcon />,
        name: "Logout User",
         func: logoutUser
      });
    }
  }

  function dashboard() {
    navigate("/Dashboard");
  }

  function upateUser() {
    navigate("/UpdateProfile");
  }
  function account() {
    navigate("/Profile");
  }
  function logoutUser() {
    dispatch(logout());
    navigate("/");
    alert.success("Logout Successfully");
  }

  function logoutadmin() {
    dispatch(logoutAdmin());
    navigate("/");
    alert.success("Logout Successfully");
  }

  if(user || admin)
    return (
      <Fragment>
        <Backdrop open={open} style={{ zIndex: "10" }} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          style={{ zIndex: "11" }}
          open={open}
          direction="up"
          className="speedDial"
          icon={<AccountCircleIcon/>}
        >
        
          {options.map((item) => (
            <SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
              tooltipOpen={window.innerWidth <= 600 ? true : false}
            />
          ))}
        
        </SpeedDial>
      </Fragment>
    );
  else
    return(
      <></>
    );
};

export default UserOptions;