import * as $ from "jquery";

chrome.runtime.onMessage.addListener((_request, _sender, sendResponse) => {
  

  sendResponse("ok");
});
