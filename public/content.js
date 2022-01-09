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
