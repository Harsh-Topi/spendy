import React from 'react';

const SpendingModal = ({limits, amountSpent, closeModal, saveModal}) => {
  return (
    <div id="spendingModal" className="modal">
      <div className="modalContent">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Current Amounts:</h2>
        <div className="amountContainer">
          <div className="limitContainer">
            <div className="limitEntry">
              <text>Day:</text>
              <input type="text" value={amountSpent["day"]} />
            </div>
            <div className="limitEntry">
              <text>Week:</text>
              <input type="text" value={amountSpent["week"]} />
            </div>
            <div className="limitEntry">
              <text>Month:</text>
              <input type="text" value={amountSpent["month"]} />
            </div>
          </div>
        </div>
        <h2>Current Limits:</h2>
        <div className="limitContainer">
          <form onSubmit={saveModal}>
            <div className="limitEntry">
              <text>Day:</text>
              <input id="dayLimit" defaultValue={limits["day"]} required="true" type="number"/>
            </div>
            <div className="limitEntry">
              <text>Week:</text>
              <input id="weekLimit" defaultValue={limits["week"]} required="true" type="number"/>
            </div>
            <div className="limitEntry">
              <text>Month:</text>
              <input id="monthLimit" defaultValue={limits["month"]} required="true" type="number"/>
            </div>
            <div className="limitSave">
              <button>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SpendingModal;
