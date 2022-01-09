/*global chrome*/
import React from 'react'
import '../../../styles/info/Summary.css'

const PurchaseListing = () => {

  const [transaction_info, setTransactionInfo] = React.useState([])

  React.useEffect(() => {
    const chrome_data = {}
    chrome.storage.sync.get(null, (data) => {
      Object.assign(chrome_data, {
        user_info: data.user_info,
        limits: data.limits,
        transaction_info: data.transaction_info
      });
      setTransactionInfo(chrome_data.transaction_info)
    });
  }, []);

  let purchaseHistory = [];
  for (const month in transaction_info) {
    let data = transaction_info[month]
    let days = data['days'];
    for (const day in days) {
      let dayTotal = 0;
      let theDay = days[day]
      let purchases = [];
      for (const purchase in theDay) {
        let thePurchase = theDay[purchase]
        dayTotal += thePurchase['amount']
        purchases.push(
          <div className="transactionListing">
            <div className="transactionImg">
              <img style={{ width: "57px", height: "57px", borderRadius: "5px" }} src={thePurchase['image_url']} />
            </div>
            <div className="transactionTitle">
              {thePurchase['item_desc']}
            </div>
            <div className="transactionAmount">
                ${thePurchase['amount']}
            </div>
          </div>
        )
      }

      let header =
                <div className="dayHeader">
                  <span className="dateText">{day.concat("/" + month)}</span>
                  <span className="amountText">${Math.round(dayTotal * 100) / 100}</span>
                </div>

      purchaseHistory.push(header)

      let transactionList =
                <div className="transactionContainer">
                  {purchases.map(item => {
                    return item
                  })}
                </div>

      purchaseHistory.push(transactionList)
    }
  }

  return (
    <div>
      {
        purchaseHistory.map(item => {
          return item;
        })
      }
    </div>
  )
}

export default PurchaseListing
