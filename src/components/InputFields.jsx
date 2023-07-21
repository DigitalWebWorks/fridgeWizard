import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { postFood } from '../fetchers/itemFetcher';
import moment from 'moment';

function InputFields({ setFridgeContents, email }) {
    const shelfLife = require('../../server/shelflife.json')
    const [expDate2, setExpDate2] = useState(moment().format('YYYY-MM-DD'))
    const [purchaseDate, setPurchaseDate] = useState(moment().format('YYYY-MM-DD'))
    const [daysToSpoil, setDaysToSpoil] = useState(0)
    const [category, setCategory] = useState('')
    const [error, setError] = useState('')
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const typesArray = []
          shelfLife.forEach(element => { typesArray.push(element.item);
        });
    const categoryArray = []
          shelfLife.forEach(element => {categoryArray.push(element.category)})
    
        const onSubmit = async ({type, itemName}) => { 
            if (type === 'Select an option') {
                setError('Not a valid selection')
                setTimeout(() => {
                  setError('')
                }, 1500)
                return; 
            }
            // console.log(category);
            const res = await postFood({ type, name: itemName, expDate2, email, category });
            setError('');
            setFridgeContents(res);
            setPurchaseDate(moment().format('YYYY-MM-DD'))
            reset();
        };
    
    useEffect(()=>{
        const expirationDateUpdater = () => {
            setExpDate2(moment(purchaseDate).add(daysToSpoil, 'd').format('YYYY-MM-DD'));
            return
        }
        expirationDateUpdater();
    },[purchaseDate, daysToSpoil])
    
    const purchaseDateHandler = (e) => {
        // e.preventDefault();
        setPurchaseDate(moment(e).format('YYYY-MM-DD'))
    }
    const daysToSpoilHandler = (e) => {
        // e.preventDefault();
        //figure out how to find passed in type "(e)" in shelfLife object
        shelfLife.forEach((el, index) => {
            if(el.item === e){
              categoryArray.forEach((el, idx) =>{ 
                if(index === idx && el != undefined){
                        // console.log(el)
                        setCategory(el);
                    }})
              setDaysToSpoil(el.shelflife)}
        })
    }

  return (
    <div className='flex flex-col mb-14'>
      <form className='' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center justify-between gap-2 pt-4'>
          {/* <label className='inputLabels'id='itemName'>Name:</label> */}
          {/* <label className='inputLabels' htmlFor='type'>Type:</label> */}
          <div className='flex flex-col items-center'>
            <div className='flex flex-col items-start'>
              <span className='font-mynerve'>Type</span>
              <select 
                className='
                  p-2 
                  font-mynerve
                  shadow-xl
                  bg-white 
                  bg-opacity-70 
                  focus:outline-none 
                  focus:border-blue-600 
                  focus:border-2 
                  hover:transform
                  hover:transition-all
                  hover:scale-110
                  border 
                  border-slate-700 
                  rounded-md
                  cursor-pointer
                ' 
                id='type' 
                onInput={(e) => daysToSpoilHandler(e.target.value)} placeholder='Type:' 
                {...register("type")}
              >
                <option>
                  Select an option
                </option>
                {typesArray.map((el, index) => <option key={index} value={el}>{el}</option> )}
              </select>
            </div>
            { error && <span className="font-mynerve text-red-500 text-xl">Invalid selection</span> }
          </div>
          <div className='flex flex-col'> 
            <span className='font-mynerve'>Name</span>
            <input 
              className="
                p-2
                m-0
                font-mynerve 
                shadow-xl
                focus:border-blue-600
                focus:outline-none 
                focus:border-2
                hover:transform
                hover:transition-all
                hover:scale-110
                bg-white 
                bg-opacity-70 
                border 
                border-slate-700
              " 
              id='itemName'
              type='text' 
              placeholder='Name' {...register("itemName")}
            /> 
          </div>
          {/* <label className='inputLabels'htmlFor='purchaseDate'>Purchase date:</label> */}
          <div className='flex flex-col justify-center'>
            <span className='font-mynerve'>Purchase Date</span>
            <input 
              className="
                p-2 
                m-0
                font-mynerve 
                shadow-xl
                focus:border-blue-600
                focus:outline-none 
                focus:border-2
                hover:transform
                hover:transition-all
                hover:scale-110
                bg-white 
                bg-opacity-70 
                border 
                border-slate-700
              "  
              id='purchaseDate' 
              type='date' 
              onInput={(e) => purchaseDateHandler(e.target.value)} 
              defaultValue={purchaseDate} 
              placeholder='purchaseDate' 
              {...register("purchaseDate")}
            />
          </div>
          <input
            type='hidden'
            value={category}
            {...register("category")}
          />
          {/* <label className='inputLabels' id='expDate'>Expiration date:</label>
          <input className='inputField' id='expDate' type='date' placeholder='expDate' value={expDate2}  {...register("expDate")}/> */}
          {/* <label htmlFor="purchaseDate">Date Purchased:</label> */}
          {/* <input className="input" value={purchaseDate} type='date' placeholder="Date Purchased" id="purchaseDate" name="purchaseDate"/> */}
          {/* <label htmlFor='type'>Type:</label> */}
          {/* <input className='input' type='dropdown' name='type' id='type' placeholder='Enter Type'/> */}
          {/* <label htmlFor='expDate'>Expiration date:</label> */}
          {/* <input className='input' type='date' placeholder="Expiration Date" id="expDate" name="expDate"/> */}
          {/* <label htmlFor='itemName'>Name:</label> */}
          {/* <input className='input' type='text' placeholder='Item Name' id='itemName'name='itemName'/> */}
          
          <button 
            className="
              font-mynerve 
              text-xl 
              bg-blue-500
              text-white
              w-[100px]
              shadow-xl
              p-2
              rounded-md
              hover:bg-blue-600
              hover:transform 
              hover:transition-all 
              hover:scale-105 
              cursor-pointer
            "
              type="submit" 
          >
            Add item
          </ button>
          
        </div>
      </form>
    </div>
  )
}

export default InputFields
