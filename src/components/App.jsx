import React, { useState, useEffect } from "react";

import Homepage from "./Homepage";
import { Dashboard } from "./Dashboard";
import { checkSession } from "../fetchers/userFetcher";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState('homepage');

  const handleCodeParams = () => {
    const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
  
        // Check if the code parameter exists
        if (code) {
          // Perform actions with the code parameter
          // For example, make an API request to exchange the code for an access token
          // or save the code to state for further processing
          return true;
        }
        return false;
  }

  // checks whether user has an active session or not on component loading
  useEffect(() => {
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

    checkUserSession();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-zinc-100 via-zinc-300 to-sky-300 min-h-screen">
      <div className="pb-32">
        { isLoggedIn 
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
