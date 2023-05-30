import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./component/layout/Header/Header.js"
import WebFont from "webfontloader";
import React from "react";
import Home from "./component/Home/Home";
import { useRef } from 'react';
import AllMovies from "./component/Movies/AllMovies";
import LoginSignUp from "./component/User/LoginSignUp";
import MovieDetails from "./component/Movies/MovieDetails";
import Profile from "./component/User/Profile";
import store from "./store";
import { loadUser, loadAdmin} from "./actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions";
import UpdateProfile from "./component/User/UpdateProfile";
import Dashboard from "./component/Admin/Dashboard";
import AddMovie from "./component/Admin/AddMovie";
import AddRole from "./component/Admin/AddRole";
import AddCelebrity from "./component/Admin/AddCelebrity";
import AllCelebrity from "./component/Celebrity/AllCelebrity";
import AllRoles from "./component/Roles/AllRoles";
import AssignCR from "./component/Admin/AssignCR";

function App() {

  const dispatch = useDispatch();
  const { isAuthenticated, user, admin } = useSelector(
    (state) => state.user
  );
  
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families : ['Shantell Sans','Roboto','Droid Sans','Chilanka'],
      },
    });
    if(user != null){
      store.dispatch(loadUser());
    }else{
      store.dispatch(loadAdmin());
    }
  },[dispatch,user,admin]);
  
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated}/>
      {isAuthenticated && <UserOptions user={user} admin={admin}/>}
      <Routes>
        <Route exact path="/" element={<Home height={windowSize.current[1]} width={windowSize.current[0]}/>}/>
        <Route exact path="/Movies" element={<AllMovies/>}/>
        <Route exact path="/Celebrities" element={<AllCelebrity/>}/>
        <Route exact path="/Roles" element={<AllRoles/>}/>
        <Route exact path="/Movie/:id" element={<MovieDetails/>}/>
        <Route exact path="/LoginSignUp" element={<LoginSignUp/>}/>
        <Route exact path="/Profile" element={<Profile/>}/>
        <Route exact path="/UpdateProfile" element={<UpdateProfile/>}/>
        <Route exact path="/Dashboard" element={<Dashboard  />}/>
        <Route exact path="/AddMovie" element={<AddMovie/>}/>
        <Route exact path="/AddRole" element={<AddRole/>}/>
        <Route exact path="/AddCelebrity" element={<AddCelebrity/>}/>
        <Route exact path="/AssignCR" element={<AssignCR/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
