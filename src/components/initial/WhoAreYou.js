import React from 'react'
import '../../styles/initial/DataCollection.css'


const WhoAreYou = ({ prevStep, nextStep, handleChange, values }) => {

  const Continue = e => {
    e.preventDefault();
    nextStep();
  }

  const Previous = e => {
    e.preventDefault();
    prevStep();
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
          <label htmlFor="fname" className="inputLabel">
                        First Name
          </label>
          <input className="input" type="text" id="email" name="email" />
          <label htmlFor="email" className="inputLabel">
                        Email
          </label>
          <input className="input" type="text" id="fname" name="fname" />
          <label htmlFor="confirmEmail" className="inputLabel">
                        Confirm Email
          </label>
          <input className="input" type="text" id="confirmEmail" name="confirmEmail" />
        </div>
        <div className="buttonContainer">
          <button onClick={Continue} className="button">Next</button>
        </div>
      </div>
    </div>
  )
}

export default WhoAreYou
