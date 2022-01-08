/*global chrome*/
import React, { Component } from 'react'
import LimitSet from './initial/LimitSet'
import WhoAreYou from './initial/WhoAreYou'
import HomeScreen from './initial/HomeScreen'
import MainPage from './info/MainPage'

export default class InfoGrab extends Component {

  state = {
    step: 1,
    firstName: '',
    email: '',
    dLimit: '',
    wLimit: '',
    mLimit: '',
  }

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
    console.log(this.state)
  }

  handleChange = input => event => {
    this.setState({ [input]: event.target.value })
  }

  render() {

    const chrome_data = {}
    chrome.storage.sync.get(null, (data) => {
      Object.assign(chrome_data, {
        user_info: data.user_info,
        limits: data.limits,
        transaction_info: data.transaction_info
      })
      if (chrome_data.user_info.first_name && chrome_data.limits.daily !== -1) {
        let new_state = this.state
        new_state.step = 4
        this.setState(new_state)
      }
    })

    const { step } = this.state;
    const { firstName, email, dLimit, wLimit, mLimit } = this.state;
    const values = { firstName, email, dLimit, wLimit, mLimit };

    switch (step) {
    case 1:
      return (
        <HomeScreen
          nextStep={this.nextStep}
        />
      )
    case 2:
      return (
        <WhoAreYou
          prevStep={this.prevStep}
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          values={values}
        />
      )
    case 3:
      return (
        <LimitSet
          prevStep={this.prevStep}
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          values={values}
        />
      )
    case 4:
      return (
        <MainPage />
      )
    default:
    }
  }
}
