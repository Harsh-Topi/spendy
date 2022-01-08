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

chrome.storage.sync.get(null, (data) => {
    console.log(data)
})