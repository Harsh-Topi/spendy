/*global chrome*/
import React from 'react'
import '../../styles/initial/DataCollection.css'

const WhoAreYou = ({ prevStep, nextStep, handleChange, values }) => {
  
  const chrome_data = {}
  chrome.storage.sync.get(null, (data) => {
    Object.assign(chrome_data, {
      user_info: data.user_info,
      limits: data.limits,
      transaction_info: data.transaction_info
    })
  })

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  const Continue = e => {
    e.preventDefault();
    let firstName = document.getElementById('firstName').value
    let email = document.getElementById('email').value
    let confirm_email = document.getElementById('confirmEmail').value
    if (confirm_email === email && email !== '' && firstName !== '') {
      chrome_data.user_info = {
        first_name: firstName,
        email: email
      }
      chrome.storage.sync.set(chrome_data)
      nextStep();
    } else {
      // TODO: notify user
    }
  }

  return (
    <div className="mainContainer">
      <div className="header">
        <button onClick={Previous} className="headerBackButton">
          &lt; Back
        </button>
      </div>
      <div className="formContainer">
        <span className="title">Who are you?</span>
        <div className="inputs">
          <label forHtml="fname" className="inputLabel">
            First Name
          </label>
          <input defaultValue={values.firstName} onChange={handleChange('firstName')} className="input" type="text" id="firstName" name="firstName" />
          <label forHtml="email" className="inputLabel">
            Email
          </label>
          <input defaultValue={values.email} onChange={handleChange('email')} className="input" type="text" id="email" name="email" />
          <label forHtml="confirmEmail" className="inputLabel">
            Confirm Email
          </label>
          <input className="input" type="text" id="confirmEmail" name="confirmEmail" />
        </div>
        <div className="buttonContainer">
          <button onClick={Continue} className="button" id='next-btn'>Next</button>
        </div>
      </div>
    </div>
  )
}

export default WhoAreYou