import React from 'react'
import Register from './Register'
import Header from './Header'
import Login from './Login'

import HomepageBody from './HomepageBody'

const Homepage = ({ setIsLoggedIn, view, setView }) => {

  return (
      <div className='flex flex-col mb-20 bg-gradient-to-b from-zinc-100 via-zinc-300 to-sky-300 min-h-screen pb-32'>
        <Header view={view} setView={setView} />
        <HomepageBody setView={setView} />
      </div>
  )
}

export default Homepage
