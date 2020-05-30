const RemoteMessageType = {
  GitHubBlob: "github-blob",
  GitHubDiff: "github-diff",
  GitHubRaw: "github-raw",
  LocalFile: "local-file",
  OnCompleteLoad: "on-complete-load",
} as const;

type RemoteMessageType = typeof RemoteMessageType[keyof typeof RemoteMessageType];

export default RemoteMessageType;
