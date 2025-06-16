/**
 * TRON Legacy Node Graph Config: minimal neon cyan, grid-first.
 */
export const THEME = {
  background: "#0a0f1a",
  node: {
    fontFamily: "'Orbitron', monospace, sans-serif",
    fontSize: "1rem",
    radius: "0px",
    padding: "18px 16px",
    shadow: "0 0 14px 1px #00fff7bb, 0 0 1.5px #32e6e2",
    borderWidth: 2.5,
    borderColor: "#00fff7",
    accent: "#32e6e2", // only cyan
    edge: "#32e6e2",   // only cyan for all edges!
    websiteBorder: "#00fff7",
    timeBorder: "#00fff7",
    valueColor: "#e6edf3",
    subColor: "#32e6e2",
    subtitleFontSize: "0.92rem"
  },
};

export type WebsiteNodeConfig = {
  id: string;
  label: string;
  url: string;
  category: "Productivity" | "Entertainment" | "Social";
};

const env = import.meta.env;

export const WEBSITE_NODES: WebsiteNodeConfig[] = [
  {
    id: "google",
    label: env.VITE_GOOGLE_LABEL ?? "Google",
    url: env.VITE_GOOGLE_URL ?? "https://google.com",
    category: "Productivity",
  },
  {
    id: "github",
    label: env.VITE_GITHUB_LABEL ?? "GitHub",
    url: env.VITE_GITHUB_URL ?? "https://github.com",
    category: "Productivity",
  },
  {
    id: "youtube",
    label: env.VITE_YOUTUBE_LABEL ?? "YouTube",
    url: env.VITE_YOUTUBE_URL ?? "https://youtube.com",
    category: "Entertainment",
  },
  {
    id: "twitter",
    label: env.VITE_TWITTER_LABEL ?? "Twitter (X)",
    url: env.VITE_TWITTER_URL ?? "https://twitter.com",
    category: "Social",
  },
  {
    id: "netflix",
    label: env.VITE_NETFLIX_LABEL ?? "Netflix",
    url: env.VITE_NETFLIX_URL ?? "https://netflix.com",
    category: "Entertainment",
  },
  {
    id: "spotify",
    label: env.VITE_SPOTIFY_LABEL ?? "Spotify",
    url: env.VITE_SPOTIFY_URL ?? "https://spotify.com",
    category: "Entertainment",
  },
];

export const TIME_NODES = [
  { id: "day", label: "Today", type: "day" },
  { id: "date", label: "Full Date", type: "date" },
  { id: "localTime", label: "Local Time", type: "time" },
  { id: "laTime", label: "LA Time", type: "laTime" },
];

// Only use cyan for all connections.
// Reworked: All website nodes are only children of localTime (single parent).
export const CONNECTIONS = [
  { source: "date", target: "day", kind: "temporal" },
  { source: "day", target: "localTime", kind: "temporal" },
  { source: "day", target: "laTime", kind: "temporal" },

  // All URLs connected ONLY to localTime
  { source: "localTime", target: "google", kind: "utility" },
  { source: "localTime", target: "github", kind: "utility" },
  { source: "localTime", target: "youtube", kind: "entertainment" },
  { source: "localTime", target: "twitter", kind: "social" },
  { source: "localTime", target: "netflix", kind: "entertainment" },
  { source: "localTime", target: "spotify", kind: "entertainment" }
];
