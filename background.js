chrome.runtime.onInstalled.addListener(() =>{

    chrome.contextMenus.create({
        "id": "delete",
        "title": "XiaZai-Bao: Delete selected element",
        "type": 'normal',
        "contexts": ['all']
    });

});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log("clicked...info: " + JSON.stringify(info));
    console.log("clicked...tab:  " + JSON.stringify(tab));

    chrome.tabs.sendMessage(tab.id, info);

});
