import React from 'react';
import { useState } from 'react';
import '../../styles/info/SpendingPage.css';
import SpendingChart from './SpendingChart';

const limits = {
  "day": 50,
  "week": 250,
  "month": 500
}
const amountSpent = {
  "day": 20,
  "week": 200,
  "month": 500
}

const SpendingPage = () => {
  const [limit, setLimit] = useState(0);
  const [spent, setSpent] = useState(0);
  const [option, setOption] = useState("");

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