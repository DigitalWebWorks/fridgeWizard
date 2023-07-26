//This component renders a radar graph showing the relative composition of the fridge contents by catagory.

import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function CompositionGraph({ fridgeContents }) {
  const shelfLife = require("../../server/shelflife.json");
  const data = {
    labels: ["Dairy", "Meat", "Produce", "Condiments", "Drinks"],
    datasets: [
      {
        label: "Fridge Composition",
        data: [1, 1, 1, 1, 1],
        backgroundColor: "rgba(132, 99, 255, 0.2)",
        borderColor: "rgba(132, 99, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const catagoryDataIndicies = {
    "dairy & dairy substitutes": 0,
    "meat, seafood & poultry": 1,
    "produce": 2,
    "condiments": 3,
    "drinks": 4,
  };

  fridgeContents.forEach((el) => {
    shelfLife.forEach(element =>{
        if (el.type === element.item) data.datasets[0].data[catagoryDataIndicies[element.category]]++;
    })  
  });

  return (
   
      <div className="flex flex-col items-center justify-center max-h-[650px] bg-white">
       
          <Radar data={data} />
        
      </div>
   
  )
}

export default CompositionGraph;
