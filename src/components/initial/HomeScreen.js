import React from 'react';
import '../../styles/initial/HomeScreen.css';

const HomeScreen = ({ nextStep }) => {

  const Continue = e => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="mainContainer">
      <div className="mainImgContainer">
        <img className="mainImg" src="homepage-img.svg" />
      </div>
      <div className="logoContainer">
        <img style={{width:"200px"}}src="white-logo.svg" />
      </div>
      <span className="subText">
                Easily track your online spending.
      </span>
      <div className="buttonContainer">
        <button onClick={Continue} className="button" id='get-started-btn'>Get Started</button>
      </div>
    </div>
  );
};

export default HomeScreen;
