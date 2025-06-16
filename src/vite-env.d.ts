/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_LABEL?: string;
  readonly VITE_GOOGLE_URL?: string;
  readonly VITE_GITHUB_LABEL?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_YOUTUBE_LABEL?: string;
  readonly VITE_YOUTUBE_URL?: string;
  readonly VITE_TWITTER_LABEL?: string;
  readonly VITE_TWITTER_URL?: string;
  readonly VITE_NETFLIX_LABEL?: string;
  readonly VITE_NETFLIX_URL?: string;
  readonly VITE_SPOTIFY_LABEL?: string;
  readonly VITE_SPOTIFY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
