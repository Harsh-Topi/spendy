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
    dailyLimit: '',
    weeklyLimit: '',
    monthlyLimit: '',
  }

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  }

  handleChange = input => event => {
    this.setState({ [input]: event.target.value })
  }

  render() {
    const { step } = this.state;
    const { firstName, email, dailyLimit, weeklyLimit, monthlyLimit } = this.state;
    const values = { firstName, email, dailyLimit, weeklyLimit, monthlyLimit };

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
