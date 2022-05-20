import React, { useState } from "react";
// import "../"

import { Input, Button, InputGroup, FormControl } from "@chakra-ui/react";

const closeIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
      fill="black"
      fill-opacity="0.75"
    />
  </svg>
);

const AddItem = ({ closeModal, saveModal }) => {
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

    // // validate input
    // let inputChecks = {};
    // inputChecks.firstName =
    //   inputs.firstName && inputs.firstName !== "" ? true : false;
    // inputChecks.lastName =
    //   inputs.lastName && inputs.lastName !== "" ? true : false;
    // inputChecks.email =
    //   inputs.email && validateEmail(inputs.email) ? true : false;

    // // Sync data if valid
    // if (Object.values(inputChecks).every((x) => x === true)) {
    //   chrome_data.user_info = {
    //     first_name: inputs.firstName,
    //     last_name: inputs.lastName,
    //     email: inputs.email,
    //   };
    //   chrome.storage.sync.set(chrome_data);
    //   nextStep();
    // } else {
    //   setInputValidity(inputChecks);
    // }
  };

  return (
    <div id="spendingModal" className="modal">
      <div className="modalContent">
        <div className="modalHeader">
          <span className="modalTitle">Set your limits</span>
          {/* <span className="close" onClick={closeModal}>&times;</span> */}
          <button onClick={closeModal} className="modalHeaderCloseButton">
            {closeIcon}
          </button>
        </div>

        <div
          className="mainSecondaryContainer"
          style={{ padding: 0, width: "100%" }}
        >
          <div className="limitContainer">
            <FormControl>
              <Input
                id="dLimit"
                name="dLimit"
                className="dLimitInput"
                placeholder="Daily"
                size="md"
                onChange={handleUpdate}
                value={inputs.dLimit || ""}
              />
            </FormControl>
            <FormControl>
              <Input
                id="wLimit"
                name="wLimit"
                className="wLimitInput"
                placeholder="Weekly"
                size="md"
                onChange={handleUpdate}
                value={inputs.wLimit || ""}
              />
            </FormControl>
            <FormControl>
              <Input
                id="mLimit"
                name="mLimit"
                className="mLimitInput"
                placeholder="Monthly"
                size="md"
                onChange={handleUpdate}
                value={inputs.mLimit || ""}
              />
            </FormControl>
          </div>

          <button
            type="submit"
            onClick={() => console.log("test")}
            className="button"
            id="next-btn"
          >
            Save Limits
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
