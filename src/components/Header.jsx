import React, { useState } from 'react'
import logo from '../images/logo.png'

import { IoIosLogOut } from 'react-icons/io'
import { logoutUser } from '../fetchers/userFetcher'
import { RiArrowDropDownLine } from 'react-icons/ri'

function Header({ isLoggedIn, setIsLoggedIn, view, setView }) {
  const [isClicked, setIsClicked] = useState(false);
  const email = localStorage.getItem('email')
  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res) {
        setIsLoggedIn(false);
        localStorage.removeItem('email');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="sticky top-0 z-50">
      <div className="flex flex-shrink-0 py-10 px-20 justify-between">
        <a href='http://localhost:8080'>
          <img className="max-h-20 flex-shrink-0" src={logo}></img>
        </a>
        { isLoggedIn 
          && 
            (
              <div className='flex flex-col gap-1'>
                <span 
                  className='
                    flex
                    items-center
                    rounded-md
                    p-3
                    text-blue-700
                    text-2xl 
                    font-mynerve 
                    cursor-pointer
                    hover:bg-zinc-300
                  '
                  onClick={() => setIsClicked(!isClicked)} 
                >
                  {email}{<RiArrowDropDownLine />}
                </span>
                { isClicked && <div 
                  onClick={handleLogout} 
                  className="
                    flex 
                    items-center 
                    text-md
                    bg-white
                    bg-opacity-10
                    p-1
                    mx-1
                    rounded-md
                    text-black
                    font-mynerve
                    cursor-pointer 
                  "
                >
                  <div className='flex w-full p-2 text-blue-700 hover:text-blue-800 hover:transform hover:transition-all hover:scale-110'>
                    <span>Logout</span>
                    <IoIosLogOut size={30}/>
                  </div>
                </div>}
              </div>
            )
        } 
        { view === 'homepage' &&
          <div onClick={() => setView('login')}>
            <div 
              className="
                hover:transform 
                hover:transition-all 
                hover:scale-110 
                cursor-pointer 
                flex 
                text-xl
                font-mynerve
                 bg-blue-600
                 text-white
                items-center 
                justify-center 
                gap-2
                rounded-2xl 
                mt-4 
                p-4 
                shadow-xl
              "
            >
              <span>Login/Signup</span>
            </div>
          </div>
        }       
      </div>
    </div>
  )
}

export default Header
