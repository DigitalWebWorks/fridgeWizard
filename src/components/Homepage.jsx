import React from 'react'
import Register from './Register'
import Header from './Header'
import Login from './Login'

import HomepageBody from './HomepageBody'

const Homepage = ({ setIsLoggedIn, view, setView }) => {

  return (
    view === "homepage" ?
      <div className='flex flex-col'>
        <div className='mb-20'>
          <Header view={view} setView={setView} />
        </div>
        <div className='flex'>
          <HomepageBody setView={setView} />
        </div>
      </div>
      // will render either the login or register component based on what the current view is set as
      : view === 'login' 
                ? <Login setView={setView} setIsLoggedIn={setIsLoggedIn} /> 
                : <Register setView={setView} setIsLoggedIn={setIsLoggedIn} />
  )
}

export default Homepage
