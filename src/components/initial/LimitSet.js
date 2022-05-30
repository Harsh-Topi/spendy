/*global chrome*/
import React, { useState } from "react";
import "../../styles/initial/DataCollection.css";

import { Input, FormControl } from "@chakra-ui/react";

const LimitSet = ({ jumpToMainPage }) => {
  // Hooks
  const [inputs, setInputs] = useState({});
  const [inputValidity, setInputValidity] = useState({});

  const chrome_data = {};
  chrome.storage.sync.get(null, (data) => {
    Object.assign(chrome_data, {
      user_info: data.user_info,
      limits: data.limits,
      transaction_info: data.transaction_info,
    });
  });

  // Event handlers
  const handleUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Handle submission
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(inputs);
    // validate input
    let inputChecks = {};
    inputChecks.dLimit =
      inputs.dLimit === "" ||
      (!Number.isNaN(inputs.dLimit) && inputs.dLimit > 0);
    inputChecks.wLimit =
      inputs.wLimit === "" ||
      (!Number.isNaN(inputs.wLimit) && inputs.wLimit > 0);
    inputChecks.mLimit =
      inputs.mLimit === "" ||
      (!Number.isNaN(inputs.mLimit) && inputs.mLimit > 0);
    inputChecks.submittedOnce = true;

    // Sync data if valid
    if (Object.values(inputChecks).every((x) => x === true)) {
      chrome_data.limits = {
        daily: inputs.dLimit,
        weekly: inputs.wLimit,
        monthly: inputs.mLimit,
      };
      chrome.storage.sync.set(chrome_data);
      jumpToMainPage();
    } else {
      setInputValidity(inputChecks);
    }
  };

  const updateDb = () => {
    
  };

  // Validation methods
  const limitCheck = (limitType) => {
    return inputValidity["submittedOnce"] && !inputValidity[limitType];
  };


  return (
    <div>
      <div className="mainContainer" style={{ padding: 0 }}>
        <div className="header" />
        <div className="mainSecondaryContainer">
          <div className="formContainer">
            <span className="title">Set some limits!</span>
            <span className="subTitle">You can also set limits later.</span>
            <div className="inputs">
              <FormControl isInvalid={limitCheck("dLimit")}>
                <Input
                  id="dLimit"
                  name="dLimit"
                  className="limitInput"
                  placeholder="Daily Limit"
                  size="md"
                  onChange={handleUpdate}
                  value={inputs.dLimit || ""}
                />
              </FormControl>
              <FormControl isInvalid={limitCheck("wLimit")}>
                <Input
                  id="wLimit"
                  name="wLimit"
                  className="limitInput"
                  placeholder="Weekly Limit"
                  size="md"
                  onChange={handleUpdate}
                  value={inputs.wLimit || ""}
                />
              </FormControl>
              <FormControl isInvalid={limitCheck("mLimit")}>
                <Input
                  id="mLimit"
                  name="mLimit"
                  className="limitInput"
                  placeholder="Monthly Limit"
                  size="md"
                  onChange={handleUpdate}
                  value={inputs.mLimit || ""}
                />
              </FormControl>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="button"
            id="next-btn"
          >
            Sign Up!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LimitSet;
