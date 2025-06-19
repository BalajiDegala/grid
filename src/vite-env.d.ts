/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE1_LABEL?: string;
  readonly VITE_NODE1_URL?: string;
  readonly VITE_NODE2_LABEL?: string;
  readonly VITE_NODE2_URL?: string;
  readonly VITE_NODE3_LABEL?: string;
  readonly VITE_NODE3_URL?: string;
  readonly VITE_NODE4_LABEL?: string;
  readonly VITE_NODE4_URL?: string;
  readonly VITE_NODE5_LABEL?: string;
  readonly VITE_NODE5_URL?: string;
  readonly VITE_NODE6_LABEL?: string;
  readonly VITE_NODE6_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}