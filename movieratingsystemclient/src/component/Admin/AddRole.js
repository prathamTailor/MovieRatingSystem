import React, { Fragment, useRef, useState, useEffect } from "react";
import "./AddRole.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import jwt from 'jwt-decode'
import {newRole} from "./../../actions/movieAction"

const AddRole = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, loading, isAuthenticated, admin } = useSelector(
        (state) => state.user
    );

    var adminData;
    if(admin != null)
        adminData = jwt(admin);

    const [role, setRole] = useState({
        roleName : "",
        roleDescription:"",
    });

    const {roleName,roleDescription} = role;

    const createRoleSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        if(adminData){
            myForm.set("roleName", roleName);
            myForm.set("roleDescription", roleDescription);
            myForm.set("adminId",adminData.nameid);
            dispatch(newRole(myForm));
            navigate("/Dashboard");
        }
    };

    const addRoleDataChange = (e) => {
        setRole({ ...role, [e.target.name]: e.target.value });
    };

  return (
    <>
        <div className='AddRoleContainer'>
            <div className='AddRoleBox'>
                <center><h3>Add New Role</h3></center>
                <form
                    className="AddRoleForm"
                    encType="multipart/form-data"
                    onSubmit={createRoleSubmitHandler}
                >
                    <div className='formInput'>
                        <input
                            type="text"
                            placeholder="Role Name"
                            required
                            name="roleName"
                            value={roleName}
                            onChange={addRoleDataChange}
                        />
                    </div>
                    
                    <div className='formInput'>
                        <input
                            type="text"
                            placeholder="Role Description"
                            required
                            name="roleDescription"
                            value={roleDescription}
                            onChange={addRoleDataChange}
                        />
                    </div>

                    <input type="submit" value="Add" className="signUpBtn" />

                </form>
            </div>
        </div>
    </>
  )
}

export default AddRole