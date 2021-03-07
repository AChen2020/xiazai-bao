

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
    
        let selectedLinks = document.createElement("div");
        
        selectedLinks.style.width = "600px";
        selectedLinks.style.height = "300px";
        selectedLinks.style.position = "fixed";
        selectedLinks.style.top = "100px";
        selectedLinks.style.left = "200px";
        selectedLinks.style.background = "black";
        selectedLinks.style.color = "white";
        selectedLinks.style.overflowY = "scroll";
    
        selectedLinks.innerHTML = extractedLinks;
        
        document.body.appendChild(selectedLinks);
    
        let range = document.createRange();
        range.selectNode(selectedLinks);
        window.getSelection().addRange(range);
        let copyResult = document.execCommand("copy");
        console.log("Links were copied:" + copyResult);
    })
    
}

//document.getElementById("links").innerHTML = extractedLinks;


chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: findLinks
      });
});