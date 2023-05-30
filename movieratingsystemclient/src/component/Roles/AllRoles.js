import React, { useEffect } from 'react'
import {getRoles,clearErrors} from "./../../actions/roleAction"
import {useSelector,useDispatch} from "react-redux"
import { Container } from 'react-bootstrap';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import RoleCard from './RoleCard';

const AllRoles = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const {roles,loading,error} = useSelector((state) => state.roles);

  useEffect(()=>{
    if(error){
      return alert.error(error);
    }
    dispatch(getRoles());
  },[dispatch,error,alert]);

  const results = [];
  roles.map(role => {
    results.push(
        role && <RoleCard role={role && role}/>
    );
  });
  return (
    <>
    { loading ? (
            <Loader />
        ) : (
            <>
                <Container>
                    <div className='heading mt-5'>
                        <center><h2>All Roles</h2></center>
                    </div>
                    <div className='Items'>
                        {results}
                    </div>
                </Container>
            </>
        )}
    </>
  )
}

export default AllRoles