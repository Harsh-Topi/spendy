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
    transaction_info: {}
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
