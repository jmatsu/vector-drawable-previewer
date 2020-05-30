import "./extension";
import RemoteMessageType from "./remote_message_type";

import {
  isGitHubBlob,
  isGitHubDiff,
  isGitHubRaw,
  isLocalFile,
} from "./background_helper";

const fallback = () => RemoteMessageType.OnCompleteLoad;

const detectors = [
  isGitHubBlob,
  isGitHubDiff,
  isGitHubRaw,
  isLocalFile,
  fallback,
];

chrome.tabs.onUpdated.addListener(function (_tabId, changeInfo, tab) {
  if (tab.active && changeInfo.status === "complete") {
    for (let detector of detectors) {
      const type = detector(tab.url);

      if (type) {
        chrome.tabs.sendMessage(tab.id, { type }, () => {
          // no-op
        });
        break;
      }
    }
  }
});
