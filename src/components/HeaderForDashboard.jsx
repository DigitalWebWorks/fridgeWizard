import React, { useState, useEffect, useContext } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri'
import { IoIosLogOut } from 'react-icons/io'
import logo from '../images/logo.png'
import { AuthContext } from "./authContext";
import { logoutUser } from '../fetchers/userFetcher'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function HeaderForDashboard() {
    const auth = useContext(AuthContext);
    const email = localStorage.getItem('email');
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await logoutUser();
            if (res) {
                navigate('/');
                auth.setIsLoggedIn(false);
                localStorage.removeItem('email');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="sticky top-0 z-50 flex flex-shrink-0 py-10 px-20 justify-between">
                <Link to='/'><img className="max-h-20 flex-shrink-0" src={logo}></img></Link>
                <div className='flex flex-col gap-1'>
                    <span onClick={() => setIsClicked(!isClicked)} className=' flex items-center rounded-md p-3 text-blue-700 text-2xl font-mynerve cursor-pointer hover:bg-zinc-300 '>{email}{<RiArrowDropDownLine />}</span>
                    {isClicked &&
                        <div className=" flex items-center text-md bg-white bg-opacity-10 p-1 mx-1 rounded-md text-black font-mynerve cursor-pointer " >
                            <div onClick={handleLogout} className='flex w-full p-2 text-blue-700 hover:text-blue-800 hover:transform hover:transition-all hover:scale-110'
                            >Logout<IoIosLogOut size={30} /> </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )

}