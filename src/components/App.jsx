import React, { useState, useEffect } from "react";

import Homepage from "./Homepage";
import { Dashboard } from "./Dashboard";
import { checkSession } from "../fetchers/userFetcher";

import axios from 'axios';
import Cookies from 'universal-cookie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState('homepage');

  // const handleCodeParams = async () => {
  //   try {
  //     const params = new URLSearchParams(window.location.search);
  //     const code = params.get('code');

  //     // Check if the code parameter exists
  //     if (code) {
  //       // Perform actions with the code parameter
  //       // For example, make an API request to exchange the code for an access token
  //       // or save the code to state for further processing
  //       async function getAccessToken() {
  //         await axios.get("http://localhost:3000/oauth?code=" + codeParam)

  //         // return true;
  //       }
  //       // return false;
  //     }
  //   }
  //   catch (err) {

  //   }
  // }



  // checks whether user has an active session or not on component loading
  useEffect(() => {
    const cookies = new Cookies();
    const githubToken = cookies.get('githubToken');

    console.log('githubToken: ', githubToken)
    const fetchUserEmail = async () => {
      try {
        const res = await axios.post('http://localhost:3000/api/oauth/userdata', { githubToken });
        // const res = await axios.get('http://localhost:3000/api/oauth/userdata');
        console.log('loginWithGithub res: ', res.data)
        if (res.data.userEmail) {
          localStorage.setItem('email', res.data.userEmail);
          setIsLoggedIn(true);
          setView('homepage')
        }
      }
      catch (err) {
        console.log('error fetching userdata', err)
      }
    }

    const checkUserSession = async () => {
      try {
        const res = await checkSession();
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
    // handleCodeParams();
    fetchUserEmail();
    checkUserSession();
  });



  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-zinc-100 via-zinc-300 to-sky-300 min-h-screen">
      <div className="pb-32">
        {isLoggedIn
          ?
          <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          :
          <Homepage setIsLoggedIn={setIsLoggedIn} view={view} setView={setView} />
        }
      </div>
    </div>
  );
}

export default App;
