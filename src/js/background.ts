import { isGitHubRaw, isLocalFile } from "./background_helper";

const detectors = [isGitHubRaw, isLocalFile];

chrome.tabs.onUpdated.addListener(async (_tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    for (let detector of detectors) {
      const type = detector(tab.url);

      console.log("found", type);

      if (type) {
        try {
          await chrome.tabs.sendMessage(tab.id, { type });
          console.log("sendMessage", true);
        } catch (_e) {
          console.log("Could not send a message");
        }
        return;
      }
    }
  }
});
