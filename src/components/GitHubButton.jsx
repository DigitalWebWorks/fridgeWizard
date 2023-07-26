import React from "react";
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const GitHubButton = () => {

  return (
    <Link to='http://localhost:3000/api/oauth' className=" hover:transform hover:transition-all hover:scale-110 cursor-pointer flex items-center justify-center gap-2 border border-1 border-slate-400 rounded-3xl font-mynerve text-xl mt-4 p-3 shadow-xl " >
      <FaGithub size={30} />
      <span>Sign in with GitHub</span>
    </Link>
  );
};

export default GitHubButton;