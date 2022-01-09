detectApps();

function detectApps() {
  // Checking if current page is potentially a shopify checkout page
  if (self.location.href.match(/.+\/[0-9]+\/[a-z]+\/[0-9a-z]+/i)) {
    detectShopify();
  }
}

function detectShopify() {
  headerTitle = document.getElementsByClassName("os-header__title")[0];
  if (headerTitle && headerTitle.textContent.toLowerCase().includes("thank")) {
    tryShopifyParse();
  }
}

function tryShopifyParse() {
  products = document.getElementsByClassName("product");
  if (products) {
    const chrome_data = {}
    chrome.storage.sync.get(null, (data) => {
      Object.assign(chrome_data, {
        user_info: data.user_info,
        limits: data.limits,
        transaction_info: data.transaction_info
      });

      let items = [];
      for (let i = 0; i < products.length; i++) {
        let item = getShopifyItem(products[i]);
        if (item == null) {
          return;
        }
        items.push(item);
      }
      uploadItems(chrome_data, items);
    });
  }
}

function getShopifyItem(product) {
  if (product == null) {
    return null;
  }

  try {
    var id = `${self.location.href.match(/.+\/[0-9]+\/[a-z]+\/([0-9a-z]+)/i)[1]}/${product.getAttribute("data-product-id")}`;
    var priceStr = product.getElementsByClassName("product__price")[0].textContent;
    var price = Number(priceStr.replace(/[^0-9.-]+/g,""));
    var quantity = product.getElementsByClassName("product-thumbnail__quantity")[0].textContent;
    var name = product.getElementsByClassName("product__description__name")[0].textContent;
    var image = product.getElementsByClassName("product-thumbnail__image")[0].src;
  } catch (error) {
    return null;
  }

  return {
    id: id,
    amount: price,
    quantity: quantity,
    item_desc: name,
    image_url: image,
    website: self.location.href
  };
}

function uploadItems(chrome_data, items) {
  if (items == null) {
    return;
  }

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (doesIdExist(chrome_data.transaction_info, item.id) === false) {
      const today = new Date();
      let monthYear = `${today.getMonth() + 1}/${today.getFullYear()}`;

      if (chrome_data.transaction_info[monthYear] == null) {
        chrome_data.transaction_info[monthYear] = {
          amount_spent: item.amount,
          days: {
            [today.getDate()]: [item]
          }
        };
      } else {
        chrome_data.transaction_info[monthYear]["amount_spent"] += item.amount;
        if (chrome_data.transaction_info[monthYear]["days"][today.getDate()] == null) {
          chrome_data.transaction_info[monthYear]["days"][today.getDate()] = [item];
        } else {
          chrome_data.transaction_info[monthYear]["days"][today.getDate()].push(item);
        }
      }
    }
  }
  chrome.storage.sync.set(chrome_data);
  notifyOverLimit(chrome_data.limits,
    getDayTotal(chrome_data.transaction_info),
    getWeekTotal(chrome_data.transaction_info),
    getMonthTotal(chrome_data.transaction_info));
}

function doesIdExist(transaction_info, id) {
  for (let propName in transaction_info) {
    let monthYear = transaction_info[propName]["days"];
    for (let day in monthYear) {
      for (let i = 0; i < monthYear[day].length; i++) {
        if (monthYear[day][i].id === id) {
          return true;
        }
      }
    }
  }
  return false;
}

function notifyOverLimit(limits, dTotal, mTotal, yTotal) {
  if (limits.daily === -1 || limits.weekly === -1 || limits.monthly === -1) {
    return;
  }

  if (limits.daily < dTotal || limits.weekly < mTotal || limits.monthly < yTotal) {
    let msg = {type: "basic", iconUrl: 'logo512.png', title: "Over Limit", message: "You have gone over one of your spending limits"}
    chrome.runtime.sendMessage({type: "notification", msg: msg}, function() {});
  }
}

const getDayTotal = (transaction_info) => {
  let today = new Date();
  dd = String(today.getDate());
  mm = String(today.getMonth() + 1);
  yyyy = today.getFullYear();
  let key = mm + '/' + yyyy;

  if (transaction_info[key] == undefined) {
    return 0;
  }

  let days = transaction_info[key].days;
  if (days[parseInt(dd)] == undefined) {
    return 0;
  }

  let total = 0;
  let items = days[parseInt(dd)];
  for (let item in items) {
    total += parseFloat(items[item].amount);
  }
  return parseInt(total.toFixed());
}

const getWeekTotal = (transaction_info) => {
  let day = new Date();
  let total = 0;
  for (let i = 0; i < 7; i++) {
    let dd = String(day.getDate());
    let mm = String(day.getMonth() + 1);
    let yyyy = day.getFullYear();
    total += getDayTotal(transaction_info);
    day.setDate(day.getDate() - 1);
  }
  return parseInt(total.toFixed());
}

const getMonthTotal = (transaction_info) => {
  let today = new Date();
  let mm = String(today.getMonth() + 1);
  let yyyy = today.getFullYear();
  let key = mm + '/' + yyyy;
  if (transaction_info[key] == undefined) {
    return 0;
  }
  return parseInt(transaction_info[key].amount_spent.toFixed());
}
