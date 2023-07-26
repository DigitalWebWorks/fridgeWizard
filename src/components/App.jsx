import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./authContext";
import Homepage from "./Homepage";
import { Dashboard } from "./Dashboard";
import Login from './Login'
import Register from "./Register";
import { checkSession } from "../fetchers/userFetcher";

import axios from 'axios';
import Cookies from 'universal-cookie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState('homepage');


  // checks whether user has an active session or not on component loading
  useEffect(() => {

    const checkUserSession = async () => {
      try {

        const res = await checkSession();
        console.log('checkUserSession response: ', res)

        if (localStorage.getItem('email') === null) {
          const cookies = new Cookies();
          const emailToken = cookies.get('email');
          const jwtToken = cookies.get('token');
          console.log('emailToken: ', emailToken)
          console.log('jwtToken: ', jwtToken)

          if (emailToken) localStorage.setItem('email', emailToken)
        }

        if (res) {
          setIsLoggedIn(true);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AuthContext.Provider value={{ setIsLoggedIn, isLoggedIn, view, setView }}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          {isLoggedIn ? (
            <>
              <Route path='/dashboard' element={<Dashboard />} />
            </>
          ) : (
            <>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </>
          )}
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
