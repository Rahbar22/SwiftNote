import React, {useEffect} from 'react';
import './LandingPage.css';
import {useNavigate} from 'react-router-dom'

const LandingPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if(userInfo){
        navigate("/mynotes");
    }
   }, [navigate]);

  return (
      <div className='main'>
        <div className='container'>
          <div className='row'>
            <div className="intro-text text-center">
                <div>
                  <h1 className="title">Welcome to SwiftNote</h1>
                  <p className="subtitle">One Safe place for all your notes.</p>
                </div>
                <div className='buttonContainer'>
                    <a href="/login">
                        <button type="button" class="btn btn-outline-dark">Login</button>
                    </a>
                    <a href="/register">
                    <button type="button" class="btn btn-outline-dark">Sign Up</button>
                    </a>
                </div>
              </div>
          </div>
        </div>
      </div>
  )
}

export default LandingPage