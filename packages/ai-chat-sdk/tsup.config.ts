import { defineConfig } from "tsup";
import { fixExtensionsPlugin } from "esbuild-fix-imports-plugin";

export default defineConfig([
  {
    entry: ["src"],
    outDir: "dist",
    external: ["react", "next"],

    // 👇 important: cjs doesn't work well
    format: "esm",
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: true,

    // 👇 important: do not bundle
    bundle: false,
    minify: false,
    treeshake: false,
    injectStyle: true,
    esbuildPlugins: [fixExtensionsPlugin()],
  },
]);
