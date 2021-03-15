

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

    chrome.tabs.executeScript(tab.id, {
        code: `(${findElement})(${JSON.stringify(info)})`,
        frameId: info.frameId,
        matchAboutBlank: true,
        runAt: 'document_start',
    }, ([result] = []) => {
        if (chrome.runtime.lastError) {
            console.error('Error: ' + chrome.runtime.lastError.message);
        } else {
            console.log('Alt:', result);
        }
    });
});

function findElement({mediaType, srcUrl}) {
    const tagName = mediaType === 'image' ? 'img' : mediaType;
    console.log("clicked on " + mediaType + "|" + srcUrl)
    for (const el of document.querySelectorAll(tagName)) {
      if (el.src === srcUrl) {
          el.remove();
        return "deleted";
      }
    }
  }