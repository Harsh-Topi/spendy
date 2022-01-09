import React from 'react'
import '../../../styles/info/Summary.css'
import '../../../styles/info/Purchases.css'

import LimitBubble from './LimitBubble'
import PurchaseListing from '../Purchases/PurchaseListing'

import shortNumber from 'short-number'

const Summary = ({ spentValues, limitValues }) => {

  spentValues = spentValues.map(value => {
    if (value >= 1000) {
      return shortNumber(value);
    }
    return value
  })

  limitValues = limitValues.map(value => {
    if (value >= 1000) {
      return shortNumber(value);
    }
    return value
  })

  return (
    <div className="bubbleContainer">
      <div className="limitsContainer">
        <LimitBubble color="#1F65A6" spent={spentValues[0]} limit={limitValues[0]} interval="Day" />
        <LimitBubble color="#328FF8" spent={spentValues[1]} limit={limitValues[1]} interval="Week" />
        <LimitBubble color="#76C3FC" spent={spentValues[2]} limit={limitValues[2]} interval="Month" />
      </div>
      <div className="purchasesContainer">
        {/* @Nigel send transaction data object to this component, remove test component */}
        <PurchaseListing />
      </div>
    </div>
  )
}

export default Summary
