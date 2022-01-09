import React from 'react';
import '../../../styles/info/Summary.css';

const PurchaseListing = () => {

  // test object
  let testObject = {
    "1/2022": {
      amount_spent: 33.33,
      days: {
        1: [
          {
            id: 1,
            amount: 33.99,
            timestamp: 24,
            item_desc: "Big Blue pants with pockets and stuff adjakldjakldjakldjalkadada",
            image_url: "https://picsum.photos/seed/picsum/200/300",
            website: "adadadaa"
          },
          {
            id: 2,
            amount: 33.99,
            timestamp: 24,
            item_desc: "Big Blue pants with pockets and stuff adjakldjakldjakldjalkadada",
            image_url: "https://picsum.photos/seed/picsum/200/300",
            website: "adadadaa"
          },
          {
            id: 2,
            amount: 33.99,
            timestamp: 24,
            item_desc: "Big Blue pants with pockets and stuff adjakldjakldjakldjalkadada",
            image_url: "https://picsum.photos/seed/picsum/200/300",
            website: "adadadaa"
          }
        ],
        2: [
          {
            id: 4,
            amount: 33.99,
            timestamp: 24,
            item_desc: "Big Blue pants with pockets and stuff adjakldjakldjakldjalkadada",
            image_url: "https://picsum.photos/seed/picsum/200/300",
            website: "adadadaa"
          },
        ]
      }
    }
  };

  let purchaseHistory = [];
  for (const month in testObject) {
    let test = testObject[month];
    let days = test['days'];
    for (const day in days) {
      let dayTotal = 0;
      let theDay = days[day];
      let purchases = [];
      for (const purchase in theDay) {
        let thePurchase = theDay[purchase];
        dayTotal += thePurchase['amount'];
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
        );
      }

      let header =
                <div className="dayHeader">
                  <span className="dateText">{day.concat("/" + month)}</span>
                  <span className="amountText">${Math.round(dayTotal * 100) / 100}</span>
                </div>;

      purchaseHistory.push(header);

      let transactionList =
                <div className="transactionContainer">
                  {purchases.map(item => {
                    return item;
                  })}
                </div>;

      purchaseHistory.push(transactionList);
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
  );
};

export default PurchaseListing;
