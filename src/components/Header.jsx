import React, { useState, useContext } from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom';

function Header() {

  return (
    <div className="sticky top-0 z-50 flex flex-shrink-0 py-10 px-20 justify-between">
      <Link to='/'><img className="max-h-20 flex-shrink-0" src={logo}></img></Link>
      <Link to='/login'> <div className=" hover:transform hover:transition-all hover:scale-110 cursor-pointer flex text-xl font-mynerve bg-blue-600 text-white items-center justify-center gap-2 rounded-2xl mt-4 p-4 shadow-xl " 
      > Login/Signup </div> </Link>
    </div>
  )
}

export default Header;
