/// <reference types="node" />

import alchemy from "../../alchemy/src";
import { KVNamespace, R2Bucket, ViteSite } from "../../alchemy/src/cloudflare";
import "../../alchemy/src/os";

const app = await alchemy("cloudflare-vite", {
  stage: process.env.USER ?? "dev",
  phase: process.argv.includes("--destroy") ? "destroy" : "up",
  quiet: process.argv.includes("--verbose") ? false : true,
  password: process.env.ALCHEMY_PASSWORD,
});

export const [authStore, storage] = await Promise.all([
  KVNamespace("AUTH_STORE", {
    title: "alchemy-example-auth-store",
  }),
  R2Bucket("storage", {
    name: "alchemy-example-storage",
    allowPublicAccess: false,
  }),
]);

export const website = await ViteSite("cloudflare-vite", {
  main: "./src/index.ts",
  assets: "./dist",
  command: "bun run build",
  bindings: {
    STORAGE: storage,
    AUTH_STORE: authStore,
    GITHUB_CLIENT_ID: alchemy.secret(process.env.GITHUB_CLIENT_ID),
    GITHUB_CLIENT_SECRET: alchemy.secret(process.env.GITHUB_CLIENT_SECRET),
  },
});

console.log({
  url: website.url,
});

await app.finalize();
