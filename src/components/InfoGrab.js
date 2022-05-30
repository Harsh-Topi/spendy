/*global chrome*/
import React, { Component } from "react";
import LimitSet from "./initial/LimitSet";
import WhoAreYou from "./initial/WhoAreYou";
import HomeScreen from "./initial/HomeScreen";
import MainPage from "./info/MainPage";

import axios from "axios";

import { getUserTokens } from "../helpers/chromeAPI";

export default class InfoGrab extends Component {
  state = {
    step: 1,
    firstName: "",
    email: "",
    dLimit: 500,
    wLimit: 1000,
    mLimit: 5000,
    isUserRegistered: false,
  };

  componentDidMount = async () => {
    
    let new_state = this.state;

    chrome.runtime.onMessage.addListener(
      async (request) => {
        if (request.type === "Authenticated") {
          const tokens = await getUserTokens();
          let config = {
            headers: {
              Authorization : tokens.id_token
            }
          };
          axios.get('https://bjphjklrrf.execute-api.us-east-1.amazonaws.com/spendyProd/user/userinfo', config).then(
            userData => {
              new_state.step = userData.data.is_new_user ? 3 : 4;
              this.setState(new_state);
            }
          )
        }
      }
    );
  };

  jumpToMainPage = () => {
    const { step } = this.state;
    this.setState({ step: step + 1});
  };

  render() {
    if (!this.state.isUserRegistered) {
      const { step } = this.state;
      
      switch (step) {
        case 1:
          return <HomeScreen />;
        case 3:
          return <LimitSet jumpToMainPage={this.jumpToMainPage} />;
        case 4:
          return <MainPage />;
        default:
      }
    }
    return <MainPage />;
  }
}
