function findAndDeleteMedia(mediaType, srcUrl) {
  console.log("clicked on " + mediaType + "|" + srcUrl)

  const tagName = mediaType === 'image' ? 'img' : mediaType;

  if (tagName === "video") {
    for (const el of document.querySelectorAll(tagName)) {
      el.remove();
    }
  } else {
    for (const el of document.querySelectorAll(tagName)) {
      if (el.src === srcUrl) {
          el.remove();
          break;
      }
    }
  }

}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("request :" + JSON.stringify(request));
      if (request.mediaType) {
        findAndDeleteMedia(request.mediaType, request.srcUrl);
      } else if (request.linkUrl) {
        for (const el of document.querySelectorAll('a')) {
          if (el.href === srcUrl) {
              el.remove();
              break;
          }
        }
      } else if (request.frameUrl) {

      } else {
        alert("Can't delete it atm, but we are working on it...");
      }   
    }
  );