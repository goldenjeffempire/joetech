import { build as esbuild, type Plugin } from "esbuild";
import { build as viteBuild } from "vite";
import { rm } from "fs/promises";

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building server...");

  // Stub server/vite.ts so the dev-only Vite middleware is never bundled.
  // Without this, esbuild pulls in vite.config.ts which uses import.meta.dirname
  // (undefined in CJS) and causes a TypeError crash on cold start.
  const stubVitePlugin: Plugin = {
    name: "stub-vite-dev",
    setup(build) {
      build.onResolve({ filter: /^\.\/vite$/ }, (args) => {
        if (args.importer.includes("server")) {
          return { path: "stub-vite-dev", namespace: "stub-vite-dev" };
        }
      });
      build.onLoad({ filter: /.*/, namespace: "stub-vite-dev" }, () => ({
        contents: `
          exports.setupVite = async function() {
            throw new Error("setupVite called in production build — this is a bug");
          };
        `,
        loader: "js",
      }));
    },
  };

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    packages: "external",   // All npm packages resolved from node_modules at runtime.
                            // Only local TypeScript source (server/, shared/) is compiled
                            // into the bundle, keeping dist/index.cjs tiny (~50-80 kB).
                            // Render installs all dependencies before starting the server,
                            // so node_modules is always available in production.
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    tsconfig: "tsconfig.json", // Ensures @shared/* path alias resolves correctly.
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    plugins: [stubVitePlugin],
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
