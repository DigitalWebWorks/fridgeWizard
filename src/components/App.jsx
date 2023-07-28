import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./authContext";
import Homepage from "./Homepage";
import { Dashboard } from "./Dashboard";
import Login from './Login'
import Register from "./Register";
import { checkSession } from "../fetchers/userFetcher";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  // checks whether user has an active session or not on component loading
  useEffect(() => {

    const checkUserSession = async () => {
      try {

        const res = await checkSession();
        console.log('checkUserSession response: ', res)

        if (res.userName) {
          if (localStorage.getItem('user') === null || localStorage.getItem('user') === undefined) {
            const cookies = new Cookies();
            const user = cookies.get('user');
            localStorage.setItem('user', user)
            setTimeout(() => {
              cookies.remove('user', { path: '/' });
            }, 1000)
          }
          setIsLoggedIn(true);
          setIsLoading(false);
        } else if (res.email) {
          setIsLoggedIn(true);
          setIsLoading(false);
          navigate("/dashboard");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log('isLoggedIn: ', isLoggedIn)
  return (
    <>
      <AuthContext.Provider value={{ setIsLoggedIn, isLoggedIn }}>
        <Routes>
          {/* {isLoggedIn ? ( */}
          <Route path='/dashboard' element={<Dashboard />} />
          {/* ) : ( */}
          <>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </>
          {/* )} */}
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
