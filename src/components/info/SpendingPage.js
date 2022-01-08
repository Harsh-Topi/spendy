import React from 'react';
import { useState } from 'react';
import '../../styles/info/SpendingPage.css';
import SpendingChart from './SpendingChart';

const limits = {
  "day": 50,
  "week": 250,
  "month": 5123
}
const amountSpent = {
  "day": 2,
  "week": 200,
  "month": 700
}

const SpendingPage = () => {
  // defaulting selection to upon rendering
  const [limit, setLimit] = useState(limits["day"]);
  const [spent, setSpent] = useState(amountSpent["day"]);
  const [option, setOption] = useState("Day");

  const buttonClick = (type) => {
    // setting state to current selected button
    setLimit(limits[type]);
    setSpent(amountSpent[type]);
    setOption(type.charAt(0).toUpperCase() + type.slice(1));
  }

  return (
    <div className="spendingContainer">
      <div className="optionContainer">
        <div className="dayContainer">
          <button onClick={() => buttonClick("day")} className="spendButton">Day</button>
        </div>
        <div className="weekContainer">
          <button onClick={() => buttonClick("week")} className="spendButton">Week</button>
        </div>
        <div className="monthContainer"> 
          <button onClick={() => buttonClick("month")} className="spendButton">Month</button>
        </div>
      </div>

      <div className="chartContainer">
        <SpendingChart limit={limit} amountSpent={spent} option={option} />
      </div>
    </div>
  )
}

export default SpendingPage;