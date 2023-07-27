// This component will render items between 0 and 5 days from expiration.

import React, { Component, useState } from "react";
import moment from "moment";

export default function ExpiringSoon( {fridgeContents} ) {
  return (
    <div>
      <h1 className="font-mynerve text-lg">Expiring within 5 days:</h1>
      <ul className="font-mynerve bg-white border border-black rounded-md p-2 shadow-md text-orange-700">
        {fridgeContents.map((element, index) => {
          if (moment(element.exp_date).isBetween(moment(), moment().add(5, "d"))) {
            return <li key={index}>Item: {element.name} ... Expiration Date: {element.exp_date}</li>
          }
        })}
      </ul>
    </div>);
}
