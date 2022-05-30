chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.sync.set({
    user_info: {
      first_name: '',
      email: '',
    },
    limits: {
      daily: -1,
      weekly: -1,
      monthly: -1
    },
    transaction_info: {},
    tokens: {
      access_token: '',
      id_token: '',
    }
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type === "notification") {
      chrome.notifications.clear("limit", () => {
        chrome.notifications.create("notify", request.msg, function() {});
      });
    }
    sendResponse();
  }
);


// login and sign up flow
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    const callbackLink = sender.url;    
    const id_token = callbackLink.substring(
      callbackLink.indexOf('=') + 1,
      callbackLink.indexOf('&')
    );

    const access_token = callbackLink.substring(
      callbackLink.indexOf('=', callbackLink.indexOf('&')) + 1,
      callbackLink.indexOf('&', callbackLink.indexOf('=', callbackLink.indexOf('&')) + 1)
    );
    
    chrome.storage.sync.set({
      tokens: {
        access_token: access_token,
        id_token: id_token,
      }
    });

    chrome.windows.remove(sender.tab.windowId);
    chrome.runtime.sendMessage({type: 'Authenticated'});
  }
);
