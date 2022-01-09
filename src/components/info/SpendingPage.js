/*global chrome*/
import React from 'react';
import { useState } from 'react';
import '../../styles/info/SpendingPage.css';
import SpendingChart from './SpendingChart';
import SpendingModal from './SpendingModal';

const chrome_data = {};
chrome.storage.sync.get(null, (data) => {
  Object.assign(chrome_data, {
    user_info: data.user_info,
    limits: data.limits,
    transaction_info: data.transaction_info
  });
});

const limits = {
  "day": 50,
  "week": 250,
  "month": 500
};
const amountSpent = {
  "day": 2,
  "week": 200,
  "month": 400
};

const SpendingPage = () => {
  // defaulting selection to upon rendering
  const [limit, setLimit] = useState(limits["day"]);
  const [spent, setSpent] = useState(amountSpent["day"]);
  const [option, setOption] = useState("Day");

  const chartButtonClick = (type) => {
    // setting state to current selected button
    setLimit(limits[type]);
    setSpent(amountSpent[type]);
    setOption(type.charAt(0).toUpperCase() + type.slice(1));
  };

  const showModal = () => {
    let modal = document.getElementById("spendingModal");
    modal.style.display = "block";
  };

  const closeModal = () => {
    let modal = document.getElementById("spendingModal");
    modal.style.display = "none";
  };

  const saveModal = (e) => {
    e.preventDefault();

    let modal = document.getElementById("spendingModal");
    let dayLimit = document.getElementById("dayLimit").value;
    let weekLimit = document.getElementById("weekLimit").value;
    let monthLimit = document.getElementById("monthLimit").value;

    limits["day"] = parseInt(dayLimit);
    limits["week"] = parseInt(weekLimit);
    limits["month"] = parseInt(monthLimit);

    chrome_data.limits = {
      daily: limits["day"],
      weekly: limits["week"],
      monthly: limits["month"]
    };
    chrome.storage.sync.set(chrome_data);

    // set limit to previously shown screen
    setLimit(limits[option.toLowerCase()]);
    setSpent(amountSpent[option.toLowerCase()]);

    modal.style.display = "none";
  };

  return (
    <div className="spendingContainer">
      <div className="optionContainer">
        <div className="dayContainer">
          <button onClick={() => chartButtonClick("day")} className="spendButton">
            Day
          </button>
        </div>
        <div className="weekContainer">
          <button onClick={() => chartButtonClick("week")} className="spendButton">
            Week
          </button>
        </div>
        <div className="monthContainer">
          <button onClick={() => chartButtonClick("month")} className="spendButton">
            Month
          </button>
        </div>
      </div>

      <div className="chartContainer">
        <SpendingChart limit={limit} amountSpent={spent} option={option} />
      </div>

      <div className="detailsContainer">
        <button className="moreDetails" onClick={showModal}>
          more details & change limits
        </button>
      </div>

      <SpendingModal limits={limits} amountSpent={amountSpent} saveModal={saveModal} closeModal={closeModal} />

    </div>
  );
};

export default SpendingPage;
