const RemoteMessageType = {
  GitHubRaw: "github-raw",
  LocalFile: "local-file",
} as const;

type RemoteMessageType =
  (typeof RemoteMessageType)[keyof typeof RemoteMessageType];

export default RemoteMessageType;
