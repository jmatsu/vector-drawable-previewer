import "./extension";

import RemoteMessageType from "./remote_message_type";
import * as Id from "./const/id";
import { ShowSVGScenario } from "./scenario/show_svg_scenario";
import {
  RawPackage,
  UnknownPackage,
} from "./presentation/presentation_component";

import { estimateFromContent } from "./content_script_helper";

const estimateFromRemoteMessageType = (messageType: RemoteMessageType) => {
  const packages = {};

  packages[RemoteMessageType.GitHubRaw] = new RawPackage();

  return packages[messageType];
};

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type) {
    const messageType: RemoteMessageType = request.type;

    if (!document.querySelector(`#${Id.svgContainer}`)) {
      const pkg =
        estimateFromRemoteMessageType(messageType) ||
        estimateFromContent() ||
        new UnknownPackage();
      new ShowSVGScenario(pkg).consume().catch((err) => console.log(err));
    }
  }

  if (sendResponse) {
    sendResponse("ok");
  }
});
