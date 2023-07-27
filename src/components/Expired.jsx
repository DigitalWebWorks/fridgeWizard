import React from 'react'
import moment from 'moment'

export default function Expired( {fridgeContents} ) {
  return (
    <div>
    <h1 className='font-mynerve text-lg'>These are spoiled, toss 'em or use at your own risk.</h1>
    <ul className='bg-white border border-black font-mynerve rounded-md shadow-md p-2 text-red-500'>
      {fridgeContents.map((element, index) => {
        if (moment(element.exp_date).isBefore(moment())) {
          return <li key={index}>Item: {element.name} --- Expiration Date: {element.exp_date}</li>
        }
      })}
    </ul>
  </div>
  )
}
