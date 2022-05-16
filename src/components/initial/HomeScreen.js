import React from "react";
import "../../styles/initial/HomeScreen.css";

const HomeScreen = ({ nextStep }) => {
  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="mainContainer">
      <div className="mainImgContainer">
        <img className="mainImg" src="homepage-img.svg" />
      </div>
      <div className="titles">
        <span className="titleText">Spendy</span>
        <span className="subText">
          Easily track your online purchases and limit your spending!
        </span>
      </div>
      <button onClick={Continue} className="button" id="get-started-btn">
        Login
      </button>
    </div>
  );
};

export default HomeScreen;
