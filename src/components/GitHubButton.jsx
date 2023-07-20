import React from "react";
import { FaGithub } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { oauth } from "../fetchers/userFetcher";
import axios from 'axios'

const GitHubButton = ({ setIsLoggedIn, setView, setEmail }) => {

  const loginWithGithub = async () => {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + process.env.GITHUB_CLIENT_ID)
  }

  // useEffect(() => {
  //   async () => {
  //     try {
  //       const res = await axios.get('http://localhost:3000/api/oauth/user');
  //       console.log('loginWithGithub res: ', res.data)
  //       setIsLoggedIn(true);
  //       setView('homepage')
  //     }
  //     catch (err) {
  //       console.log('error fetching userdata', err)
  //     }
  //   }
  // }, []);


  return (
    <a
      href={'http://localhost:3000/api/oauth'}
      className="
        hover:transform 
        hover:transition-all 
        hover:scale-110 
        cursor-pointer 
        flex 
        items-center 
        justify-center 
        gap-2 
        border 
        border-1 
        border-slate-400 
        rounded-3xl 
        font-mynerve
        text-xl
        mt-4 
        p-3 
        shadow-xl
      "
      // onClick={loginWithGithub}
    >
      <FaGithub size={30} />
      <span>Sign in with GitHub</span>
    </a>
  );
};

export default GitHubButton;