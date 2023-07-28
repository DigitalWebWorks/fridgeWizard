import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { postFood, getTypes } from '../fetchers/itemFetcher';
import moment from 'moment';

function InputFields({ setFridgeContents, email }) {
    const [purchaseDate, setPurchaseDate] = useState(moment().format('YYYY-MM-DD'))
    // const [category, setCategory] = useState('')
    const [error, setError] = useState('')
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [typesArray, setTypesArray] = useState([]);

    useEffect(async ()=> {
      const res = await getTypes();
      let temp = res.map((e) => {
        return e.type;
      })
      temp.sort();
      setTypesArray(temp);
    }, []);

    const onSubmit = async ({type, itemName}) => { 
        if (type === 'Select an option') {
            setError('Not a valid selection')
            setTimeout(() => {
              setError('')
            }, 1500)
            return; 
        }
        const res = await postFood({ type, name: itemName, purchaseDate, email  });
        setError('');
        setFridgeContents(res);
        setPurchaseDate(moment().format('YYYY-MM-DD'))
        reset();
    };
    
    const purchaseDateHandler = (e) => {
        setPurchaseDate(moment(e).format('YYYY-MM-DD'))
    }

  return (
    <div className='flex flex-col mb-14'>
      <form className='' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center justify-between gap-2 pt-4'>

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
                placeholder='Type:' 
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
          {/* <input
            type='hidden'
            value={category}
            {...register("category")}
          /> */}
          
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
