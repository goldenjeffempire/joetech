import { build as esbuild, type Plugin } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";

// Server deps to bundle into the CJS output.
// Bundling eliminates all external require() calls for these packages, making
// the production binary fully self-contained and immune to node_modules issues
// on any deployment platform (Render native, Docker, Railway, Fly, etc.).
// Rule: add a package here if it is imported in ANY server/*.ts file at runtime.
const allowlist = [
  // ── HTTP & middleware ──────────────────────────────────────────────────────
  "express",
  "express-rate-limit",
  "express-session",
  "helmet",          // MUST be bundled — used in server/index.ts
  "compression",     // MUST be bundled — used in server/index.ts
  "cors",
  // ── Auth ──────────────────────────────────────────────────────────────────
  "passport",
  "passport-local",
  "connect-pg-simple",
  "memorystore",
  // ── Database ──────────────────────────────────────────────────────────────
  "pg",
  "drizzle-orm",
  "drizzle-zod",
  // ── Validation ────────────────────────────────────────────────────────────
  "zod",
  "zod-validation-error",
  // ── Utilities ─────────────────────────────────────────────────────────────
  "nanoid",
  "uuid",
  "date-fns",
  // ── Optional / AI / integrations (safe to bundle) ─────────────────────────
  "@google/generative-ai",
  "axios",
  "jsonwebtoken",
  "multer",
  "nodemailer",
  "openai",
  "stripe",
  "ws",
  "xlsx",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  // Stub out the dev-only Vite middleware so it is never bundled into the
  // production CJS. Without this, esbuild pulls in vite.config.ts which uses
  // `import.meta.dirname` — undefined in CJS — and `path.resolve(undefined, …)`
  // throws a TypeError that crashes the server on cold start.
  const stubVitePlugin: Plugin = {
    name: "stub-vite-dev",
    setup(build) {
      // Intercept the literal import string `./vite` (from server/index.ts)
      // so that server/vite.ts and vite.config.ts are never bundled into the
      // production CJS — they use `import.meta.dirname` which is undefined
      // in CJS and causes `path.resolve(undefined, …)` to throw at startup.
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
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    plugins: [stubVitePlugin],
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
