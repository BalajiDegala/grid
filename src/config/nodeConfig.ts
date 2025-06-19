/**
 * Dark Node Graph Config: Customizable nodes with environment variables
 */
export const THEME = {
  background: "#0a0a0a",
  node: {
    fontFamily: "'Orbitron', monospace, sans-serif",
    fontSize: "1rem",
    radius: "4px",
    padding: "20px 18px",
    shadow: "0 0 20px rgba(0, 212, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.4)",
    borderWidth: 2,
    borderColor: "#00d4ff",
    accent: "#00d4ff",
    edge: "#00d4ff",
    websiteBorder: "#ff6b35",
    timeBorder: "#00d4ff",
    valueColor: "#ffffff",
    subColor: "#ff6b35",
    subtitleFontSize: "0.9rem"
  },
};

export type WebsiteNodeConfig = {
  id: string;
  label: string;
  url: string;
  category: "Productivity" | "Analytics" | "Monitoring" | "Documentation" | "Support" | "Admin";
};

const env = import.meta.env;

export const WEBSITE_NODES: WebsiteNodeConfig[] = [
  {
    id: "node1",
    label: env.VITE_NODE1_LABEL ?? "My Dashboard",
    url: env.VITE_NODE1_URL ?? "https://dashboard.mycompany.com",
    category: "Productivity",
  },
  {
    id: "node2",
    label: env.VITE_NODE2_LABEL ?? "Analytics",
    url: env.VITE_NODE2_URL ?? "https://analytics.mycompany.com",
    category: "Analytics",
  },
  {
    id: "node3",
    label: env.VITE_NODE3_LABEL ?? "Monitoring",
    url: env.VITE_NODE3_URL ?? "https://monitoring.mycompany.com",
    category: "Monitoring",
  },
  {
    id: "node4",
    label: env.VITE_NODE4_LABEL ?? "Documentation",
    url: env.VITE_NODE4_URL ?? "https://docs.mycompany.com",
    category: "Documentation",
  },
  {
    id: "node5",
    label: env.VITE_NODE5_LABEL ?? "Support",
    url: env.VITE_NODE5_URL ?? "https://support.mycompany.com",
    category: "Support",
  },
  {
    id: "node6",
    label: env.VITE_NODE6_LABEL ?? "Admin Panel",
    url: env.VITE_NODE6_URL ?? "https://admin.mycompany.com",
    category: "Admin",
  },
];

export const TIME_NODES = [
  { id: "day", label: "Today", type: "day" },
  { id: "date", label: "Full Date", type: "date" },
  { id: "localTime", label: "Local Time", type: "time" },
  { id: "laTime", label: "LA Time", type: "laTime" },
];

// Straight connections - all website nodes connected to localTime
export const CONNECTIONS = [
  { source: "date", target: "day", kind: "temporal" },
  { source: "day", target: "localTime", kind: "temporal" },
  { source: "day", target: "laTime", kind: "temporal" },

  // All custom nodes connected to localTime
  { source: "localTime", target: "node1", kind: "utility" },
  { source: "localTime", target: "node2", kind: "analytics" },
  { source: "localTime", target: "node3", kind: "monitoring" },
  { source: "localTime", target: "node4", kind: "documentation" },
  { source: "localTime", target: "node5", kind: "support" },
  { source: "localTime", target: "node6", kind: "admin" }
];