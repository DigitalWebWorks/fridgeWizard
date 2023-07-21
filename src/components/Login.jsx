import React, { useState } from "react";
import { motion } from "framer-motion"
import { loginUser } from "../fetchers/userFetcher";
import GitHubButton from "./GitHubButton";
import Header from "./Header";

const Login = ({ setView, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !pass) {
      setError('Email and password are required');
      return;
    }
    
    const res = await loginUser(email, pass, setError);

    if (res.status === true) {
      localStorage.setItem('email', email);
      setIsLoggedIn(res.status);
      setView('homepage');
    } else {
      setError(res.status);
    }
  };

  return(
    <div className="h-full w-full flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center">
        <motion.div 
          className="bg-inherit bg-opacity-80 px-20 pb-20 pt-10 rounded-md shadow-2xl w-[550px]"
          initial={{ opacity:0 }}
          animate={{ opacity:1 }} 
        >
          <h2 className="text-slate-800 text-3xl font-bold mb-4 font-mynerve">Login</h2>
          <form className="flex flex-col" onSubmit={handleLogin}>
            {/* <label className="text-slate-800 text-sm" htmlFor="email">email</label> */}
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
              autoComplete="username" 
            />
            {/* <label className="text-slate-800 text-sm" htmlFor="password">password</label> */}
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
              value={pass} 
              onChange={(e) => setPass(e.target.value)} 
              type="password" 
              placeholder="Password" 
              id="password" 
              name="password" 
              autoComplete="current-password" 
            />
            {error && <p className="text-red-500 font-mynerve text-lg font-semibold p-4 m-auto">{error}</p>}
            <span className="hover:underline text-blue-700 cursor-pointer font-mynerve w-32 pt-4 ">Forgot password?</span>
            <motion.button
              className="p-4 rounded-3xl bg-blue-600 bg-opacity-95 mt-4 text-white text-xl font-mynerve shadow-xl" 
              initial={{ opacity: 0.6 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              whileInView={{ opacity: 1 }}
            >
              Login
            </motion.button>
          </form>
          <div className="text-center mt-4">
            <div className="flex items-center">
              <div className="flex-grow border-b border-gray-400"></div>
              <div className="mx-4 font-mynerve text-gray-500">OR</div>
              <div className="flex-grow border-b border-gray-400"></div>
            </div>
            <GitHubButton />
          </div>
        </motion.div>
      </div>
      <div className="flex items-center justify-center">
        <motion.button 
          className="text-slate-800 bg-inherit font-mynerve text-xl mt-8"
          initial={{ opacity: 0.6 }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.9 }}
          whileInView={{ opacity: 1 }}
          onClick={() => setView('register')}
        >
          New to Fridge Wizard? Join now
        </motion.button>      
      </div>
    </div>
  )
};

export default Login;