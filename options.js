let page = document.getElementById("hrefOptions");

const defaultConfig = {
    "startWith" : ["thunder", "ed2k"],
    "endWith": ["mp4"]
};

const saveAsCSV = (value) => {
    if (value) {
        return value.split(",").map(item => item.trim());
    }
    return [];
}

const handleSavweButtonClick = (event) => {
    const config = {"hrefConfig": 
        {
            "startWith": saveAsCSV(document.getElementById("txtStartWith").value), 
            "endWith": saveAsCSV(document.getElementById("txtEndWith").value)
        }
    };

    console.log("Saving " + JSON.stringify(config));
    
    chrome.storage.sync.set(config, () => {
        document.getElementById("message").innerHTML = "Saved";
    });

}

const handleRestoreButtonClick = (event) => {
    document.getElementById("txtStartWith").value = defaultConfig.startWith;
    document.getElementById("txtEndWith").value = defaultConfig.endWith;
}

chrome.storage.sync.get(['hrefConfig'], (config) => {
    console.log("Loading config : " + JSON.stringify(config));
    if (config.hrefConfig?.startWith) {
        document.getElementById("txtStartWith").value = config.hrefConfig.startWith;
    } else {
        document.getElementById("txtStartWith").value = defaultConfig.startWith;
    }

    if (config.hrefConfig?.endWith) {
        document.getElementById("txtEndWith").value = config.hrefConfig.endWith;
    } else {
        document.getElementById("txtEndWith").value = defaultConfig.endWith;
    }
})

document.getElementById("btnSave").addEventListener("click", handleSavweButtonClick);

document.getElementById("btnRestore").addEventListener("click", handleRestoreButtonClick);