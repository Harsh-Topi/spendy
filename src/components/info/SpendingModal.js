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
              <input type="text" value={amountSpent[0]} disabled/>
            </div>
            <div className="limitEntry">
              <text>Week:</text>
              <input type="text" value={amountSpent[1]} disabled/>
            </div>
            <div className="limitEntry">
              <text>Month:</text>
              <input type="text" value={amountSpent[2]} disabled/>
            </div>
          </div>
        </div>
        <h2>Current Limits:</h2>
        <div className="limitContainer">
          <form onSubmit={saveModal}>
            <div className="limitEntry">
              <text>Day:</text>
              <input id="dayLimit" defaultValue={limits[0]} required="true" type="number" min="0"/>
            </div>
            <div className="limitEntry">
              <text>Week:</text>
              <input id="weekLimit" defaultValue={limits[1]} required="true" type="number" min="0"/>
            </div>
            <div className="limitEntry">
              <text>Month:</text>
              <input id="monthLimit" defaultValue={limits[2]} required="true" type="number" min="0"/>
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
  );
};

export default SpendingModal;
