import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import type {Plugin} from "vite";

// Resolve bundled catalog URLs when the review demo is hosted under a Pages path.
function demoAssetBase():Plugin {
  let base='/';
  return {
    name:'always-on-asset-base',
    enforce:'pre',
    configResolved(config){base=config.base},
    transform(code,id){
      if(base==='/'||!id.includes('/src/always-on/'))return;
      return code.replace(/(["'`(])\/(always-on-assets\/|catalog\/|sa-logo\.svg|spreeai-logo\.svg)/g,(_,quote,asset)=>`${quote}/spreeai-always-on-demo/${asset}`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [demoAssetBase(),react(), babel({ presets: [reactCompilerPreset()] })],
  base: "/", // or your custom base path
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
