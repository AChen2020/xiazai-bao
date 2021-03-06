const findLinks = () => {
    //document.getElementById("links").innerHTML="hello"
    const links = document.links;
    var extractedLinks = "";

    for (let link of links) {
        console.log(link.href)
        if (link.href.startsWith("https://")) {
            extractedLinks += link.href + "<br/>"
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
    
}

//document.getElementById("links").innerHTML = extractedLinks;


chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: findLinks
      });
});