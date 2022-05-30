/*global chrome*/

export const getUserTokens = async () => {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(null, (data) => {
        console.log(data.tokens);
        resolve(data.tokens);
      });
    } catch (ex) {
      reject(ex);
    }
  });
};
