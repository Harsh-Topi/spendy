/*global chrome*/
import React from 'react';
import { useState } from 'react';
import '../../styles/info/SpendingPage.css';
import SpendingChart from './SpendingChart';
import SpendingModal from './SpendingModal';

const chrome_data = {}
chrome.storage.sync.get(null, (data) => {
  Object.assign(chrome_data, {
    user_info: data.user_info,
    limits: data.limits,
    transaction_info: data.transaction_info
  });
});

const SpendingPage = ({limits, setLimits, amountSpent}) => {
  // defaulting selection to upon rendering
  const [index, setIndex] = useState(0)
  const [option, setOption] = useState("Day");

  const chartButtonClick = (type, i) => {
    // setting state to current selected button
    setIndex(i);
    setOption(type.charAt(0).toUpperCase() + type.slice(1));
  }

  const showModal = () => {
    let modal = document.getElementById("spendingModal");
    modal.style.display = "block";
  }

  const closeModal = () => {
    let modal = document.getElementById("spendingModal");
    modal.style.display = "none";
  }

  const saveModal = (e) => {
    e.preventDefault();

    let modal = document.getElementById("spendingModal");
    let dayLimit = parseInt(document.getElementById("dayLimit").value);
    let weekLimit = parseInt(document.getElementById("weekLimit").value);
    let monthLimit = parseInt(document.getElementById("monthLimit").value);

    chrome_data.limits = {
      daily: dayLimit,
      weekly: weekLimit,
      monthly: monthLimit
    }
    chrome.storage.sync.set(chrome_data)

    // set limits in the parent component
    setLimits([dayLimit, weekLimit, monthLimit]);

    modal.style.display = "none";
  }

  return (
    <div className="spendingContainer">
      <div className="optionContainer">
        <div className="dayContainer">
          <button onClick={() => chartButtonClick("day", 0)} className="spendButton">
            Day
          </button>
        </div>
        <div className="weekContainer">
          <button onClick={() => chartButtonClick("week", 1)} className="spendButton">
            Week
          </button>
        </div>
        <div className="monthContainer">
          <button onClick={() => chartButtonClick("month", 2)} className="spendButton">
            Month
          </button>
        </div>
      </div>

      <div className="chartContainer">
        <SpendingChart limit={limits[index]} amountSpent={amountSpent[index]} option={option} />
      </div>

      <div className="detailsContainer">
        <button className="moreDetails" onClick={showModal}>
          Change Limits
        </button>
      </div>

      <SpendingModal limits={limits} amountSpent={amountSpent} saveModal={saveModal} closeModal={closeModal} />

    </div>
  )
}

export default SpendingPage;
