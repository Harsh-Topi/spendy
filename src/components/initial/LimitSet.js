/*global chrome*/
import React from 'react';
import '../../styles/initial/DataCollection.css';

const LimitSet = ({ prevStep, nextStep, handleChange, values }) => {

  const chrome_data = {};
  chrome.storage.sync.get(null, (data) => {
    Object.assign(chrome_data, {
      user_info: data.user_info,
      limits: data.limits,
      transaction_info: data.transaction_info
    });
  });

  const Previous = e => {
    e.preventDefault();
    prevStep();
  };

  const Continue = e => {
    e.preventDefault();
    let d_limit = parseInt(document.getElementById('dLimit').value);
    let w_limit = parseInt(document.getElementById('wLimit').value);
    let m_limit = parseInt(document.getElementById('mLimit').value);
    if (d_limit !== '' && w_limit !== '' && m_limit !== '') {
      chrome_data.limits = {
        daily: d_limit,
        weekly: w_limit,
        monthly: m_limit
      };
      chrome.storage.sync.set(chrome_data);
      nextStep();
    } else {
      // TODO: notify user
    }
  };

  return (
    <div>
      <div className="mainContainer">
        <div className="header">
          <button onClick={Previous} className="headerBackButton">
            &lt; Back
          </button>
        </div>
        <div className="formContainer">
          <span className="title">Set some limits.</span>
          <div className="inputs">
            <label htmlFor="dLimit" className="inputLabel">
              Daily Limit
            </label>
            <input defaultValue={values.dLimit} onChange={handleChange('dLimit')} className="input" type="number" min="0" id="dLimit" name="dLimit" />
            <label htmlFor="wLimit" className="inputLabel">
              Weekly Limit
            </label>
            <input defaultValue={values.wLimit} onChange={handleChange('wLimit')} className="input" type="number" min="0" id="wLimit" name="wLimit" />
            <label htmlFor="mLimit" className="inputLabel">
              Monthly Limit
            </label>
            <input defaultValue={values.mLimit} onChange={handleChange('mLimit')} className="input" type="number" min="0" id="mLimit" name="mLimit" />
          </div>
          <div className="nextContainer">
            <button onClick={Continue} className="button" id='next-btn'>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitSet;
