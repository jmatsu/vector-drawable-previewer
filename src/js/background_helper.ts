import RemoteMessageType from "./remote_message_type";

type Detector = (url: string) => RemoteMessageType | null;

const isLocalFile: Detector = (url) => {
  if (/file?:\/\/\/.+\.xml\??.*$/.test(url)) {
    return RemoteMessageType.GitHubBlob;
  } else {
    return null;
  }
};

const isGitHubBlob: Detector = (url) => {
  if (
    /https?:\/\/github\.com\/[^/]+\/[^/]+\/blob\/.+?\/res\/[^/]+\/[^.]+\.xml\??.*$/.test(
      url,
    )
  ) {
    return RemoteMessageType.GitHubBlob;
  } else {
    return null;
  }
};

const isGitHubDiff: Detector = (url) => {
  if (/https?:\/\/github\.com\/[^/]+\/[^/]+\/pull\/[0-9]+\/files/.test(url)) {
    return RemoteMessageType.GitHubDiff;
  } else {
    return null;
  }
};

const isGitHubRaw: Detector = (url) => {
  if (/https?:\/\/raw\.githubusercontent\.com\/.+\.xml\??.*$/.test(url)) {
    return RemoteMessageType.GitHubRaw;
  } else {
    return null;
  }
};

export { isGitHubBlob, isGitHubDiff, isGitHubRaw, isLocalFile };
