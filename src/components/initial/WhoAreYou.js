/*global chrome*/
import React, { useState } from "react";
import { validateEmail } from "../../helpers/emailHelpers";
import "../../styles/initial/DataCollection.css";

import {
  Input,
  InputRightElement,
  Button,
  InputGroup,
  FormControl,
} from "@chakra-ui/react";

const WhoAreYou = ({ prevStep, nextStep }) => {
  // Hooks
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({});
  const [inputValidity, setInputValidity] = useState({});

  // Event handlers
  const handleUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Password hide and show
  const handleClick = () => setShow(!show);

  // Handle submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // validate input
    let inputChecks = {};
    inputChecks.firstName =
      inputs.firstName && inputs.firstName !== "" ? true : false;
    inputChecks.lastName =
      inputs.lastName && inputs.lastName !== "" ? true : false;
    inputChecks.email =
      inputs.email && validateEmail(inputs.email) ? true : false;
    inputChecks.password =
      inputs.password && inputs.password.length > 6 ? true : false;
    inputChecks.submittedOnce = true;

    // Sync data if valid
    if (Object.values(inputChecks).every((x) => x === true)) {
      chrome_data.user_info = {
        first_name: inputs.firstName,
        last_name: inputs.lastName,
        email: inputs.email,
      };
      chrome.storage.sync.set(chrome_data);
      nextStep();
    } else {
      setInputValidity(inputChecks);
    }
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  // Validation methods
  const nameCheck = (inputValue) =>
    inputValidity["submittedOnce"] && !inputValidity[inputValue];
  const emailCheck = () =>
    inputValidity["submittedOnce"] && !validateEmail(inputs["email"]);
  const passwordCheck = () =>
    inputValidity["submittedOnce"] && !inputValidity["password"];

  const chrome_data = {};
  chrome.storage.sync.get(null, (data) => {
    Object.assign(chrome_data, {
      user_info: data.user_info,
      limits: data.limits,
      transaction_info: data.transaction_info,
    });
  });

  return (
    <div className="mainContainer" style={{ padding: 0 }}>
      <div className="header">
        <button onClick={Previous} className="headerBackButton">
          &lt;
        </button>
      </div>
      <div className="mainSecondaryContainer">
        <div className="formContainer">
          <span className="title">Who are you?</span>
          <span className="subTitle">I'm Spendy! Nice to meet you.</span>
          <div className="inputs">
            <FormControl isInvalid={nameCheck("firstName")}>
              <Input
                id="firstName"
                name="firstName"
                className="firstNameInput"
                placeholder="First Name"
                size="md"
                onChange={handleUpdate}
                value={inputs.firstName || ""}
              />
            </FormControl>
            <FormControl isInvalid={nameCheck("lastName")}>
              <Input
                id="lastName"
                name="lastName"
                className="lastNameInput"
                placeholder="Last Name"
                size="md"
                onChange={handleUpdate}
                value={inputs.lastName || ""}
              />
            </FormControl>
            <FormControl isInvalid={emailCheck()}>
              <Input
                id="email"
                name="email"
                className="emailInput"
                placeholder="Email"
                size="md"
                onChange={handleUpdate}
                value={inputs.email || ""}
              />
            </FormControl>
            <span className="emailSubText">
              Just for login and password resets.
            </span>
            <InputGroup size="md">
              <FormControl isInvalid={passwordCheck()}>
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  name="password"
                  className="passwordInput"
                  placeholder="Password"
                  size="md"
                  onChange={handleUpdate}
                  value={inputs.password || ""}
                />
              </FormControl>
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="button"
          id="next-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WhoAreYou;
