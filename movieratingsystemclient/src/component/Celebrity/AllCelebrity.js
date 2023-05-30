import React, { useEffect } from 'react'
import {getCelebrities,clearErrors} from "./../../actions/celebrityAction"
import {useSelector,useDispatch} from "react-redux"
import { Container } from 'react-bootstrap';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import CelebrityCard from './CelebrityCard';

const AllCelebrity = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const {celebrities,loading,error} = useSelector((state) => state.celebrities);

  useEffect(()=>{
    if(error){
      return alert.error(error);
    }
    dispatch(getCelebrities());
  },[dispatch,error,alert]);

  const results = [];
  celebrities.map(celebrity => {
    results.push(
        celebrity && <CelebrityCard celebrity={celebrity && celebrity}/>
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
                        <center><h2>All Celebrities</h2></center>
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

export default AllCelebrity