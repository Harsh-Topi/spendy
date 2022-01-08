import React from 'react'
import '../../styles/initial/DataCollection.css'


const LimitSet = ({ prevStep, nextStep, handleChange, values }) => {

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }


    const Continue = e => {
        e.preventDefault();
        nextStep();
    }

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
                        <label for="dLimit" className="inputLabel">
                            Daily Limit
                        </label>
                        <input className="input" type="text" id="dLimit" name="dLimit" />
                        <label for="wLimit" className="inputLabel">
                            Weekly Limit
                        </label>
                        <input className="input" type="text" id="wLimit" name="wLimit" />
                        <label for="mLimit" className="inputLabel">
                            Monthly Limit
                        </label>
                        <input className="input" type="text" id="mLimit" name="mLimit" />
                    </div>
                    <div className="buttonContainer">
                        <button onClick={Continue} className="button">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LimitSet
