import React, { useState } from "react";
import { motion } from "framer-motion";
import { registerUser } from '../fetchers/userFetcher';

import { FaGithub } from 'react-icons/fa';
import Header from "./Header";

const Register = ({ setView, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !pass || !name) {
      setError("All fields are required")
      return;
    }

    const res = await registerUser(email, pass, name);
    const newUser = res;

    if (newUser) {
      setIsLoggedIn(true);
    }  
  };

  return(
    <div className="h-full w-full flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <motion.div className="bg-inherit bg-opacity-80 px-20 pb-20 pt-10 rounded-md shadow-2xl w-[550px]">
          <h2 className="text-slate-800 text-3xl font-mynerve font-bold mb-4">Register</h2>
          <form className="flex flex-col" onSubmit={handleRegister}>
            {/* <label htmlFor="name">Full name</label> */}
            <input 
              className="
                focus:transform 
                focus:transition-all 
                focus:scale-110  
                focus:outline-slate-700 
                text-sm 
                font-mynerve
                shadow-xl 
                rounded-md 
                bg-inherit
                outline 
                outline-1
                outline-slate-400
                p-3 
              " 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              name="name" 
              id="name" 
              placeholder="Username" 
              autoComplete="username" 
            />
            {/* <label htmlFor="email">Email</label> */}
            <input 
              className="
                focus:transform 
                focus:transition-all 
                focus:scale-110  
                focus:outline-slate-700 
                text-sm 
                shadow-xl 
                font-mynerve
                rounded-md 
                bg-inherit 
                outline 
                outline-1  
                outline-slate-400
                p-3
              " 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder="Email" 
              id="email" 
              name="email" 
              autoComplete="email" 
            />
            {/* <label htmlFor="password">Password</label> */}
            <input 
              className="
                focus:transform 
                focus:transition-all 
                focus:scale-110 
                focus:outline-slate-700 
                text-sm 
                shadow-xl 
                font-mynerve
                rounded-md 
                bg-inherit 
                outline 
                outline-1 
                outline-slate-400
                p-3 
              " 
              value={pass} 
              onChange={(e) => setPass(e.target.value)} 
              type="password" 
              placeholder="Password" 
              id="password" 
              name="password" 
              autoComplete="password" 
            />
             {error && <p className="text-red-500 text-sm font-semibold p-4 m-auto">{error}</p>}
            <motion.button
              className="p-4 rounded-3xl bg-blue-600 bg-opacity-95 mt-4 text-white text-xl font-mynerve shadow-xl"
              initial={{ opacity: 0.6 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              whileInView={{ opacity: 1 }}>
                Register
            </motion.button>
          </form>
          <div className="text-center mt-4">
            <div className="flex items-center">
              <div className="flex-grow border-b border-gray-400"></div>
              <div className="mx-4 font-mynerve text-gray-500">OR</div>
              <div className="flex-grow border-b border-gray-400"></div>
            </div>
            <div 
              className="
                hover:transform 
                hover:transition-all 
                hover:scale-110 
                cursor-pointer 
                flex 
                items-center 
                justify-center 
                gap-2 border 
                border-1 
                border-slate-400 
                rounded-3xl 
                font-mynerve
                text-xl
                mt-4 
                p-3 
                shadow-xl
              "
            >
              <FaGithub size={30}/>
              <span>Continue with GitHub</span>
            </div>
          </div>
        </motion.div>
        <motion.button 
          className="text-slate-800 bg-inherit font-mynerve text-xl mt-8" 
          initial={{ opacity: 0.6 }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.9 }}
          whileInView={{ opacity: 1 }}
          onClick={() => setView('login')}
        >
          Already have an account? Login here.
        </motion.button>
      </div>
    </div>
  )
}

export default Register;