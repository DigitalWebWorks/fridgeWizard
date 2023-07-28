import React, { useState, useEffect, useContext } from 'react';
import { Contents } from './Contents';
import { getFood } from '../fetchers/itemFetcher';
// import Header from './Header';
import InputFields from './InputFields';
import LoadingSpinner from './LoadingSpinner'
import CompositionGraph from './CompositionGraph'
import IconButtons from './IconButtons';
import ExpiringSoon from './ExpiringSoon'
import Expired from './Expired'
import HeaderForDashboard from './HeaderForDashboard';


//import types object from json object in db

export const Dashboard = () => {
  const [fridgeContents, setFridgeContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [ESClicked, setESClicked] = useState(false)
  const [EClicked, setEClicked] = useState(false)
  const [graphClicked, setgraphClicked] = useState(false)
  const user = localStorage.getItem('email') || localStorage.getItem('user');

  useEffect(() => {
    const getFoodContent = async () => {
      const res = await getFood(user)
      setFridgeContents(res);
      setIsLoading(false);
    }
    getFoodContent();
  }, [user])


  return (
    <div className='flex flex-col'>
      <HeaderForDashboard />
      <div className='flex items-center justify-center'>
        <div className="w-3/5 md:w-1/2 flex flex-col">
          <div className='flex items-center justify-between'>
            <div className='font-mynerve text-2xl font-semibold'>
              Add an item
            </div>
            <IconButtons
              EClicked={EClicked}
              setEClicked={setEClicked}
              ESClicked={ESClicked}
              setESClicked={setESClicked}
              graphClicked={graphClicked}
              setgraphClicked={setgraphClicked}
              fridgeContents={fridgeContents}
            />
          </div>
          <div className='flex flex-col w-3/5 gap-4'>
            {ESClicked && <ExpiringSoon fridgeContents={fridgeContents} />}
            {EClicked && <Expired fridgeContents={fridgeContents} />}
          </div>
          <div className='flex flex-col'>
            <InputFields email={user} setFridgeContents={setFridgeContents} />
            {graphClicked &&
              <>
                <CompositionGraph fridgeContents={fridgeContents} />
              </>
            }
            {isLoading && <LoadingSpinner />}
            <Contents email={user} isLoading={isLoading} setFridgeContents={setFridgeContents} fridgeContents={fridgeContents} />
          </div>
        </div>
      </div>
    </div>
  );
};