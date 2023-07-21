import React from 'react'
import wizzardBuddy from "../images/wizzardBuddy.png"

function HomepageBody({ setView }) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-col gap-4 w-[850px] mx-20'>
        <div className='text-7xl font-semibold font-mynerve text-blue-700'>
          Eat better and save cold, hard cash!
        </div>
        <div className='text-5xl font-mynerve'>
          A fridge inventory app that helps you fight spoilage and use what you have!
        </div>
        <div onClick={() => setView('login')}>
          <div 
            className="
                font-mynerve
                bg-gradient-to-r from-green-400 to-blue-500 
                hover:from-pink-500 hover:to-yellow-500
                hover:transform 
                hover:transition-all 
                hover:scale-110 
                cursor-pointer 
                flex 
                text-2xl
                bg-blue-600
                bg-opacity-95
                text-white
                items-center 
                justify-center 
                gap-2
                rounded-2xl 
                mt-4
                mr-44 
                p-4
                w-[250px] 
                shadow-xl
                    "
          >
            <span>Get started!</span>
          </div>
        </div>
        <div className='font-mynerve text-3xl py-4'>
          <div >✓ Easily view what you have without the shelf shuffle.</div>
          <div>✓ Recommendations for expiration dates.</div>
          <div>✓ Notification of which items are past their prime (or way past).</div>
        </div>
      </div>
      <img className="scale-125 mr-20" src={wizzardBuddy} alt='' />
    </div>
  )
}

export default HomepageBody
