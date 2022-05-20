import React from "react";
import "../../../styles/info/Summary.css";
import "../../../styles/info/Purchases.css";

import LimitBubble from "./LimitBubble";
import PurchaseListing from "../Purchases/PurchaseListing";
import SectionHeader from "./SectionHeader";
import AddItem from '../../modals/AddItem.js'


import shortNumber from "short-number";

const Summary = ({ spentValues, limitValues, chrome_data }) => {
  spentValues = spentValues.map((value) => {
    if (value >= 1000) {
      return shortNumber(parseInt(value));
    }
    return value;
  });

  limitValues = limitValues.map((value) => {
    if (value >= 1000) {
      return shortNumber(parseInt(value));
    }
    return value;
  });

  const limitEditIcon = 
  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.06 6L12 6.94L2.92 16H2V15.08L11.06 6ZM14.66 0C14.41 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3 17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0ZM11.06 3.19L0 14.25V18H3.75L14.81 6.94L11.06 3.19Z" fill="black" fill-opacity="0.75"/>
  </svg>

  const addPurchaseIcon = 
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="black" fill-opacity="0.75"/>
  </svg>

const showModal = () => {
  let modal = document.getElementById("spendingModal");
  modal.style.display = "flex";
};

const closeModal = () => {
  let modal = document.getElementById("spendingModal");
  modal.style.display = "none";
};

const saveModal = (e) => {
  e.preventDefault();

  // let modal = document.getElementById("spendingModal");
  // let dayLimit = parseInt(document.getElementById("dayLimit").value);
  // let weekLimit = parseInt(document.getElementById("weekLimit").value);
  // let monthLimit = parseInt(document.getElementById("monthLimit").value);

  // chrome_data.limits = {
  //   daily: dayLimit,
  //   weekly: weekLimit,
  //   monthly: monthLimit
  // };
  // chrome.storage.sync.set(chrome_data);

  // // set limits in the parent component
  // setLimits([dayLimit, weekLimit, monthLimit]);

  // modal.style.display = "none";
};
  

  return (
    <div style={{padding: '0 20px 25px 20px'}}>
      <SectionHeader text="Your Spending" buttonIcon={limitEditIcon} buttonAction={() => showModal()} />
      <div className="limitsContainer">
        <LimitBubble color="#1BC8FF" spent={spentValues[0]} limit={limitValues[0]} interval="Day" />
        <LimitBubble color="#06D6A0" spent={spentValues[1]} limit={limitValues[1]} interval="Week" />
        <LimitBubble color="#FF8787" spent={spentValues[2]} limit={limitValues[2]} interval="Month" />
      </div>
      <SectionHeader style={{marginTop:'15px'}} text="Purchases" buttonIcon={addPurchaseIcon} buttonAction={() => console.log('input')} />
      <div className="purchasesContainer">
        <PurchaseListing />
      </div>

      <AddItem closeModal={closeModal} saveModal={saveModal} />
    </div>
  );
};

export default Summary;
