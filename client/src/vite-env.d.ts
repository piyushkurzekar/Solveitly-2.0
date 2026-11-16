/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Backend origin without a trailing slash, e.g. https://solveitly-api.onrender.com. Leave empty for local dev. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
