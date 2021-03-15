

const findLinks = () => {

    const defaultConfig = {
        "startWith" : ["thunder", "ed2k"],
        "endWith": ["mp4"]
    };

    const links = document.links;
    var extractedLinks = "";

    let herfConfig = defaultConfig;

    chrome.storage.sync.get(['hrefConfig'], (config) => {
        if (config.hrefConfig) {
            herfConfig = config.hrefConfig;
            console.log("Loading config: " + JSON.stringify(herfConfig));
        } else {
            console.log("Using default config: " + JSON.stringify(herfConfig));
        }


        for (let link of links) {
            
            for (let startWithValue of herfConfig.startWith) {
                if (link.href.startsWith(startWithValue)) {
                    extractedLinks += link.href + "<br/>";
                    break;
                }
            }

            for (let endWithValue of herfConfig.endWith) {
                if (link.href.endsWith(endWithValue)) {
                    extractedLinks += link.href + "<br/>";
                    break;
                }
            }

        }
        //thunder e2d
    
        if (extractedLinks === "") {                                    
            extractedLinks = "No links";
        }

        let container = document.createElement("div");
        let btnClose = document.createElement("button");
        btnClose.style.color = "#ff0000";
        btnClose.style.borderColor = "#e56a2e";
        btnClose.style.margin = "10px";
        btnClose.innerText = "Close";
        btnClose.onclick = () => {
            container.remove();
        }

    
        let selectedLinks = document.createElement("div");

        container.appendChild(btnClose);
        container.appendChild(selectedLinks);
        
        container.style.width = "600px";
        container.style.height = "300px";
        container.style.position = "fixed";
        container.style.top = "100px";
        container.style.left = "200px";
        container.style.background = "black";
        container.style.color = "white";
        container.style.overflowY = "scroll";
    
        selectedLinks.innerHTML = extractedLinks;
        
        document.body.appendChild(container);
    
        let range = document.createRange();
        range.selectNode(selectedLinks);
        window.getSelection().addRange(range);
        let copyResult = document.execCommand("copy");
        console.log("Links were copied:" + copyResult);

        setTimeout(() => {
            container.remove();
        }, 300000);
    })
    
}


chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: findLinks
      });
});