import React, { useState } from 'react'
import { BiAlarm } from 'react-icons/bi'
import {PiGraph } from 'react-icons/pi'
import {TbBiohazard} from 'react-icons/tb'

function IconButtons({ ESClicked, setESClicked, EClicked, setEClicked, graphClicked, setgraphClicked, fridgeContents }) {
  const expiringSoonButton = () => {
    setESClicked(!ESClicked);
  }

  const expiredButton = () => {
    setEClicked(!EClicked);
  }

  const graphButton = () => {
    setgraphClicked(!graphClicked)
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col flex-grow-0 items-end'>
        <div className='flex w-[150px] items-center justify-center gap-2 p-2 rounded-md border border-slate-500 bg-zinc-100 shadow-2xl mb-4'>
          <BiAlarm
              className="
              text-orange-500 
              cursor-pointer 
              hover:transform 
              hover:transition-all 
              hover:scale-125 
              hover:text-orange-600
              "
              onClick={expiringSoonButton} 
              size={30}  
          />
          <TbBiohazard
              className="
              text-green-500 
              cursor-pointer 
              hover:transform 
              hover:transition-all 
              hover:scale-125 
              hover:text-green-600
              " 
              onClick={expiredButton}  
              size={30}
          />
          <PiGraph 
              className="
              text-blue-500 
              cursor-pointer 
              hover:transform 
              hover:transition-all 
              hover:scale-125 
              hover:text-blue-600
              "
              onClick={graphButton}  
              size={30} 
          />
          {/* <img className="hover:transform hover:transition-all hover:scale-110 cursor-pointer" src={expiringSoon} alt="expiringSoon" onClick={expiringSoonButton}/> */}
          {/* <img src={spoiled} alt="spoiled" onClick={expiredButton}/> */}
          {/* <img src={graph} alt="graph" onClick={graphButton}/> */}
        </div>
      </div>
    </div>
  )
}

export default IconButtons
