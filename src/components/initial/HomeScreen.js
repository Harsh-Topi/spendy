/*global chrome*/
import React, { useEffect, useState } from "react";
import "../../styles/initial/HomeScreen.css";

const HomeScreen = () => {

  const Continue = (e) => {
    e.preventDefault();

    const loginUrl = "https://spendy.auth.us-east-1.amazoncognito.com/login?client_id=7kg4eadk5h7d95olqqptld8clu&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://harshtopi.com/spendy/callback";
    chrome.windows.create({url: loginUrl, type: 'popup', focused : true, width : 500, height : 500});
    
    // TO DO : authenticate token first, then jump to main page    
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
