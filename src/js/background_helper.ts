import RemoteMessageType from "./remote_message_type";

type Detector = (url: string) => RemoteMessageType | null;

const isLocalFile: Detector = (url) => {
  if (/file?:\/\/\/.+\.xml\??.*$/.test(url)) {
    return RemoteMessageType.LocalFile;
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

export { isGitHubRaw, isLocalFile };
