
/**
 * Node Graph Config: update these values ("env-style") to customize graph.
 */
export const THEME = {
  background: "linear-gradient(120deg, #12151c 0%, #191f2a 100%)",
  node: {
    fontFamily: "'IBM Plex Sans', monospace, sans-serif",
    fontSize: "1rem",
    radius: "14px",
    padding: "18px 16px",
    shadow: "0 6px 24px 0 rgba(44, 179, 255, 0.15)",
    borderWidth: 2,
    borderColor: "#232e3a",
    accent: "#32e6e2", // cyan accent
    edge: "#fdab3d", // orange accent
    websiteBorder: "#f7b03b",
    timeBorder: "#32e6e2",
    valueColor: "#e6edf3",
    subColor: "#f7b03b",
    subtitleFontSize: "0.92rem"
  },
};

export type WebsiteNodeConfig = {
  id: string;
  label: string;
  url: string;
  category: "Productivity" | "Entertainment" | "Social";
};

export const WEBSITE_NODES: WebsiteNodeConfig[] = [
  { id: "google", label: "Google", url: "https://google.com", category: "Productivity" },
  { id: "github", label: "GitHub", url: "https://github.com", category: "Productivity" },
  { id: "youtube", label: "YouTube", url: "https://youtube.com", category: "Entertainment" },
  { id: "twitter", label: "Twitter (X)", url: "https://twitter.com", category: "Social" },
  { id: "netflix", label: "Netflix", url: "https://netflix.com", category: "Entertainment" },
  { id: "spotify", label: "Spotify", url: "https://spotify.com", category: "Entertainment" },
];

export const TIME_NODES = [
  { id: "day", label: "Today", type: "day" },
  { id: "date", label: "Full Date", type: "date" },
  { id: "localTime", label: "Local Time", type: "time" },
  { id: "laTime", label: "LA Time", type: "laTime" },
];

// Custom logic for connections (for easy changing)
export const CONNECTIONS = [
  // Temporal logic: day→date→local→LA 
  { source: "day", target: "date", kind: "temporal" },
  { source: "date", target: "localTime", kind: "temporal" },
  { source: "localTime", target: "laTime", kind: "temporal" },

  // Productivity sites from "day"
  { source: "day", target: "google", kind: "utility" },
  { source: "day", target: "github", kind: "utility" },

  // Social/entertainment links from LA time and full date
  { source: "laTime", target: "youtube", kind: "entertainment" },
  { source: "laTime", target: "twitter", kind: "social" },
  { source: "date", target: "netflix", kind: "entertainment" },
  { source: "date", target: "spotify", kind: "entertainment" },

  // Cross-category
  { source: "github", target: "youtube", kind: "tutorials" },
  { source: "youtube", target: "spotify", kind: "media" }
];
